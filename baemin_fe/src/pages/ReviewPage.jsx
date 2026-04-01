import { useState, useEffect } from "react";
import { reviewApi } from "../api/reviewApi";

const ReviewPage = ({ restaurant, onBack }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy]   = useState("최신순");
    const [photoOnly, setPhotoOnly] = useState(false);

    useEffect(() => {
        if (!restaurant?.id) { setLoading(false); return; }
        reviewApi.getByRestaurant(restaurant.id)
            .then((data) => setReviews(data || []))
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, [restaurant?.id]);

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0
        ? (reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
        : "0.0";
    const ownerReplyCount = reviews.filter((r) => r.ownerReply).length;

    // 별점 분포
    const ratingDist = [5,4,3,2,1].map((score) => {
        const count = reviews.filter((r) => r.rating === score).length;
        return { score, count, pct: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0 };
    });

    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        const diff = Date.now() - d.getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return "오늘";
        if (days === 1) return "어제";
        if (days < 7) return `${days}일 전`;
        if (days < 14) return "지난 주";
        return `${d.getMonth()+1}월 ${d.getDate()}일`;
    };

    const s = {
        page: { background: "#fff", minHeight: "100vh", paddingBottom: 40 },
        topBar: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff", zIndex:100 },
        backBtn: { background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#1A1A1A", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center" },
        topTitle: { fontSize:17, fontWeight:800, color:"#1A1A1A" },
        cartBtn: { background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#1A1A1A", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center" },
        ratingSection: { display:"flex", alignItems:"center", padding:"20px", gap:24, borderBottom:"8px solid #f5f5f5" },
        ratingLeft: { display:"flex", flexDirection:"column", alignItems:"center", minWidth:80 },
        bigRating: { fontSize:52, fontWeight:900, color:"#1A1A1A", lineHeight:1, marginBottom:6 },
        bigStars: { color:"#FFB800", fontSize:18, letterSpacing:2 },
        ratingBars: { flex:1, display:"flex", flexDirection:"column", gap:5 },
        barRow: { display:"flex", alignItems:"center", gap:8 },
        barLabel: { fontSize:12, color:"#555", width:24, textAlign:"right", flexShrink:0 },
        barTrack: { flex:1, height:6, background:"#eee", borderRadius:3, overflow:"hidden" },
        barFill: (pct, isTop) => ({ height:"100%", width:`${pct}%`, background: isTop ? "#FFB800" : "#ddd", borderRadius:3 }),
        barCount: { fontSize:12, color:"#888", width:24, textAlign:"left", flexShrink:0 },
        reviewCountSection: { padding:"14px 20px 10px", borderBottom:"1px solid #f0f0f0" },
        reviewCountRow: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 },
        reviewCountText: { fontSize:15, fontWeight:900, color:"#1A1A1A" },
        ownerReplyCount: { fontSize:13, color:"#555" },
        controlRow: { display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderBottom:"1px solid #f0f0f0" },
        sortBtn: { display:"flex", alignItems:"center", gap:4, padding:"7px 14px", borderRadius:20, border:"1px solid #ddd", background:"#fff", fontSize:13, fontWeight:700, color:"#1A1A1A", cursor:"pointer" },
        photoBtn: (active) => ({ display:"flex", alignItems:"center", gap:4, padding:"7px 14px", borderRadius:20, border:"none", background:"#1A1A1A", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", opacity: active ? 1 : 0.5 }),
        reviewItem: { padding:"16px 20px", borderBottom:"1px solid #f5f5f5" },
        reviewHeader: { display:"flex", alignItems:"center", gap:10, marginBottom:8 },
        avatar: { width:36, height:36, borderRadius:"50%", background:"#f0f0f0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 },
        userInfo: { flex:1 },
        usernameRow: { display:"flex", alignItems:"center", gap:6 },
        username: { fontSize:14, fontWeight:800, color:"#1A1A1A" },
        editedBadge: { fontSize:10, color:"#29D3C4", fontWeight:700, background:"#E6FAF8", padding:"1px 6px", borderRadius:4 },
        userMeta: { fontSize:11, color:"#aaa", marginTop:1 },
        starRow: { display:"flex", alignItems:"center", gap:6, marginBottom:8 },
        stars: { color:"#FFB800", fontSize:13, letterSpacing:1 },
        reviewMeta: { fontSize:12, color:"#aaa" },
        reviewText: { fontSize:14, color:"#333", lineHeight:1.6, marginBottom:10 },
        ownerReplyBox: { background:"#f8f8f8", borderRadius:8, padding:"12px 14px", marginTop:4 },
        ownerReplyLabel: { fontSize:12, fontWeight:800, color:"#555", marginBottom:4, display:"flex", alignItems:"center", gap:4 },
        ownerReplyLabelBadge: { background:"#FF6B35", color:"#fff", fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:4 },
        ownerReplyText: { fontSize:13, color:"#555", lineHeight:1.5 },
        noReview: { textAlign:"center", padding:"60px 0", color:"#bbb" },
        loading:  { textAlign:"center", padding:"40px 0", color:"#aaa", fontSize:14 },
    };

    const AVATARS = ["🐱","🐶","🐼","🦊","🐨","🐸","🐯","🦁","🐙","🐧"];
    const getAvatar = (name) => AVATARS[(name?.charCodeAt(0) ?? 0) % AVATARS.length];

    return (
        <div style={s.page}>
            <div style={s.topBar}>
                <button style={s.backBtn} onClick={onBack}>←</button>
                <span style={s.topTitle}>리뷰</span>
                <button style={s.cartBtn}>🛒</button>
            </div>

            {/* 별점 요약 */}
            <div style={s.ratingSection}>
                <div style={s.ratingLeft}>
                    <div style={s.bigRating}>{avgRating}</div>
                    <div style={s.bigStars}>
                        {"★".repeat(Math.round(Number(avgRating)))}{"☆".repeat(5 - Math.round(Number(avgRating)))}
                    </div>
                </div>
                <div style={s.ratingBars}>
                    {ratingDist.map((r) => (
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

            {/* 리뷰 수 */}
            <div style={s.reviewCountSection}>
                <div style={s.reviewCountRow}>
                    <span style={s.reviewCountText}>최근 리뷰 {totalReviews}개</span>
                    <button style={{ fontSize:12, color:"#888", background:"none", border:"none", cursor:"pointer" }}>리뷰 노출 정책 ›</button>
                </div>
                <div style={s.ownerReplyCount}>사장님댓글 {ownerReplyCount}개</div>
            </div>

            {/* 정렬 / 필터 */}
            <div style={s.controlRow}>
                <button style={s.sortBtn}>↕ {sortBy} ⌄</button>
                <button style={s.photoBtn(photoOnly)} onClick={() => setPhotoOnly(!photoOnly)}>
                    📷 사진 리뷰만 보기
                </button>
            </div>

            {/* 리뷰 목록 */}
            {loading ? (
                <div style={s.loading}>리뷰를 불러오는 중...</div>
            ) : reviews.length === 0 ? (
                <div style={s.noReview}>
                    <div style={{ fontSize:48 }}>💬</div>
                    <div style={{ fontSize:15, fontWeight:700, color:"#999", marginTop:8 }}>아직 리뷰가 없어요</div>
                    <div style={{ fontSize:13, color:"#bbb", marginTop:4 }}>첫 번째 리뷰를 남겨보세요!</div>
                </div>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} style={s.reviewItem}>
                        <div style={s.reviewHeader}>
                            <div style={s.avatar}>{getAvatar(review.userName)}</div>
                            <div style={s.userInfo}>
                                <div style={s.usernameRow}>
                                    <span style={s.username}>{review.userName}</span>
                                    {review.edited && <span style={s.editedBadge}>수정됨</span>}
                                </div>
                            </div>
                            <button style={{ fontSize:11, color:"#aaa", background:"none", border:"none", cursor:"pointer" }}>신고하기</button>
                        </div>

                        <div style={s.starRow}>
                            <span style={s.stars}>
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </span>
                            <span style={s.reviewMeta}>{formatDate(review.createdAt)}</span>
                        </div>

                        {review.content && (
                            <div style={s.reviewText}>{review.content}</div>
                        )}

                        {review.ownerReply && (
                            <div style={s.ownerReplyBox}>
                                <div style={s.ownerReplyLabel}>
                                    <span style={s.ownerReplyLabelBadge}>사장님</span>
                                    댓글
                                </div>
                                <div style={s.ownerReplyText}>{review.ownerReply}</div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewPage;