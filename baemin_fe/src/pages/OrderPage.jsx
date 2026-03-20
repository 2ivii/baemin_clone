const orders = [
  {
    id: 1,
    store: "굽네치킨 마포점",
    icon: "🍗",
    items: "황올 + 레드윙 콤보 외 1개",
    price: "28,000원",
    date: "2025.06.14",
    status: "배달완료",
    statusColor: "#29D3C4",
  },
  {
    id: 2,
    store: "도미노피자 홍대점",
    icon: "🍕",
    items: "슈퍼시드 피자 (L) 외 2개",
    price: "34,500원",
    date: "2025.06.10",
    status: "배달완료",
    statusColor: "#29D3C4",
  },
  {
    id: 3,
    store: "버거킹 홍대점",
    icon: "🍔",
    items: "와퍼 세트 외 1개",
    price: "18,000원",
    date: "2025.06.05",
    status: "배달완료",
    statusColor: "#29D3C4",
  },
];

const OrderPage = () => {
  const styles = {
    container: { padding: "16px" },
    heading: { fontSize: 20, fontWeight: 900, color: "#1A1A1A", marginBottom: 16 },
    card: {
      background: "#fff",
      borderRadius: 16,
      padding: "16px",
      marginBottom: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    },
    cardTop: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 8,
    },
    storeIcon: { fontSize: 32 },
    storeName: { fontSize: 15, fontWeight: 800, color: "#1A1A1A" },
    statusBadge: (color) => ({
      marginLeft: "auto",
      fontSize: 11,
      fontWeight: 700,
      color,
      background: `${color}20`,
      padding: "3px 10px",
      borderRadius: 20,
    }),
    items: { fontSize: 13, color: "#666", marginBottom: 6 },
    meta: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
      color: "#999",
    },
    price: { fontWeight: 700, color: "#1A1A1A" },
    reorderBtn: {
      marginTop: 12,
      width: "100%",
      padding: "10px",
      border: "2px solid #29D3C4",
      background: "none",
      color: "#29D3C4",
      borderRadius: 10,
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
    },
    empty: {
      textAlign: "center",
      padding: "60px 0",
      color: "#bbb",
      fontSize: 14,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>주문내역</div>
      {orders.length === 0 ? (
        <div style={styles.empty}>아직 주문 내역이 없어요 🛵</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.storeIcon}>{order.icon}</span>
              <div>
                <div style={styles.storeName}>{order.store}</div>
              </div>
              <span style={styles.statusBadge(order.statusColor)}>{order.status}</span>
            </div>
            <div style={styles.items}>{order.items}</div>
            <div style={styles.meta}>
              <span>{order.date}</span>
              <span style={styles.price}>{order.price}</span>
            </div>
            <button style={styles.reorderBtn}>🔄 재주문하기</button>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
