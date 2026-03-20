import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import CartModal from "./components/CartModal";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import OrderPage from "./pages/OrderPage";
import MyPage from "./pages/MyPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import { initialCartItems } from "./data/mockData";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState(initialCartItems);
  const [showCart, setShowCart] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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
    setActiveTab(tab);
  };

  const isDetailPage = !!selectedRestaurant;

  const renderPage = () => {
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
      case "home":  return <HomePage onSelectRestaurant={setSelectedRestaurant} />;
      case "fav":   return <FavoritePage onSelectRestaurant={setSelectedRestaurant} />;
      case "order": return <OrderPage />;
      case "my":    return <MyPage />;
      default:      return <HomePage onSelectRestaurant={setSelectedRestaurant} />;
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
      paddingBottom: isDetailPage ? 0 : 80,
      overflowY: "auto",
      maxHeight: isDetailPage ? "100vh" : "calc(100vh - 56px)",
    },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <div style={styles.app}>
        {!isDetailPage && (
          <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />
        )}
        <div style={styles.scrollContent}>{renderPage()}</div>
        {!isDetailPage && (
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
