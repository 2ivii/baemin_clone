package com.baemin.api.controller;

import com.baemin.api.service.OrderService;
import com.baemin.api.dto.request.OrderRequest;
import com.baemin.api.dto.response.ApiResponse;
import com.baemin.api.dto.response.OrderResponse;
import com.baemin.api.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * POST /api/orders
     * 주문 생성
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrderResponse> placeOrder(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody OrderRequest req) {
        return ApiResponse.ok("주문이 완료되었습니다.", orderService.placeOrder(user, req));
    }

    /**
     * GET /api/orders?page=0&size=10
     * 내 주문 내역 목록
     */
    @GetMapping
    public ApiResponse<Page<OrderResponse>> getMyOrders(
            @AuthenticationPrincipal User user,
            @PageableDefault(size = 10, sort = "orderedAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        return ApiResponse.ok(orderService.getMyOrders(user, pageable));
    }

    /**
     * GET /api/orders/{id}
     * 주문 상세 조회
     */
    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> getOrderDetail(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        return ApiResponse.ok(orderService.getOrderDetail(user, id));
    }

    /**
     * PATCH /api/orders/{id}/cancel
     * 주문 취소 (PENDING 상태일 때만 가능)
     */
    @PatchMapping("/{id}/cancel")
    public ApiResponse<OrderResponse> cancelOrder(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        return ApiResponse.ok("주문이 취소되었습니다.", orderService.cancelOrder(user, id));
    }
}
