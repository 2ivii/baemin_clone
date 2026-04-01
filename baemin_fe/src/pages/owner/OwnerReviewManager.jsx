import { useState, useEffect } from "react";
import { IoArrowBack, IoChatbubbleOutline, IoClose, IoCheckmarkCircle, IoTrashOutline } from "react-icons/io5";
import { reviewApi } from "../../api/reviewApi";

const OwnerReviewManager = ({ restaurant, onBack }) => {
    const [reviews, setReviews]       = useState([]);
    const [loading, setLoading]       = useState(true);
    const [replyTarget, setReplyTarget] = useState(null); // 답글 달 리뷰 id
    const [replyText, setReplyText]   = useState("");
    const [saving, setSaving]         = useState(false);
    const [savedId, setSavedId]       = useState(null);
    const [replyErr, setReplyErr]     = useState(null);
    const [deletingReplyId, setDeletingReplyId] = useState(null);

    useEffect(() => { fetchReviews(); }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await reviewApi.getByRestaurant(restaurant.id);
            setReviews(data || []);
        } catch {
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    const openReply = (review) => {
        setReplyTarget(review.id);
        setReplyText(review.ownerReply || "");
        setReplyErr(null);
    };

    const handleSaveReply = async () => {
        if (!replyText.trim()) { setReplyErr("답글을 입력해주세요."); return; }
        setSaving(true); setReplyErr(null);
        try {
            await reviewApi.reply(replyTarget, replyText.trim());
            setSavedId(replyTarget);
            setTimeout(() => {
                setSavedId(null);
                setReplyTarget(null);
                fetchReviews();
            }, 1000);
        } catch (e) {
            setReplyErr(e.message || "저장에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteReply = async (reviewId) => {
        if (!window.confirm("답글을 삭제하시겠어요?")) return;
        setDeletingReplyId(reviewId);
        try {
            await reviewApi.deleteReply(reviewId);
            setReviews((prev) => prev.map((r) => r.id === reviewId ? { ...r, ownerReply: null } : r));
        } catch (e) {
            alert(e.message || "삭제에 실패했습니다.");
        } finally {
            setDeletingReplyId(null);
        }
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : "0.0";
    const noReplyCount = reviews.filter((r) => !r.ownerReply).length;

    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        const diff = Date.now() - d.getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return "오늘";
        if (days === 1) return "어제";
        if (days < 7) return `${days}일 전`;
        return `${d.getMonth()+1}월 ${d.getDate()}일`;
    };

    const AVATARS = ["🐱","🐶","🐼","🦊","🐨","🐸","🐯","🦁","🐙","🐧"];
    const getAvatar = (name) => AVATARS[(name?.charCodeAt(0) ?? 0) % AVATARS.length];

    const s = {
        page:    { background:"#F7F4F0", minHeight:"100vh", paddingBottom:80 },
        topBar:  { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:"#fff", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, zIndex:10 },
        back:    { background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:4 },
        topTitle:{ fontSize:17, fontWeight:800, color:"#1A1A1A" },
        ph:      { width:30 },
        storeInfo: { background:"linear-gradient(135deg,#FF6B35,#FF8C42)", padding:"12px 16px", display:"flex", alignItems:"center", gap:10 },
        storeEmoji: { width:40, height:40, borderRadius:10, background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 },
        storeName:  { fontSize:14, fontWeight:800, color:"#fff" },
        storeSub:   { fontSize:11, color:"rgba(255,255,255,0.8)" },
        statsRow:  { display:"flex", background:"#fff", borderBottom:"8px solid #f5f5f5" },
        statBox:   { flex:1, padding:"16px", textAlign:"center", borderRight:"1px solid #f0f0f0" },
        statNum:   { fontSize:22, fontWeight:900, color:"#1A1A1A" },
        statLabel: { fontSize:11, color:"#888", marginTop:2 },
        reviewCard:{ background:"#fff", margin:"8px 12px", borderRadius:14, padding:"16px", boxShadow:"0 2px 6px rgba(0,0,0,0.05)" },
        reviewHeader: { display:"flex", alignItems:"center", gap:10, marginBottom:8 },
        avatar:    { width:36, height:36, borderRadius:"50%", background:"#f0f0f0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 },
        uname:     { fontSize:14, fontWeight:800, color:"#1A1A1A" },
        udate:     { fontSize:11, color:"#aaa" },
        stars:     { color:"#FFB800", fontSize:13, letterSpacing:1, marginBottom:6 },
        content:   { fontSize:13, color:"#444", lineHeight:1.6, marginBottom:10 },
        noContent: { fontSize:12, color:"#bbb", fontStyle:"italic", marginBottom:10 },
        ownerReplyBox: { background:"#FFF5F0", borderRadius:10, padding:"12px 14px", marginBottom:10, border:"1px solid #FFE0D0" },
        ownerReplyLabel: { fontSize:11, fontWeight:800, color:"#FF6B35", marginBottom:4, display:"flex", alignItems:"center", justifyContent:"space-between" },
        ownerReplyText:  { fontSize:13, color:"#555", lineHeight:1.5 },
        replyActions: { display:"flex", gap:8 },
        replyBtn:  (hasReply) => ({ flex:1, padding:"9px 0", background: hasReply ? "#FFF0EB" : "linear-gradient(135deg,#FF6B35,#FF8C42)", color: hasReply ? "#FF6B35" : "#fff", border:"none", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }),
        deleteReplyBtn: { padding:"9px 14px", background:"#FFF0F0", color:"#FF3B30", border:"none", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:3 },
        loading: { textAlign:"center", padding:"60px 0", color:"#aaa", fontSize:14 },
        empty:   { textAlign:"center", padding:"60px 0" },
        // 답글 sheet
        overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:200 },
        sheet:   { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderRadius:"20px 20px 0 0", padding:"0 0 32px", zIndex:201, maxHeight:"70vh" },
        sheetTop:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 16px 12px", borderBottom:"1px solid #f0f0f0" },
        sheetTitle:{ fontSize:16, fontWeight:800, color:"#1A1A1A" },
        closeBtn:{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center" },
        sheetBody:{ padding:"16px" },
        textarea:{ width:"100%", minHeight:100, padding:"13px", borderRadius:12, border:"1.5px solid #e8e8e8", fontSize:14, color:"#1A1A1A", outline:"none", resize:"vertical", fontFamily:"inherit", background:"#fafafa", boxSizing:"border-box" },
        charCount:{ textAlign:"right", fontSize:11, color:"#aaa", marginTop:4, marginBottom:12 },
        errBox:  { background:"#FFF0F0", borderRadius:9, padding:"10px", fontSize:12, color:"#FF3B30", marginBottom:12 },
        saveBtn: (d) => ({ width:"100%", padding:"15px", background:d?"#aaa":"linear-gradient(135deg,#FF6B35,#FF8C42)", color:"#fff", border:"none", borderRadius:13, fontSize:15, fontWeight:800, cursor:d?"not-allowed":"pointer" }),
        savedMsg:{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"20px", fontSize:15, fontWeight:700, color:"#FF6B35" },
    };

    return (
        <>
            <div style={s.page}>
                <div style={s.topBar}>
                    <button style={s.back} onClick={onBack}><IoArrowBack size={22} color="#1A1A1A" /></button>
                    <span style={s.topTitle}>리뷰 관리</span>
                    <div style={s.ph} />
                </div>

                <div style={s.storeInfo}>
                    <div style={s.storeEmoji}>{restaurant.imgEmoji || "🍽️"}</div>
                    <div>
                        <div style={s.storeName}>{restaurant.name}</div>
                        <div style={s.storeSub}>리뷰 {reviews.length}개 · 평균 ⭐ {avgRating}</div>
                    </div>
                </div>

                <div style={s.statsRow}>
                    {[
                        { num: reviews.length, label: "전체 리뷰" },
                        { num: avgRating,      label: "평균 별점" },
                        { num: noReplyCount,   label: "미답글" },
                    ].map((st, i) => (
                        <div key={i} style={{ ...s.statBox, borderRight: i < 2 ? "1px solid #f0f0f0" : "none" }}>
                            <div style={s.statNum}>{st.num}</div>
                            <div style={s.statLabel}>{st.label}</div>
                        </div>
                    ))}
                </div>

                {loading ? (
                    <div style={s.loading}>리뷰를 불러오는 중...</div>
                ) : reviews.length === 0 ? (
                    <div style={s.empty}>
                        <div style={{ fontSize:48 }}>💬</div>
                        <div style={{ fontSize:15, fontWeight:700, color:"#999", marginTop:8 }}>아직 리뷰가 없어요</div>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} style={s.reviewCard}>
                            <div style={s.reviewHeader}>
                                <div style={s.avatar}>{getAvatar(review.userName)}</div>
                                <div style={{ flex:1 }}>
                                    <div style={s.uname}>{review.userName}</div>
                                    <div style={s.udate}>{formatDate(review.createdAt)}</div>
                                </div>
                                {!review.ownerReply && (
                                    <span style={{ fontSize:10, fontWeight:700, color:"#FF3B30", background:"#FFF0F0", padding:"2px 8px", borderRadius:20 }}>
                                        미답글
                                    </span>
                                )}
                            </div>

                            <div style={s.stars}>
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                            </div>

                            {review.content ? (
                                <div style={s.content}>{review.content}</div>
                            ) : (
                                <div style={s.noContent}>내용 없음</div>
                            )}

                            {review.ownerReply && (
                                <div style={s.ownerReplyBox}>
                                    <div style={s.ownerReplyLabel}>
                                        <span>🏪 사장님 답글</span>
                                    </div>
                                    <div style={s.ownerReplyText}>{review.ownerReply}</div>
                                </div>
                            )}

                            <div style={s.replyActions}>
                                <button style={s.replyBtn(!!review.ownerReply)} onClick={() => openReply(review)}>
                                    <IoChatbubbleOutline size={13} />
                                    {review.ownerReply ? "답글 수정" : "답글 달기"}
                                </button>
                                {review.ownerReply && (
                                    <button
                                        style={s.deleteReplyBtn}
                                        onClick={() => handleDeleteReply(review.id)}
                                        disabled={deletingReplyId === review.id}
                                    >
                                        <IoTrashOutline size={13} />
                                        {deletingReplyId === review.id ? "삭제 중..." : "답글 삭제"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 답글 작성 시트 */}
            {replyTarget && (
                <>
                    <div style={s.overlay} onClick={() => setReplyTarget(null)} />
                    <div style={s.sheet}>
                        <div style={s.sheetTop}>
                            <span style={s.sheetTitle}>사장님 답글</span>
                            <button style={s.closeBtn} onClick={() => setReplyTarget(null)}>
                                <IoClose size={22} color="#555" />
                            </button>
                        </div>
                        <div style={s.sheetBody}>
                            {savedId === replyTarget ? (
                                <div style={s.savedMsg}>
                                    <IoCheckmarkCircle size={24} color="#FF6B35" /> 답글이 등록되었어요!
                                </div>
                            ) : (
                                <>
                                    <textarea
                                        style={s.textarea}
                                        placeholder="고객님께 따뜻한 답글을 남겨보세요 😊"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value.slice(0, 1000))}
                                        autoFocus
                                    />
                                    <div style={s.charCount}>{replyText.length} / 1000</div>
                                    {replyErr && <div style={s.errBox}>{replyErr}</div>}
                                    <button style={s.saveBtn(saving)} onClick={handleSaveReply} disabled={saving}>
                                        {saving ? "저장 중..." : "답글 등록하기"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OwnerReviewManager;