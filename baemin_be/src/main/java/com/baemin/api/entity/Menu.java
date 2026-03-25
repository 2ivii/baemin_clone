package com.baemin.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "menus")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Menu {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private int price;

    @Column(length = 10)
    private String emoji;

    @Column(name = "bg_color", length = 20)
    private String bgColor;

    @Column(name = "is_owner_pick")
    @Builder.Default
    private boolean isOwnerPick = false;

    @Column(name = "popularity_rank")
    private Integer popularityRank;

    @Column(name = "review_count")
    @Builder.Default
    private int reviewCount = 0;

    @Column(name = "is_available")
    @Builder.Default
    private boolean isAvailable = true;
}