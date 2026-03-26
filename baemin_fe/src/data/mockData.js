export const categories = [
  { id: 1, icon: "🍗", label: "치킨" },
  { id: 2, icon: "🍕", label: "피자" },
  { id: 3, icon: "🍜", label: "중식" },
  { id: 4, icon: "🍣", label: "일식" },
  { id: 5, icon: "🍔", label: "버거" },
  { id: 6, icon: "🥗", label: "샐러드" },
  { id: 7, icon: "🥩", label: "고기" },
  { id: 8, icon: "🥐", label: "카페/디저트" },
  { id: 9, icon: "🍱", label: "도시락" },
  { id: 10, icon: "🌮", label: "분식" },
];

export const banners = [
  { id: 1, bg: "#29D3C4", text: "오늘의 특가 ", sub: "최대 50% 할인" },
  { id: 2, bg: "#FF6B6B", text: "신규 가입 혜택 ", sub: "첫 주문 3,000원 할인" },
  { id: 3, bg: "#6C63FF", text: "배민클럽 가입 ", sub: "무제한 무료배달" },
];

export const restaurants = [
  {
    id: 1, name: "굽네치킨 마포점", category: "치킨",
    rating: 4.8, reviews: 2341, deliveryTime: "20~30분",
    minOrder: "15,000원", deliveryFee: "무료",
    tags: ["사장님추천", "많이 주문해요"],
    img: "🍗", bg: "#FFF3CD",
  },
  {
    id: 2, name: "도미노피자 홍대점", category: "피자",
    rating: 4.6, reviews: 1823, deliveryTime: "25~35분",
    minOrder: "20,000원", deliveryFee: "1,000원",
    tags: ["신메뉴", "할인중"],
    img: "🍕", bg: "#FFE4E4",
  },
  {
    id: 3, name: "이삭토스트 신촌점", category: "분식",
    rating: 4.9, reviews: 987, deliveryTime: "15~25분",
    minOrder: "10,000원", deliveryFee: "무료",
    tags: ["빠른배달", "재주문 높아요"],
    img: "🥪", bg: "#E4F5E4",
  },
  {
    id: 4, name: "교촌치킨 연남점", category: "치킨",
    rating: 4.7, reviews: 3102, deliveryTime: "30~40분",
    minOrder: "18,000원", deliveryFee: "무료",
    tags: ["사장님추천"],
    img: "🍖", bg: "#FFF3CD",
  },
  {
    id: 5, name: "버거킹 홍대점", category: "버거",
    rating: 4.5, reviews: 756, deliveryTime: "20~30분",
    minOrder: "12,000원", deliveryFee: "2,000원",
    tags: ["할인중", "신메뉴"],
    img: "🍔", bg: "#FFE8D6",
  },
  {
    id: 6, name: "스시로 마포점", category: "일식",
    rating: 4.8, reviews: 1245, deliveryTime: "35~45분",
    minOrder: "25,000원", deliveryFee: "무료",
    tags: ["많이 주문해요", "재주문 높아요"],
    img: "🍱", bg: "#E8F4FD",
  },
];

export const initialCartItems = [
  { id: 1, name: "황올 + 레드윙 콤보", price: 23000, qty: 1 },
  { id: 2, name: "콜라 1.25L", price: 2500, qty: 2 },
];

export const navTabs = [
  { id: "home",    icon: "🏠",  label: "홈" },
  { id: "fav",     icon: "❤️",  label: "찜" },
  { id: "order",   icon: "📋",  label: "주문내역" },
  { id: "my",      icon: "👤",  label: "마이배민" },
];

export const filters = ["전체", "최소주문금액순", "배달빠른순", "별점높은순", "리뷰많은순", "가까운순"];
