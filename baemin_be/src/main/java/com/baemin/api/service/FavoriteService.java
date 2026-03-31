package com.baemin.api.service;

import com.baemin.api.dto.response.FavoriteResponse;
import com.baemin.api.entity.Favorite;
import com.baemin.api.entity.Restaurant;
import com.baemin.api.entity.User;
import com.baemin.api.exception.NotFoundException;
import com.baemin.api.repository.FavoriteRepository;
import com.baemin.api.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final RestaurantRepository restaurantRepository;

    /** 찜 토글 (없으면 추가, 있으면 삭제) */
    @Transactional
    public Map<String, Object> toggle(User user, Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new NotFoundException("음식점을 찾을 수 없습니다."));

        boolean exists = favoriteRepository.existsByUserIdAndRestaurantId(user.getId(), restaurantId);
        if (exists) {
            favoriteRepository.deleteByUserIdAndRestaurantId(user.getId(), restaurantId);
            return Map.of("liked", false, "restaurantId", restaurantId);
        } else {
            Favorite fav = Favorite.builder()
                    .user(user)
                    .restaurant(restaurant)
                    .build();
            favoriteRepository.save(fav);
            return Map.of("liked", true, "restaurantId", restaurantId);
        }
    }

    /** 내 찜 목록 조회 */
    @Transactional(readOnly = true)
    public List<FavoriteResponse> getMyFavorites(User user) {
        return favoriteRepository.findByUserIdWithRestaurant(user.getId())
                .stream()
                .map(FavoriteResponse::from)
                .collect(Collectors.toList());
    }

    /** 내가 찜한 음식점 ID 집합 조회 (홈 화면 하트 표시용) */
    @Transactional(readOnly = true)
    public Set<Long> getMyFavoriteIds(User user) {
        return favoriteRepository.findRestaurantIdsByUserId(user.getId());
    }
}