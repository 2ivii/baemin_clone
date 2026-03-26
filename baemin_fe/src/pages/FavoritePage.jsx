import { useState } from "react";
import { IoSearchOutline, IoBagOutline, IoStar, IoBicycleOutline, IoTimeOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { restaurants } from "../data/mockData";

const FavoritePage = ({ onSelectRestaurant }) => {
  const [activeTab, setActiveTab] = useState("delivery");

  const items = [
    { id: 1, name: "옐로우파스타 일산점",          emoji: "🍝", bg: "#FFF3CD", rating: 4.9, reviewCount: 486, topMenu: "(솔로세트) 나혼자 옐로우파스타 세트(...", time: "약 53분", deliveryFree: true,  minOrder: "5,000원",  chips: ["픽업가능","예약가능"], club: true, unavailable: false },
  ];

  const s = {
    page:   { background: "#fff", minHeight: "100vh" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" },
    title:  { fontSize: 22, fontWeight: 900, color: "#1A1A1A" },
    hIcons: { display: "flex", gap: 16 },
    hBtn:   { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
    tabs:   { display: "flex", borderBottom: "1px solid #eee" },
    tab: (a) => ({ flex: 1, textAlign: "center", padding: "14px 0", fontSize: 15, fontWeight: a?800:500, color: a?"#1A1A1A":"#aaa", borderBottom: a?"2px solid #1A1A1A":"2px solid transparent", cursor: "pointer", background: "none", border: "none" }),
    count:  { padding: "14px 16px 8px", fontSize: 13, color: "#555", fontWeight: 600 },
    item:   { display: "flex", gap: 14, padding: "16px 16px", borderBottom: "1px solid #F5F5F5", cursor: "pointer", alignItems: "flex-start" },
    imgWrap:{ position: "relative", flexShrink: 0 },
    img: (bg) => ({ width: 90, height: 90, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, position: "relative", overflow: "hidden" }),
    discBadge: { position: "absolute", bottom: 0, left: 0, background: "#FF3B30", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 6px", borderRadius: "0 6px 0 8px" },
    info:   { flex: 1 },
    name:   { fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 3 },
    ratingRow: { display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#555", marginBottom: 4 },
    delivRow:  { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555", marginBottom: 4 },
    freeDeliv: { color: "#3D1EB2", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", gap: 3 },
    metaRow:   { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#777", flexWrap: "wrap", marginBottom: 6 },
    chip:      { border: "1px solid #ddd", borderRadius: 4, padding: "2px 6px", fontSize: 11, color: "#666" },
    clubBadge: { display: "inline-flex", alignItems: "center", gap: 3, background: "#3D1EB2", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5 },
    unavail:   { fontSize: 12, color: "#FF6B35", fontWeight: 600, marginTop: 2 },
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

        <div style={s.count}>총 {items.length}개</div>

        {items.map((item) => (
            <div key={item.id} style={s.item} onClick={() => onSelectRestaurant(item)}>
              <div style={s.imgWrap}>
                <div style={s.img(item.bg)}>
                  {item.status && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                        <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>{item.status}</span>
                      </div>
                  )}
                  {item.emoji}
                </div>
                {item.discount && <div style={s.discBadge}>{item.discount}</div>}
              </div>

              <div style={s.info}>
                <div style={s.name}>{item.name}</div>
                <div style={s.ratingRow}>
                  <IoStar size={13} color="#FFB800" />
                  <span>{item.rating} ({item.reviewCount})</span>
                  <span style={{ color: "#ccc" }}>|</span>
                  <span style={{ fontSize: 12, color: "#777" }}>{item.topMenu}</span>
                </div>
                {item.time && (
                    <div style={s.delivRow}>
                      <IoBicycleOutline size={14} color="#555" />
                      <span>{item.time}</span>
                      {item.deliveryFree && (
                          <span style={s.freeDeliv}>
                    {/*<MdVerified size={13} color="#3D1EB2" /> 배달팁 무료*/}
                  </span>
                      )}
                    </div>
                )}
                <div style={s.metaRow}>
                  <span>최소주문 {item.minOrder}</span>
                  {item.chips.map((c) => <span key={c} style={s.chip}>{c}</span>)}
                </div>
                {/*{item.club    && <div style={s.clubBadge}><MdVerified size={11} /> 배민클럽</div>}*/}
                {item.unavailable && <div style={s.unavail}>지금 주소로는 배달이 어려워요</div>}
              </div>
            </div>
        ))}
      </div>
  );
};

export default FavoritePage;