import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
      <div style={{
        background: "#fff",
        margin: "12px 16px 8px",
        borderRadius: 12,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}>
        <IoSearchOutline size={20} color="#aaa" />
        <input
            style={{ border: "none", outline: "none", flex: 1, fontSize: 14, color: "#333", background: "transparent" }}
            placeholder="어떤 음식이 드시고 싶으세요?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
      </div>
  );
};

export default SearchBar;