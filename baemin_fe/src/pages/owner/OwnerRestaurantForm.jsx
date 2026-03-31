import { useState, useEffect } from "react";
import { IoArrowBack, IoCheckmarkCircle } from "react-icons/io5";
import { ownerApi } from "../../api/ownerApi";
import { restaurantApi } from "../../api/restaurantApi";

const EMOJI_OPTIONS = ["🍗","🍕","🍜","🍣","🍔","🥗","🥩","☕","🍱","🌮","🍚","🍛","🥘","🍲","🍞","🥪","🍙","🍘","🥞","🍳","🍽️"];
const BG_OPTIONS    = ["#FFF3CD","#FFE4E4","#E4F5E4","#E4E8FF","#FFE8D6","#E8F4FD","#FFF0EB","#EEFBFA","#F5F0FF","#F5F5F5"];

const emptyForm = {
    name: "",
    categoryName: "",
    imgEmoji: "🍽️",
    bgColor: "#FFF3CD",
    deliveryTime: "30~40분",
    ownerNotice: "",
    minOrder: 0,
    deliveryFee: 0,
};

const OwnerRestaurantForm = ({ restaurant, onBack, onSaved }) => {
    const isEdit = !!restaurant;
    const [form, setForm]       = useState(isEdit ? {
        name:         restaurant.name,
        categoryName: restaurant.category?.name || "",
        imgEmoji:     restaurant.imgEmoji || "🍽️",
        bgColor:      restaurant.bgColor  || "#FFF3CD",
        deliveryTime: restaurant.deliveryTime || "30~40분",
        ownerNotice:  restaurant.ownerNotice || "",
        minOrder:     restaurant.minOrder || 0,
        deliveryFee:  restaurant.deliveryFee || 0,
    } : emptyForm);
    const [categories, setCategories] = useState([]);
    const [saving, setSaving]   = useState(false);
    const [saved, setSaved]     = useState(false);
    const [formErr, setFormErr] = useState(null);

    useEffect(() => {
        restaurantApi.getCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSave = async () => {
        if (!form.name.trim())         { setFormErr("가게 이름을 입력해주세요."); return; }
        if (!form.categoryName.trim()) { setFormErr("카테고리를 선택해주세요."); return; }
        setSaving(true); setFormErr(null);
        try {
            if (isEdit) await ownerApi.updateRestaurant(restaurant.id, form);
            else        await ownerApi.createRestaurant(form);
            setSaved(true);
            setTimeout(() => { setSaved(false); onSaved(); }, 1000);
        } catch (e) {
            setFormErr(e.message || "저장에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    const s = {
        page:    { background: "#fff", minHeight: "100vh", paddingBottom: 40 },
        topBar:  { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff", zIndex:10 },
        back:    { background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:4 },
        topTitle:{ fontSize:17, fontWeight:800, color:"#1A1A1A" },
        ph:      { width:30 },
        body:    { padding:"20px 16px" },
        preview: { display:"flex", alignItems:"center", gap:14, padding:"16px", borderRadius:14, marginBottom:24 },
        previewEmoji: { fontSize:44 },
        previewName:  { fontSize:17, fontWeight:800, color:"#1A1A1A" },
        previewMeta:  { fontSize:12, color:"#888", marginTop:3 },
        group:   { marginBottom:20 },
        label:   { fontSize:12, fontWeight:700, color:"#555", marginBottom:6, display:"block" },
        input:   (err) => ({ width:"100%", padding:"13px 14px", borderRadius:11, border:`1.5px solid ${err?"#FF3B30":"#e8e8e8"}`, fontSize:14, color:"#1A1A1A", outline:"none", background:"#fafafa", boxSizing:"border-box" }),
        select:  (err) => ({ width:"100%", padding:"13px 14px", borderRadius:11, border:`1.5px solid ${err?"#FF3B30":"#e8e8e8"}`, fontSize:14, color:"#1A1A1A", outline:"none", background:"#fafafa", boxSizing:"border-box", appearance:"none" }),
        row:     { display:"flex", gap:12 },
        emojiGrid: { display:"flex", flexWrap:"wrap", gap:6 },
        emojiBtn:  (sel) => ({ width:44, height:44, borderRadius:10, border:sel?"2px solid #FF6B35":"2px solid #eee", background:sel?"#FFF0EB":"#fff", fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }),
        bgGrid:  { display:"flex", flexWrap:"wrap", gap:8 },
        bgBtn:   (sel) => ({ width:36, height:36, borderRadius:8, border:sel?"3px solid #FF6B35":"3px solid transparent", cursor:"pointer", outline:"none" }),
        errBox:  { background:"#FFF0F0", border:"1px solid #FFD0D0", borderRadius:9, padding:"10px 12px", fontSize:12, color:"#FF3B30", marginBottom:16 },
        saveBtn: (d) => ({ width:"100%", padding:"16px", background:d?"#aaa":"linear-gradient(135deg,#FF6B35,#FF8C42)", color:"#fff", border:"none", borderRadius:13, fontSize:15, fontWeight:800, cursor:d?"not-allowed":"pointer", marginTop:8 }),
        savedMsg:{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"20px", fontSize:15, fontWeight:700, color:"#FF6B35" },
    };

    return (
        <div style={s.page}>
            <div style={s.topBar}>
                <button style={s.back} onClick={onBack}><IoArrowBack size={22} color="#1A1A1A" /></button>
                <span style={s.topTitle}>{isEdit ? "가게 수정" : "가게 등록"}</span>
                <div style={s.ph} />
            </div>

            <div style={s.body}>
                {/* 미리보기 */}
                <div style={{ ...s.preview, background: form.bgColor }}>
                    <span style={s.previewEmoji}>{form.imgEmoji}</span>
                    <div>
                        <div style={s.previewName}>{form.name || "가게 이름"}</div>
                        <div style={s.previewMeta}>{form.categoryName || "카테고리"} · 최소 {Number(form.minOrder).toLocaleString()}원</div>
                    </div>
                </div>

                {saved ? (
                    <div style={s.savedMsg}>
                        <IoCheckmarkCircle size={26} color="#FF6B35" />
                        {isEdit ? "수정이 완료되었어요!" : "가게가 등록되었어요!"}
                    </div>
                ) : (
                    <>
                        {formErr && <div style={s.errBox}>{formErr}</div>}

                        <div style={s.group}>
                            <label style={s.label}>가게 이름 *</label>
                            <input style={s.input(!form.name)} value={form.name}
                                   onChange={e => set("name", e.target.value)} placeholder="예) 굽네치킨 마포점" />
                        </div>

                        <div style={s.group}>
                            <label style={s.label}>카테고리 *</label>
                            <select style={s.select(!form.categoryName)} value={form.categoryName}
                                    onChange={e => set("categoryName", e.target.value)}>
                                <option value="">카테고리 선택</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.name || c.label}>{c.icon} {c.name || c.label}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ ...s.group }}>
                            <div style={s.row}>
                                <div style={{ flex:1 }}>
                                    <label style={s.label}>최소 주문금액 (원)</label>
                                    <input style={{ ...s.input(false), textAlign:"right" }} type="number" value={form.minOrder}
                                           onChange={e => set("minOrder", Number(e.target.value))} placeholder="0" />
                                </div>
                                <div style={{ flex:1 }}>
                                    <label style={s.label}>배달비 (원)</label>
                                    <input style={{ ...s.input(false), textAlign:"right" }} type="number" value={form.deliveryFee}
                                           onChange={e => set("deliveryFee", Number(e.target.value))} placeholder="0" />
                                </div>
                            </div>
                        </div>

                        <div style={s.group}>
                            <label style={s.label}>배달 예상 시간</label>
                            <input style={s.input(false)} value={form.deliveryTime}
                                   onChange={e => set("deliveryTime", e.target.value)} placeholder="예) 30~40분" />
                        </div>

                        <div style={s.group}>
                            <label style={s.label}>가게 아이콘</label>
                            <div style={s.emojiGrid}>
                                {EMOJI_OPTIONS.map(e => (
                                    <button key={e} style={s.emojiBtn(form.imgEmoji === e)}
                                            onClick={() => set("imgEmoji", e)}>{e}</button>
                                ))}
                            </div>
                        </div>

                        <div style={s.group}>
                            <label style={s.label}>배경 색상</label>
                            <div style={s.bgGrid}>
                                {BG_OPTIONS.map(bg => (
                                    <button key={bg} style={{ ...s.bgBtn(form.bgColor === bg), background: bg }}
                                            onClick={() => set("bgColor", bg)} />
                                ))}
                            </div>
                        </div>

                        <div style={s.group}>
                            <label style={s.label}>사장님 공지 (선택)</label>
                            <textarea style={{ ...s.input(false), resize:"vertical", minHeight:80, fontFamily:"inherit" }}
                                      value={form.ownerNotice}
                                      onChange={e => set("ownerNotice", e.target.value)}
                                      placeholder="고객에게 전달할 공지사항을 입력해주세요" />
                        </div>

                        <button style={s.saveBtn(saving)} onClick={handleSave} disabled={saving}>
                            {saving ? "저장 중..." : (isEdit ? "수정 완료" : "가게 등록하기")}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default OwnerRestaurantForm;