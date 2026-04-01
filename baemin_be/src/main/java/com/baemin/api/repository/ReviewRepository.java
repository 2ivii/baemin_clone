package com.baemin.api.repository;

import com.baemin.api.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // 음식점의 리뷰 목록 (최신순)
    @Query("SELECT r FROM Review r JOIN FETCH r.user WHERE r.restaurant.id = :restaurantId ORDER BY r.createdAt DESC")
    List<Review> findByRestaurantIdWithUser(Long restaurantId);

    // 내가 쓴 리뷰 목록
    @Query("SELECT r FROM Review r JOIN FETCH r.restaurant WHERE r.user.id = :userId ORDER BY r.createdAt DESC")
    List<Review> findByUserIdWithRestaurant(Long userId);

    // 주문에 대한 리뷰 존재 여부
    boolean existsByOrderId(Long orderId);

    // 특정 유저의 특정 리뷰
    Optional<Review> findByIdAndUserId(Long id, Long userId);

    // 사장님 소유 음식점의 리뷰 단건 (답글 달기 용)
    @Query("SELECT r FROM Review r WHERE r.id = :reviewId AND r.restaurant.ownerId = :ownerId")
    Optional<Review> findByIdAndRestaurantOwnerId(Long reviewId, Long ownerId);
}