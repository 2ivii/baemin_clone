import { useState, useEffect } from "react";
import { IoHomeOutline, IoStarOutline, IoTicketOutline, IoCallOutline, IoChevronForward, IoPencilOutline } from "react-icons/io5";
import { orderApi } from "../api/orderApi";

const MENU_ITEMS = [
  { icon: IoHomeOutline,   label: "배달 주소 관리" },
  { icon: IoStarOutline,   label: "리뷰 관리"       },
  { icon: IoTicketOutline, label: "쿠폰함"           },
  { icon: IoCallOutline,   label: "고객센터"         },
];

const MyPage = ({ user, onCoupon, onReview, onAddress, onLogout }) => {
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    orderApi.getMyOrders(0, 1)
        .then((res) => setOrderCount(res?.totalElements ?? 0))
        .catch(() => setOrderCount(0));
  }, []);

  const handleMenuClick = (label) => {
    if (label === "쿠폰함")        onCoupon?.();
    if (label === "리뷰 관리")     onReview?.();
    if (label === "배달 주소 관리") onAddress?.();
  };

  const s = {
    container: { paddingBottom: 16 },
    profile:   { background: "linear-gradient(135deg, #29D3C4, #1BB8AB)", padding: "28px 20px 24px", display: "flex", alignItems: "center", gap: 16 },
    avatar:    { width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" },
    nameWrap:  { flex: 1 },
    name:      { fontSize: 18, fontWeight: 800, color: "#fff" },
    email:     { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 },
    editBtn:   { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 },
    statsRow:  { display: "flex", background: "#fff", padding: "16px 0", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 12 },
    stat:      { flex: 1, textAlign: "center" },
    statNum:   { fontSize: 20, fontWeight: 900, color: "#29D3C4" },
    statLabel: { fontSize: 11, color: "#888", marginTop: 2 },
    section:   { background: "#fff", marginBottom: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
    menuItem:  { display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: "1px solid #f5f5f5", cursor: "pointer" },
    menuLabel: { fontSize: 14, fontWeight: 600, color: "#1A1A1A", flex: 1 },
    logoutBtn: { margin: "16px", width: "calc(100% - 32px)", padding: "14px", background: "none", border: "2px solid #eee", borderRadius: 12, color: "#888", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  };

  const stats = [
    { num: orderCount ?? "…", label: "주문" },
    { num: "3",               label: "쿠폰" },
    { num: "5",               label: "찜한가게" },
  ];

  return (
      <div style={s.container}>
        <div style={s.profile}>
          <div style={s.avatar}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <div style={s.nameWrap}>
            <div style={s.name}>{user?.name || "배민 사용자"}</div>
            <div style={s.email}>{user?.email || user?.loginId || ""}</div>
          </div>
          <button style={s.editBtn}>
            <IoPencilOutline size={13} />
            편집
          </button>
        </div>

        <div style={s.statsRow}>
          {stats.map((st, i) => (
              <div key={i} style={{ ...s.stat, borderRight: i < stats.length - 1 ? "1px solid #eee" : "none" }}>
                <div style={s.statNum}>{st.num}</div>
                <div style={s.statLabel}>{st.label}</div>
              </div>
          ))}
        </div>

        <div style={s.section}>
          {MENU_ITEMS.map(({ icon: Icon, label }, i) => (
              <div key={i} style={s.menuItem} onClick={() => handleMenuClick(label)}>
                <Icon size={20} color="#555" />
                <span style={s.menuLabel}>{label}</span>
                <IoChevronForward size={18} color="#ccc" />
              </div>
          ))}
        </div>

        <button style={s.logoutBtn} onClick={onLogout}>로그아웃</button>
      </div>
  );
};

export default MyPage;