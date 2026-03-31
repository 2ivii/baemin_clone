import { useState, useEffect } from "react";
import { IoArrowBack, IoAddCircleOutline, IoPencilOutline, IoTrashOutline, IoCheckmarkCircle, IoClose } from "react-icons/io5";
import { ownerApi } from "../../api/ownerApi";

const EMOJI_OPTIONS = ["🍗","🍕","🍜","🍣","🍔","🥗","🥩","☕","🍱","🌮","🍚","🍛","🥘","🍲","🍞","🥪","🍙","🍘","🥞","🍳"];
const BG_OPTIONS    = ["#FFF3CD","#FFE4E4","#E4F5E4","#E4E8FF","#FFE8D6","#E8F4FD","#FFF0EB","#EEFBFA","#F5F0FF","#F5F5F5"];

const emptyForm = { name:"", description:"", price:0, emoji:"🍽️", bgColor:"#FFF3CD", ownerPick:false, popularityRank:null };

const OwnerMenuManager = ({ restaurant, onBack }) => {
    const [menus, setMenus]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [showForm, setShowForm]   = useState(false);
    const [editMenu, setEditMenu]   = useState(null); // null = 신규
    const [form, setForm]           = useState(emptyForm);
    const [saving, setSaving]       = useState(false);
    const [formErr, setFormErr]     = useState(null);
    const [saved, setSaved]         = useState(false);

    useEffect(() => { fetchMenus(); }, []);

    const fetchMenus = async () => {
        setLoading(true);
        try { setMenus(await ownerApi.getMenus(restaurant.id)); }
        catch { setMenus([]); }
        finally { setLoading(false); }
    };

    const openAdd = () => {
        setEditMenu(null);
        setForm(emptyForm);
        setFormErr(null);
        setShowForm(true);
    };

    const openEdit = (menu) => {
        setEditMenu(menu);
        setForm({
            name: menu.name, description: menu.description || "",
            price: menu.price, emoji: menu.emoji || "🍽️",
            bgColor: menu.bgColor || "#FFF3CD",
            ownerPick: menu.ownerPick || false,
            popularityRank: menu.popularityRank || null,
        });
        setFormErr(null);
        setShowForm(true);
    };

    const handleSave = async () => {
        if (!form.name.trim()) { setFormErr("메뉴 이름을 입력해주세요."); return; }
        if (form.price < 0)    { setFormErr("가격을 올바르게 입력해주세요."); return; }
        setSaving(true); setFormErr(null);
        try {
            if (editMenu) await ownerApi.updateMenu(restaurant.id, editMenu.id, form);
            else          await ownerApi.createMenu(restaurant.id, form);
            setSaved(true);
            setTimeout(() => { setSaved(false); setShowForm(false); fetchMenus(); }, 1000);
        } catch(e) { setFormErr(e.message || "저장 실패"); }
        finally { setSaving(false); }
    };

    const handleToggle = async (menuId) => {
        try {
            await ownerApi.toggleMenu(restaurant.id, menuId);
            fetchMenus();
        } catch(e) { alert(e.message || "변경 실패"); }
    };

    const handleDelete = async (menuId) => {
        if (!window.confirm("메뉴를 삭제하시겠어요?")) return;
        try { await ownerApi.deleteMenu(restaurant.id, menuId); fetchMenus(); }
        catch(e) { alert(e.message || "삭제 실패"); }
    };

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const s = {
        page:    { background:"#F7F4F0", minHeight:"100vh", paddingBottom:80 },
        topBar:  { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:"#fff", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, zIndex:10 },
        back:    { background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:4 },
        topTitle:{ fontSize:17, fontWeight:800, color:"#1A1A1A" },
        addBtn:  { background:"linear-gradient(135deg,#FF6B35,#FF8C42)", color:"#fff", border:"none", borderRadius:10, padding:"8px 14px", fontSize:13, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:4 },
        storeInfo:{ background:"linear-gradient(135deg,#FF6B35,#FF8C42)", padding:"12px 16px", display:"flex", alignItems:"center", gap:10 },
        storeEmoji:{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 },
        storeName: { fontSize:14, fontWeight:800, color:"#fff" },
        storeSub:  { fontSize:11, color:"rgba(255,255,255,0.8)" },
        list:    { padding:"12px 16px" },
        card:    (avail) => ({ background:avail?"#fff":"#f9f9f9", borderRadius:14, padding:"14px", marginBottom:10, boxShadow:"0 2px 6px rgba(0,0,0,0.05)", opacity:avail?1:0.65 }),
        cardTop: { display:"flex", gap:10, alignItems:"center" },
        menuImg: (bg) => ({ width:60, height:60, borderRadius:10, background:bg||"#F5F5F5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }),
        menuInfo:{ flex:1 },
        menuName:{ fontSize:15, fontWeight:800, color:"#1A1A1A" },
        menuDesc:{ fontSize:12, color:"#888", marginTop:2, lineHeight:1.4 },
        menuPrice:{ fontSize:14, fontWeight:900, color:"#FF6B35", marginTop:3 },
        menuBadges:{ display:"flex", gap:6, marginTop:4 },
        badge: (color, bg) => ({ fontSize:10, fontWeight:700, color, background:bg, padding:"2px 8px", borderRadius:4 }),
        actions: { display:"flex", gap:6, marginTop:10 },
        actBtn:  (bg, color) => ({ flex:1, padding:"8px 0", background:bg, color, border:"none", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:3 }),
        empty:   { textAlign:"center", padding:"50px 20px", color:"#aaa" },
        // 폼 오버레이
        overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:200 },
        sheet:   { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderRadius:"20px 20px 0 0", maxHeight:"90vh", overflowY:"auto", zIndex:201 },
        sheetTop:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 16px 12px", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff" },
        sheetTitle:{ fontSize:17, fontWeight:800, color:"#1A1A1A" },
        closeBtn:{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center" },
        fBody:   { padding:"16px" },
        fGroup:  { marginBottom:16 },
        fLabel:  { fontSize:12, fontWeight:700, color:"#555", marginBottom:6, display:"block" },
        fInput:  (err) => ({ width:"100%", padding:"13px 14px", borderRadius:11, border:`1.5px solid ${err?"#FF3B30":"#e8e8e8"}`, fontSize:14, color:"#1A1A1A", outline:"none", background:"#fafafa", boxSizing:"border-box" }),
        emojiGrid:{ display:"flex", flexWrap:"wrap", gap:6 },
        emojiBtn:(sel) => ({ width:40, height:40, borderRadius:9, border:sel?"2px solid #FF6B35":"2px solid #eee", background:sel?"#FFF0EB":"#fff", fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }),
        bgGrid: { display:"flex", flexWrap:"wrap", gap:6 },
        bgBtn:  (sel) => ({ width:32, height:32, borderRadius:7, border:sel?"3px solid #FF6B35":"3px solid transparent", cursor:"pointer" }),
        toggleRow:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0" },
        toggle: (on) => ({ width:44, height:24, borderRadius:12, background:on?"#FF6B35":"#ccc", position:"relative", cursor:"pointer", border:"none", transition:"background 0.2s" }),
        toggleDot:(on) => ({ position:"absolute", top:2, left:on?20:2, width:20, height:20, borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }),
        saveBtn: (d) => ({ width:"100%", padding:"15px", background:d?"#aaa":"linear-gradient(135deg,#FF6B35,#FF8C42)", color:"#fff", border:"none", borderRadius:13, fontSize:15, fontWeight:800, cursor:d?"not-allowed":"pointer" }),
        errBox:  { background:"#FFF0F0", border:"1px solid #FFD0D0", borderRadius:9, padding:"10px 12px", fontSize:12, color:"#FF3B30", marginBottom:12 },
        savedMsg:{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"12px", fontSize:15, fontWeight:700, color:"#FF6B35" },
    };

    return (
        <>
            <div style={s.page}>
                {/* 상단 */}
                <div style={s.topBar}>
                    <button style={s.back} onClick={onBack}><IoArrowBack size={22} color="#1A1A1A" /></button>
                    <span style={s.topTitle}>메뉴 관리</span>
                    <button style={s.addBtn} onClick={openAdd}>
                        <IoAddCircleOutline size={15} /> 메뉴 추가
                    </button>
                </div>

                {/* 가게 정보 */}
                <div style={s.storeInfo}>
                    <div style={s.storeEmoji}>{restaurant.imgEmoji || "🍽️"}</div>
                    <div>
                        <div style={s.storeName}>{restaurant.name}</div>
                        <div style={s.storeSub}>메뉴 {menus.length}개 등록됨</div>
                    </div>
                </div>

                {/* 메뉴 목록 */}
                <div style={s.list}>
                    {loading ? (
                        <div style={s.empty}>메뉴를 불러오는 중...</div>
                    ) : menus.length === 0 ? (
                        <div style={s.empty}>
                            <div style={{ fontSize:48 }}>🍽️</div>
                            <div style={{ fontSize:15, fontWeight:700, color:"#555", marginTop:8 }}>등록된 메뉴가 없어요</div>
                            <div style={{ fontSize:13, marginTop:4 }}>첫 번째 메뉴를 추가해보세요!</div>
                        </div>
                    ) : menus.map((menu) => (
                        <div key={menu.id} style={s.card(menu.available)}>
                            <div style={s.cardTop}>
                                <div style={s.menuImg(menu.bgColor)}>{menu.emoji || "🍽️"}</div>
                                <div style={s.menuInfo}>
                                    <div style={s.menuName}>{menu.name}</div>
                                    {menu.description && <div style={s.menuDesc}>{menu.description}</div>}
                                    <div style={s.menuPrice}>{menu.price?.toLocaleString()}원</div>
                                    <div style={s.menuBadges}>
                                        {menu.ownerPick && <span style={s.badge("#29D3C4","#E8FAF8")}>사장님 추천</span>}
                                        {!menu.available && <span style={s.badge("#999","#f0f0f0")}>품절</span>}
                                    </div>
                                </div>
                            </div>
                            <div style={s.actions}>
                                <button style={s.actBtn("#FFF0EB","#FF6B35")} onClick={() => openEdit(menu)}>
                                    <IoPencilOutline size={13} /> 수정
                                </button>
                                <button style={s.actBtn(menu.available?"#f0f0f0":"#E8FAF8", menu.available?"#999":"#29D3C4")}
                                        onClick={() => handleToggle(menu.id)}>
                                    {menu.available ? "품절 처리" : "판매 재개"}
                                </button>
                                <button style={s.actBtn("#FFF0F0","#FF3B30")} onClick={() => handleDelete(menu.id)}>
                                    <IoTrashOutline size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 메뉴 추가/수정 폼 시트 */}
            {showForm && (
                <>
                    <div style={s.overlay} onClick={() => setShowForm(false)} />
                    <div style={s.sheet}>
                        <div style={s.sheetTop}>
                            <span style={s.sheetTitle}>{editMenu ? "메뉴 수정" : "메뉴 추가"}</span>
                            <button style={s.closeBtn} onClick={() => setShowForm(false)}>
                                <IoClose size={22} color="#555" />
                            </button>
                        </div>

                        <div style={s.fBody}>
                            {saved ? (
                                <div style={s.savedMsg}>
                                    <IoCheckmarkCircle size={24} color="#FF6B35" />
                                    {editMenu ? "수정 완료!" : "메뉴가 추가되었어요!"}
                                </div>
                            ) : (
                                <>
                                    {formErr && <div style={s.errBox}>{formErr}</div>}

                                    {/* 미리보기 */}
                                    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:form.bgColor, borderRadius:12, marginBottom:16 }}>
                                        <span style={{ fontSize:40 }}>{form.emoji}</span>
                                        <div>
                                            <div style={{ fontSize:15, fontWeight:800 }}>{form.name || "메뉴 이름"}</div>
                                            <div style={{ fontSize:13, color:"#FF6B35", fontWeight:700, marginTop:2 }}>{Number(form.price).toLocaleString()}원</div>
                                        </div>
                                    </div>

                                    <div style={s.fGroup}>
                                        <label style={s.fLabel}>메뉴 이름 *</label>
                                        <input style={s.fInput(!form.name)} value={form.name}
                                               onChange={e => set("name", e.target.value)} placeholder="예) 후라이드 치킨" />
                                    </div>

                                    <div style={s.fGroup}>
                                        <label style={s.fLabel}>설명</label>
                                        <input style={s.fInput(false)} value={form.description}
                                               onChange={e => set("description", e.target.value)} placeholder="메뉴 설명을 입력해주세요" />
                                    </div>

                                    <div style={s.fGroup}>
                                        <label style={s.fLabel}>가격 (원)</label>
                                        <input style={{ ...s.fInput(false), textAlign:"right" }} type="number" value={form.price}
                                               onChange={e => set("price", Number(e.target.value))} placeholder="0" />
                                    </div>

                                    <div style={s.fGroup}>
                                        <label style={s.fLabel}>메뉴 아이콘</label>
                                        <div style={s.emojiGrid}>
                                            {EMOJI_OPTIONS.map(e => (
                                                <button key={e} style={s.emojiBtn(form.emoji === e)}
                                                        onClick={() => set("emoji", e)}>{e}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={s.fGroup}>
                                        <label style={s.fLabel}>배경 색상</label>
                                        <div style={s.bgGrid}>
                                            {BG_OPTIONS.map(bg => (
                                                <button key={bg} style={{ ...s.bgBtn(form.bgColor === bg), background:bg }}
                                                        onClick={() => set("bgColor", bg)} />
                                            ))}
                                        </div>
                                    </div>

                                    <div style={s.toggleRow}>
                                        <div>
                                            <div style={{ fontSize:14, fontWeight:700, color:"#1A1A1A" }}>사장님 추천 메뉴</div>
                                            <div style={{ fontSize:12, color:"#aaa" }}>상단에 추천 배지가 표시돼요</div>
                                        </div>
                                        <button style={s.toggle(form.ownerPick)} onClick={() => set("ownerPick", !form.ownerPick)}>
                                            <div style={s.toggleDot(form.ownerPick)} />
                                        </button>
                                    </div>

                                    <button style={s.saveBtn(saving)} onClick={handleSave} disabled={saving}>
                                        {saving ? "저장 중..." : (editMenu ? "수정 완료" : "메뉴 추가하기")}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OwnerMenuManager;