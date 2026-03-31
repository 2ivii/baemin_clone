package com.baemin.api.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class OwnerRestaurantRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String categoryName;   // 카테고리 이름 (예: "치킨")

    private String imgEmoji;
    private String bgColor;
    private String deliveryTime;
    private String ownerNotice;

    @Min(0)
    private int minOrder;

    @Min(0)
    private int deliveryFee;
}