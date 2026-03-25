package com.baemin.api.repository;

import com.baemin.api.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o JOIN FETCH o.restaurant JOIN FETCH o.orderItems " +
            "WHERE o.user.id = :userId ORDER BY o.orderedAt DESC")
    Page<Order> findByUserIdWithDetails(Long userId, Pageable pageable);

    Optional<Order> findByIdAndUserId(Long id, Long userId);
}

