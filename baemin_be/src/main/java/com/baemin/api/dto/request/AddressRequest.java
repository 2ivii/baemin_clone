package com.baemin.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AddressRequest {
    @NotBlank
    private String label;

    @NotBlank
    private String roadAddress;

    private String detailAddress;
    private String deliveryNote;
    private boolean isDefault;
}
