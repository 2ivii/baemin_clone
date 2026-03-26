import { IoTimeOutline, IoWalletOutline, IoBicycleOutline } from "react-icons/io5";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";

const RestaurantCard = ({ restaurant, liked, onToggleLike }) => {
  const { id, name, rating, reviews, deliveryTime, minOrder, deliveryFee, tags, img, bg } = restaurant;
  const isFree = deliveryFee === "무료";

  const s = {
    card: {
      background: "#fff",
      margin: "0 16px 12px",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
      cursor: "pointer",
    },
    imgArea: {
      background: bg,
      height: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 64,
      position: "relative",
    },
    likeBtn: {
      position: "absolute",
      top: 10,
      right: 12,
      background: "rgba(255,255,255,0.92)",
      border: "none",
      borderRadius: "50%",
      width: 34,
      height: 34,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
    },
    body: { padding: "12px 14px" },
    name: { fontSize: 15, fontWeight: 800, color: "#1A1A1A", marginBottom: 4 },
    meta: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6, fontSize: 12, color: "#777" },
    infoRow: { display: "flex", gap: 10, fontSize: 11, color: "#888" },
    infoItem: { display: "flex", alignItems: "center", gap: 3 },
    tagRow: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
    tag: { background: "#F0FBF9", color: "#29D3C4", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 },
    divider: { color: "#ddd" },
  };

  return (
      <div style={s.card}>
        <div style={s.imgArea}>
          <span>{img}</span>
          <button style={s.likeBtn} onClick={(e) => { e.stopPropagation(); onToggleLike(id); }}>
            {liked
                ? <IoHeartSharp  size={18} color="#FF3B30" />
                : <IoHeartOutline size={18} color="#ccc"  />}
          </button>
        </div>
        <div style={s.body}>
          <div style={s.name}>{name}</div>
          <div style={s.meta}>
            <IoStar size={13} color="#FFB800" />
            <span style={{ fontWeight: 700, color: "#1A1A1A" }}>{rating}</span>
            <span style={s.divider}>|</span>
            <span>리뷰 {reviews?.toLocaleString()}</span>
          </div>
          <div style={s.infoRow}>
            <div style={s.infoItem}>
              <IoTimeOutline size={13} color="#aaa" />
              <span>{deliveryTime}</span>
            </div>
            <div style={s.infoItem}>
              <IoWalletOutline size={13} color="#aaa" />
              <span>최소 {minOrder}</span>
            </div>
            <div style={s.infoItem}>
              <IoBicycleOutline size={13} color={isFree ? "#29D3C4" : "#aaa"} />
              <span style={{ color: isFree ? "#29D3C4" : "#888", fontWeight: isFree ? 700 : 400 }}>
              {isFree ? "무료배달" : `배달비 ${deliveryFee}`}
            </span>
            </div>
          </div>
          {tags?.length > 0 && (
              <div style={s.tagRow}>
                {tags.map((tag) => <span key={tag} style={s.tag}>{tag}</span>)}
              </div>
          )}
        </div>
      </div>
  );
};

export default RestaurantCard;