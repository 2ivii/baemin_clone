import { useState, useEffect } from 'react';
import { orderApi } from '../api/orderApi';

const MENU_ITEMS = [
  { icon: '🏠', label: '배달 주소 관리' },
  { icon: '⭐', label: '리뷰 관리'       },
  { icon: '🎟️', label: '쿠폰함'          },
  { icon: '📞', label: '고객센터'         },
];

const MyPage = ({ user, onCoupon, onReview, onAddress, onLogout }) => {
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    orderApi.getMyOrders(0, 1)
        .then((res) => setOrderCount(res?.totalElements ?? 0))
        .catch(() => setOrderCount(0));
  }, []);

  const handleMenuClick = (label) => {
    if (label === '쿠폰함')        onCoupon?.();
    if (label === '리뷰 관리')     onReview?.();
    if (label === '배달 주소 관리') onAddress?.();
  };

  const s = {
    container:  { paddingBottom: 16 },
    profile:    { background: 'linear-gradient(135deg, #29D3C4, #1BB8AB)', padding: '28px 20px 24px', display: 'flex', alignItems: 'center', gap: 16 },
    avatar:     { width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 },
    name:       { fontSize: 18, fontWeight: 800, color: '#fff' },
    sub:        { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
    editBtn:    { marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 20, cursor: 'pointer' },
    statsRow:   { display: 'flex', background: '#fff', padding: '16px 0', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: 12 },
    stat:       { flex: 1, textAlign: 'center' },
    statNum:    { fontSize: 20, fontWeight: 900, color: '#29D3C4' },
    statLabel:  { fontSize: 11, color: '#888', marginTop: 2 },
    section:    { background: '#fff', marginBottom: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' },
    menuItem:   { display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderBottom: '1px solid #f5f5f5', cursor: 'pointer' },
    menuIcon:   { fontSize: 20 },
    menuLabel:  { fontSize: 14, fontWeight: 600, color: '#1A1A1A' },
    arrow:      { marginLeft: 'auto', color: '#ccc', fontSize: 16 },
    logoutBtn:  { margin: '16px', width: 'calc(100% - 32px)', padding: '14px', background: 'none', border: '2px solid #eee', borderRadius: 12, color: '#888', fontWeight: 700, fontSize: 14, cursor: 'pointer' },
  };

  const stats = [
    { num: orderCount ?? '…', label: '주문' },
    { num: '3',               label: '쿠폰' },
    { num: '5',               label: '찜한가게' },
  ];

  return (
      <div style={s.container}>
        {/* 프로필 */}
        <div style={s.profile}>
          <div style={s.avatar}>👤</div>
          <div>
            <div style={s.name}>{user?.name || '배민 사용자'}</div>
            <div style={s.sub}>{user?.email || user?.loginId || ''}</div>
          </div>
          <button style={s.editBtn}>편집</button>
        </div>

        {/* 통계 */}
        <div style={s.statsRow}>
          {stats.map((st, i) => (
              <div key={i} style={{ ...s.stat, borderRight: i < stats.length - 1 ? '1px solid #eee' : 'none' }}>
                <div style={s.statNum}>{st.num}</div>
                <div style={s.statLabel}>{st.label}</div>
              </div>
          ))}
        </div>

        {/* 메뉴 목록 */}
        <div style={s.section}>
          {MENU_ITEMS.map((item, i) => (
              <div key={i} style={s.menuItem} onClick={() => handleMenuClick(item.label)}>
                <span style={s.menuIcon}>{item.icon}</span>
                <span style={s.menuLabel}>{item.label}</span>
                <span style={s.arrow}>›</span>
              </div>
          ))}
        </div>

        <button style={s.logoutBtn} onClick={onLogout}>로그아웃</button>
      </div>
  );
};

export default MyPage;