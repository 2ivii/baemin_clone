import { useState, useEffect } from 'react';
import MenuDetailModal from '../components/MenuDetailModal';
import ReviewPage from './ReviewPage';
import { restaurantApi } from '../api/restaurantApi';

const menuCategories = ['인기 메뉴', '우아한 분식', '바삭 튀김류', '분식 세트'];

// mockData 메뉴 (API 폴백용)
const mockMenuItems = [
  { id: 1, rank: '인기 1위', ownerPick: true,  name: '우아한 순대세트',       desc: '떡볶이\n순대 ...',              price: 16000, reviews: 54, emoji: '🍱', bg: '#FFF3CD' },
  { id: 2, rank: '인기 2위', ownerPick: true,  name: '우아한 꼬마김밥 6줄',    desc: '포장마차 원조 꼬마김밥',         price:  5000, reviews:  6, emoji: '🍙', bg: '#E8F5E9' },
  { id: 3, rank: '인기 3위', ownerPick: true,  name: '우아한 떡볶이',          desc: '매콤달콤 추억의 쌀 떡볶이',      price:  5200, reviews:  5, emoji: '🌶️', bg: '#FFF3CD' },
  { id: 4, rank: '인기 4위', ownerPick: true,  name: '우아한 꼬지어묵',        desc: '3개\n어묵 90% 이상',            price:  3900, reviews:  7, emoji: '🍢', bg: '#E3F2FD' },
  { id: 5, rank: '인기 5위', ownerPick: false, name: '치즈 떡볶이',            desc: '쫄깃한 떡볶이에 치즈 듬뿍',     price:  6500, reviews: 12, emoji: '🧀', bg: '#FFFDE7' },
  { id: 6, rank: '인기 6위', ownerPick: false, name: '모둠 튀김',              desc: '바삭바삭한 모둠 튀김 세트',      price:  7000, reviews:  9, emoji: '🍤', bg: '#FBE9E7' },
];

const mockReviews = [
  { id: 1, rating: 5, text: '양도 푸짐하고 따뜻하게 왔네요^^ 떡도 쫄깃하니 맛있네요...', emoji: '🍱', bg: '#FFF3CD' },
  { id: 2, rating: 5, text: '배달도 빠르고 맛있어요! 떡볶이가 특히 맛있었어요 재주문 의사 100%', emoji: '🌶️', bg: '#FFE4E4' },
];

