import { useState } from "react";

const MenuDetailModal = ({ menu, restaurant, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  const totalPrice = menu.price * qty;

  const s = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 300,
    },
    sheet: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: "#fff",
      borderRadius: "0",
      zIndex: 400,
      maxHeight: "92vh",
      overflowY: "auto",
      paddingBottom: 0,
    },
    heroArea: {
      position: "relative",
      height: 260,
      background: "linear-gradient(135deg, #f5d98b, #e8c46a)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 120,
    },
    backBtn: {
      position: "absolute",
      top: 14,
      left: 16,
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "rgba(0,0,0,0.3)",
      border: "none",
      color: "#fff",
      fontSize: 18,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    topRightBtns: {
      position: "absolute",
      top: 14,
      right: 16,
      display: "flex",
      gap: 8,
    },
    topBtn: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "rgba(0,0,0,0.3)",
      border: "none",
      color: "#fff",
      fontSize: 16,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    body: { padding: "20px 16px 0" },
    tagRow: { display: "flex", gap: 6, marginBottom: 8 },
    tag: (color) => ({
      fontSize: 11,
      fontWeight: 700,
      color,
      background: `${color}18`,
      padding: "3px 8px",
      borderRadius: 5,
    }),
    menuName: {
      fontSize: 24,
      fontWeight: 900,
      color: "#1A1A1A",
      marginBottom: 8,
    },
    descBlock: {
      fontSize: 14,
      color: "#555",
      lineHeight: 1.6,
      marginBottom: 4,
    },
    descToggle: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      border: "1px solid #ddd",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 14,
      marginLeft: "auto",
      marginTop: 4,
    },
    reviewLink: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "14px 0",
      borderBottom: "1px solid #eee",
      fontSize: 14,
      fontWeight: 700,
      color: "#1A1A1A",
      cursor: "pointer",
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 0",
      borderBottom: "1px solid #eee",
    },
    priceLabel: { fontSize: 15, fontWeight: 700, color: "#1A1A1A" },
    priceValue: { fontSize: 18, fontWeight: 900, color: "#1A1A1A" },
    qtyRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 0",
      borderBottom: "1px solid #eee",
    },
    qtyLabel: { fontSize: 15, fontWeight: 700, color: "#1A1A1A" },
    qtyControl: {
      display: "flex",
      alignItems: "center",
      gap: 0,
      border: "1px solid #ddd",
      borderRadius: 8,
      overflow: "hidden",
    },
    qtyBtn: {
      width: 40,
      height: 40,
      border: "none",
      background: "#fff",
      fontSize: 20,
      cursor: "pointer",
      color: "#1A1A1A",
      fontWeight: 300,
    },
    qtyNum: {
      width: 48,
      textAlign: "center",
      fontSize: 16,
      fontWeight: 700,
      borderLeft: "1px solid #ddd",
      borderRight: "1px solid #ddd",
      lineHeight: "40px",
    },
    notice: {
      background: "#F8F8F8",
      padding: "16px",
      marginTop: 8,
    },
    noticeText: { fontSize: 12, color: "#888", lineHeight: 1.6, marginBottom: 8 },
    noticeLink: {
      fontSize: 12,
      fontWeight: 700,
      color: "#555",
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    bottomBar: {
      position: "sticky",
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#fff",
      padding: "12px 16px 20px",
      borderTop: "1px solid #f0f0f0",
    },
    minOrder: {
      fontSize: 11,
      color: "#888",
    },
    minOrderVal: {
      fontSize: 12,
      fontWeight: 700,
      color: "#555",
    },
    addBtn: {
      flex: 1,
      marginLeft: 16,
      padding: "16px",
      background: "#29D3C4",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 800,
      cursor: "pointer",
    },
  };

  return (
    <>
      <div style={s.overlay} onClick={onClose} />
      <div style={s.sheet}>
        {/* Hero */}
        <div style={{ ...s.heroArea, background: menu.bg }}>
          <span>{menu.emoji}</span>
          <button style={s.backBtn} onClick={onClose}>←</button>
          <div style={s.topRightBtns}>
            <button style={s.topBtn}>⬆</button>
            <button style={s.topBtn}>🔍</button>
            <button style={s.topBtn}>🛒</button>
          </div>
        </div>

        {/* Body */}
        <div style={s.body}>
          <div style={s.tagRow}>
            <span style={s.tag("#888")}>{menu.rank}</span>
            {menu.ownerPick && <span style={s.tag("#29D3C4")}>사장님 추천</span>}
          </div>
          <div style={s.menuName}>{menu.name}</div>
          <div style={s.descBlock}>{menu.desc}</div>
          <button style={s.descToggle}>⌄</button>

          <div style={s.reviewLink}>
            메뉴 리뷰 {menu.reviews}개 <span style={{ marginLeft: "auto" }}>›</span>
          </div>

          <div style={s.priceRow}>
            <span style={s.priceLabel}>가격</span>
            <span style={s.priceValue}>{menu.price.toLocaleString()}원</span>
          </div>

          <div style={s.qtyRow}>
            <span style={s.qtyLabel}>수량</span>
            <div style={s.qtyControl}>
              <button style={s.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span style={s.qtyNum}>{qty}개</span>
              <button style={s.qtyBtn} onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
        </div>

        <div style={s.notice}>
          <div style={s.noticeText}>
            메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있어요.{"\n"}
            메뉴 정보와 관련된 의견이 있다면 의견 보내기 버튼을 눌러주세요.
          </div>
          <div style={s.noticeLink}>의견 보내기 ›</div>
        </div>

        <div style={s.bottomBar}>
          <div>
            <div style={s.minOrder}>배달 최소주문금액</div>
            <div style={s.minOrderVal}>{restaurant.minOrder}</div>
          </div>
          <button
            style={s.addBtn}
            onClick={() => onAddToCart({ id: menu.id, name: menu.name, price: menu.price }, qty)}
          >
            {totalPrice.toLocaleString()}원 담기
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuDetailModal;
