import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const styles = {
    wrapper: {
      background: "#fff",
      margin: "12px 16px 8px",
      borderRadius: 12,
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    input: {
      border: "none",
      outline: "none",
      flex: 1,
      fontSize: 14,
      color: "#333",
      background: "transparent",
    },
  };

  return (
    <div style={styles.wrapper}>
      <span style={{ fontSize: 18 }}>🔍</span>
      <input
        style={styles.input}
        placeholder="어떤 음식이 드시고 싶으세요?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
