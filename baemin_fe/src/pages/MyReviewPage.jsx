import { useState } from "react";

const myReviews = [
    {
        id: 1,
        storeName: "육대장 일산대화점",
        rating: 5,
        date: "지난 주",
        deliveryType: "알뜰배달",
        text: null,
        orderedItems: ["옛날전통육개장(밥포함)"],
        photoEmoji: null,
        photoBg: null,
        edited: false,
    },
    {
        id: 2,
        storeName: "배떡 로제떡볶이 운정동패점",
        rating: 5,
        date: "지난 주",
        deliveryType: "한집배달",
        text: "배떡 맛있어용",
        orderedItems: ["로제 떡볶이", "야채튀김2개"],
        photoEmoji: null,
        photoBg: null,
        edited: true,
    },
];

const MyReviewPage = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState("delivery");

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
        topTitle: { fontSize: 17, fontWeight: 800, color: "#1A1A1A" },
        placeholder: { width: 36 },
        tabs: {
            display: "flex",
            borderBottom: "1px solid #eee",
        },
        tab: (active) => ({
            flex: 1,
            textAlign: "center",
            padding: "14px 0",
            fontSize: 15,
            fontWeight: active ? 800 : 500,
            color: active ? "#1A1A1A" : "#aaa",
            borderBottom: active ? "2px solid #1A1A1A" : "2px solid transparent",
            cursor: "pointer",
            background: "none",
            border: "none",
        }),
        summarySection: {
            padding: "20px 16px 16px",
            borderBottom: "8px solid #f5f5f5",
        },
        totalCount: {
            fontSize: 22,
            fontWeight: 900,
            color: "#1A1A1A",
            marginBottom: 4,
        },
        guideRow: {
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 13,
            color: "#888",
            cursor: "pointer",
        },
        guideIcon: {
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "1px solid #aaa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            color: "#888",
        },
        reviewList: {},
        reviewItem: {
            padding: "20px 16px",
            borderBottom: "8px solid #f5f5f5",
        },
        storeRow: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
        },
        storeName: {
            fontSize: 15,
            fontWeight: 800,
            color: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
        },
        storeArrow: { fontSize: 13, color: "#888" },
        deleteBtn: {
            background: "none",
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: "5px 12px",
            fontSize: 13,
            color: "#555",
            cursor: "pointer",
            fontWeight: 600,
        },
        starRow: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 10,
        },
        stars: { color: "#FFB800", fontSize: 15, letterSpacing: 1 },
        reviewMeta: { fontSize: 12, color: "#aaa" },
        editedBadge: {
            fontSize: 11,
            color: "#29D3C4",
            fontWeight: 700,
            marginLeft: 4,
        },
        reviewText: {
            fontSize: 14,
            color: "#333",
            lineHeight: 1.7,
            marginBottom: 12,
            whiteSpace: "pre-line",
        },
        photoWrap: {
            marginBottom: 12,
        },
        photoBox: (bg) => ({
            width: 80,
            height: 80,
            borderRadius: 8,
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
        }),
        itemTagsRow: {
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
        },
        itemTag: {
            border: "1px solid #ddd",
            borderRadius: 20,
            padding: "5px 12px",
            fontSize: 13,
            color: "#444",
            background: "#fff",
        },
    };

    return (
        <div style={s.page}>
            {/* Top Bar */}
            <div style={s.topBar}>
                <button style={s.backBtn} onClick={onBack}>←</button>
                <span style={s.topTitle}>리뷰관리</span>
                <div style={s.placeholder} />
            </div>

            {/* Tabs */}
            <div style={s.tabs}>
                <button style={s.tab(activeTab === "delivery")} onClick={() => setActiveTab("delivery")}>
                    배달·픽업
                </button>
                <button style={s.tab(activeTab === "shopping")} onClick={() => setActiveTab("shopping")}>
                    장보기·쇼핑
                </button>
            </div>

            {/* Summary */}
            <div style={s.summarySection}>
                <div style={s.totalCount}>내가 쓴 총 리뷰 {myReviews.length}개</div>
                <div style={s.guideRow}>
                    리뷰 수정 안내
                    <div style={s.guideIcon}>?</div>
                </div>
            </div>

            {/* Review List */}
            <div style={s.reviewList}>
                {activeTab === "delivery" ? (
                    myReviews.map((review) => (
                        <div key={review.id} style={s.reviewItem}>
                            {/* Store name + delete */}
                            <div style={s.storeRow}>
                                <div style={s.storeName}>
                                    {review.storeName}
                                    <span style={s.storeArrow}>›</span>
                                </div>
                                <button style={s.deleteBtn}>삭제</button>
                            </div>

                            {/* Stars + meta */}
                            <div style={s.starRow}>
                                <span style={s.stars}>{"★".repeat(review.rating)}</span>
                                <span style={s.reviewMeta}>
                  {review.date}, {review.deliveryType}
                </span>
                                {review.edited && (
                                    <span style={s.editedBadge}>수정됨</span>
                                )}
                            </div>

                            {/* Photo */}
                            {review.photoEmoji && (
                                <div style={s.photoWrap}>
                                    <div style={s.photoBox(review.photoBg)}>{review.photoEmoji}</div>
                                </div>
                            )}

                            {/* Text */}
                            {review.text && (
                                <div style={s.reviewText}>{review.text}</div>
                            )}

                            {/* Ordered items */}
                            <div style={s.itemTagsRow}>
                                {review.orderedItems.map((item) => (
                                    <span key={item} style={s.itemTag}>{item}</span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#bbb", fontSize: 14 }}>
                        장보기·쇼핑 리뷰가 없어요
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviewPage;