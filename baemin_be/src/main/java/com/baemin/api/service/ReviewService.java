package com.baemin.api.service;

import com.baemin.api.dto.request.OwnerReplyRequest;
import com.baemin.api.dto.request.ReviewRequest;
import com.baemin.api.dto.request.ReviewUpdateRequest;
import com.baemin.api.dto.response.ReviewResponse;
import com.baemin.api.entity.Order;
import com.baemin.api.entity.Review;
import com.baemin.api.entity.User;
import com.baemin.api.exception.BadRequestException;
import com.baemin.api.exception.NotFoundException;
import com.baemin.api.exception.UnauthorizedException;
import com.baemin.api.repository.OrderRepository;
import com.baemin.api.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;

    /** 음식점 리뷰 목록 조회 (공개) */
    @Transactional(readOnly = true)
    public List<ReviewResponse> getRestaurantReviews(Long restaurantId) {
        return reviewRepository.findByRestaurantIdWithUser(restaurantId)
                .stream().map(ReviewResponse::from).collect(Collectors.toList());
    }

    /** 내가 쓴 리뷰 목록 */
    @Transactional(readOnly = true)
    public List<ReviewResponse> getMyReviews(User user) {
        return reviewRepository.findByUserIdWithRestaurant(user.getId())
                .stream().map(ReviewResponse::from).collect(Collectors.toList());
    }

    /** 리뷰 작성 */
    @Transactional
    public ReviewResponse createReview(User user, ReviewRequest req) {
        // 주문 조회 및 소유권 확인
        Order order = orderRepository.findByIdAndUserId(req.getOrderId(), user.getId())
                .orElseThrow(() -> new NotFoundException("주문 내역을 찾을 수 없습니다."));

        // 배달 완료 상태 확인 (DELIVERED 또는 CANCELLED 제외한 모든 상태 허용 → DELIVERED만)
        if (!"DELIVERED".equals(order.getStatus()) && !"PENDING".equals(order.getStatus())
                && !"ACCEPTED".equals(order.getStatus()) && !"DELIVERING".equals(order.getStatus())) {
            throw new BadRequestException("해당 주문에는 리뷰를 작성할 수 없습니다.");
        }

        // 이미 리뷰 존재 여부 확인
        if (reviewRepository.existsByOrderId(req.getOrderId())) {
            throw new BadRequestException("이미 리뷰를 작성한 주문입니다.");
        }

        Review review = Review.builder()
                .user(user)
                .restaurant(order.getRestaurant())
                .order(order)
                .rating(req.getRating())
                .content(req.getContent())
                .build();

        return ReviewResponse.from(reviewRepository.save(review));
    }

    /** 리뷰 수정 (작성자 본인) */
    @Transactional
    public ReviewResponse updateReview(User user, Long reviewId, ReviewUpdateRequest req) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, user.getId())
                .orElseThrow(() -> new NotFoundException("리뷰를 찾을 수 없습니다."));

        review.setRating(req.getRating());
        review.setContent(req.getContent());
        review.setEdited(true);

        return ReviewResponse.from(reviewRepository.save(review));
    }

    /** 리뷰 삭제 (작성자 본인) */
    @Transactional
    public void deleteReview(User user, Long reviewId) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, user.getId())
                .orElseThrow(() -> new NotFoundException("리뷰를 찾을 수 없습니다."));
        reviewRepository.delete(review);
    }

    /** 사장님 답글 등록/수정 */
    @Transactional
    public ReviewResponse replyToReview(User owner, Long reviewId, OwnerReplyRequest req) {
        if (!"OWNER".equals(owner.getRole())) {
            throw new UnauthorizedException("사장님 계정만 답글을 달 수 있습니다.");
        }

        Review review = reviewRepository.findByIdAndRestaurantOwnerId(reviewId, owner.getId())
                .orElseThrow(() -> new NotFoundException("리뷰를 찾을 수 없거나 권한이 없습니다."));

        review.setOwnerReply(req.getReply());
        review.setOwnerRepliedAt(LocalDateTime.now());

        return ReviewResponse.from(reviewRepository.save(review));
    }

    /** 사장님 답글 삭제 */
    @Transactional
    public ReviewResponse deleteReply(User owner, Long reviewId) {
        if (!"OWNER".equals(owner.getRole())) {
            throw new UnauthorizedException("사장님 계정만 답글을 삭제할 수 있습니다.");
        }

        Review review = reviewRepository.findByIdAndRestaurantOwnerId(reviewId, owner.getId())
                .orElseThrow(() -> new NotFoundException("리뷰를 찾을 수 없거나 권한이 없습니다."));

        review.setOwnerReply(null);
        review.setOwnerRepliedAt(null);

        return ReviewResponse.from(reviewRepository.save(review));
    }
}