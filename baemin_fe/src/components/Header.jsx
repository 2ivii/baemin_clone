const Header = ({ cartCount, onCartClick, onAddressClick }) => {
  const styles = {
    header: {
      background: "#29D3C4",
      padding: "16px 20px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    addressBar: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      cursor: "pointer",
    },
    addressLabel: {
      fontSize: 11,
      color: "rgba(255,255,255,0.8)",
      fontWeight: 500,
    },
    addressText: {
      fontSize: 14,
      color: "#fff",
      fontWeight: 700,
    },
    logo: {
      fontSize: 20,
      fontWeight: 900,
      color: "#fff",
      letterSpacing: -1,
      fontFamily: "'Black Han Sans', sans-serif",
    },
    icons: {
      display: "flex",
      gap: 16,
      alignItems: "center",
    },
    iconBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 22,
      color: "#fff",
      position: "relative",
      padding: 0,
    },
    badge: {
      position: "absolute",
      top: -6,
      right: -6,
      background: "#FF3B30",
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      borderRadius: 10,
      padding: "1px 5px",
      minWidth: 16,
      textAlign: "center",
    },
  };

  return (
      <div style={styles.header}>
        <div style={styles.addressBar} onClick={onAddressClick}>
          <span style={{ fontSize: 18 }}>📍</span>
          <div>
            <div style={styles.addressLabel}>배달주소</div>
            <div style={styles.addressText}>마포구 서교동 ▾</div>
          </div>
        </div>

        <div style={styles.logo}>배달의민족</div>

        <div style={styles.icons}>
          <button style={styles.iconBtn} onClick={onCartClick}>
            🛒
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </button>
          <button style={styles.iconBtn}>🔔</button>
        </div>
      </div>
  );
};

export default Header;