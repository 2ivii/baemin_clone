const menuItems = [
  { icon: "🏠", label: "배달 주소 관리" },
  { icon: "💳", label: "결제 수단 관리" },
  { icon: "⭐", label: "리뷰 관리" },
  { icon: "❤️", label: "찜한 가게" },
  { icon: "🎟️", label: "쿠폰함" },
  { icon: "🔔", label: "알림 설정" },
  { icon: "🔒", label: "개인정보 설정" },
  { icon: "📞", label: "고객센터" },
];

const MyPage = () => {
  const styles = {
    container: { paddingBottom: 16 },
    profile: {
      background: "linear-gradient(135deg, #29D3C4, #1BB8AB)",
      padding: "28px 20px 24px",
      display: "flex",
      alignItems: "center",
      gap: 16,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 32,
    },
    name: { fontSize: 18, fontWeight: 800, color: "#fff" },
    email: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 },
    editBtn: {
      marginLeft: "auto",
      background: "rgba(255,255,255,0.2)",
      border: "none",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      padding: "6px 14px",
      borderRadius: 20,
      cursor: "pointer",
    },
    statsRow: {
      display: "flex",
      background: "#fff",
      padding: "16px 0",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      marginBottom: 12,
    },
    stat: {
      flex: 1,
      textAlign: "center",
      borderRight: "1px solid #eee",
    },
    statNum: { fontSize: 20, fontWeight: 900, color: "#29D3C4" },
    statLabel: { fontSize: 11, color: "#888", marginTop: 2 },
    section: {
      background: "#fff",
      marginBottom: 8,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "16px 20px",
      borderBottom: "1px solid #f5f5f5",
      cursor: "pointer",
    },
    menuIcon: { fontSize: 20 },
    menuLabel: { fontSize: 14, fontWeight: 600, color: "#1A1A1A" },
    arrow: { marginLeft: "auto", color: "#ccc", fontSize: 16 },
    logoutBtn: {
      margin: "16px",
      width: "calc(100% - 32px)",
      padding: "14px",
      background: "none",
      border: "2px solid #eee",
      borderRadius: 12,
      color: "#888",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.profile}>
        <div style={styles.avatar}>👤</div>
        <div>
          <div style={styles.name}>배민 사용자</div>
          <div style={styles.email}>baemin@example.com</div>
        </div>
        <button style={styles.editBtn}>편집</button>
      </div>

      <div style={styles.statsRow}>
        {[
          { num: "12", label: "주문" },
          { num: "3", label: "쿠폰" },
          { num: "5", label: "찜한가게" },
        ].map((s, i) => (
          <div key={i} style={{ ...styles.stat, borderRight: i < 2 ? "1px solid #eee" : "none" }}>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        {menuItems.map((item, i) => (
          <div key={i} style={styles.menuItem}>
            <span style={styles.menuIcon}>{item.icon}</span>
            <span style={styles.menuLabel}>{item.label}</span>
            <span style={styles.arrow}>›</span>
          </div>
        ))}
      </div>

      <button style={styles.logoutBtn}>로그아웃</button>
    </div>
  );
};

export default MyPage;
