package com.baemin.api.service;

import com.baemin.api.dto.request.OrderRequest;
import com.baemin.api.dto.response.OrderResponse;
import com.baemin.api.entity.*;
import com.baemin.api.exception.BadRequestException;
import com.baemin.api.exception.NotFoundException;
import com.baemin.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;
    private final AddressRepository addressRepository;

    /** 주문 생성 */
    @Transactional
    public OrderResponse placeOrder(User user, OrderRequest req) {
        // 1. 음식점 조회
        Restaurant restaurant = restaurantRepository.findById(req.getRestaurantId())
                .orElseThrow(() -> new NotFoundException("음식점을 찾을 수 없습니다."));

        if (!restaurant.isOpen()) {
            throw new BadRequestException("현재 주문을 받지 않는 음식점입니다.");
        }

        // 2. 배달 주소 조회 및 스냅샷
        Address address = addressRepository.findByIdAndUserId(req.getAddressId(), user.getId())
                .orElseThrow(() -> new NotFoundException("배달 주소를 찾을 수 없습니다."));

        // 3. 주문 아이템 구성
        List<OrderItem> orderItems = new ArrayList<>();
        int totalPrice = 0;

        for (OrderRequest.OrderItemRequest itemReq : req.getItems()) {
            Menu menu = menuRepository.findById(itemReq.getMenuId())
                    .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다. id=" + itemReq.getMenuId()));

            if (!menu.getRestaurant().getId().equals(restaurant.getId())) {
                throw new BadRequestException("해당 음식점의 메뉴가 아닙니다.");
            }
            if (!menu.isAvailable()) {
                throw new BadRequestException("현재 주문 불가한 메뉴입니다: " + menu.getName());
            }

            int subtotal = menu.getPrice() * itemReq.getQuantity();
            totalPrice += subtotal;

            orderItems.add(OrderItem.builder()
                    .menu(menu)
                    .menuName(menu.getName())   // 스냅샷
                    .unitPrice(menu.getPrice()) // 스냅샷
                    .quantity(itemReq.getQuantity())
                    .subtotal(subtotal)
                    .build());
        }

        // 4. 최소 주문 금액 검증
        if (totalPrice < restaurant.getMinOrder()) {
            throw new BadRequestException(
                    String.format("최소 주문 금액은 %,d원입니다. (현재 %,d원)",
                            restaurant.getMinOrder(), totalPrice));
        }

        // 5. 쿠폰 할인 (추후 CouponService 연동 자리)
        int discountAmount = 0;
        int finalPrice = totalPrice + restaurant.getDeliveryFee() - discountAmount;

        // 6. Order 저장
        Order order = Order.builder()
                .user(user)
                .restaurant(restaurant)
                .deliveryAddress(address.getRoadAddress())
                .deliveryDetail(address.getDetailAddress())
                .deliveryNote(req.getDeliveryNote() != null ? req.getDeliveryNote() : address.getDeliveryNote())
                .totalPrice(totalPrice)
                .deliveryFee(restaurant.getDeliveryFee())
                .discountAmount(discountAmount)
                .finalPrice(finalPrice)
                .paymentMethod(req.getPaymentMethod())
                .couponId(req.getCouponId())
                .status("PENDING")
                .build();

        orderItems.forEach(item -> item.setOrder(order));
        order.getOrderItems().addAll(orderItems);

        return OrderResponse.from(orderRepository.save(order));
    }

    /** 주문 내역 목록 조회 (페이지) */
    @Transactional(readOnly = true)
    public Page<OrderResponse> getMyOrders(User user, Pageable pageable) {
        return orderRepository
                .findByUserIdWithDetails(user.getId(), pageable)
                .map(OrderResponse::from);
    }

    /** 주문 단건 상세 조회 */
    @Transactional(readOnly = true)
    public OrderResponse getOrderDetail(User user, Long orderId) {
        Order order = orderRepository.findByIdAndUserId(orderId, user.getId())
                .orElseThrow(() -> new NotFoundException("주문 내역을 찾을 수 없습니다."));
        return OrderResponse.from(order);
    }

    /** 주문 취소 */
    @Transactional
    public OrderResponse cancelOrder(User user, Long orderId) {
        Order order = orderRepository.findByIdAndUserId(orderId, user.getId())
                .orElseThrow(() -> new NotFoundException("주문 내역을 찾을 수 없습니다."));

        // PENDING 상태일 때만 취소 가능
        if (!"PENDING".equals(order.getStatus())) {
            throw new BadRequestException("이미 처리 중인 주문은 취소할 수 없습니다.");
        }

        order.setStatus("CANCELLED");
        return OrderResponse.from(orderRepository.save(order));
    }
}
