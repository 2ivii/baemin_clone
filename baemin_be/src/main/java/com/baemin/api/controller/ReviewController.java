package com.baemin.api.controller;

import com.baemin.api.dto.request.OwnerReplyRequest;
import com.baemin.api.dto.request.ReviewRequest;
import com.baemin.api.dto.request.ReviewUpdateRequest;
import com.baemin.api.dto.response.ApiResponse;
import com.baemin.api.dto.response.ReviewResponse;
import com.baemin.api.entity.User;
import com.baemin.api.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    /**
     * GET /api/restaurants/{restaurantId}/reviews
     * 음식점 리뷰 목록 (공개)
     */
    @GetMapping("/api/restaurants/{restaurantId}/reviews")
    public ApiResponse<List<ReviewResponse>> getRestaurantReviews(@PathVariable Long restaurantId) {
        return ApiResponse.ok(reviewService.getRestaurantReviews(restaurantId));
    }

    /**
     * GET /api/reviews/my
     * 내가 쓴 리뷰 목록
     */
    @GetMapping("/api/reviews/my")
    public ApiResponse<List<ReviewResponse>> getMyReviews(@AuthenticationPrincipal User user) {
        return ApiResponse.ok(reviewService.getMyReviews(user));
    }

    /**
     * POST /api/reviews
     * 리뷰 작성
     */
    @PostMapping("/api/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ReviewResponse> createReview(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ReviewRequest req) {
        return ApiResponse.ok("리뷰가 등록되었습니다.", reviewService.createReview(user, req));
    }

    /**
     * PUT /api/reviews/{reviewId}
     * 리뷰 수정
     */
    @PutMapping("/api/reviews/{reviewId}")
    public ApiResponse<ReviewResponse> updateReview(
            @AuthenticationPrincipal User user,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewUpdateRequest req) {
        return ApiResponse.ok("리뷰가 수정되었습니다.", reviewService.updateReview(user, reviewId, req));
    }

    /**
     * DELETE /api/reviews/{reviewId}
     * 리뷰 삭제
     */
    @DeleteMapping("/api/reviews/{reviewId}")
    public ApiResponse<Void> deleteReview(
            @AuthenticationPrincipal User user,
            @PathVariable Long reviewId) {
        reviewService.deleteReview(user, reviewId);
        return ApiResponse.ok("리뷰가 삭제되었습니다.", null);
    }

    /**
     * POST /api/reviews/{reviewId}/reply
     * 사장님 답글 등록/수정
     */
    @PostMapping("/api/reviews/{reviewId}/reply")
    public ApiResponse<ReviewResponse> replyToReview(
            @AuthenticationPrincipal User user,
            @PathVariable Long reviewId,
            @Valid @RequestBody OwnerReplyRequest req) {
        return ApiResponse.ok("답글이 등록되었습니다.", reviewService.replyToReview(user, reviewId, req));
    }

    /**
     * DELETE /api/reviews/{reviewId}/reply
     * 사장님 답글 삭제
     */
    @DeleteMapping("/api/reviews/{reviewId}/reply")
    public ApiResponse<ReviewResponse> deleteReply(
            @AuthenticationPrincipal User user,
            @PathVariable Long reviewId) {
        return ApiResponse.ok("답글이 삭제되었습니다.", reviewService.deleteReply(user, reviewId));
    }
}