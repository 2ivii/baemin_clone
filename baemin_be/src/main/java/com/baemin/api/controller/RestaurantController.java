package com.baemin.api.controller;

import com.baemin.api.dto.response.ApiResponse;
import com.baemin.api.dto.response.CategoryResponse;
import com.baemin.api.dto.response.MenuResponse;
import com.baemin.api.dto.response.RestaurantResponse;
import com.baemin.api.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    /**
     * GET /api/restaurants?category=치킨
     * 음식점 목록 (카테고리 필터 선택)
     */
    @GetMapping("/api/restaurants")
    public ApiResponse<List<RestaurantResponse>> getRestaurants(
            @RequestParam(required = false) String category) {
        return ApiResponse.ok(restaurantService.getRestaurants(category));
    }

    /**
     * GET /api/restaurants/{id}
     * 음식점 단건 상세
     */
    @GetMapping("/api/restaurants/{id}")
    public ApiResponse<RestaurantResponse> getRestaurant(@PathVariable Long id) {
        return ApiResponse.ok(restaurantService.getRestaurant(id));
    }

    /**
     * GET /api/restaurants/{id}/menus
     * 음식점 메뉴 목록
     */
    @GetMapping("/api/restaurants/{id}/menus")
    public ApiResponse<List<MenuResponse>> getMenus(@PathVariable Long id) {
        return ApiResponse.ok(restaurantService.getMenus(id));
    }

    /**
     * GET /api/categories
     * 카테고리 목록
     */
    @GetMapping("/api/categories")
    public ApiResponse<List<CategoryResponse>> getCategories() {
        return ApiResponse.ok(restaurantService.getCategories());
    }
}