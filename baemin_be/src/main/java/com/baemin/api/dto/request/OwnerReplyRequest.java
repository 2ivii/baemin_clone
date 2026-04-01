package com.baemin.api.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class OwnerReplyRequest {

    @NotBlank
    @Size(max = 1000)
    private String reply;
}