import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

import Header               from './components/Header';
import BottomNav            from './components/BottomNav';
import CartModal            from './components/CartModal';
import HomePage             from './pages/HomePage';
import FavoritePage         from './pages/FavoritePage';
import OrderPage            from './pages/OrderPage';
import MyPage               from './pages/MyPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CouponPage           from './pages/CouponPage';
import MyReviewPage         from './pages/MyReviewPage';
import AddressSettingPage   from './pages/AddressSettingPage';
import AddressEditPage      from './pages/AddressEditPage';
import LoginPage            from './pages/LoginPage';
import OwnerDashboard       from './pages/owner/OwnerDashboard';

const UserApp = ({ user, logout }) => {
    const { cartCount } = useCart();
    const [activeTab, setActiveTab]               = useState('home');
    const [showCart, setShowCart]                 = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [subPage, setSubPage]                   = useState(null);

    const handleTabChange = (tab) => {
        setSelectedRestaurant(null);
        setSubPage(null);
        setActiveTab(tab);
    };

    const handleOrderSuccess = () => {
        setShowCart(false);
        setSelectedRestaurant(null);
        setSubPage(null);
        setActiveTab('order');
    };

    const isDetail   = !!selectedRestaurant;
    const isSub      = !!subPage;
    const hideChrome = isDetail || isSub;

    const renderPage = () => {
        if (subPage === 'coupon')          return <CouponPage />;
        if (subPage === 'myreview')        return <MyReviewPage onBack={() => setSubPage(null)} />;
        if (subPage === 'address-setting') return (
            <AddressSettingPage onBack={() => setSubPage(null)} onEdit={() => setSubPage('address-edit')} />
        );
        if (subPage === 'address-edit')    return <AddressEditPage onBack={() => setSubPage('address-setting')} />;
        if (isDetail)                      return (
            <RestaurantDetailPage
                restaurant={selectedRestaurant}
                onBack={() => setSelectedRestaurant(null)}
                onCartClick={() => setShowCart(true)}
            />
        );
        switch (activeTab) {
            case 'home':  return <HomePage onSelectRestaurant={setSelectedRestaurant} />;
            case 'fav':   return <FavoritePage onSelectRestaurant={setSelectedRestaurant} />;
            case 'order': return <OrderPage />;
            case 'my':    return (
                <MyPage
                    user={user}
                    onCoupon={()  => setSubPage('coupon')}
                    onReview={()  => setSubPage('myreview')}
                    onAddress={()  => setSubPage('address-setting')}
                    onLogout={logout}
                />
            );
            default: return <HomePage onSelectRestaurant={setSelectedRestaurant} />;
        }
    };

    const renderSubHeader = () => {
        if (subPage === 'coupon') return (
            <div style={{ background:'#fff', padding:'14px 16px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #f0f0f0', position:'sticky', top:0, zIndex:100 }}>
                <button onClick={() => setSubPage(null)} style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#1A1A1A' }}>←</button>
                <span style={{ fontSize:17, fontWeight:800 }}>쿠폰함</span>
            </div>
        );
        return null;
    };

    return (
        <div style={{ maxWidth:430, margin:'0 auto', minHeight:'100vh', background:'#F5F5F5', fontFamily:"'Noto Sans KR', sans-serif", position:'relative' }}>
            {!hideChrome && (
                <Header
                    cartCount={cartCount}
                    onCartClick={() => setShowCart(true)}
                    onAddressClick={() => setSubPage('address-setting')}
                />
            )}
            {renderSubHeader()}
            <div style={{ paddingBottom: hideChrome ? 0 : 80, overflowY:'auto', maxHeight: hideChrome ? '100vh' : 'calc(100vh - 56px)' }}>
                {renderPage()}
            </div>
            {!hideChrome && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />}
            {showCart && (
                <CartModal
                    onClose={() => setShowCart(false)}
                    onOrderSuccess={handleOrderSuccess}
                />
            )}
        </div>
    );
};

const AppInner = () => {
    const { isLoggedIn, user, logout } = useAuth();

    if (!isLoggedIn) {
        return (
            <div style={{ maxWidth:430, margin:'0 auto', minHeight:'100vh', fontFamily:"'Noto Sans KR', sans-serif" }}>
                <LoginPage onLoginSuccess={() => {}} />
            </div>
        );
    }

    if (user?.role === 'OWNER') {
        return <OwnerDashboard user={user} onLogout={logout} />;
    }

    return <UserApp user={user} logout={logout} />;
};

const App = () => (
    <>
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <AuthProvider>
            <CartProvider>
                <AppInner />
            </CartProvider>
        </AuthProvider>
    </>
);

export default App;