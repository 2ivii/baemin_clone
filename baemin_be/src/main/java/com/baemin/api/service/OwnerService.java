package com.baemin.api.service;

import com.baemin.api.dto.request.OwnerMenuRequest;
import com.baemin.api.dto.request.OwnerRestaurantRequest;
import com.baemin.api.dto.response.MenuResponse;
import com.baemin.api.dto.response.RestaurantResponse;
import com.baemin.api.entity.Category;
import com.baemin.api.entity.Menu;
import com.baemin.api.entity.Restaurant;
import com.baemin.api.entity.User;
import com.baemin.api.exception.BadRequestException;
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
public class OwnerService {

    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;
    private final CategoryRepository categoryRepository;

    // ── 가게 ──────────────────────────────────────────────────

    /** 내 가게 목록 */
    @Transactional(readOnly = true)
    public List<RestaurantResponse> getMyRestaurants(User owner) {
        return restaurantRepository.findByOwnerIdOrderByCreatedAtDesc(owner.getId())
                .stream().map(RestaurantResponse::from).collect(Collectors.toList());
    }

    /** 가게 등록 */
    @Transactional
    public RestaurantResponse createRestaurant(User owner, OwnerRestaurantRequest req) {
        Category category = categoryRepository.findByName(req.getCategoryName())
                .orElseThrow(() -> new NotFoundException("카테고리를 찾을 수 없습니다: " + req.getCategoryName()));

        Restaurant restaurant = Restaurant.builder()
                .ownerId(owner.getId())
                .category(category)
                .name(req.getName())
                .imgEmoji(req.getImgEmoji() != null ? req.getImgEmoji() : "🍽️")
                .bgColor(req.getBgColor() != null ? req.getBgColor() : "#F5F5F5")
                .deliveryTime(req.getDeliveryTime() != null ? req.getDeliveryTime() : "30~40분")
                .ownerNotice(req.getOwnerNotice())
                .minOrder(req.getMinOrder())
                .deliveryFee(req.getDeliveryFee())
                .isOpen(true)
                .build();

        return RestaurantResponse.from(restaurantRepository.save(restaurant));
    }

    /** 가게 수정 */
    @Transactional
    public RestaurantResponse updateRestaurant(User owner, Long restaurantId, OwnerRestaurantRequest req) {
        Restaurant restaurant = getOwnedRestaurant(owner, restaurantId);
        Category category = categoryRepository.findByName(req.getCategoryName())
                .orElseThrow(() -> new NotFoundException("카테고리를 찾을 수 없습니다: " + req.getCategoryName()));

        restaurant.setCategory(category);
        restaurant.setName(req.getName());
        if (req.getImgEmoji() != null) restaurant.setImgEmoji(req.getImgEmoji());
        if (req.getBgColor() != null) restaurant.setBgColor(req.getBgColor());
        if (req.getDeliveryTime() != null) restaurant.setDeliveryTime(req.getDeliveryTime());
        restaurant.setOwnerNotice(req.getOwnerNotice());
        restaurant.setMinOrder(req.getMinOrder());
        restaurant.setDeliveryFee(req.getDeliveryFee());

        return RestaurantResponse.from(restaurantRepository.save(restaurant));
    }

    /** 가게 영업 상태 토글 */
    @Transactional
    public RestaurantResponse toggleOpen(User owner, Long restaurantId) {
        Restaurant restaurant = getOwnedRestaurant(owner, restaurantId);
        restaurant.setOpen(!restaurant.isOpen());
        return RestaurantResponse.from(restaurantRepository.save(restaurant));
    }

    /** 가게 삭제 */
    @Transactional
    public void deleteRestaurant(User owner, Long restaurantId) {
        Restaurant restaurant = getOwnedRestaurant(owner, restaurantId);
        restaurantRepository.delete(restaurant);
    }

    // ── 메뉴 ──────────────────────────────────────────────────

    /** 가게 메뉴 전체 조회 (사장님용 - 비활성 포함) */
    @Transactional(readOnly = true)
    public List<MenuResponse> getMenus(User owner, Long restaurantId) {
        getOwnedRestaurant(owner, restaurantId); // 소유권 확인
        return menuRepository.findByRestaurantIdOrderByPopularityRankAsc(restaurantId)
                .stream().map(MenuResponse::from).collect(Collectors.toList());
    }

    /** 메뉴 등록 */
    @Transactional
    public MenuResponse createMenu(User owner, Long restaurantId, OwnerMenuRequest req) {
        Restaurant restaurant = getOwnedRestaurant(owner, restaurantId);

        Menu menu = Menu.builder()
                .restaurant(restaurant)
                .name(req.getName())
                .description(req.getDescription())
                .price(req.getPrice())
                .emoji(req.getEmoji() != null ? req.getEmoji() : "🍽️")
                .bgColor(req.getBgColor() != null ? req.getBgColor() : "#F5F5F5")
                .isOwnerPick(req.isOwnerPick())
                .popularityRank(req.getPopularityRank())
                .isAvailable(true)
                .build();

        return MenuResponse.from(menuRepository.save(menu));
    }

    /** 메뉴 수정 */
    @Transactional
    public MenuResponse updateMenu(User owner, Long restaurantId, Long menuId, OwnerMenuRequest req) {
        getOwnedRestaurant(owner, restaurantId);
        Menu menu = menuRepository.findByIdAndRestaurantId(menuId, restaurantId)
                .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다."));

        menu.setName(req.getName());
        menu.setDescription(req.getDescription());
        menu.setPrice(req.getPrice());
        if (req.getEmoji() != null) menu.setEmoji(req.getEmoji());
        if (req.getBgColor() != null) menu.setBgColor(req.getBgColor());
        menu.setOwnerPick(req.isOwnerPick());
        menu.setPopularityRank(req.getPopularityRank());

        return MenuResponse.from(menuRepository.save(menu));
    }

    /** 메뉴 활성/비활성 토글 */
    @Transactional
    public MenuResponse toggleMenuAvailable(User owner, Long restaurantId, Long menuId) {
        getOwnedRestaurant(owner, restaurantId);
        Menu menu = menuRepository.findByIdAndRestaurantId(menuId, restaurantId)
                .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다."));
        menu.setAvailable(!menu.isAvailable());
        return MenuResponse.from(menuRepository.save(menu));
    }

    /** 메뉴 삭제 */
    @Transactional
    public void deleteMenu(User owner, Long restaurantId, Long menuId) {
        getOwnedRestaurant(owner, restaurantId);
        Menu menu = menuRepository.findByIdAndRestaurantId(menuId, restaurantId)
                .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다."));
        menuRepository.delete(menu);
    }

    // ── private ───────────────────────────────────────────────

    private Restaurant getOwnedRestaurant(User owner, Long restaurantId) {
        return restaurantRepository.findByIdAndOwnerId(restaurantId, owner.getId())
                .orElseThrow(() -> new NotFoundException("가게를 찾을 수 없거나 권한이 없습니다."));
    }
}