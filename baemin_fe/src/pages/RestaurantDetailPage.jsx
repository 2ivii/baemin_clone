import { useState, useEffect } from "react";
import { IoArrowBack, IoShareSocialOutline, IoSearchOutline, IoBagOutline, IoHeartOutline, IoHeartSharp, IoStar, IoChevronDown, IoChevronForward, IoCheckmarkCircle } from "react-icons/io5";
import { MdPeopleAlt, MdVerified } from "react-icons/md";
import MenuDetailModal from "../components/MenuDetailModal";
import ReviewPage from "./ReviewPage";
import { restaurantApi } from "../api/restaurantApi";

const MENU_CATEGORIES = ["인기 메뉴", "우아한 분식", "바삭 튀김류", "분식 세트"];

const MOCK_MENUS = [
  { id:1, rank:"인기 1위", ownerPick:true,  name:"우아한 순대세트",     desc:"떡볶이\n순대 ...",         price:16000, reviews:54, emoji:"🍱", bg:"#FFF3CD" },
  { id:2, rank:"인기 2위", ownerPick:true,  name:"우아한 꼬마김밥 6줄", desc:"포장마차 원조 꼬마김밥",   price:5000,  reviews:6,  emoji:"🍙", bg:"#E8F5E9" },
];

const MOCK_REVIEWS = [
  { id:1, rating:5, text:"양도 푸짐하고 따뜻하게 왔네요^^ 떡도 쫄깃하니 맛있네요...", bg:"#FFF3CD" },
  { id:2, rating:5, text:"배달도 빠르고 맛있어요! 떡볶이가 특히 맛있었어요 재주문 의사 100%", bg:"#FFE4E4" },
];

