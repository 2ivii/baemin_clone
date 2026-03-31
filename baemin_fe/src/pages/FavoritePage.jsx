import { useState, useEffect } from "react";
import { IoSearchOutline, IoBagOutline, IoStar, IoBicycleOutline, IoHeartDislikeOutline } from "react-icons/io5";
import { favoriteApi } from "../api/favoriteApi";

const FavoritePage = ({ onSelectRestaurant }) => {
  const [activeTab, setActiveTab] = useState("delivery");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await favoriteApi.getAll();
      setFavorites(data || []);
    } catch {
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async (e, restaurantId) => {
    e.stopPropagation();
    try {
      await favoriteApi.toggle(restaurantId);
      setFavorites((prev) => prev.filter((f) => f.restaurantId !== restaurantId));
    } catch {
      alert("찜 해제에 실패했습니다.");
    }
  };

  const s = {
    page:   { background: "#fff", minHeight: "100vh" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" },
    title:  { fontSize: 22, fontWeight: 900, color: "#1A1A1A" },
    hIcons: { display: "flex", gap: 16 },
    hBtn:   { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
    tabs:   { display: "flex", borderBottom: "1px solid #eee" },
    tab: (a) => ({ flex: 1, textAlign: "center", padding: "14px 0", fontSize: 15, fontWeight: a?800:500, color: a?"#1A1A1A":"#aaa", borderBottom: a?"2px solid #1A1A1A":"2px solid transparent", cursor: "pointer", background: "none", border: "none" }),
    count:  { padding: "14px 16px 8px", fontSize: 13, color: "#555", fontWeight: 600 },
    item:   { display: "flex", gap: 14, padding: "16px", borderBottom: "1px solid #F5F5F5", cursor: "pointer", alignItems: "flex-start" },
    imgWrap:{ position: "relative", flexShrink: 0 },
    img: (bg) => ({ width: 90, height: 90, borderRadius: 10, background: bg || "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }),
    info:   { flex: 1 },
    name:   { fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 4 },
    ratingRow: { display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#555", marginBottom: 4 },
    delivRow:  { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555", marginBottom: 4 },
    metaRow:   { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#777", flexWrap: "wrap" },
    unlikeBtn: { position: "absolute", top: 4, right: 4, width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" },
    empty:  { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", gap: 12, color: "#bbb" },
    emptyIcon: { fontSize: 48 },
    emptyText: { fontSize: 15, fontWeight: 700, color: "#999" },
    emptySubText: { fontSize: 13, color: "#bbb", textAlign: "center", lineHeight: 1.6 },
    loading: { textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 14 },
  };

  const renderList = () => {
    if (loading) return <div style={s.loading}>찜 목록을 불러오는 중... ❤️</div>;

    if (favorites.length === 0) {
      return (
          <div style={s.empty}>
            <div style={s.emptyIcon}>🤍</div>
            <div style={s.emptyText}>아직 찜한 가게가 없어요</div>
            <div style={s.emptySubText}>마음에 드는 가게를 찜해보세요!{"\n"}홈 화면에서 하트를 눌러보세요 💚</div>
          </div>
      );
    }

    return (
        <>
          <div style={s.count}>총 {favorites.length}개</div>
          {favorites.map((fav) => (
              <div key={fav.favoriteId} style={s.item} onClick={() => onSelectRestaurant({
                id:           fav.restaurantId,
                name:         fav.restaurantName,
                img:          fav.imgEmoji || "🍽️",
                bg:           fav.bgColor || "#F5F5F5",
                rating:       fav.rating,
                reviews:      fav.reviewCount,
                deliveryTime: fav.deliveryTime || "30~40분",
                minOrder:     fav.minOrder ? `${fav.minOrder.toLocaleString()}원` : "0원",
                deliveryFee:  fav.deliveryFee === 0 ? "무료" : `${fav.deliveryFee?.toLocaleString()}원`,
              })}>
                <div style={s.imgWrap}>
                  <div style={s.img(fav.bgColor)}>
                    {fav.imgEmoji || "🍽️"}
                  </div>
                  <button style={s.unlikeBtn} onClick={(e) => handleUnlike(e, fav.restaurantId)}>
                    ❤️
                  </button>
                </div>

                <div style={s.info}>
                  <div style={s.name}>{fav.restaurantName}</div>
                  <div style={s.ratingRow}>
                    <IoStar size={13} color="#FFB800" />
                    <span>{fav.rating} ({fav.reviewCount})</span>
                  </div>
                  {fav.deliveryTime && (
                      <div style={s.delivRow}>
                        <IoBicycleOutline size={14} color="#555" />
                        <span>{fav.deliveryTime}</span>
                      </div>
                  )}
                  <div style={s.metaRow}>
                    <span>최소주문 {fav.minOrder ? `${fav.minOrder.toLocaleString()}원` : "0원"}</span>
                    <span style={{ color: "#ccc" }}>·</span>
                    <span style={{ color: fav.deliveryFee === 0 ? "#29D3C4" : "#777", fontWeight: fav.deliveryFee === 0 ? 700 : 400 }}>
                  {fav.deliveryFee === 0 ? "무료배달" : `배달비 ${fav.deliveryFee?.toLocaleString()}원`}
                </span>
                  </div>
                </div>
              </div>
          ))}
        </>
    );
  };

  return (
      <div style={s.page}>
        <div style={s.header}>
          <div style={s.title}>찜</div>
          <div style={s.hIcons}>
            <button style={s.hBtn}><IoSearchOutline size={24} color="#1A1A1A" /></button>
            <button style={s.hBtn}><IoBagOutline    size={24} color="#1A1A1A" /></button>
          </div>
        </div>

        <div style={s.tabs}>
          <button style={s.tab(activeTab === "delivery")} onClick={() => setActiveTab("delivery")}>배달·픽업</button>
          <button style={s.tab(activeTab === "shopping")} onClick={() => setActiveTab("shopping")}>장보기·쇼핑</button>
        </div>

        {activeTab === "delivery" ? renderList() : (
            <div style={{ ...s.empty, paddingTop: 80 }}>
              <div style={s.emptyIcon}>🛒</div>
              <div style={s.emptyText}>장보기·쇼핑 찜 목록이 없어요</div>
            </div>
        )}
      </div>
  );
};

export default FavoritePage;