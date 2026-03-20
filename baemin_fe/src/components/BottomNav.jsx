import { navTabs } from "../data/mockData";

const BottomNav = ({ activeTab, onTabChange }) => {
  const styles = {
    nav: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: "#fff",
      borderTop: "1px solid #eee",
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 0 12px",
      zIndex: 100,
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      cursor: "pointer",
      padding: "4px 16px",
      background: "none",
      border: "none",
    },
    icon: (active) => ({
      fontSize: 24,
      opacity: active ? 1 : 0.4,
      filter: active ? "none" : "grayscale(1)",
    }),
    label: (active) => ({
      fontSize: 10,
      fontWeight: 700,
      color: active ? "#29D3C4" : "#aaa",
    }),
  };

  return (
    <div style={styles.nav}>
      {navTabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button key={tab.id} style={styles.item} onClick={() => onTabChange(tab.id)}>
            <span style={styles.icon(active)}>{tab.icon}</span>
            <span style={styles.label(active)}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
