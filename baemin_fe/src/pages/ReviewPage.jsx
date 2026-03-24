import { useState } from "react";

const reviewsData = [
    {
        id: 1,
        username: "까다로운허니",
        reviewCount: 927,
        avgRating: 5.0,
        rating: 5,
        date: "지난 주",
        deliveryType: "가게배달",
        text: "오늘도 든든하게 먹으라고 사장님의 단골서비스가 딱~~!  배부르고 맛있는한끼했네요^^",
        photo: null,
        photoEmoji: "🍱",
        photoBg: "#FFF3CD",
        ownerReply: "항상 찾아주셔서 감사합니다! 다음에도 맛있게 드세요 😊",
    },
    {
        id: 2,
        username: "맛집탐험가",
        reviewCount: 234,
        avgRating: 4.8,
        rating: 5,
        date: "2일 전",
        deliveryType: "가게배달",
        text: "양도 푸짐하고 추운날인데 먹기좋게 따뜻하게 왔네요^^ 떡도 쫄깃하니 맛있네요...",
        photo: null,
        photoEmoji: "🍱",
        photoBg: "#FFF3CD",
        ownerReply: null,
    },
    {
        id: 3,
        username: "배달고수",
        reviewCount: 56,
        avgRating: 4.5,
        rating: 5,
        date: "3일 전",
        deliveryType: "가게배달",
        text: "배달도 빠르고 맛있어요! 떡볶이가 특히 맛있었어요 재주문 의사 100%",
        photo: null,
        photoEmoji: "🌶️",
        photoBg: "#FFE4E4",
        ownerReply: "감사합니다! 또 방문해 주세요 🙏",
    },
    {
        id: 4,
        username: "홍길동123",
        reviewCount: 12,
        avgRating: 4.9,
        rating: 4,
        date: "1주 전",
        deliveryType: "가게배달",
        text: "순대가 신선하고 맛있어요. 다음에 또 시켜먹을 것 같아요. 포장도 깔끔하게 잘 해주셨어요.",
        photo: null,
        photoEmoji: "🍢",
        photoBg: "#E3F2FD",
        ownerReply: null,
    },
    {
        id: 5,
        username: "야식러버",
        reviewCount: 389,
        avgRating: 4.7,
        rating: 5,
        date: "1주 전",
        deliveryType: "가게배달",
        text: "야식으로 시켰는데 완전 맛있어요! 꼬지어묵이 특히 최고였고 세트 구성이 알차네요 👍",
        photo: null,
        photoEmoji: "🍢",
        photoBg: "#E3F2FD",
        ownerReply: "늦은 시간에도 찾아주셔서 감사해요! 😄",
    },
];

const ratingDistribution = [
    { score: 5, count: 54, pct: 90 },
    { score: 4, count: 4, pct: 7 },
    { score: 3, count: 1, pct: 2 },
    { score: 2, count: 0, pct: 0 },
    { score: 1, count: 5, pct: 8 },
];

