import { useState } from "react";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { orderApi } from "../api/orderApi";
import { addressApi } from "../api/addressApi";
import { useCart } from "../context/CartContext";

const CartModal = ({ onClose, onOrderSuccess }) => {
  const { cart, cartRestaurant, updateQty, clearCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [ordering, setOrdering]     = useState(false);
  const [orderDone, setOrderDone]   = useState(false);
  const [orderError, setOrderError] = useState(null);

  const handleOrder = async () => {
    if (cart.length === 0) return;
    setOrdering(true); setOrderError(null);
    try {
      const addresses   = await addressApi.getAll();
      const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0];
      if (!defaultAddr) {
        setOrderError("배달 주소를 먼저 등록해주세요. (마이배민 > 배달 주소 관리)");
        return;
      }
      await orderApi.place({
        restaurantId:  cartRestaurant?.id,
        addressId:     defaultAddr.id,
        paymentMethod: "CARD",
        items: cart.map((item) => ({ menuId: item.id, quantity: item.qty })),
      });
      setOrderDone(true);
      clearCart();
    } catch (e) {
      setOrderError(e.message || "주문에 실패했습니다.");
    } finally {
      setOrdering(false);
    }
  };

  const handleConfirmDone = () => {
    onClose();
    onOrderSuccess?.(); // 주문내역 탭으로 이동
  };

  const s = {
    overlay:  { position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:150 },
    modal:    { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderRadius:"20px 20px 0 0", padding:"20px 20px 40px", zIndex:200, boxShadow:"0 -4px 30px rgba(0,0,0,0.15)", maxHeight:"80vh", overflowY:"auto" },
    header:   { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 },
    title:    { fontSize:18, fontWeight:800, color:"#1A1A1A" },
    closeBtn: { background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center" },
    storeName:{ fontSize:12, color:"#29D3C4", fontWeight:700, marginBottom:12 },
    item:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid #f0f0f0" },
    itemName: { fontSize:14, fontWeight:600, color:"#1A1A1A" },
    itemPrice:{ fontSize:13, color:"#29D3C4", fontWeight:700, marginTop:2 },
    qtyRow:   { display:"flex", alignItems:"center", gap:10 },
    qtyBtn:   { width:28, height:28, borderRadius:"50%", border:"2px solid #29D3C4", background:"none", color:"#29D3C4", fontWeight:800, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" },
    total:    { display:"flex", justifyContent:"space-between", padding:"14px 0", fontSize:16, fontWeight:800 },
    orderBtn: (d) => ({ width:"100%", padding:"16px", background:d?"#aaa":"#29D3C4", color:"#fff", border:"none", borderRadius:14, fontSize:16, fontWeight:800, cursor:d?"not-allowed":"pointer", marginTop:8 }),
    errMsg:   { color:"#FF3B30", fontSize:13, marginBottom:8, textAlign:"center" },
    emptyWrap:{ textAlign:"center", padding:"30px 0", color:"#bbb", fontSize:14 },
    doneWrap: { textAlign:"center", padding:"20px 0" },
    doneBtn:  { marginTop:20, width:"100%", padding:"14px", background:"#29D3C4", color:"#fff", border:"none", borderRadius:14, fontSize:15, fontWeight:800, cursor:"pointer" },
  };

  return (
      <>
        <div style={s.overlay} onClick={orderDone ? undefined : onClose} />
        <div style={s.modal}>
          <div style={s.header}>
            <span style={s.title}>장바구니</span>
            {!orderDone && (
                <button style={s.closeBtn} onClick={onClose}><IoClose size={24} color="#555" /></button>
            )}
          </div>

          {orderDone ? (
              <div style={s.doneWrap}>
                <IoCheckmarkCircle size={64} color="#29D3C4" />
                <div style={{ fontSize:18, fontWeight:800, color:"#1A1A1A", margin:"12px 0 4px" }}>주문이 완료되었습니다!</div>
                <div style={{ fontSize:13, color:"#888" }}>음식이 곧 출발할 예정이에요 🛵</div>
                <button style={s.doneBtn} onClick={handleConfirmDone}>주문내역 확인하기</button>
              </div>
          ) : cart.length === 0 ? (
              <div style={s.emptyWrap}>
                <div style={{ fontSize:40, marginBottom:8 }}>🛒</div>
                <div>장바구니가 비어있어요</div>
                <div style={{ fontSize:12, marginTop:4 }}>메뉴를 선택해서 담아보세요!</div>
              </div>
          ) : (
              <>
                <div style={s.storeName}>{cartRestaurant?.name || "음식점"}</div>
                {cart.map((item) => (
                    <div key={item.id} style={s.item}>
                      <div>
                        <div style={s.itemName}>{item.name}</div>
                        <div style={s.itemPrice}>{(item.price * item.qty).toLocaleString()}원</div>
                      </div>
                      <div style={s.qtyRow}>
                        <button style={s.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                        <span style={{ fontWeight:700, fontSize:15 }}>{item.qty}</span>
                        <button style={s.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                ))}
                <div style={s.total}>
                  <span>합계</span>
                  <span style={{ color:"#29D3C4" }}>{totalPrice.toLocaleString()}원</span>
                </div>
                {orderError && <div style={s.errMsg}>{orderError}</div>}
                <button style={s.orderBtn(ordering)} onClick={handleOrder} disabled={ordering}>
                  {ordering ? "주문 중..." : `${totalPrice.toLocaleString()}원 주문하기`}
                </button>
              </>
          )}
        </div>
      </>
  );
};

export default CartModal;