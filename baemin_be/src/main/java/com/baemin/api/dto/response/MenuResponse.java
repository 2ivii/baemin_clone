package com.baemin.api.dto.response;

import com.baemin.api.entity.Menu;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MenuResponse {
    private Long id;
    private String name;
    private String description;
    private int price;
    private String emoji;
    private String bgColor;
    private boolean ownerPick;
    private Integer popularityRank;
    private int reviewCount;
    private boolean available;

    public static MenuResponse from(Menu m) {
        return MenuResponse.builder()
                .id(m.getId())
                .name(m.getName())
                .description(m.getDescription())
                .price(m.getPrice())
                .emoji(m.getEmoji())
                .bgColor(m.getBgColor())
                .ownerPick(m.isOwnerPick())
                .popularityRank(m.getPopularityRank())
                .reviewCount(m.getReviewCount())
                .available(m.isAvailable())
                .build();
    }
}