package com.baemin.api.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import java.util.List;

@Getter
public class OrderRequest {

    @NotNull
    private Long restaurantId;

    @NotNull
    private Long addressId;

    private String deliveryNote;

    @NotEmpty
    private List<OrderItemRequest> items;

    private Long couponId;       // 선택
    private String paymentMethod; // CARD | CASH | KAKAO_PAY

    @Getter
    public static class OrderItemRequest {
        @NotNull
        private Long menuId;

        @Min(1)
        private int quantity;
    }
}
