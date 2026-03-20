import { categories } from "../data/mockData";

const CategoryGrid = ({ selected, onSelect }) => {
  const styles = {
    title: {
      padding: "12px 16px 8px",
      fontSize: 17,
      fontWeight: 800,
      color: "#1A1A1A",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 8,
      padding: "0 16px 12px",
    },
    item: (active) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      padding: "10px 0",
      borderRadius: 14,
      cursor: "pointer",
      background: active ? "#E6FAF8" : "#fff",
      border: active ? "2px solid #29D3C4" : "2px solid transparent",
      transition: "all 0.15s",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    }),
    icon: { fontSize: 22 },
    label: (active) => ({
      fontSize: 10,
      fontWeight: 700,
      color: active ? "#29D3C4" : "#555",
    }),
  };

  return (
    <>
      <div style={styles.title}>카테고리</div>
      <div style={styles.grid}>
        {categories.map((cat) => {
          const active = selected === cat.label;
          return (
            <div
              key={cat.id}
              style={styles.item(active)}
              onClick={() => onSelect(active ? null : cat.label)}
            >
              <span style={styles.icon}>{cat.icon}</span>
              <span style={styles.label(active)}>{cat.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryGrid;
