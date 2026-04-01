import { useState } from "react";
import { IoClose, IoStar, IoStarOutline, IoCheckmarkCircle } from "react-icons/io5";
import { reviewApi } from "../api/reviewApi";

const WriteReviewModal = ({ order, existingReview, onClose, onSaved }) => {
    const isEdit = !!existingReview;
    const [rating, setRating]   = useState(existingReview?.rating ?? 5);
    const [content, setContent] = useState(existingReview?.content ?? "");
    const [hover, setHover]     = useState(0);
    const [saving, setSaving]   = useState(false);
    const [done, setDone]       = useState(false);
    const [error, setError]     = useState(null);

    const handleSave = async () => {
        setSaving(true); setError(null);
        try {
            if (isEdit) {
                await reviewApi.update(existingReview.id, { rating, content });
            } else {
                await reviewApi.create({ orderId: order.id, rating, content });
            }
            setDone(true);
            setTimeout(() => { onSaved?.(); onClose(); }, 1200);
        } catch (e) {
            setError(e.message || "저장에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    const RATING_LABELS = { 1: "별로예요", 2: "그냥 그래요", 3: "보통이에요", 4: "맛있어요", 5: "최고예요!" };

    const s = {
        overlay:  { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:500, display:"flex", alignItems:"flex-end", justifyContent:"center" },
        sheet:    { width:"100%", maxWidth:430, background:"#fff", borderRadius:"20px 20px 0 0", maxHeight:"90vh", overflowY:"auto", paddingBottom:32 },
        topBar:   { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px 12px", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff", zIndex:1 },
        title:    { fontSize:17, fontWeight:800, color:"#1A1A1A" },
        closeBtn: { background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:4 },
        body:     { padding:"20px" },
        storeInfo:{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"#F8F8F8", borderRadius:12, marginBottom:20 },
        storeEmoji:{ fontSize:32 },
        storeName: { fontSize:14, fontWeight:800, color:"#1A1A1A" },
        storeDate: { fontSize:12, color:"#aaa", marginTop:2 },
        ratingSection: { textAlign:"center", marginBottom:20 },
        ratingLabel:   { fontSize:13, fontWeight:700, color:"#29D3C4", height:20, marginBottom:8 },
        stars:    { display:"flex", justifyContent:"center", gap:6, marginBottom:4 },
        star:     (filled) => ({ fontSize:36, cursor:"pointer", color: filled ? "#FFB800" : "#e0e0e0", transition:"color 0.1s, transform 0.1s" }),
        textareaWrap: { marginBottom:12 },
        textarea: { width:"100%", minHeight:120, padding:"14px", borderRadius:12, border:"1.5px solid #e8e8e8", fontSize:14, color:"#1A1A1A", outline:"none", resize:"vertical", fontFamily:"inherit", background:"#fafafa", boxSizing:"border-box", lineHeight:1.6 },
        charCount:{ textAlign:"right", fontSize:11, color:"#aaa", marginTop:4 },
        errBox:   { background:"#FFF0F0", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#FF3B30", marginBottom:12 },
        saveBtn:  (d) => ({ width:"100%", padding:"16px", background: d ? "#aaa" : "#29D3C4", color:"#fff", border:"none", borderRadius:14, fontSize:16, fontWeight:800, cursor: d ? "not-allowed" : "pointer" }),
        doneWrap: { textAlign:"center", padding:"20px 0" },
    };

    const displayRating = hover || rating;

    return (
        <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div style={s.sheet}>
                <div style={s.topBar}>
                    <span style={s.title}>{isEdit ? "리뷰 수정" : "리뷰 작성"}</span>
                    <button style={s.closeBtn} onClick={onClose}><IoClose size={22} color="#555" /></button>
                </div>
                <div style={s.body}>
                    {order && (
                        <div style={s.storeInfo}>
                            <span style={s.storeEmoji}>{order.restaurantEmoji || "🍽️"}</span>
                            <div>
                                <div style={s.storeName}>{order.restaurantName}</div>
                                <div style={s.storeDate}>
                                    {order.items?.[0]?.menuName}
                                    {order.items?.length > 1 ? ` 외 ${order.items.length - 1}개` : ""}
                                </div>
                            </div>
                        </div>
                    )}

                    {done ? (
                        <div style={s.doneWrap}>
                            <IoCheckmarkCircle size={56} color="#29D3C4" />
                            <div style={{ fontSize:16, fontWeight:800, color:"#1A1A1A", marginTop:12 }}>
                                {isEdit ? "리뷰가 수정되었어요!" : "리뷰가 등록되었어요!"}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* 별점 */}
                            <div style={s.ratingSection}>
                                <div style={s.ratingLabel}>{RATING_LABELS[displayRating]}</div>
                                <div style={s.stars}>
                                    {[1,2,3,4,5].map((n) => (
                                        <span
                                            key={n}
                                            style={s.star(n <= displayRating)}
                                            onClick={() => setRating(n)}
                                            onMouseEnter={() => setHover(n)}
                                            onMouseLeave={() => setHover(0)}
                                        >
                                            {n <= displayRating ? <IoStar size={36} color="#FFB800" /> : <IoStarOutline size={36} color="#e0e0e0" />}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 내용 */}
                            <div style={s.textareaWrap}>
                                <textarea
                                    style={s.textarea}
                                    placeholder="음식 맛, 배달 속도, 포장 상태 등을 자유롭게 작성해주세요 😊"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value.slice(0, 1000))}
                                />
                                <div style={s.charCount}>{content.length} / 1000</div>
                            </div>

                            {error && <div style={s.errBox}>{error}</div>}

                            <button style={s.saveBtn(saving)} onClick={handleSave} disabled={saving}>
                                {saving ? "저장 중..." : (isEdit ? "수정 완료" : "리뷰 등록하기")}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WriteReviewModal;