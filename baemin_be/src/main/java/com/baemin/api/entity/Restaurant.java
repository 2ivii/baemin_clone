package com.baemin.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "restaurants")
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Restaurant {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    /** 사장님 유저 ID (null 이면 관리자가 직접 등록한 가게) */
    @Column(name = "owner_id")
    private Long ownerId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "img_emoji", length = 10)
    private String imgEmoji;

    @Column(name = "bg_color", length = 20)
    private String bgColor;

    @Column
    @Builder.Default
    private double rating = 0.0;

    @Column(name = "review_count")
    @Builder.Default
    private int reviewCount = 0;

    @Column(name = "delivery_time", length = 30)
    private String deliveryTime;

    @Column(name = "min_order")
    @Builder.Default
    private int minOrder = 0;

    @Column(name = "delivery_fee")
    @Builder.Default
    private int deliveryFee = 0;

    @Column(name = "owner_notice", columnDefinition = "TEXT")
    private String ownerNotice;

    @Column(name = "is_open")
    @Builder.Default
    private boolean isOpen = true;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}