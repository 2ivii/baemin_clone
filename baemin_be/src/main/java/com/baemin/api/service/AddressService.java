package com.baemin.api.service;

import com.baemin.api.exception.BadRequestException;
import com.baemin.api.exception.NotFoundException;
import com.baemin.api.dto.request.AddressRequest;
import com.baemin.api.dto.response.AddressResponse;
import com.baemin.api.entity.Address;
import com.baemin.api.entity.User;
import com.baemin.api.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    private static final int MAX_ADDRESSES = 10;

    /** 내 주소 목록 조회 */
    @Transactional(readOnly = true)
    public List<AddressResponse> getMyAddresses(User user) {
        return addressRepository
                .findByUserIdOrderByIsDefaultDescCreatedAtDesc(user.getId())
                .stream()
                .map(AddressResponse::from)
                .collect(Collectors.toList());
    }

    /** 주소 단건 조회 */
    @Transactional(readOnly = true)
    public AddressResponse getAddress(User user, Long addressId) {
        Address address = findOwned(user.getId(), addressId);
        return AddressResponse.from(address);
    }

    /** 주소 추가 */
    @Transactional
    public AddressResponse addAddress(User user, AddressRequest req) {
        // 최대 개수 제한
        long count = addressRepository.findByUserIdOrderByIsDefaultDescCreatedAtDesc(user.getId()).size();
        if (count >= MAX_ADDRESSES) {
            throw new BadRequestException("주소는 최대 " + MAX_ADDRESSES + "개까지 등록할 수 있습니다.");
        }

        // 기본 주소로 설정 시 기존 기본 주소 해제
        if (req.isDefault()) {
            addressRepository.clearDefaultByUserId(user.getId());
        }

        // 첫 번째 주소는 자동으로 기본 주소
        boolean shouldBeDefault = req.isDefault() || count == 0;

        Address address = Address.builder()
                .user(user)
                .label(req.getLabel())
                .roadAddress(req.getRoadAddress())
                .detailAddress(req.getDetailAddress())
                .deliveryNote(req.getDeliveryNote())
                .isDefault(shouldBeDefault)
                .build();

        return AddressResponse.from(addressRepository.save(address));
    }

    /** 주소 수정 */
    @Transactional
    public AddressResponse updateAddress(User user, Long addressId, AddressRequest req) {
        Address address = findOwned(user.getId(), addressId);

        if (req.isDefault()) {
            addressRepository.clearDefaultByUserId(user.getId());
        }

        address.setLabel(req.getLabel());
        address.setRoadAddress(req.getRoadAddress());
        address.setDetailAddress(req.getDetailAddress());
        address.setDeliveryNote(req.getDeliveryNote());
        address.setDefault(req.isDefault());

        return AddressResponse.from(addressRepository.save(address));
    }

    /** 주소 삭제 */
    @Transactional
    public void deleteAddress(User user, Long addressId) {
        Address address = findOwned(user.getId(), addressId);

        // 기본 주소 삭제 시 → 가장 최근 주소를 기본으로 자동 지정
        boolean wasDefault = address.isDefault();
        addressRepository.delete(address);

        if (wasDefault) {
            addressRepository
                    .findByUserIdOrderByIsDefaultDescCreatedAtDesc(user.getId())
                    .stream()
                    .findFirst()
                    .ifPresent(next -> {
                        next.setDefault(true);
                        addressRepository.save(next);
                    });
        }
    }

    /** 기본 주소 변경 */
    @Transactional
    public AddressResponse setDefaultAddress(User user, Long addressId) {
        Address address = findOwned(user.getId(), addressId);

        addressRepository.clearDefaultByUserId(user.getId());
        address.setDefault(true);

        return AddressResponse.from(addressRepository.save(address));
    }

    // ── private ────────────────────────────────────────────────

    private Address findOwned(Long userId, Long addressId) {
        return addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new NotFoundException("주소를 찾을 수 없습니다."));
    }
}
