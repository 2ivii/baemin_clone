package com.baemin.api.repository;

import com.baemin.api.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByCategoryNameAndIsOpenTrue(String categoryName);
    List<Restaurant> findByIsOpenTrueOrderByRatingDesc();

    /** 사장님 본인 가게 목록 */
    List<Restaurant> findByOwnerIdOrderByCreatedAtDesc(Long ownerId);

    /** 사장님 본인 가게 단건 (소유권 확인용) */
    Optional<Restaurant> findByIdAndOwnerId(Long id, Long ownerId);
}