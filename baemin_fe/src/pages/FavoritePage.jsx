import { useState } from "react";
import { restaurants } from "../data/mockData";

const FavoritePage = ({ onSelectRestaurant }) => {
  const [activeTab, setActiveTab] = useState("delivery");

  const likedRestaurants = restaurants.filter((r) => [1, 3, 5].includes(r.id));

  const s = {
    page: { background: "#fff", minHeight: "100vh" },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
    },
    title: { fontSize: 22, fontWeight: 900, color: "#1A1A1A" },
    headerIcons: { display: "flex", gap: 16 },
    iconBtn: {
      background: "none",
      border: "none",
      fontSize: 22,
      cursor: "pointer",
      color: "#1A1A1A",
    },
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
      borderBottom: active ? "2px solid #1A1A1A" : "2px solid transparent",
    }),
    count: {
      padding: "14px 16px 8px",
      fontSize: 13,
      color: "#555",
      fontWeight: 600,
    },
    item: {
      display: "flex",
      gap: 14,
      padding: "16px 16px",
      borderBottom: "1px solid #F5F5F5",
      cursor: "pointer",
      alignItems: "flex-start",
    },
    imgWrap: {
      position: "relative",
      flexShrink: 0,
    },
    img: (bg) => ({
      width: 90,
      height: 90,
      borderRadius: 10,
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 44,
      overflow: "hidden",
    }),
    discountBadge: {
      position: "absolute",
      bottom: 0,
      left: 0,
      background: "#FF3B30",
      color: "#fff",
      fontSize: 10,
      fontWeight: 800,
      padding: "3px 6px",
      borderRadius: "0 6px 0 8px",
    },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 3 },
    ratingRow: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 13,
      color: "#555",
      marginBottom: 4,
    },
    star: { color: "#FFB800", fontWeight: 700 },
    deliveryRow: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "#555",
      marginBottom: 4,
    },
    freeDelivery: {
      color: "#3D1EB2",
      fontWeight: 800,
      fontSize: 12,
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    metaRow: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "#777",
      flexWrap: "wrap",
      marginBottom: 6,
    },
    metaChip: {
      border: "1px solid #ddd",
      borderRadius: 4,
      padding: "2px 6px",
      fontSize: 11,
      color: "#666",
    },
    clubBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      background: "#3D1EB2",
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 5,
    },
    unavailable: {
      fontSize: 12,
      color: "#FF6B35",
      fontWeight: 600,
      marginTop: 2,
    },
  };

  const items = [
    {
      id: 1, name: "옐로우파스타 일산점", emoji: "🍝", bg: "#FFF3CD",
      rating: 4.9, reviewCount: 486, topMenu: "(솔로세트) 나혼자 옐로우파스타 세트(...",
      time: "약 53분", deliveryFree: true, minOrder: "5,000원",
      chips: ["픽업가능", "예약가능"], club: true, discount: "2천원 즉시할인",
      unavailable: false,
    },
    {
      id: 2, name: "BBQ 대화점", emoji: "🍗", bg: "#FFF3CD",
      rating: 4.9, reviewCount: 656, topMenu: "황금올리브치킨™, [황.양.반] 황올 반...",
      time: "약 47분", deliveryFree: true, minOrder: "17,000원",
      chips: ["픽업가능", "위생인증"], club: true, discount: "4천원 즉시할인",
      unavailable: false,
    },
    {
      id: 3, name: "피자스쿨 행신서정점", emoji: "🍕", bg: "#FFE4E4",
      rating: 5.0, reviewCount: 477, topMenu: "고구마피자, 불닭고구마피자",
      time: null, deliveryFree: false, minOrder: "18,000원",
      chips: ["픽업가능"], club: false, discount: null,
      unavailable: true, status: "준비중",
    },
    {
      id: 4, name: "백종원의 빽보이피자 고양행신점", emoji: "🍕", bg: "#E8F4FD",
      rating: 5.0, reviewCount: 533, topMenu: "반반 피자 L, [빽보이세트]피자+스파게...",
      time: null, deliveryFree: false, minOrder: "18,900원",
      chips: ["매장과 같은 가격", "픽업가능", "예약가능"], club: false, discount: null,
      unavailable: true, status: "준비중",
    },
    {
      id: 5, name: "파스타입니다 행신화정점", emoji: "🍜", bg: "#E4F5E4",
      rating: 4.9, reviewCount: 503, topMenu: "토마토 파스타, 봉골레 파스타",
      time: null, deliveryFree: false, minOrder: "15,000원",
      chips: ["픽업가능"], club: false, discount: null,
      unavailable: true, status: "준비중",
    },
  ];

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.title}>찜</div>
        <div style={s.headerIcons}>
          <button style={s.iconBtn}>🔍</button>
          <button style={s.iconBtn}>🛒</button>
        </div>
      </div>

      <div style={s.tabs}>
        <button style={s.tab(activeTab === "delivery")} onClick={() => setActiveTab("delivery")}>
          배달·픽업
        </button>
        <button style={s.tab(activeTab === "shopping")} onClick={() => setActiveTab("shopping")}>
          장보기·쇼핑
        </button>
      </div>

      <div style={s.count}>총 {items.length}개</div>

      {items.map((item) => (
        <div key={item.id} style={s.item} onClick={() => {}}>
          <div style={s.imgWrap}>
            <div style={s.img(item.bg)}>
              {item.status ? (
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 10,
                }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>{item.status}</span>
                </div>
              ) : null}
              {item.emoji}
            </div>
            {item.discount && (
              <div style={s.discountBadge}>{item.discount}</div>
            )}
          </div>

          <div style={s.info}>
            <div style={s.name}>{item.name}</div>
            <div style={s.ratingRow}>
              <span style={s.star}>★</span>
              <span>{item.rating} ({item.reviewCount})</span>
              <span style={{ color: "#ccc" }}>|</span>
              <span style={{ fontSize: 12, color: "#777" }}>{item.topMenu}</span>
            </div>

            {item.time && (
              <div style={s.deliveryRow}>
                <span>🛵 {item.time}</span>
                {item.deliveryFree && (
                  <span style={s.freeDelivery}>
                    <span>🏆</span> 배달팁 무료
                  </span>
                )}
              </div>
            )}

            <div style={s.metaRow}>
              <span>최소주문 {item.minOrder}</span>
              {item.chips.map((chip) => (
                <span key={chip} style={s.metaChip}>{chip}</span>
              ))}
            </div>

            {item.club && (
              <div style={s.clubBadge}>🏆 배민클럽</div>
            )}
            {item.unavailable && (
              <div style={s.unavailable}>지금 주소로는 배달이 어려워요</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritePage;