const RestaurantDetailPage = ({ restaurant, onBack, onAddToCart }) => {
  const [menuItems, setMenuItems]       = useState([]);
  const [menuLoading, setMenuLoading]   = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState("인기 메뉴");
  const [liked, setLiked]               = useState(false);
  const [showReviews, setShowReviews]   = useState(false);

  useEffect(() => {
    if (!restaurant?.id) { setMenuItems(MOCK_MENUS); setMenuLoading(false); return; }
    restaurantApi.getMenus(restaurant.id)
        .then((data) => {
          const mapped = data.map((m, i) => ({
            id: m.id, rank: `인기 ${i+1}위`,
            ownerPick: m.ownerPick ?? m.isOwnerPick ?? false,
            name: m.name, desc: m.description || "",
            price: m.price, reviews: m.reviewCount || 0,
            emoji: m.emoji || "🍽️", bg: m.bgColor || "#F5F5F5",
          }));
          setMenuItems(mapped.length > 0 ? mapped : MOCK_MENUS);
        })
        .catch(() => setMenuItems(MOCK_MENUS))
        .finally(() => setMenuLoading(false));
  }, [restaurant?.id]);

  if (showReviews) return <ReviewPage restaurant={restaurant} onBack={() => setShowReviews(false)} />;

  const iconBtn = { width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,0.35)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" };
  const menuTag = (color) => ({ fontSize:10, fontWeight:700, color, background:`${color}18`, padding:"2px 7px", borderRadius:4 });

  const s = {
    page:      { background:"#fff", minHeight:"100vh", paddingBottom:80 },
    heroArea:  { position:"relative", height:240, background: restaurant.bg || "linear-gradient(135deg,#f5d98b,#e8c46a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:96, overflow:"hidden" },
    heroOverlay:{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0) 50%)" },
    topBar:    { position:"absolute", top:0, left:0, right:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", zIndex:10 },
    topRight:  { display:"flex", gap:8 },
    togetherBtn:{ position:"absolute", bottom:12, right:16, background:"#fff", border:"none", borderRadius:20, padding:"7px 14px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, boxShadow:"0 2px 8px rgba(0,0,0,0.15)" },
    infoSection:{ padding:"16px 16px 0" },
    clubBadge: { display:"inline-flex", alignItems:"center", gap:4, background:"#3D1EB2", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:6, marginBottom:10 },
    nameRow:   { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 },
    storeName: { fontSize:24, fontWeight:900, color:"#1A1A1A" },
    likeBtn:   { background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center" },
    ratingRow: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 },
    ratingLeft:{ display:"flex", alignItems:"center", gap:4, cursor:"pointer" },
    ratingText:{ fontSize:15, fontWeight:700, color:"#1A1A1A" },
    infoLink:  { fontSize:12, color:"#888", textDecoration:"underline" },
    delivBox:  { border:"1px solid #eee", borderRadius:12, padding:"14px 16px", marginBottom:14 },
    dRow:      { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 },
    dLabel:    { fontSize:13, color:"#666", width:70 },
    dValue:    { fontSize:13, fontWeight:700, color:"#1A1A1A" },
    fastTxt:   { fontSize:12, color:"#29D3C4", fontWeight:700 },
    freeBadge: { display:"flex", alignItems:"center", gap:4, fontSize:13, fontWeight:700, color:"#3D1EB2" },
    strikethrough:{ textDecoration:"line-through", color:"#aaa", fontSize:12, fontWeight:400 },
    reviewScroll:{ display:"flex", gap:10, overflowX:"auto", padding:"0 16px 14px", scrollbarWidth:"none" },
    reviewCard:{ flexShrink:0, width:280, display:"flex", gap:10, background:"#F8F8F8", borderRadius:12, padding:12, cursor:"pointer" },
    reviewImg: { width:56, height:56, borderRadius:8, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 },
    ownerNotice:{ margin:"0 16px 16px", background:"#F5F5F5", borderRadius:10, padding:"12px 14px", fontSize:13, color:"#555", display:"flex", alignItems:"center", gap:6 },
    divider:   { height:8, background:"#F5F5F5" },
    catTabs:   { display:"flex", gap:8, padding:"12px 16px", overflowX:"auto", scrollbarWidth:"none", borderBottom:"1px solid #eee", position:"sticky", top:0, background:"#fff", zIndex:10 },
    searchTabBtn:{ width:36, height:36, borderRadius:"50%", border:"1px solid #ddd", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 },
    catTab: (a) => ({ padding:"8px 16px", borderRadius:20, fontSize:13, fontWeight:700, background:a?"#1A1A1A":"#fff", color:a?"#fff":"#555", border:a?"none":"1px solid #ddd", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }),
    secTitle:  { padding:"16px 16px 4px", fontSize:18, fontWeight:900, color:"#1A1A1A" },
    secSub:    { padding:"0 16px 12px", fontSize:12, color:"#888" },
    menuItem:  { display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom:"1px solid #F5F5F5", cursor:"pointer" },
    menuInfo:  { flex:1 },
    menuTags:  { display:"flex", gap:6, marginBottom:4 },
    menuName:  { fontSize:15, fontWeight:800, color:"#1A1A1A", marginBottom:3 },
    menuDesc:  { fontSize:12, color:"#888", marginBottom:6, lineHeight:1.4 },
    menuPrice: { fontSize:15, fontWeight:900, color:"#1A1A1A" },
    menuReviews:{ fontSize:11, color:"#888", marginTop:2 },
    menuImgWrap:{ position:"relative", flexShrink:0 },
    menuImg: (bg) => ({ width:90, height:90, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:44 }),
    addBtn:    { position:"absolute", bottom:-4, right:-4, width:28, height:28, borderRadius:"50%", background:"#fff", border:"1.5px solid #ddd", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:700, cursor:"pointer", boxShadow:"0 1px 4px rgba(0,0,0,0.12)" },
    loadingMenu:{ textAlign:"center", padding:"40px 0", color:"#aaa", fontSize:14 },
  };

  return (
      <div style={s.page}>
        <div style={s.heroArea}>
          <span>{restaurant.img}</span>
          <div style={s.heroOverlay} />
          <div style={s.topBar}>
            <button style={iconBtn} onClick={onBack}><IoArrowBack size={20} color="#fff" /></button>
            <div style={s.topRight}>
              <button style={iconBtn}><IoShareSocialOutline size={18} color="#fff" /></button>
              <button style={iconBtn}><IoSearchOutline      size={18} color="#fff" /></button>
              <button style={iconBtn}><IoBagOutline         size={18} color="#fff" /></button>
            </div>
          </div>
          <button style={s.togetherBtn}>
            <MdPeopleAlt size={16} color="#555" /> 함께주문
          </button>
        </div>

        <div style={s.infoSection}>
          {/*<div style={s.clubBadge}><MdVerified size={13} /> 배민클럽 배달팁 무료</div>*/}
          <div style={s.nameRow}>
            <div style={s.storeName}>{restaurant.name}</div>
            <button style={s.likeBtn} onClick={() => setLiked(!liked)}>
              {liked ? <IoHeartSharp size={26} color="#FF3B30" /> : <IoHeartOutline size={26} color="#ccc" />}
            </button>
          </div>
          <div style={s.ratingRow}>
            <div style={s.ratingLeft} onClick={() => setShowReviews(true)}>
              <IoStar size={16} color="#FFB800" />
              <span style={s.ratingText}>{restaurant.rating}(67)</span>
              <IoChevronForward size={15} color="#888" />
            </div>
            <span style={s.infoLink}>가게정보·원산지</span>
          </div>

          <div style={s.delivBox}>
            <div style={s.dRow}>
              <span style={s.dLabel}>최소주문</span>
              <span style={s.dValue}>{restaurant.minOrder}</span>
              <span style={{ marginLeft:"auto", fontSize:12, color:"#29D3C4", fontWeight:700 }}>배달 안내</span>
            </div>
            <div style={{ ...s.dRow, marginBottom:0 }}>
              <span style={s.dLabel}>알뜰배달 🛵</span>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={s.dValue}>36~51분</span>
                {/*<span style={s.fastTxt}>가장 저렴해요</span>*/}
              </div>
              <IoChevronDown size={18} color="#888" />
            </div>
            <div style={{ paddingLeft:70, marginTop:4 }}>
              <div style={s.freeBadge}>
                {/*<MdVerified size={14} color="#3D1EB2" />*/}
                {/*<span>배달팁 {restaurant.deliveryFee === "무료" ? "무료" : restaurant.deliveryFee}</span>*/}
                {/*{restaurant.deliveryFee === "무료" && <span style={s.strikethrough}>4,100원</span>}*/}
              </div>
            </div>
          </div>
        </div>

        {/* 리뷰 스크롤 */}
        <div style={s.reviewScroll}>
          {MOCK_REVIEWS.map((r) => (
              <div key={r.id} style={s.reviewCard} onClick={() => setShowReviews(true)}>
                <div style={{ ...s.reviewImg, background:r.bg }}>{r.emoji}</div>
                <div>
                  <div style={{ color:"#FFB800", fontSize:12, marginBottom:4 }}>{"★".repeat(r.rating)}</div>
                  <div style={{ fontSize:12, color:"#444", lineHeight:1.5 }}>{r.text}</div>
                </div>
              </div>
          ))}
        </div>

        <div style={s.ownerNotice}>
          <IoCheckmarkCircle size={16} color="#29D3C4" />
          <span>{restaurant.ownerNotice || "저희 가게를 찾아주셔서 감사합니다!"}</span>
        </div>
        <div style={s.divider} />

        {/* 카테고리 탭 */}
        <div style={s.catTabs}>
          <button style={s.searchTabBtn}><IoSearchOutline size={16} color="#555" /></button>
          {MENU_CATEGORIES.map((cat) => (
              <button key={cat} style={s.catTab(activeCategory === cat)} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>

        <div style={s.secTitle}>가장 인기 있는 메뉴</div>
        <div style={s.secSub}>한 달간 주문수가 많고 만족도가 높은 메뉴예요.</div>

        {menuLoading ? (
            <div style={s.loadingMenu}>메뉴를 불러오는 중... 🍽️</div>
        ) : menuItems.map((item) => (
            <div key={item.id} style={s.menuItem} onClick={() => setSelectedMenu(item)}>
              <div style={s.menuInfo}>
                <div style={s.menuTags}>
                  <span style={menuTag("#888")}>{item.rank}</span>
                  {item.ownerPick && <span style={menuTag("#29D3C4")}>사장님 추천</span>}
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
        ))}

        {selectedMenu && (
            <MenuDetailModal
                menu={selectedMenu}
                restaurant={restaurant}
                onClose={() => setSelectedMenu(null)}
                onAddToCart={(item, qty) => { onAddToCart(item, qty); setSelectedMenu(null); }}
            />
        )}
      </div>
  );
};

export default RestaurantDetailPage;