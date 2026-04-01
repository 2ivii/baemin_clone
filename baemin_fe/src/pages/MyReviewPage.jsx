import { useState, useEffect } from "react";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { reviewApi } from "../api/reviewApi";
import WriteReviewModal from "../components/WriteReviewModal";

const MyReviewPage = ({ onBack }) => {
    const [activeTab, setActiveTab]   = useState("delivery");
    const [reviews, setReviews]       = useState([]);
    const [loading, setLoading]       = useState(true);
    const [editTarget, setEditTarget] = useState(null); // 수정할 리뷰
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => { fetchReviews(); }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await reviewApi.getMy();
            setReviews(data || []);
        } catch {
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm("리뷰를 삭제하시겠어요?")) return;
        setDeletingId(reviewId);
        try {
            await reviewApi.delete(reviewId);
            setReviews((prev) => prev.filter((r) => r.id !== reviewId));
        } catch (e) {
            alert(e.message || "삭제에 실패했습니다.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEditSaved = () => {
        setEditTarget(null);
        fetchReviews();
    };

    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        const diff = Date.now() - d.getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return "오늘";
        if (days === 1) return "어제";
        if (days < 7) return `${days}일 전`;
        if (days < 14) return "지난 주";
        return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}`;
    };

    const s = {
        page: { background: "#fff", minHeight: "100vh", paddingBottom: 40 },
        topBar: {
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 16px", borderBottom: "1px solid #f0f0f0",
            position: "sticky", top: 0, background: "#fff", zIndex: 100,
        },
        backBtn: { background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#1A1A1A", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" },
        topTitle: { fontSize: 17, fontWeight: 800, color: "#1A1A1A" },
        placeholder: { width: 36 },
        tabs: { display: "flex", borderBottom: "1px solid #eee" },
        tab: (active) => ({
            flex: 1, textAlign: "center", padding: "14px 0", fontSize: 15,
            fontWeight: active ? 800 : 500, color: active ? "#1A1A1A" : "#aaa",
            borderBottom: active ? "2px solid #1A1A1A" : "2px solid transparent",
            cursor: "pointer", background: "none", border: "none",
        }),
        summarySection: { padding: "20px 16px 16px", borderBottom: "8px solid #f5f5f5" },
        totalCount: { fontSize: 22, fontWeight: 900, color: "#1A1A1A", marginBottom: 4 },
        guideRow: { display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#888", cursor: "pointer" },
        reviewList: {},
        reviewItem: { padding: "20px 16px", borderBottom: "8px solid #f5f5f5" },
        storeRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
        storeName: { fontSize: 15, fontWeight: 800, color: "#1A1A1A", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" },
        storeArrow: { fontSize: 13, color: "#888" },
        btnGroup:   { display: "flex", gap: 6 },
        editBtn:    { background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "5px 12px", fontSize: 13, color: "#555", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 },
        deleteBtn: (d) => ({ background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "5px 12px", fontSize: 13, color: d ? "#ccc" : "#FF3B30", cursor: d ? "not-allowed" : "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }),
        starRow: { display: "flex", alignItems: "center", gap: 6, marginBottom: 10 },
        stars: { color: "#FFB800", fontSize: 15, letterSpacing: 1 },
        reviewMeta: { fontSize: 12, color: "#aaa" },
        editedBadge: { fontSize: 11, color: "#29D3C4", fontWeight: 700, marginLeft: 4 },
        reviewText: { fontSize: 14, color: "#333", lineHeight: 1.7, marginBottom: 12, whiteSpace: "pre-line" },
        ownerReplyBox: { background: "#f8f8f8", borderRadius: 8, padding: "12px 14px", marginBottom: 12 },
        ownerReplyLabel: { fontSize: 12, fontWeight: 800, color: "#555", marginBottom: 4 },
        ownerReplyText:  { fontSize: 13, color: "#555", lineHeight: 1.5 },
        noReviewText:    { fontSize: 13, color: "#aaa", fontStyle: "italic", marginBottom: 12 },
        loading: { textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 14 },
        empty:   { textAlign: "center", padding: "60px 0", color: "#bbb" },
    };

    return (
        <div style={s.page}>
            <div style={s.topBar}>
                <button style={s.backBtn} onClick={onBack}>←</button>
                <span style={s.topTitle}>리뷰관리</span>
                <div style={s.placeholder} />
            </div>

            <div style={s.tabs}>
                <button style={s.tab(activeTab === "delivery")} onClick={() => setActiveTab("delivery")}>배달·픽업</button>
                <button style={s.tab(activeTab === "shopping")} onClick={() => setActiveTab("shopping")}>장보기·쇼핑</button>
            </div>

            <div style={s.summarySection}>
                <div style={s.totalCount}>내가 쓴 총 리뷰 {reviews.length}개</div>
                <div style={s.guideRow}>
                    리뷰 수정 안내
                    <div style={{ width:16, height:16, borderRadius:"50%", border:"1px solid #aaa", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#888" }}>?</div>
                </div>
            </div>

            {activeTab === "delivery" ? (
                loading ? (
                    <div style={s.loading}>리뷰를 불러오는 중...</div>
                ) : reviews.length === 0 ? (
                    <div style={s.empty}>
                        <div style={{ fontSize:48, marginBottom:12 }}>✏️</div>
                        <div style={{ fontSize:15, fontWeight:700, color:"#999" }}>작성한 리뷰가 없어요</div>
                        <div style={{ fontSize:13, color:"#bbb", marginTop:4 }}>주문 내역에서 리뷰를 작성해보세요!</div>
                    </div>
                ) : (
                    <div style={s.reviewList}>
                        {reviews.map((review) => (
                            <div key={review.id} style={s.reviewItem}>
                                <div style={s.storeRow}>
                                    <div style={s.storeName}>
                                        {review.restaurantName}
                                        <span style={s.storeArrow}>›</span>
                                    </div>
                                    <div style={s.btnGroup}>
                                        <button style={s.editBtn} onClick={() => setEditTarget(review)}>
                                            <IoPencilOutline size={12} /> 수정
                                        </button>
                                        <button
                                            style={s.deleteBtn(deletingId === review.id)}
                                            onClick={() => handleDelete(review.id)}
                                            disabled={deletingId === review.id}
                                        >
                                            <IoTrashOutline size={12} />
                                            {deletingId === review.id ? "삭제 중..." : "삭제"}
                                        </button>
                                    </div>
                                </div>

                                <div style={s.starRow}>
                                    <span style={s.stars}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                                    <span style={s.reviewMeta}>{formatDate(review.createdAt)}</span>
                                    {review.edited && <span style={s.editedBadge}>수정됨</span>}
                                </div>

                                {review.content ? (
                                    <div style={s.reviewText}>{review.content}</div>
                                ) : (
                                    <div style={s.noReviewText}>작성한 내용이 없어요</div>
                                )}

                                {review.ownerReply && (
                                    <div style={s.ownerReplyBox}>
                                        <div style={s.ownerReplyLabel}>사장님 댓글</div>
                                        <div style={s.ownerReplyText}>{review.ownerReply}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#bbb", fontSize: 14 }}>
                    장보기·쇼핑 리뷰가 없어요
                </div>
            )}

            {/* 리뷰 수정 모달 */}
            {editTarget && (
                <WriteReviewModal
                    existingReview={editTarget}
                    order={{ restaurantName: editTarget.restaurantName, restaurantEmoji: "🍽️" }}
                    onClose={() => setEditTarget(null)}
                    onSaved={handleEditSaved}
                />
            )}
        </div>
    );
};

export default MyReviewPage;