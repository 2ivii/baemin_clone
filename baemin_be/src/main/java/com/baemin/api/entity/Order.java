package com.baemin.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    // 주소 스냅샷 (주소 삭제돼도 이력 보존)
    @Column(name = "delivery_address", nullable = false, length = 300)
    private String deliveryAddress;

    @Column(name = "delivery_detail", length = 200)
    private String deliveryDetail;

    @Column(name = "delivery_note", length = 200)
    private String deliveryNote;

    @Column(name = "total_price", nullable = false)
    private int totalPrice;

    @Column(name = "delivery_fee", nullable = false)
    @Builder.Default
    private int deliveryFee = 0;

    @Column(name = "discount_amount", nullable = false)
    @Builder.Default
    private int discountAmount = 0;

    @Column(name = "final_price", nullable = false)
    private int finalPrice;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "PENDING";

    @Column(name = "payment_method", length = 30)
    private String paymentMethod;

    @Column(name = "coupon_id")
    private Long couponId;

    @CreatedDate
    @Column(name = "ordered_at", updatable = false)
    private LocalDateTime orderedAt;

    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> orderItems = new ArrayList<>();
}