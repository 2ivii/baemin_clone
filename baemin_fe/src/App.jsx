import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import CartModal from "./components/CartModal";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import OrderPage from "./pages/OrderPage";
import MyPage from "./pages/MyPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import CouponPage from "./pages/CouponPage";
import MyReviewPage from "./pages/MyReviewPage";
import AddressSettingPage from "./pages/AddressSettingPage";
import AddressEditPage from "./pages/AddressEditPage";
import { initialCartItems } from "./data/mockData";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState(initialCartItems);
  const [showCart, setShowCart] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  // null | "coupon" | "myreview" | "address-setting" | "address-edit"
  const [subPage, setSubPage] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
        prev
            .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
            .filter((item) => item.qty > 0)
    );
  };

  const handleAddToCart = (item, qty) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + qty } : c);
      }
      return [...prev, { ...item, qty }];
    });
  };

  const handleTabChange = (tab) => {
    setSelectedRestaurant(null);
    setSubPage(null);
    setActiveTab(tab);
  };

  const isDetailPage = !!selectedRestaurant;
  const isSubPage = !!subPage;
  const hideChrome = isDetailPage || isSubPage;

  const renderPage = () => {
    // 서브페이지
    if (subPage === "coupon") {
      return <CouponPage />;
    }
    if (subPage === "myreview") {
      return <MyReviewPage onBack={() => setSubPage(null)} />;
    }
    if (subPage === "address-setting") {
      return (
          <AddressSettingPage
              onBack={() => setSubPage(null)}
              onEdit={() => setSubPage("address-edit")}
          />
      );
    }
    if (subPage === "address-edit") {
      return (
          <AddressEditPage
              onBack={() => setSubPage("address-setting")}
          />
      );
    }

    if (isDetailPage) {
      return (
          <RestaurantDetailPage
              restaurant={selectedRestaurant}
              onBack={() => setSelectedRestaurant(null)}
              onAddToCart={handleAddToCart}
          />
      );
    }

    switch (activeTab) {
      case "home":
        return <HomePage onSelectRestaurant={setSelectedRestaurant} />;
      case "fav":
        return <FavoritePage onSelectRestaurant={setSelectedRestaurant} />;
      case "order":
        return <OrderPage />;
      case "my":
        return (
            <MyPage
                onCoupon={() => setSubPage("coupon")}
                onReview={() => setSubPage("myreview")}
                onAddress={() => setSubPage("address-edit")}
            />
        );
      default:
        return <HomePage onSelectRestaurant={setSelectedRestaurant} />;
    }
  };

  // 쿠폰페이지는 자체 헤더 없으므로 서브 헤더 추가
  const renderSubHeader = () => {
    if (subPage === "coupon") {
      return (
          <div style={{
            background: "#fff",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}>
            <button
                onClick={() => setSubPage(null)}
                style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#1A1A1A" }}
            >
              ←
            </button>
            <span style={{ fontSize: 17, fontWeight: 800, color: "#1A1A1A" }}>쿠폰함</span>
          </div>
      );
    }
    return null;
  };

  const styles = {
    app: {
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      background: "#F5F5F5",
      fontFamily: "'Noto Sans KR', sans-serif",
      position: "relative",
    },
    scrollContent: {
      paddingBottom: hideChrome ? 0 : 80,
      overflowY: "auto",
      maxHeight: hideChrome ? "100vh" : "calc(100vh - 56px)",
    },
  };

  return (
      <>
        <link
            href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
        />
        <div style={styles.app}>
          {!hideChrome && (
              <Header
                  cartCount={cartCount}
                  onCartClick={() => setShowCart(true)}
                  onAddressClick={() => setSubPage("address-setting")}
              />
          )}
          {renderSubHeader()}
          <div style={styles.scrollContent}>{renderPage()}</div>
          {!hideChrome && (
              <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          )}
          {showCart && (
              <CartModal
                  cart={cart}
                  onClose={() => setShowCart(false)}
                  onUpdateQty={handleUpdateQty}
              />
          )}
        </div>
      </>
  );
};

export default App;