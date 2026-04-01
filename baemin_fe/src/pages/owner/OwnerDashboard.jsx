import { useState, useEffect } from "react";
import {
    IoStorefrontOutline, IoAddCircleOutline, IoStatsChartOutline,
    IoNotificationsOutline, IoPersonOutline, IoChevronForward,
    IoToggleOutline, IoToggle, IoPencilOutline,
    IoRestaurantOutline, IoLogOutOutline, IoChatbubbleOutline
} from "react-icons/io5";
import { ownerApi } from "../../api/ownerApi";
import OwnerRestaurantList from "./OwnerRestaurantList";
import OwnerRestaurantForm from "./OwnerRestaurantForm";
import OwnerMenuManager from "./OwnerMenuManager";
import OwnerReviewManager from "./OwnerReviewManager";

const TABS = [
    { id: "home",       label: "홈",      icon: IoStorefrontOutline },
    { id: "restaurant", label: "내 가게", icon: IoRestaurantOutline },
    { id: "stats",      label: "통계",    icon: IoStatsChartOutline },
    { id: "profile",    label: "내 정보", icon: IoPersonOutline },
];

const OwnerDashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab]     = useState("home");
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading]         = useState(true);
    const [subView, setSubView]         = useState(null);

    useEffect(() => { fetchRestaurants(); }, []);

    const fetchRestaurants = async () => {
        setLoading(true);
        try { setRestaurants(await ownerApi.getMyRestaurants() ?? []); }
        catch { setRestaurants([]); }
        finally { setLoading(false); }
    };

    const handleTabChange = (tab) => {
        setSubView(null);
        setActiveTab(tab);
    };

    // ── 서브뷰 라우팅 ─────────────────────────────────────────
    if (subView?.type === "add-restaurant") return (
        <OwnerRestaurantForm
            onBack={() => setSubView(null)}
            onSaved={() => { setSubView(null); fetchRestaurants(); }}
        />
    );
    if (subView?.type === "edit-restaurant") return (
        <OwnerRestaurantForm
            restaurant={subView.restaurant}
            onBack={() => setSubView(null)}
            onSaved={() => { setSubView(null); fetchRestaurants(); }}
        />
    );
    if (subView?.type === "manage-menus") return (
        <OwnerMenuManager
            restaurant={subView.restaurant}
            onBack={() => setSubView(null)}
        />
    );
    if (subView?.type === "manage-reviews") return (
        <OwnerReviewManager
            restaurant={subView.restaurant}
            onBack={() => setSubView(null)}
        />
    );

    // ── 스타일 ────────────────────────────────────────────────
    const c = {
        wrap:     { maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#F7F4F0", fontFamily:"'Noto Sans KR', sans-serif", position:"relative" },
        header:   { background:"linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)", padding:"20px 20px 28px", position:"relative", overflow:"hidden" },
        headerBg: { position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.08)" },
        headerBg2:{ position:"absolute", bottom:-60, left:-30, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.05)" },
        greeting: { fontSize:13, color:"rgba(255,255,255,0.8)", marginBottom:4, position:"relative", zIndex:1 },
        ownerName:{ fontSize:22, fontWeight:900, color:"#fff", position:"relative", zIndex:1 },
        badge:    { display:"inline-flex", alignItems:"center", gap:4, background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:700, color:"#fff", marginTop:8, position:"relative", zIndex:1 },
        notifBtn: { position:"absolute", top:20, right:20, background:"rgba(255,255,255,0.2)", border:"none", borderRadius:"50%", width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:1 },
        statsRow: { display:"flex", gap:10, padding:"16px 16px 0" },
        statCard: { flex:1, background:"#fff", borderRadius:16, padding:"14px 12px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
        statNum:  { fontSize:22, fontWeight:900, color:"#1A1A1A" },
        statLabel:{ fontSize:11, color:"#888", marginTop:2 },
        statSub:  (color) => ({ fontSize:11, color, fontWeight:700, marginTop:4 }),
        section:  { margin:"16px 16px 0" },
        secHeader:{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 },
        secTitle: { fontSize:16, fontWeight:800, color:"#1A1A1A" },
        secMore:  { fontSize:12, color:"#FF6B35", fontWeight:700, cursor:"pointer", background:"none", border:"none", display:"flex", alignItems:"center", gap:2 },
        storeCard:{ background:"#fff", borderRadius:16, padding:"16px", marginBottom:10, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
        storeTop: { display:"flex", gap:12, alignItems:"center", marginBottom:12 },
        storeEmoji:{ width:52, height:52, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 },
        storeInfo:{ flex:1 },
        storeName:{ fontSize:15, fontWeight:800, color:"#1A1A1A" },
        storeMeta:{ fontSize:12, color:"#888", marginTop:2 },
        openBadge:(open) => ({ fontSize:11, fontWeight:700, color:open?"#29D3C4":"#999", background:open?"#E8FAF8":"#f0f0f0", padding:"3px 10px", borderRadius:20 }),
        storeActions:{ display:"flex", gap:8 },
        actionBtn:{ flex:1, padding:"9px 0", border:"none", borderRadius:10, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:4 },
        quickGrid:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 },
        quickCard:{ background:"#fff", borderRadius:16, padding:"18px 16px", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", display:"flex", flexDirection:"column", gap:8 },
        quickIcon:{ width:44, height:44, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" },
        quickLabel:{ fontSize:14, fontWeight:700, color:"#1A1A1A" },
        quickSub: { fontSize:11, color:"#aaa" },
        emptyStore:{ background:"#fff", borderRadius:16, padding:"32px 16px", textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
        addBtn:   { background:"linear-gradient(135deg, #FF6B35, #FF8C42)", color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", fontSize:14, fontWeight:800, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6, marginTop:12 },
        nav:      { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderTop:"1px solid #eee", display:"flex", justifyContent:"space-around", padding:"8px 0 14px", zIndex:100 },
        navItem:  { display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", padding:"4px 16px", background:"none", border:"none" },
        navLabel: (a) => ({ fontSize:10, fontWeight:700, color: a ? "#FF6B35" : "#aaa" }),
        pb:       { paddingBottom:80 },
    };

    const openCount = restaurants.filter(r => r.open).length;

    const renderHome = () => (
        <div style={c.pb}>
            <div style={c.statsRow}>
                {[
                    { num: restaurants.length, label:"등록 가게",  sub:`${openCount}개 영업중`, color:"#29D3C4" },
                    { num: "0",                label:"오늘 주문",  sub:"업데이트 예정",          color:"#FF6B35" },
                    { num: "0",                label:"미확인 리뷰", sub:"리뷰 관리",             color:"#6C63FF" },
                ].map((s, i) => (
                    <div key={i} style={c.statCard}>
                        <div style={c.statNum}>{s.num}</div>
                        <div style={c.statLabel}>{s.label}</div>
                        <div style={c.statSub(s.color)}>{s.sub}</div>
                    </div>
                ))}
            </div>

            <div style={c.section}>
                <div style={c.secHeader}>
                    <span style={c.secTitle}>빠른 메뉴</span>
                </div>
                <div style={c.quickGrid}>
                    {[
                        { icon:"➕", bg:"#FFF0EB", label:"가게 등록",  sub:"새 가게 추가",    action: () => setSubView({ type:"add-restaurant" }) },
                        { icon:"🍽️", bg:"#EEFBFA", label:"메뉴 관리",  sub:"메뉴 추가/수정", action: () => restaurants.length > 0 ? setSubView({ type:"manage-menus", restaurant: restaurants[0] }) : setSubView({ type:"add-restaurant" }) },
                        { icon:"💬", bg:"#F0EEFF", label:"리뷰 관리",  sub:"답글 달기",       action: () => restaurants.length > 0 ? setSubView({ type:"manage-reviews", restaurant: restaurants[0] }) : setSubView({ type:"add-restaurant" }) },
                        { icon:"⚙️", bg:"#F5F5F5", label:"가게 설정",  sub:"정보 수정",       action: () => handleTabChange("restaurant") },
                    ].map((item, i) => (
                        <div key={i} style={c.quickCard} onClick={item.action}>
                            <div style={{ ...c.quickIcon, background: item.bg }}>
                                <span style={{ fontSize:24 }}>{item.icon}</span>
                            </div>
                            <div>
                                <div style={c.quickLabel}>{item.label}</div>
                                <div style={c.quickSub}>{item.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={c.section}>
                <div style={c.secHeader}>
                    <span style={c.secTitle}>내 가게</span>
                    <button style={c.secMore} onClick={() => handleTabChange("restaurant")}>
                        전체보기 <IoChevronForward size={14} />
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign:"center", padding:"20px 0", color:"#aaa", fontSize:13 }}>로딩 중...</div>
                ) : restaurants.length === 0 ? (
                    <div style={c.emptyStore}>
                        <div style={{ fontSize:48 }}>🏪</div>
                        <div style={{ fontSize:15, fontWeight:700, color:"#555", marginTop:8 }}>아직 등록된 가게가 없어요</div>
                        <div style={{ fontSize:13, color:"#aaa", marginTop:4 }}>첫 번째 가게를 등록해보세요!</div>
                        <button style={c.addBtn} onClick={() => setSubView({ type:"add-restaurant" })}>
                            <IoAddCircleOutline size={18} /> 가게 등록하기
                        </button>
                    </div>
                ) : restaurants.slice(0, 2).map((r) => (
                    <RestaurantMiniCard key={r.id} r={r} c={c}
                                        onEdit={() => setSubView({ type:"edit-restaurant", restaurant: r })}
                                        onMenus={() => setSubView({ type:"manage-menus", restaurant: r })}
                                        onReviews={() => setSubView({ type:"manage-reviews", restaurant: r })}
                                        onToggle={async () => { await ownerApi.toggleOpen(r.id); fetchRestaurants(); }}
                    />
                ))}
            </div>
        </div>
    );

    const renderStats = () => (
        <div style={{ padding:"20px 16px", paddingBottom:80, textAlign:"center" }}>
            <div style={{ padding:"60px 0" }}>
                <div style={{ fontSize:64 }}>📊</div>
                <div style={{ fontSize:18, fontWeight:800, color:"#555", marginTop:12 }}>매출 통계</div>
                <div style={{ fontSize:14, color:"#aaa", marginTop:6 }}>곧 업데이트될 예정이에요!</div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div style={{ paddingBottom:80 }}>
            <div style={{ background:"linear-gradient(135deg,#FF6B35,#FF8C42)", padding:"28px 20px 24px", display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🏪</div>
                <div>
                    <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{user?.name}님</div>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", marginTop:2 }}>사장님 계정 · {user?.loginId}</div>
                </div>
            </div>
            <div style={{ background:"#fff", margin:"16px", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                {[
                    { icon:"🏪", label:"가게 관리", action: () => handleTabChange("restaurant") },
                    { icon:"📞", label:"고객센터",  action: null },
                    { icon:"📋", label:"이용약관",  action: null },
                ].map(({ icon, label, action }, i) => (
                    <div key={i} onClick={action} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 20px", borderBottom:"1px solid #f5f5f5", cursor: action ? "pointer" : "default" }}>
                        <span style={{ fontSize:20 }}>{icon}</span>
                        <span style={{ fontSize:14, fontWeight:600, color:"#1A1A1A", flex:1 }}>{label}</span>
                        <IoChevronForward size={18} color="#ccc" />
                    </div>
                ))}
            </div>
            <button onClick={onLogout} style={{ margin:"0 16px", width:"calc(100% - 32px)", padding:"14px", background:"none", border:"2px solid #eee", borderRadius:12, color:"#888", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <IoLogOutOutline size={18} /> 로그아웃
            </button>
        </div>
    );

    const renderContent = () => {
        if (activeTab === "home") return renderHome();
        if (activeTab === "restaurant") return (
            <OwnerRestaurantList
                restaurants={restaurants ?? []}
                loading={loading}
                onAdd={() => setSubView({ type:"add-restaurant" })}
                onEdit={(r) => setSubView({ type:"edit-restaurant", restaurant: r })}
                onMenus={(r) => setSubView({ type:"manage-menus", restaurant: r })}
                onToggle={async (id) => { await ownerApi.toggleOpen(id); fetchRestaurants(); }}
                onDelete={async (id) => { await ownerApi.deleteRestaurant(id); fetchRestaurants(); }}
            />
        );
        if (activeTab === "stats")   return renderStats();
        if (activeTab === "profile") return renderProfile();
        return renderHome();
    };

    return (
        <div style={c.wrap}>
            <div style={c.header}>
                <div style={c.headerBg} />
                <div style={c.headerBg2} />
                <div style={c.greeting}>안녕하세요!</div>
                <div style={c.ownerName}>{user?.name} 사장님 👋</div>
                <div style={c.badge}>🏪 사장님 모드</div>
                <button style={c.notifBtn}><IoNotificationsOutline size={22} color="#fff" /></button>
            </div>

            <div style={{ overflowY:"auto", maxHeight:"calc(100vh - 140px)" }}>
                {renderContent()}
            </div>

            <div style={c.nav}>
                {TABS.map(({ id, label, icon: Icon }) => {
                    const active = activeTab === id;
                    return (
                        <button key={id} style={c.navItem} onClick={() => handleTabChange(id)}>
                            <Icon size={24} color={active ? "#FF6B35" : "#aaa"} />
                            <span style={c.navLabel(active)}>{label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const RestaurantMiniCard = ({ r, c, onEdit, onMenus, onReviews, onToggle }) => (
    <div style={c.storeCard}>
        <div style={c.storeTop}>
            <div style={{ ...c.storeEmoji, background: r.bgColor || "#F5F5F5" }}>
                {r.imgEmoji || "🍽️"}
            </div>
            <div style={c.storeInfo}>
                <div style={c.storeName}>{r.name}</div>
                <div style={c.storeMeta}>{r.category?.name} · 최소 {r.minOrder?.toLocaleString()}원</div>
            </div>
            <span style={c.openBadge(r.open)}>{r.open ? "영업중" : "영업종료"}</span>
        </div>
        <div style={c.storeActions}>
            <button style={{ ...c.actionBtn, background:"#FFF0EB", color:"#FF6B35" }} onClick={onEdit}>
                <IoPencilOutline size={13} /> 수정
            </button>
            <button style={{ ...c.actionBtn, background:"#EEFBFA", color:"#29D3C4" }} onClick={onMenus}>
                <IoRestaurantOutline size={13} /> 메뉴
            </button>
            <button style={{ ...c.actionBtn, background:"#F0EEFF", color:"#6C63FF" }} onClick={onReviews}>
                <IoChatbubbleOutline size={13} /> 리뷰
            </button>
            <button style={{ ...c.actionBtn, background:r.open?"#f0f0f0":"#E8FAF8", color:r.open?"#999":"#29D3C4" }} onClick={onToggle}>
                {r.open ? <IoToggle size={16} color="#29D3C4" /> : <IoToggleOutline size={16} />}
                {r.open ? "마감" : "오픈"}
            </button>
        </div>
    </div>
);

export default OwnerDashboard;