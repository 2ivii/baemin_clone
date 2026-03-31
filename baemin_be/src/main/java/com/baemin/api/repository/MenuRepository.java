package com.baemin.api.repository;

import com.baemin.api.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByRestaurantIdAndIsAvailableTrueOrderByPopularityRankAsc(Long restaurantId);
    List<Menu> findByRestaurantIdOrderByPopularityRankAsc(Long restaurantId);

    Optional<Menu> findByIdAndRestaurantId(Long id, Long restaurantId);
}