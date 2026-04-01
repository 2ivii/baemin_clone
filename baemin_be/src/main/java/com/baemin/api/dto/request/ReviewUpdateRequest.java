package com.baemin.api.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class ReviewUpdateRequest {

    @Min(1) @Max(5)
    private int rating;

    @Size(max = 1000)
    private String content;
}