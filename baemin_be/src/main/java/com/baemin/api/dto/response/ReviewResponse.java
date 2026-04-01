package com.baemin.api.dto.response;

import com.baemin.api.entity.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewResponse {
    private Long id;
    private Long userId;
    private String userName;
    private Long restaurantId;
    private String restaurantName;
    private Long orderId;
    private int rating;
    private String content;
    private String ownerReply;
    private LocalDateTime ownerRepliedAt;
    private boolean edited;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ReviewResponse from(Review r) {
        return ReviewResponse.builder()
                .id(r.getId())
                .userId(r.getUser().getId())
                .userName(r.getUser().getName())
                .restaurantId(r.getRestaurant().getId())
                .restaurantName(r.getRestaurant().getName())
                .orderId(r.getOrder().getId())
                .rating(r.getRating())
                .content(r.getContent())
                .ownerReply(r.getOwnerReply())
                .ownerRepliedAt(r.getOwnerRepliedAt())
                .edited(r.isEdited())
                .createdAt(r.getCreatedAt())
                .updatedAt(r.getUpdatedAt())
                .build();
    }
}