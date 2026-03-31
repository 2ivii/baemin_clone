package com.baemin.api.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class OwnerMenuRequest {

    @NotBlank
    private String name;

    private String description;

    @Min(0)
    private int price;

    private String emoji;
    private String bgColor;
    private boolean ownerPick;
    private Integer popularityRank;
}