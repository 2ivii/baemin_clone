package com.baemin.api.service;

import com.baemin.api.dto.response.CategoryResponse;
import com.baemin.api.dto.response.MenuResponse;
import com.baemin.api.dto.response.RestaurantResponse;
import com.baemin.api.exception.NotFoundException;
import com.baemin.api.repository.CategoryRepository;
import com.baemin.api.repository.MenuRepository;
import com.baemin.api.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;
    private final CategoryRepository categoryRepository;

    /** 음식점 목록 (카테고리 필터) */
    @Transactional(readOnly = true)
    public List<RestaurantResponse> getRestaurants(String categoryName) {
        var list = (categoryName != null && !categoryName.isBlank())
                ? restaurantRepository.findByCategoryNameAndIsOpenTrue(categoryName)
                : restaurantRepository.findByIsOpenTrueOrderByRatingDesc();
        return list.stream().map(RestaurantResponse::from).collect(Collectors.toList());
    }

    /** 음식점 단건 상세 */
    @Transactional(readOnly = true)
    public RestaurantResponse getRestaurant(Long id) {
        return RestaurantResponse.from(
                restaurantRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("음식점을 찾을 수 없습니다."))
        );
    }

    /** 메뉴 목록 */
    @Transactional(readOnly = true)
    public List<MenuResponse> getMenus(Long restaurantId) {
        restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new NotFoundException("음식점을 찾을 수 없습니다."));
        return menuRepository
                .findByRestaurantIdAndIsAvailableTrueOrderByPopularityRankAsc(restaurantId)
                .stream().map(MenuResponse::from).collect(Collectors.toList());
    }

    /** 카테고리 목록 */
    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories() {
        return categoryRepository.findAll()
                .stream().map(CategoryResponse::from).collect(Collectors.toList());
    }
}