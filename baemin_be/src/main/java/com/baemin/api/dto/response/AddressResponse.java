package com.baemin.api.dto.response;

import com.baemin.api.entity.Address;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AddressResponse {
    private Long id;
    private String label;
    private String roadAddress;
    private String detailAddress;
    private String deliveryNote;
    private boolean isDefault;
    private LocalDateTime createdAt;

    public static AddressResponse from(Address address) {
        return AddressResponse.builder()
                .id(address.getId())
                .label(address.getLabel())
                .roadAddress(address.getRoadAddress())
                .detailAddress(address.getDetailAddress())
                .deliveryNote(address.getDeliveryNote())
                .isDefault(address.isDefault())
                .createdAt(address.getCreatedAt())
                .build();
    }
}
