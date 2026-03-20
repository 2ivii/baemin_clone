const CartModal = ({ cart, onClose, onUpdateQty }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 150,
    },
    modal: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: "#fff",
      borderRadius: "20px 20px 0 0",
      padding: "20px 20px 100px",
      zIndex: 200,
      boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: { fontSize: 18, fontWeight: 800 },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: 24,
      cursor: "pointer",
      color: "#555",
    },
    storeName: {
      fontSize: 12,
      color: "#29D3C4",
      fontWeight: 700,
      marginBottom: 12,
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #f0f0f0",
    },
    itemName: { fontSize: 14, fontWeight: 600, color: "#1A1A1A" },
    itemPrice: { fontSize: 13, color: "#29D3C4", fontWeight: 700, marginTop: 2 },
    qtyRow: { display: "flex", alignItems: "center", gap: 10 },
    qtyBtn: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      border: "2px solid #29D3C4",
      background: "none",
      color: "#29D3C4",
      fontWeight: 800,
      fontSize: 16,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    total: {
      display: "flex",
      justifyContent: "space-between",
      padding: "14px 0",
      fontSize: 16,
      fontWeight: 800,
    },
    orderBtn: {
      width: "100%",
      padding: "16px",
      background: "#29D3C4",
      color: "#fff",
      border: "none",
      borderRadius: 14,
      fontSize: 16,
      fontWeight: 800,
      cursor: "pointer",
      marginTop: 8,
    },
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.modal}>
        <div style={styles.header}>
          <span style={styles.title}>🛒 장바구니</span>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={styles.storeName}>굽네치킨 마포점</div>

        {cart.map((item) => (
          <div key={item.id} style={styles.item}>
            <div>
              <div style={styles.itemName}>{item.name}</div>
              <div style={styles.itemPrice}>{(item.price * item.qty).toLocaleString()}원</div>
            </div>
            <div style={styles.qtyRow}>
              <button style={styles.qtyBtn} onClick={() => onUpdateQty(item.id, -1)}>−</button>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{item.qty}</span>
              <button style={styles.qtyBtn} onClick={() => onUpdateQty(item.id, 1)}>+</button>
            </div>
          </div>
        ))}

        <div style={styles.total}>
          <span>합계</span>
          <span style={{ color: "#29D3C4" }}>{totalPrice.toLocaleString()}원</span>
        </div>
        <button style={styles.orderBtn}>{totalPrice.toLocaleString()}원 주문하기</button>
      </div>
    </>
  );
};

export default CartModal;
