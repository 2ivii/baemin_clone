const RestaurantCard = ({ restaurant, liked, onToggleLike }) => {
  const { id, name, rating, reviews, deliveryTime, minOrder, deliveryFee, tags, img, bg } = restaurant;

  const styles = {
    card: {
      background: "#fff",
      margin: "0 16px 12px",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
      cursor: "pointer",
      transition: "transform 0.15s",
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
      background: "rgba(255,255,255,0.9)",
      border: "none",
      borderRadius: "50%",
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 16,
      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
    },
    body: { padding: "12px 14px" },
    name: { fontSize: 15, fontWeight: 800, color: "#1A1A1A", marginBottom: 4 },
    meta: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 6,
      fontSize: 12,
      color: "#777",
    },
    star: { color: "#FFB800", fontWeight: 700 },
    infoRow: { display: "flex", gap: 10, fontSize: 11, color: "#888" },
    infoItem: { display: "flex", alignItems: "center", gap: 3 },
    tagRow: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
    tag: {
      background: "#F0FBF9",
      color: "#29D3C4",
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 6,
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.imgArea}>
        <span>{img}</span>
        <button
          style={styles.likeBtn}
          onClick={(e) => { e.stopPropagation(); onToggleLike(id); }}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      <div style={styles.body}>
        <div style={styles.name}>{name}</div>
        <div style={styles.meta}>
          <span style={styles.star}>★ {rating}</span>
          <span style={{ color: "#ddd" }}>|</span>
          <span>리뷰 {reviews.toLocaleString()}</span>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoItem}><span>⏱</span><span>{deliveryTime}</span></div>
          <div style={styles.infoItem}><span>💰</span><span>최소 {minOrder}</span></div>
          <div style={styles.infoItem}>
            <span>🛵</span>
            <span style={{
              color: deliveryFee === "무료" ? "#29D3C4" : "#888",
              fontWeight: deliveryFee === "무료" ? 700 : 500,
            }}>
              {deliveryFee === "무료" ? "무료배달" : `배달비 ${deliveryFee}`}
            </span>
          </div>
        </div>
        <div style={styles.tagRow}>
          {tags.map((tag) => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
