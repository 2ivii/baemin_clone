package com.baemin.api.controller;

import com.baemin.api.service.AddressService;
import com.baemin.api.dto.request.AddressRequest;
import com.baemin.api.dto.response.AddressResponse;
import com.baemin.api.dto.response.ApiResponse;
import com.baemin.api.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    /**
     * GET /api/addresses
     * 내 주소 목록 전체 조회
     */
    @GetMapping
    public ApiResponse<List<AddressResponse>> getMyAddresses(
            @AuthenticationPrincipal User user) {
        return ApiResponse.ok(addressService.getMyAddresses(user));
    }

    /**
     * GET /api/addresses/{id}
     * 주소 단건 조회
     */
    @GetMapping("/{id}")
    public ApiResponse<AddressResponse> getAddress(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        return ApiResponse.ok(addressService.getAddress(user, id));
    }

    /**
     * POST /api/addresses
     * 새 주소 추가
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AddressResponse> addAddress(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody AddressRequest req) {
        return ApiResponse.ok("주소가 추가되었습니다.", addressService.addAddress(user, req));
    }

    /**
     * PUT /api/addresses/{id}
     * 주소 수정
     */
    @PutMapping("/{id}")
    public ApiResponse<AddressResponse> updateAddress(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @Valid @RequestBody AddressRequest req) {
        return ApiResponse.ok("주소가 수정되었습니다.", addressService.updateAddress(user, id, req));
    }

    /**
     * DELETE /api/addresses/{id}
     * 주소 삭제
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteAddress(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        addressService.deleteAddress(user, id);
        return ApiResponse.ok("주소가 삭제되었습니다.", null);
    }

    /**
     * PATCH /api/addresses/{id}/default
     * 기본 주소로 설정
     */
    @PatchMapping("/{id}/default")
    public ApiResponse<AddressResponse> setDefault(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        return ApiResponse.ok("기본 주소로 설정되었습니다.", addressService.setDefaultAddress(user, id));
    }
}
