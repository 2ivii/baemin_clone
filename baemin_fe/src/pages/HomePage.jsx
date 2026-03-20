import { useState } from "react";
import Banner from "../components/Banner";
import CategoryGrid from "../components/CategoryGrid";
import FilterChips from "../components/FilterChips";
import RestaurantCard from "../components/RestaurantCard";
import SearchBar from "../components/SearchBar";
import { restaurants } from "../data/mockData";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [likedRestaurants, setLikedRestaurants] = useState(new Set([1, 3]));

  const toggleLike = (id) => {
    setLikedRestaurants((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = selectedCategory
    ? restaurants.filter((r) => r.category === selectedCategory)
    : restaurants;

  const styles = {
    sectionTitle: {
      padding: "4px 16px 8px",
      fontSize: 17,
      fontWeight: 800,
      color: "#1A1A1A",
      display: "flex",
      alignItems: "baseline",
      gap: 6,
    },
    count: {
      fontSize: 13,
      fontWeight: 500,
      color: "#888",
    },
  };

  return (
    <div>
      <SearchBar />
      <Banner />
      <CategoryGrid selected={selectedCategory} onSelect={setSelectedCategory} />
      <FilterChips />

      <div style={styles.sectionTitle}>
        {selectedCategory ? `${selectedCategory} 음식점` : "🔥 지금 인기있는 음식점"}
        <span style={styles.count}>{filtered.length}개</span>
      </div>

      {filtered.map((r) => (
        <RestaurantCard
          key={r.id}
          restaurant={r}
          liked={likedRestaurants.has(r.id)}
          onToggleLike={toggleLike}
        />
      ))}
    </div>
  );
};

export default HomePage;
