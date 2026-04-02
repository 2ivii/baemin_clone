import { useState, useEffect } from "react";
import { IoReceiptOutline, IoRefreshOutline, IoCloseCircleOutline, IoChatbubbleOutline, IoCheckmarkCircle } from "react-icons/io5";
import { orderApi } from "../api/orderApi";
import { reviewApi } from "../api/reviewApi";
import WriteReviewModal from "../components/WriteReviewModal";

const STATUS_MAP = {
  PENDING:    { label: "주문접수",  color: "#FF9500" },
  ACCEPTED:   { label: "조리중",   color: "#007AFF" },
  DELIVERING: { label: "배달중",   color: "#5856D6" },
  DELIVERED:  { label: "배달완료", color: "#29D3C4" },
  CANCELLED:  { label: "취소됨",   color: "#999"    },
};

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}`;
};

const OrderPage = () => {
  const [orders, setOrders]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [reviewedOrderIds, setReviewedOrderIds] = useState(new Set());
  const [reviewTarget, setReviewTarget] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderApi.getMyOrders(0, 20);
      const orderList = res && Array.isArray(res.content) ? res.content : (Array.isArray(res) ? res : []);
      setOrders(orderList);

      try {
        const myReviews = await reviewApi.getMy();
        const ids = new Set((myReviews || []).map((r) => r.orderId));
        setReviewedOrderIds(ids);
      } catch {
        setReviewedOrderIds(new Set());
      }
    } catch (e) {
      if (e.message?.includes("403")) {
        setError("주문 내역을 조회할 권한이 없습니다.");
      } else {
        setError(e.message || "주문 내역을 불러오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("주문을 취소하시겠어요?")) return;
    setCancellingId(id);
    try {
      await orderApi.cancel(id);
      setOrders((prev) =>
          prev.map((o) => o.id === id ? { ...o, status: "CANCELLED" } : o)
      );
    } catch (e) {
      alert(e.message || "취소에 실패했습니다.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleReviewSaved = () => {
    setReviewTarget(null);
    fetchOrders();
  };

  // CANCELLED가 아닌 모든 주문에 리뷰 버튼 노출 (백엔드가 상태별로 검증)
  const canWriteReview = (order) =>
      order.status !== "CANCELLED" && !reviewedOrderIds.has(order.id);

  const st = {
    container:  { padding: "16px" },
    heading:    { fontSize: 20, fontWeight: 900, color: "#1A1A1A", marginBottom: 16 },
    card:       { background: "#fff", borderRadius: 16, padding: "16px", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" },
    cardTop:    { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
    storeEmoji: { fontSize: 32, lineHeight: 1 },
    storeMeta:  { flex: 1 },
    storeName:  { fontSize: 15, fontWeight: 800, color: "#1A1A1A" },
    badge: (c) => ({ fontSize: 11, fontWeight: 700, color: c, background: `${c}20`, padding: "3px 10px", borderRadius: 20 }),
    items:      { fontSize: 13, color: "#666", marginBottom: 6 },
    meta:       { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#999" },
    price:      { fontWeight: 700, color: "#1A1A1A" },

    // 리뷰 배너 (눈에 잘 띄는 CTA)
    reviewBanner: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "linear-gradient(135deg, #FFF3EE, #FFE8D8)",
      border: "1.5px solid #FFCBA8", borderRadius: 10,
      padding: "10px 14px", margin: "10px 0 0",
      cursor: "pointer",
    },
    reviewBannerLeft: { display: "flex", alignItems: "center", gap: 8 },
    reviewBannerIcon: {
      width: 32, height: 32, borderRadius: "50%",
      background: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center",
    },
    reviewBannerText: { fontSize: 13, fontWeight: 800, color: "#D4521A" },
    reviewBannerSub:  { fontSize: 11, color: "#E8894A", marginTop: 1 },
    reviewBannerArrow:{ fontSize: 16, color: "#FF6B35", fontWeight: 700 },

    btnRow:     { display: "flex", gap: 8, marginTop: 12 },
    reorderBtn: { flex: 1, padding: "10px", border: "2px solid #29D3C4", background: "none", color: "#29D3C4", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
    reviewBtn:  { flex: 1, padding: "10px", border: "2px solid #FF6B35", background: "none", color: "#FF6B35", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
    reviewedBadge: { flex: 1, padding: "10px", background: "#F5F5F5", color: "#aaa", borderRadius: 10, fontWeight: 700, fontSize: 13, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },
    cancelBtn: (d) => ({ flex: 1, padding: "10px", border: "2px solid #FF3B30", background: "none", color: d ? "#ccc" : "#FF3B30", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: d ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }),
    empty:      { textAlign: "center", padding: "60px 0", color: "#bbb", fontSize: 14 },
    loading:    { textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 14 },
    errWrap:    { textAlign: "center", padding: "40px 16px" },
    errMsg:     { color: "#FF3B30", fontSize: 14, marginBottom: 12 },
    retryBtn:   { padding: "10px 24px", background: "#29D3C4", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" },
  };

  if (loading) return <div style={st.loading}>주문 내역을 불러오는 중... 🛵</div>;

  if (error) return (
      <div style={st.errWrap}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>😢</div>
        <div style={st.errMsg}>{error}</div>
        <button style={st.retryBtn} onClick={fetchOrders}>다시 시도</button>
      </div>
  );

  return (
      <div style={st.container}>
        <div style={st.heading}>주문내역</div>

        {orders.length === 0 ? (
            <div style={st.empty}>
              <IoReceiptOutline size={48} color="#ddd" style={{ marginBottom: 12 }} />
              <div>아직 주문 내역이 없어요</div>
              <div style={{ fontSize: 12, marginTop: 6, color: "#ccc" }}>첫 주문을 해보세요! 🛵</div>
            </div>
        ) : (
            orders.map((order) => {
              const { label, color } = STATUS_MAP[order.status] ?? { label: order.status, color: "#888" };
              const itemSummary = order.items?.length > 0
                  ? `${order.items[0].menuName}${order.items.length > 1 ? ` 외 ${order.items.length - 1}개` : ""}`
                  : "주문 내역 없음";
              const reviewed = reviewedOrderIds.has(order.id);
              const showReviewCTA = canWriteReview(order);

              return (
                  <div key={order.id} style={st.card}>
                    <div style={st.cardTop}>
                      <span style={st.storeEmoji}>{order.restaurantEmoji || "🍽️"}</span>
                      <div style={st.storeMeta}>
                        <div style={st.storeName}>{order.restaurantName}</div>
                      </div>
                      <span style={st.badge(color)}>{label}</span>
                    </div>

                    <div style={st.items}>{itemSummary}</div>
                    <div style={st.meta}>
                      <span>{formatDate(order.orderedAt)}</span>
                      <span style={st.price}>{order.finalPrice?.toLocaleString()}원</span>
                    </div>

                    {/* 리뷰 CTA 배너 — 리뷰 작성 가능할 때만 노출 */}
                    {showReviewCTA && (
                        <div style={st.reviewBanner} onClick={() => setReviewTarget(order)}>
                          <div style={st.reviewBannerLeft}>
                            <div style={st.reviewBannerIcon}>
                              <IoChatbubbleOutline size={16} color="#fff" />
                            </div>
                            <div>
                              <div style={st.reviewBannerText}>리뷰를 작성해주세요!</div>
                              <div style={st.reviewBannerSub}>소중한 후기가 다른 분들께 도움이 돼요</div>
                            </div>
                          </div>
                          <span style={st.reviewBannerArrow}>›</span>
                        </div>
                    )}

                    <div style={st.btnRow}>
                      <button style={st.reorderBtn}>
                        <IoRefreshOutline size={15} /> 재주문하기
                      </button>

                      {/* 리뷰 버튼 영역 */}
                      {showReviewCTA ? (
                          <button style={st.reviewBtn} onClick={() => setReviewTarget(order)}>
                            <IoChatbubbleOutline size={15} /> 리뷰 달기
                          </button>
                      ) : reviewed ? (
                          <div style={st.reviewedBadge}>
                            <IoCheckmarkCircle size={15} color="#aaa" /> 리뷰 완료
                          </div>
                      ) : null}

                      {order.status === "PENDING" && (
                          <button
                              style={st.cancelBtn(cancellingId === order.id)}
                              onClick={() => handleCancel(order.id)}
                              disabled={cancellingId === order.id}
                          >
                            <IoCloseCircleOutline size={15} />
                            {cancellingId === order.id ? "취소 중..." : "주문취소"}
                          </button>
                      )}
                    </div>
                  </div>
              );
            })
        )}

        {/* 리뷰 작성 모달 */}
        {reviewTarget && (
            <WriteReviewModal
                order={reviewTarget}
                onClose={() => setReviewTarget(null)}
                onSaved={handleReviewSaved}
            />
        )}
      </div>
  );
};

export default OrderPage;