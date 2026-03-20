import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import CartModal from "./components/CartModal";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import CouponPage from "./pages/CouponPage";
import MyPage from "./pages/MyPage";
import { initialCartItems } from "./data/mockData";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState(initialCartItems);
  const [showCart, setShowCart] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const renderPage = () => {
    switch (activeTab) {
      case "home":    return <HomePage />;
      case "order":   return <OrderPage />;
      case "coupon":  return <CouponPage />;
      case "my":      return <MyPage />;
      default:        return <HomePage />;
    }
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
      paddingBottom: 80,
      overflowY: "auto",
      maxHeight: "calc(100vh - 56px)",
    },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <div style={styles.app}>
        <Header
          cartCount={cartCount}
          onCartClick={() => setShowCart(true)}
        />
        <div style={styles.scrollContent}>{renderPage()}</div>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
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
