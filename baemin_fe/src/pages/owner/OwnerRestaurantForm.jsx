import { IoAddCircleOutline, IoPencilOutline, IoRestaurantOutline, IoToggle, IoToggleOutline, IoTrashOutline } from "react-icons/io5";

const OwnerRestaurantList = ({ restaurants, loading, onAdd, onEdit, onMenus, onToggle, onDelete }) => {
    const s = {
        page:   { paddingBottom: 80 },
        topBar: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 16px 8px" },
        title:  { fontSize:20, fontWeight:900, color:"#1A1A1A" },
        addBtn: { background:"linear-gradient(135deg,#FF6B35,#FF8C42)", color:"#fff", border:"none", borderRadius:12, padding:"10px 16px", fontSize:13, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:6 },
        card:   { background:"#fff", borderRadius:16, padding:"16px", margin:"0 16px 12px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
        top:    { display:"flex", gap:12, alignItems:"center", marginBottom:14 },
        emoji:  (bg) => ({ width:56, height:56, borderRadius:14, background:bg||"#F5F5F5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }),
        info:   { flex:1 },
        name:   { fontSize:16, fontWeight:800, color:"#1A1A1A" },
        meta:   { fontSize:12, color:"#888", marginTop:3, lineHeight:1.5 },
        badge: (open) => ({ fontSize:11, fontWeight:700, color:open?"#29D3C4":"#999", background:open?"#E8FAF8":"#f0f0f0", padding:"3px 10px", borderRadius:20, alignSelf:"flex-start" }),
        actions:{ display:"flex", gap:8 },
        btn:    (bg, color) => ({ flex:1, padding:"9px 0", background:bg, color, border:"none", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }),
        empty:  { textAlign:"center", padding:"60px 16px" },
    };

    if (loading) return <div style={{ textAlign:"center", padding:"60px 0", color:"#aaa" }}>로딩 중...</div>;

    return (
        <div style={s.page}>
            <div style={s.topBar}>
                <span style={s.title}>내 가게 ({restaurants.length})</span>
                <button style={s.addBtn} onClick={onAdd}>
                    <IoAddCircleOutline size={16} /> 가게 추가
                </button>
            </div>

            {restaurants.length === 0 ? (
                <div style={s.empty}>
                    <div style={{ fontSize:56 }}>🏪</div>
                    <div style={{ fontSize:16, fontWeight:700, color:"#555", marginTop:12 }}>등록된 가게가 없어요</div>
                    <div style={{ fontSize:13, color:"#aaa", marginTop:4, marginBottom:16 }}>첫 번째 가게를 등록해보세요!</div>
                    <button style={{ background:"linear-gradient(135deg,#FF6B35,#FF8C42)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", fontSize:14, fontWeight:800, cursor:"pointer" }} onClick={onAdd}>
                        가게 등록하기
                    </button>
                </div>
            ) : restaurants.map((r) => (
                <div key={r.id} style={s.card}>
                    <div style={s.top}>
                        <div style={s.emoji(r.bgColor)}>{r.imgEmoji || "🍽️"}</div>
                        <div style={s.info}>
                            <div style={s.name}>{r.name}</div>
                            <div style={s.meta}>
                                {r.category?.name} · 최소 {r.minOrder?.toLocaleString()}원 · 배달비 {r.deliveryFee === 0 ? "무료" : `${r.deliveryFee?.toLocaleString()}원`}
                            </div>
                            <div style={s.meta}>{r.deliveryTime}</div>
                        </div>
                        <span style={s.badge(r.open)}>{r.open ? "영업중" : "영업종료"}</span>
                    </div>

                    <div style={s.actions}>
                        <button style={s.btn("#FFF0EB","#FF6B35")} onClick={() => onEdit(r)}>
                            <IoPencilOutline size={13} /> 수정
                        </button>
                        <button style={s.btn("#EEFBFA","#29D3C4")} onClick={() => onMenus(r)}>
                            <IoRestaurantOutline size={13} /> 메뉴 ({r.menuCount || 0})
                        </button>
                        <button style={s.btn(r.open?"#f5f5f5":"#E8FAF8", r.open?"#999":"#29D3C4")} onClick={() => onToggle(r.id)}>
                            {r.open ? <IoToggle size={16} color="#29D3C4" /> : <IoToggleOutline size={16} />}
                            {r.open ? "마감" : "오픈"}
                        </button>
                        <button style={s.btn("#FFF0F0","#FF3B30")} onClick={async () => {
                            if (!window.confirm("가게를 삭제하시겠어요? 메뉴도 모두 삭제됩니다.")) return;
                            try { await onDelete(r.id); } catch(e) { alert(e.message || "삭제 실패"); }
                        }}>
                            <IoTrashOutline size={13} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OwnerRestaurantList;