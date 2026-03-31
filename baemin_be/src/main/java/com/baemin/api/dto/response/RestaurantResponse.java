package com.baemin.api.dto.response;

import com.baemin.api.entity.Restaurant;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RestaurantResponse {
    private Long id;
    private String name;
    private String imgEmoji;
    private String bgColor;
    private double rating;
    private int reviewCount;
    private String deliveryTime;
    private int minOrder;
    private int deliveryFee;
    private String ownerNotice;
    private boolean open;
    private CategoryResponse category;

    public static RestaurantResponse from(Restaurant r) {
        return RestaurantResponse.builder()
                .id(r.getId())
                .name(r.getName())
                .imgEmoji(r.getImgEmoji())
                .bgColor(r.getBgColor())
                .rating(r.getRating())
                .reviewCount(r.getReviewCount())
                .deliveryTime(r.getDeliveryTime())
                .minOrder(r.getMinOrder())
                .deliveryFee(r.getDeliveryFee())
                .ownerNotice(r.getOwnerNotice())
                .open(r.isOpen())
                .category(r.getCategory() != null ? CategoryResponse.from(r.getCategory()) : null)
                .build();
    }
}