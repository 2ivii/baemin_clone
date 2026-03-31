package com.baemin.api.repository;

import com.baemin.api.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserIdAndRestaurantId(Long userId, Long restaurantId);

    boolean existsByUserIdAndRestaurantId(Long userId, Long restaurantId);

    @Query("SELECT f.restaurant.id FROM Favorite f WHERE f.user.id = :userId")
    Set<Long> findRestaurantIdsByUserId(Long userId);

    @Query("SELECT f FROM Favorite f JOIN FETCH f.restaurant r LEFT JOIN FETCH r.category WHERE f.user.id = :userId ORDER BY f.createdAt DESC")
    List<Favorite> findByUserIdWithRestaurant(Long userId);

    void deleteByUserIdAndRestaurantId(Long userId, Long restaurantId);
}