import { useState, useEffect } from 'react';
import { orderApi } from '../api/orderApi';

const STATUS_MAP = {
  PENDING:    { label: '주문접수',  color: '#FF9500' },
  ACCEPTED:   { label: '조리중',   color: '#007AFF' },
  DELIVERING: { label: '배달중',   color: '#5856D6' },
  DELIVERED:  { label: '배달완료', color: '#29D3C4' },
  CANCELLED:  { label: '취소됨',   color: '#999'    },
};

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
};

const OrderPage = () => {
  const [orders, setOrders]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderApi.getMyOrders(0, 20);
      setOrders(res?.content ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('주문을 취소하시겠어요?')) return;
    setCancellingId(id);
    try {
      await orderApi.cancel(id);
      setOrders((prev) =>
          prev.map((o) => o.id === id ? { ...o, status: 'CANCELLED' } : o)
      );
    } catch (e) {
      alert(e.message || '취소에 실패했습니다.');
    } finally {
      setCancellingId(null);
    }
  };

  const st = {
    container:  { padding: '16px' },
    heading:    { fontSize: 20, fontWeight: 900, color: '#1A1A1A', marginBottom: 16 },
    card:       { background: '#fff', borderRadius: 16, padding: '16px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' },
    cardTop:    { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
    storeIcon:  { fontSize: 32 },
    storeMeta:  { flex: 1 },
    storeName:  { fontSize: 15, fontWeight: 800, color: '#1A1A1A' },
    badge: (c) => ({ fontSize: 11, fontWeight: 700, color: c, background: `${c}20`, padding: '3px 10px', borderRadius: 20 }),
    items:      { fontSize: 13, color: '#666', marginBottom: 6 },
    meta:       { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#999' },
    price:      { fontWeight: 700, color: '#1A1A1A' },
    btnRow:     { display: 'flex', gap: 8, marginTop: 12 },
    reorderBtn: { flex: 1, padding: '10px', border: '2px solid #29D3C4', background: 'none', color: '#29D3C4', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' },
    cancelBtn: (d) => ({ flex: 1, padding: '10px', border: '2px solid #FF3B30', background: 'none', color: d ? '#ccc' : '#FF3B30', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: d ? 'not-allowed' : 'pointer' }),
    empty:      { textAlign: 'center', padding: '60px 0', color: '#bbb', fontSize: 14 },
    loading:    { textAlign: 'center', padding: '60px 0', color: '#aaa', fontSize: 14 },
    errWrap:    { textAlign: 'center', padding: '40px 16px' },
    errMsg:     { color: '#FF3B30', fontSize: 14, marginBottom: 12 },
    retryBtn:   { padding: '10px 24px', background: '#29D3C4', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' },
  };

  if (loading) return <div style={st.loading}>주문 내역을 불러오는 중... 🛵</div>;

  if (error) return (
      <div style={st.errWrap}>
        <div style={st.errMsg}>{error}</div>
        <button style={st.retryBtn} onClick={fetchOrders}>다시 시도</button>
      </div>
  );

  return (
      <div style={st.container}>
        <div style={st.heading}>주문내역</div>

        {orders.length === 0 ? (
            <div style={st.empty}>아직 주문 내역이 없어요 🛵</div>
        ) : (
            orders.map((order) => {
              const { label, color } = STATUS_MAP[order.status] ?? { label: order.status, color: '#888' };
              const itemSummary = order.items?.length > 0
                  ? `${order.items[0].menuName}${order.items.length > 1 ? ` 외 ${order.items.length - 1}개` : ''}`
                  : '주문 내역 없음';

              return (
                  <div key={order.id} style={st.card}>
                    <div style={st.cardTop}>
                      <span style={st.storeIcon}>{order.restaurantEmoji || '🍽️'}</span>
                      <div style={st.storeMeta}>
                        <div style={st.storeName}>{order.restaurantName}</div>
                      </div>
                      <span style={st.badge(color)}>{label}</span>
                    </div>
                    <div style={st.items}>{itemSummary}</div>
                    <div style={st.meta}>
                      <span>{formatDate(order.orderedAt)}</span>
                      <span style={st.price}>{order.finalPrice?.toLocaleString()}원</span>
                    </div>
                    <div style={st.btnRow}>
                      <button style={st.reorderBtn}>🔄 재주문하기</button>
                      {order.status === 'PENDING' && (
                          <button
                              style={st.cancelBtn(cancellingId === order.id)}
                              onClick={() => handleCancel(order.id)}
                              disabled={cancellingId === order.id}
                          >
                            {cancellingId === order.id ? '취소 중...' : '주문취소'}
                          </button>
                      )}
                    </div>
                  </div>
              );
            })
        )}
      </div>
  );
};

export default OrderPage;