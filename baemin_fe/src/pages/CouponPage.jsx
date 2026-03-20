const coupons = [
  {
    id: 1,
    title: "신규 가입 쿠폰",
    desc: "첫 주문 시 사용 가능",
    discount: "3,000원",
    expiry: "2025.07.01",
    color: "#FF6B6B",
    used: false,
  },
  {
    id: 2,
    title: "배민클럽 할인 쿠폰",
    desc: "2만원 이상 주문 시",
    discount: "2,000원",
    expiry: "2025.06.30",
    color: "#29D3C4",
    used: false,
  },
  {
    id: 3,
    title: "치킨 카테고리 쿠폰",
    desc: "치킨 주문 전용",
    discount: "1,500원",
    expiry: "2025.06.20",
    color: "#FFB800",
    used: true,
  },
];

const CouponPage = () => {
  const styles = {
    container: { padding: "16px" },
    heading: { fontSize: 20, fontWeight: 900, color: "#1A1A1A", marginBottom: 4 },
    subheading: { fontSize: 13, color: "#888", marginBottom: 20 },
    coupon: (used) => ({
      background: used ? "#f5f5f5" : "#fff",
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: used ? "none" : "0 2px 8px rgba(0,0,0,0.08)",
      overflow: "hidden",
      opacity: used ? 0.6 : 1,
      display: "flex",
    }),
    leftBar: (color) => ({
      width: 8,
      background: color,
      flexShrink: 0,
    }),
    body: { padding: "14px 16px", flex: 1 },
    title: { fontSize: 15, fontWeight: 800, color: "#1A1A1A", marginBottom: 2 },
    desc: { fontSize: 12, color: "#888", marginBottom: 8 },
    bottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    discount: (color) => ({ fontSize: 20, fontWeight: 900, color }),
    expiry: { fontSize: 11, color: "#bbb" },
    usedBadge: {
      background: "#ddd",
      color: "#999",
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 20,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.heading}>🎟️ 내 쿠폰함</div>
      <div style={styles.subheading}>사용 가능한 쿠폰 {coupons.filter(c => !c.used).length}개</div>
      {coupons.map((coupon) => (
        <div key={coupon.id} style={styles.coupon(coupon.used)}>
          <div style={styles.leftBar(coupon.color)} />
          <div style={styles.body}>
            <div style={styles.title}>{coupon.title}</div>
            <div style={styles.desc}>{coupon.desc}</div>
            <div style={styles.bottom}>
              <span style={styles.discount(coupon.color)}>- {coupon.discount}</span>
              {coupon.used ? (
                <span style={styles.usedBadge}>사용완료</span>
              ) : (
                <span style={styles.expiry}>~{coupon.expiry}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CouponPage;
