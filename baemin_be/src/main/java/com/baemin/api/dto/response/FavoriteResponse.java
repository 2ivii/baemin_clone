package com.baemin.api.dto.response;

import com.baemin.api.entity.Favorite;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FavoriteResponse {
    private Long favoriteId;
    private Long restaurantId;
    private String restaurantName;
    private String imgEmoji;
    private String bgColor;
    private double rating;
    private int reviewCount;
    private String deliveryTime;
    private int minOrder;
    private int deliveryFee;
    private LocalDateTime createdAt;

    public static FavoriteResponse from(Favorite f) {
        var r = f.getRestaurant();
        return FavoriteResponse.builder()
                .favoriteId(f.getId())
                .restaurantId(r.getId())
                .restaurantName(r.getName())
                .imgEmoji(r.getImgEmoji())
                .bgColor(r.getBgColor())
                .rating(r.getRating())
                .reviewCount(r.getReviewCount())
                .deliveryTime(r.getDeliveryTime())
                .minOrder(r.getMinOrder())
                .deliveryFee(r.getDeliveryFee())
                .createdAt(f.getCreatedAt())
                .build();
    }
}