const RestaurantDetailPage = ({ restaurant, onBack, onAddToCart }) => {
  const [menuItems, setMenuItems]       = useState([]);
  const [menuLoading, setMenuLoading]   = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState('인기 메뉴');
  const [liked, setLiked]               = useState(false);
  const [showReviews, setShowReviews]   = useState(false);

  useEffect(() => {
    if (restaurant?.id) fetchMenus(restaurant.id);
  }, [restaurant?.id]);

  const fetchMenus = async (restaurantId) => {
    setMenuLoading(true);
    try {
      const data = await restaurantApi.getMenus(restaurantId);
      // 백엔드 Menu 엔티티 → 프론트 형식 변환
      const mapped = data.map((m, i) => ({
        id:        m.id,
        rank:      `인기 ${i + 1}위`,
        ownerPick: m.ownerPick ?? m.isOwnerPick ?? false,
        name:      m.name,
        desc:      m.description || '',
        price:     m.price,
        reviews:   m.reviewCount || 0,
        emoji:     m.emoji || '🍽️',
        bg:        m.bgColor || '#F5F5F5',
      }));
      setMenuItems(mapped.length > 0 ? mapped : mockMenuItems);
    } catch {
      setMenuItems(mockMenuItems);
    } finally {
      setMenuLoading(false);
    }
  };

  if (showReviews) {
    return <ReviewPage restaurant={restaurant} onBack={() => setShowReviews(false)} />;
  }

  const s = {
    page: { background: '#fff', minHeight: '100vh', paddingBottom: 80 },
    heroArea: { position: 'relative', height: 240, background: 'linear-gradient(135deg, #f5d98b, #e8c46a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96, overflow: 'hidden' },
    heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 50%)' },
    topBar: { position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', zIndex: 10 },
    iconBtn: { width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#fff' },
    topRight: { display: 'flex', gap: 8 },
    togetherBtn: { position: 'absolute', bottom: 12, right: 16, background: '#fff', border: 'none', borderRadius: 20, padding: '7px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' },
    infoSection: { padding: '16px 16px 0' },
    clubBadge: { display: 'inline-flex', alignItems: 'center', gap: 4, background: '#3D1EB2', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, marginBottom: 10 },
    nameRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
    storeName: { fontSize: 24, fontWeight: 900, color: '#1A1A1A' },
    likeBtn: { background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' },
    ratingRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
    ratingLeft: { display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' },
    star: { color: '#FFB800', fontSize: 16, fontWeight: 700 },
    ratingText: { fontSize: 15, fontWeight: 700, color: '#1A1A1A' },
    ratingArrow: { fontSize: 13, color: '#888' },
    storeInfoLink: { fontSize: 12, color: '#888', textDecoration: 'underline' },
    deliveryBox: { border: '1px solid #eee', borderRadius: 12, padding: '14px 16px', marginBottom: 14 },
    deliveryRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    deliveryLabel: { fontSize: 13, color: '#666', width: 70 },
    deliveryValue: { fontSize: 13, fontWeight: 700, color: '#1A1A1A' },
    fastText: { fontSize: 12, color: '#29D3C4', fontWeight: 700 },
    freeDelivery: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: '#3D1EB2' },
    strikethrough: { textDecoration: 'line-through', color: '#aaa', fontSize: 12, fontWeight: 400 },
    chevronBtn: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#888' },
    reviewScroll: { display: 'flex', gap: 10, overflowX: 'auto', padding: '0 16px 14px', scrollbarWidth: 'none' },
    reviewCard: { flexShrink: 0, width: 280, display: 'flex', gap: 10, background: '#F8F8F8', borderRadius: 12, padding: 12, cursor: 'pointer' },
    reviewImg: { width: 56, height: 56, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 },
    reviewStars: { color: '#FFB800', fontSize: 12, marginBottom: 4 },
    reviewText: { fontSize: 12, color: '#444', lineHeight: 1.5 },
    ownerNotice: { margin: '0 16px 16px', background: '#F5F5F5', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#555', display: 'flex', alignItems: 'center', gap: 6 },
    divider: { height: 8, background: '#F5F5F5' },
    categoryTabs: { display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 10 },
    searchTabBtn: { width: 36, height: 36, borderRadius: '50%', border: '1px solid #ddd', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, flexShrink: 0 },
    catTab: (active) => ({ padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, background: active ? '#1A1A1A' : '#fff', color: active ? '#fff' : '#555', border: active ? 'none' : '1px solid #ddd', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }),
    menuSectionTitle: { padding: '16px 16px 4px', fontSize: 18, fontWeight: 900, color: '#1A1A1A' },
    menuSectionSub: { padding: '0 16px 12px', fontSize: 12, color: '#888' },
    menuItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #F5F5F5', cursor: 'pointer' },
    menuInfo: { flex: 1 },
    menuTags: { display: 'flex', gap: 6, marginBottom: 4 },
    menuTag: (color) => ({ fontSize: 10, fontWeight: 700, color, background: `${color}18`, padding: '2px 7px', borderRadius: 4 }),
    menuName: { fontSize: 15, fontWeight: 800, color: '#1A1A1A', marginBottom: 3 },
    menuDesc: { fontSize: 12, color: '#888', marginBottom: 6, lineHeight: 1.4 },
    menuPrice: { fontSize: 15, fontWeight: 900, color: '#1A1A1A' },
    menuReviews: { fontSize: 11, color: '#888', marginTop: 2 },
    menuImgWrap: { position: 'relative', flexShrink: 0 },
    menuImg: (bg) => ({ width: 90, height: 90, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }),
    addBtn: { position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '1.5px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' },
    loadingMenu: { textAlign: 'center', padding: '40px 0', color: '#aaa', fontSize: 14 },
  };

  return (
      <div style={s.page}>
        {/* Hero */}
        <div style={{ ...s.heroArea, background: restaurant.bg }}>
          <span>{restaurant.img}</span>
          <div style={s.heroOverlay} />
          <div style={s.topBar}>
            <button style={s.iconBtn} onClick={onBack}>←</button>
            <div style={s.topRight}>
              <button style={s.iconBtn}>⬆</button>
              <button style={s.iconBtn}>🔍</button>
              <button style={s.iconBtn}>🛒</button>
            </div>
          </div>
          <button style={s.togetherBtn}><span>👥</span> 함께주문</button>
        </div>

        {/* 가게 정보 */}
        <div style={s.infoSection}>
          <div style={s.clubBadge}><span>🏆</span> 배민클럽 배달팁 무료</div>
          <div style={s.nameRow}>
            <div style={s.storeName}>{restaurant.name}</div>
            <button style={s.likeBtn} onClick={() => setLiked(!liked)}>{liked ? '❤️' : '🤍'}</button>
          </div>
          <div style={s.ratingRow}>
            <div style={s.ratingLeft} onClick={() => setShowReviews(true)}>
              <span style={s.star}>★</span>
              <span style={s.ratingText}>{restaurant.rating}(67)</span>
              <span style={s.ratingArrow}> ›</span>
            </div>
            <span style={s.storeInfoLink}>가게정보·원산지</span>
          </div>
          <div style={s.deliveryBox}>
            <div style={s.deliveryRow}>
              <span style={s.deliveryLabel}>최소주문</span>
              <span style={s.deliveryValue}>{restaurant.minOrder}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: '#29D3C4', fontWeight: 700 }}>배달 안내</span>
            </div>
            <div style={{ ...s.deliveryRow, marginBottom: 0 }}>
              <span style={s.deliveryLabel}>알뜰배달 🛵</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={s.deliveryValue}>36~51분</span>
                <span style={s.fastText}>가장 저렴해요</span>
              </div>
              <button style={s.chevronBtn}>⌄</button>
            </div>
            <div style={{ paddingLeft: 70, marginTop: 4 }}>
              <div style={s.freeDelivery}>
                <span>🏆</span>
                <span>배달팁 {restaurant.deliveryFee === '무료' ? '무료' : restaurant.deliveryFee}</span>
                {restaurant.deliveryFee === '무료' && <span style={s.strikethrough}>4,100원</span>}
              </div>
            </div>
          </div>
        </div>

        {/* 리뷰 스크롤 */}
        <div style={s.reviewScroll}>
          {mockReviews.map((r) => (
              <div key={r.id} style={s.reviewCard} onClick={() => setShowReviews(true)}>
                <div style={{ ...s.reviewImg, background: r.bg }}>{r.emoji}</div>
                <div>
                  <div style={s.reviewStars}>{'★'.repeat(r.rating)}</div>
                  <div style={s.reviewText}>{r.text}</div>
                </div>
              </div>
          ))}
        </div>

        <div style={s.ownerNotice}><span>📢</span><span>{restaurant.ownerNotice || '저희 가게를 찾아주셔서 감사합니다!'}</span></div>
        <div style={s.divider} />

        {/* 카테고리 탭 */}
        <div style={s.categoryTabs}>
          <button style={s.searchTabBtn}>🔍</button>
          {menuCategories.map((cat) => (
              <button key={cat} style={s.catTab(activeCategory === cat)} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
          ))}
        </div>

        {/* 메뉴 목록 */}
        <div style={s.menuSectionTitle}>가장 인기 있는 메뉴</div>
        <div style={s.menuSectionSub}>한 달간 주문수가 많고 만족도가 높은 메뉴예요.</div>

        {menuLoading ? (
            <div style={s.loadingMenu}>메뉴를 불러오는 중... 🍽️</div>
        ) : (
            menuItems.map((item) => (
                <div key={item.id} style={s.menuItem} onClick={() => setSelectedMenu(item)}>
                  <div style={s.menuInfo}>
                    <div style={s.menuTags}>
                      <span style={s.menuTag('#888')}>{item.rank}</span>
                      {item.ownerPick && <span style={s.menuTag('#29D3C4')}>사장님 추천</span>}
                    </div>
                    <div style={s.menuName}>{item.name}</div>
                    <div style={s.menuDesc}>{item.desc}</div>
                    <div style={s.menuPrice}>{item.price.toLocaleString()}원</div>
                    <div style={s.menuReviews}>리뷰 {item.reviews}</div>
                  </div>
                  <div style={s.menuImgWrap}>
                    <div style={s.menuImg(item.bg)}>{item.emoji}</div>
                    <button style={s.addBtn} onClick={(e) => { e.stopPropagation(); setSelectedMenu(item); }}>+</button>
                  </div>
                </div>
            ))
        )}

        {selectedMenu && (
            <MenuDetailModal
                menu={selectedMenu}
                restaurant={restaurant}
                onClose={() => setSelectedMenu(null)}
                onAddToCart={(item, qty) => {
                  onAddToCart(item, qty);
                  setSelectedMenu(null);
                }}
            />
        )}
      </div>
  );
};

export default RestaurantDetailPage;