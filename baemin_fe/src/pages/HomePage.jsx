import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import CategoryGrid from '../components/CategoryGrid';
import FilterChips from '../components/FilterChips';
import RestaurantCard from '../components/RestaurantCard';
import SearchBar from '../components/SearchBar';
import { restaurantApi } from '../api/restaurantApi';
import { favoriteApi } from '../api/favoriteApi';
import { restaurants as mockRestaurants } from '../data/mockData';

const HomePage = ({ onSelectRestaurant }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [likedRestaurants, setLikedRestaurants] = useState(new Set());
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 찜 목록 로드
  useEffect(() => {
    favoriteApi.getIds()
        .then((ids) => {
          // ids는 Set 또는 Array로 올 수 있음
          setLikedRestaurants(new Set(Array.isArray(ids) ? ids : Object.values(ids)));
        })
        .catch(() => {
          // 로그인 전이거나 실패 시 빈 Set
          setLikedRestaurants(new Set());
        });
  }, []);

  useEffect(() => {
    fetchRestaurants(selectedCategory);
  }, [selectedCategory]);

  const fetchRestaurants = async (category) => {
    setLoading(true);
    try {
      const data = await restaurantApi.getList(category);
      const mapped = data.map((r) => ({
        id:           r.id,
        name:         r.name,
        category:     r.category?.name || '',
        rating:       r.rating,
        reviews:      r.reviewCount,
        deliveryTime: r.deliveryTime || '30~40분',
        minOrder:     r.minOrder ? `${r.minOrder.toLocaleString()}원` : '0원',
        deliveryFee:  r.deliveryFee === 0 ? '무료' : `${r.deliveryFee.toLocaleString()}원`,
        tags:         [],
        img:          r.imgEmoji || '🍽️',
        bg:           r.bgColor  || '#F5F5F5',
      }));
      setRestaurants(mapped.length > 0 ? mapped : mockRestaurants);
    } catch {
      setRestaurants(
          category
              ? mockRestaurants.filter((r) => r.category === category)
              : mockRestaurants
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id) => {
    // 낙관적 업데이트: 먼저 UI 반영
    setLikedRestaurants((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    try {
      await favoriteApi.toggle(id);
    } catch {
      // 실패 시 롤백
      setLikedRestaurants((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }
  };

  const styles = {
    sectionTitle: {
      padding: '4px 16px 8px',
      fontSize: 17,
      fontWeight: 800,
      color: '#1A1A1A',
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
    },
    count:   { fontSize: 13, fontWeight: 500, color: '#888' },
    loading: { textAlign: 'center', padding: '40px 0', color: '#aaa', fontSize: 14 },
  };

  return (
      <div>
        <SearchBar />
        <Banner />
        <CategoryGrid selected={selectedCategory} onSelect={setSelectedCategory} />
        <FilterChips />

        <div style={styles.sectionTitle}>
          {selectedCategory ? `${selectedCategory} 음식점` : '🔥 지금 인기있는 음식점'}
          <span style={styles.count}>{restaurants.length}개</span>
        </div>

        {loading ? (
            <div style={styles.loading}>음식점을 불러오는 중... 🍽️</div>
        ) : (
            restaurants.map((r) => (
                <div key={r.id} onClick={() => onSelectRestaurant(r)} style={{ cursor: 'pointer' }}>
                  <RestaurantCard
                      restaurant={r}
                      liked={likedRestaurants.has(r.id)}
                      onToggleLike={toggleLike}
                  />
                </div>
            ))
        )}
      </div>
  );
};

export default HomePage;