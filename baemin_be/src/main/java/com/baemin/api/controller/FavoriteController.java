package com.baemin.api.controller;

import com.baemin.api.dto.response.ApiResponse;
import com.baemin.api.dto.response.FavoriteResponse;
import com.baemin.api.entity.User;
import com.baemin.api.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    /**
     * POST /api/favorites/{restaurantId}/toggle
     * 찜 토글 (추가/해제)
     */
    @PostMapping("/{restaurantId}/toggle")
    public ApiResponse<Map<String, Object>> toggle(
            @AuthenticationPrincipal User user,
            @PathVariable Long restaurantId) {
        return ApiResponse.ok(favoriteService.toggle(user, restaurantId));
    }

    /**
     * GET /api/favorites
     * 내 찜 목록 (상세)
     */
    @GetMapping
    public ApiResponse<List<FavoriteResponse>> getMyFavorites(
            @AuthenticationPrincipal User user) {
        return ApiResponse.ok(favoriteService.getMyFavorites(user));
    }

    /**
     * GET /api/favorites/ids
     * 내가 찜한 음식점 ID 집합 (홈 화면 하트 표시용)
     */
    @GetMapping("/ids")
    public ApiResponse<Set<Long>> getMyFavoriteIds(
            @AuthenticationPrincipal User user) {
        return ApiResponse.ok(favoriteService.getMyFavoriteIds(user));
    }
}