const ReviewPage = ({ restaurant, onBack }) => {
    const [sortBy, setSortBy] = useState("추천순");
    const [photoOnly, setPhotoOnly] = useState(false);
    const [expandedOwnerReply, setExpandedOwnerReply] = useState({});

    const totalReviews = ratingDistribution.reduce((s, r) => s + r.count, 0);
    const ownerReplies = reviewsData.filter((r) => r.ownerReply).length;

    const s = {
        page: { background: "#fff", minHeight: "100vh", paddingBottom: 40 },
        topBar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 100,
        },
        backBtn: {
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#1A1A1A",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        topTitle: {
            fontSize: 17,
            fontWeight: 800,
            color: "#1A1A1A",
        },
        cartBtn: {
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#1A1A1A",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        ratingSection: {
            display: "flex",
            alignItems: "center",
            padding: "20px 20px",
            gap: 24,
            borderBottom: "8px solid #f5f5f5",
        },
        ratingLeft: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 80,
        },
        bigRating: {
            fontSize: 52,
            fontWeight: 900,
            color: "#1A1A1A",
            lineHeight: 1,
            marginBottom: 6,
        },
        bigStars: {
            color: "#FFB800",
            fontSize: 18,
            letterSpacing: 2,
        },
        ratingBars: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 5,
        },
        barRow: {
            display: "flex",
            alignItems: "center",
            gap: 8,
        },
        barLabel: {
            fontSize: 12,
            color: "#555",
            width: 24,
            textAlign: "right",
            flexShrink: 0,
        },
        barTrack: {
            flex: 1,
            height: 6,
            background: "#eee",
            borderRadius: 3,
            overflow: "hidden",
        },
        barFill: (pct, isTop) => ({
            height: "100%",
            width: `${pct}%`,
            background: isTop ? "#FFB800" : "#ddd",
            borderRadius: 3,
        }),
        barCount: {
            fontSize: 12,
            color: "#888",
            width: 24,
            textAlign: "left",
            flexShrink: 0,
        },
        ownerNoticeSection: {
            padding: "16px 20px",
            borderBottom: "8px solid #f5f5f5",
        },
        ownerNoticeHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
        },
        ownerNoticeTitle: {
            fontSize: 14,
            fontWeight: 800,
            color: "#1A1A1A",
        },
        ownerNoticeDate: {
            fontSize: 12,
            color: "#aaa",
        },
        ownerNoticeText: {
            fontSize: 13,
            color: "#444",
            lineHeight: 1.6,
        },
        noticeBadge: {
            display: "inline-block",
            background: "#FFB800",
            color: "#fff",
            fontSize: 11,
            fontWeight: 800,
            padding: "2px 8px",
            borderRadius: 4,
            marginRight: 6,
        },
        reviewCountSection: {
            padding: "14px 20px 10px",
            borderBottom: "1px solid #f0f0f0",
        },
        reviewCountRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
        },
        reviewCountText: {
            fontSize: 15,
            fontWeight: 900,
            color: "#1A1A1A",
        },
        reviewPolicyBtn: {
            fontSize: 12,
            color: "#888",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 2,
        },
        ownerReplyCount: {
            fontSize: 13,
            color: "#555",
        },
        verifiedBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "#E6FAF8",
            color: "#29D3C4",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
            marginTop: 8,
        },
        controlRow: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px 10px",
            borderBottom: "1px solid #f0f0f0",
        },
        sortBtn: {
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "7px 14px",
            borderRadius: 20,
            border: "1px solid #ddd",
            background: "#fff",
            fontSize: 13,
            fontWeight: 700,
            color: "#1A1A1A",
            cursor: "pointer",
        },
        photoBtn: (active) => ({
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "7px 14px",
            borderRadius: 20,
            border: "none",
            background: active ? "#1A1A1A" : "#1A1A1A",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
        }),
        reviewList: { padding: "0" },
        reviewItem: {
            padding: "16px 20px",
            borderBottom: "1px solid #f5f5f5",
        },
        reviewHeader: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
        },
        avatar: {
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
        },
        userInfo: { flex: 1 },
        usernameRow: {
            display: "flex",
            alignItems: "center",
            gap: 6,
        },
        username: {
            fontSize: 14,
            fontWeight: 800,
            color: "#1A1A1A",
        },
        userArrow: {
            fontSize: 12,
            color: "#aaa",
        },
        userMeta: {
            fontSize: 11,
            color: "#aaa",
            marginTop: 1,
        },
        reportBtn: {
            fontSize: 11,
            color: "#aaa",
            background: "none",
            border: "none",
            cursor: "pointer",
        },
        starRow: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
        },
        stars: {
            color: "#FFB800",
            fontSize: 13,
            letterSpacing: 1,
        },
        reviewMeta: {
            fontSize: 12,
            color: "#aaa",
        },
        reviewText: {
            fontSize: 14,
            color: "#333",
            lineHeight: 1.6,
            marginBottom: 10,
        },
        reviewPhoto: (bg) => ({
            width: 80,
            height: 80,
            borderRadius: 8,
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            marginBottom: 10,
        }),
        ownerReplyBox: {
            background: "#f8f8f8",
            borderRadius: 8,
            padding: "12px 14px",
            marginTop: 4,
        },
        ownerReplyLabel: {
            fontSize: 12,
            fontWeight: 800,
            color: "#555",
            marginBottom: 4,
        },
        ownerReplyText: {
            fontSize: 13,
            color: "#555",
            lineHeight: 1.5,
        },
    };

    return (
        <div style={s.page}>
            {/* Top Bar */}
            <div style={s.topBar}>
                <button style={s.backBtn} onClick={onBack}>←</button>
                <span style={s.topTitle}>리뷰</span>
                <button style={s.cartBtn}>🛒</button>
            </div>

            {/* Rating Summary */}
            <div style={s.ratingSection}>
                <div style={s.ratingLeft}>
                    <div style={s.bigRating}>4.9</div>
                    <div style={s.bigStars}>★★★★★</div>
                </div>
                <div style={s.ratingBars}>
                    {ratingDistribution.map((r) => (
                        <div key={r.score} style={s.barRow}>
                            <span style={s.barLabel}>{r.score}점</span>
                            <div style={s.barTrack}>
                                <div style={s.barFill(r.pct, r.score === 5)} />
                            </div>
                            <span style={s.barCount}>{r.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Owner Notice */}
            <div style={s.ownerNoticeSection}>
                <div style={s.ownerNoticeHeader}>
                    <span style={s.ownerNoticeTitle}>사장님 공지</span>
                    <span style={s.ownerNoticeDate}>2025년 07월 15일</span>
                </div>
                <div style={s.ownerNoticeText}>
                    <span style={s.noticeBadge}>공지</span>
                    🚃오픈기념 [[Triple Event]]🚃{"\n"}
                    [[배달팁 무료+바로사용 쿠폰+리뷰이벤트 증정 中]{"\n\n"}
                    🟨밥구정 출구안내🟨{"\n"}
                    [EXIT①-세트] 찌개세트는 언제나 든든하게
                </div>
            </div>

            {/* Review Count */}
            <div style={s.reviewCountSection}>
                <div style={s.reviewCountRow}>
                    <span style={s.reviewCountText}>최근 리뷰 {totalReviews}개</span>
                    <button style={s.reviewPolicyBtn}>리뷰 노출 정책 ›</button>
                </div>
                <div style={s.ownerReplyCount}>사장님댓글 {ownerReplies}개</div>
                <div style={s.verifiedBadge}>
                    <span>✓</span> 모든 리뷰는 검토 후 보여드려요
                </div>
            </div>

            {/* Controls */}
            <div style={s.controlRow}>
                <button style={s.sortBtn}>
                    <span>↕</span> {sortBy} ⌄
                </button>
                <button style={s.photoBtn(photoOnly)} onClick={() => setPhotoOnly(!photoOnly)}>
                    📷 사진 리뷰만 보기
                </button>
            </div>

            {/* Review List */}
            <div style={s.reviewList}>
                {reviewsData.map((review) => (
                    <div key={review.id} style={s.reviewItem}>
                        <div style={s.reviewHeader}>
                            <div style={s.avatar}>🐱</div>
                            <div style={s.userInfo}>
                                <div style={s.usernameRow}>
                                    <span style={s.username}>{review.username}</span>
                                    <span style={s.userArrow}>›</span>
                                </div>
                                <div style={s.userMeta}>
                                    리뷰 {review.reviewCount} · 평균별점 {review.avgRating.toFixed(1)}
                                </div>
                            </div>
                            <button style={s.reportBtn}>신고하기</button>
                        </div>

                        <div style={s.starRow}>
                            <span style={s.stars}>{"★".repeat(review.rating)}</span>
                            <span style={s.reviewMeta}>{review.date}, {review.deliveryType}</span>
                        </div>

                        {review.photo ? (
                            <img
                                src={review.photo}
                                alt="리뷰 사진"
                                style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover", marginBottom: 10 }}
                            />
                        ) : (
                            <div style={s.reviewPhoto(review.photoBg)}>{review.photoEmoji}</div>
                        )}

                        <div style={s.reviewText}>{review.text}</div>

                        {review.ownerReply && (
                            <div style={s.ownerReplyBox}>
                                <div style={s.ownerReplyLabel}>사장님 댓글</div>
                                <div style={s.ownerReplyText}>{review.ownerReply}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;