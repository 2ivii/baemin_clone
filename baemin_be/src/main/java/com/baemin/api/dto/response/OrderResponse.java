package com.baemin.api.dto.response;

import com.baemin.api.entity.Order;
import com.baemin.api.entity.OrderItem;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class OrderResponse {
    private Long id;
    private String restaurantName;
    private String restaurantEmoji;
    private String deliveryAddress;
    private String deliveryDetail;
    private String deliveryNote;
    private int totalPrice;
    private int deliveryFee;
    private int discountAmount;
    private int finalPrice;
    private String status;
    private String paymentMethod;
    private LocalDateTime orderedAt;
    private LocalDateTime deliveredAt;
    private List<OrderItemResponse> items;

    @Getter
    @Builder
    public static class OrderItemResponse {
        private Long menuId;
        private String menuName;
        private int unitPrice;
        private int quantity;
        private int subtotal;

        public static OrderItemResponse from(OrderItem item) {
            return OrderItemResponse.builder()
                    .menuId(item.getMenu().getId())
                    .menuName(item.getMenuName())
                    .unitPrice(item.getUnitPrice())
                    .quantity(item.getQuantity())
                    .subtotal(item.getSubtotal())
                    .build();
        }
    }

    public static OrderResponse from(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .restaurantName(order.getRestaurant().getName())
                .restaurantEmoji(order.getRestaurant().getImgEmoji())
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryDetail(order.getDeliveryDetail())
                .deliveryNote(order.getDeliveryNote())
                .totalPrice(order.getTotalPrice())
                .deliveryFee(order.getDeliveryFee())
                .discountAmount(order.getDiscountAmount())
                .finalPrice(order.getFinalPrice())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .orderedAt(order.getOrderedAt())
                .deliveredAt(order.getDeliveredAt())
                .items(order.getOrderItems().stream()
                        .map(OrderItemResponse::from)
                        .collect(Collectors.toList()))
                .build();
    }
}
