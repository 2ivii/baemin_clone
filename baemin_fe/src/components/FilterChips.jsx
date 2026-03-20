import { useState } from "react";
import { filters } from "../data/mockData";

const FilterChips = () => {
  const [active, setActive] = useState("전체");

  const styles = {
    row: {
      display: "flex",
      gap: 8,
      padding: "0 16px 12px",
      overflowX: "auto",
      scrollbarWidth: "none",
    },
    chip: (isActive) => ({
      padding: "6px 14px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      background: isActive ? "#1A1A1A" : "#fff",
      color: isActive ? "#fff" : "#555",
      border: "none",
      cursor: "pointer",
      whiteSpace: "nowrap",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      transition: "all 0.15s",
    }),
  };

  return (
    <div style={styles.row}>
      {filters.map((f) => (
        <button key={f} style={styles.chip(f === active)} onClick={() => setActive(f)}>
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
