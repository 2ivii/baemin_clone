package com.baemin.api.repository;

import com.baemin.api.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByCategoryNameAndIsOpenTrue(String categoryName);
    List<Restaurant> findByIsOpenTrueOrderByRatingDesc();
}
