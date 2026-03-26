import { useState, useEffect } from "react";
import { IoArrowBack, IoPencil, IoSearchOutline, IoLocationOutline, IoCheckmark, IoHomeOutline, IoLocation } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { addressApi } from "../api/addressApi";

const AddressSettingPage = ({ onBack, onEdit }) => {
    const [addresses, setAddresses]   = useState([]);
    const [loading, setLoading]       = useState(true);
    const [settingId, setSettingId]   = useState(null);
    const [search, setSearch]         = useState("");

    useEffect(() => { fetchAddresses(); }, []);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const data = await addressApi.getAll();
            setAddresses(data);
        } catch {
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = async (addr) => {
        if (addr.isDefault) return;
        setSettingId(addr.id);
        try {
            await addressApi.setDefault(addr.id);
            setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === addr.id })));
        } catch (e) {
            alert(e.message || "기본 주소 변경에 실패했습니다.");
        } finally {
            setSettingId(null);
        }
    };

    const selectedId = addresses.find((a) => a.isDefault)?.id;
    const filtered   = addresses.filter(
        (a) => !search || a.label?.includes(search) || a.roadAddress?.includes(search)
    );

    const s = {
        page:     { background: "#fff", minHeight: "100vh", paddingBottom: 40 },
        topBar:   { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 100 },
        iconBtn:  { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4 },
        topTitle: { fontSize: 17, fontWeight: 800, color: "#1A1A1A" },
        searchWrap: { margin: "16px 16px 10px", background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "12px 14px" },
        searchInput: { border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 14, color: "#333" },
        currentLocBtn: { margin: "0 16px 16px", border: "1px solid #ddd", borderRadius: 10, padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#1A1A1A", background: "#fff", cursor: "pointer", width: "calc(100% - 32px)" },
        homeAddRow: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderTop: "1px solid #f0f0f0", borderBottom: "8px solid #f5f5f5", cursor: "pointer" },
        addrItem: (sel) => ({ display: "flex", alignItems: "flex-start", gap: 12, padding: "18px 16px", borderBottom: "1px solid #f5f5f5", cursor: "pointer", background: sel ? "#fafafa" : "#fff" }),
        addrInfo: { flex: 1 },
        currentBadge: { display: "inline-block", background: "#E8F0FE", color: "#3D7BF4", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, marginBottom: 4 },
        addrLabel: (sel) => ({ fontSize: 15, fontWeight: sel ? 800 : 600, color: "#1A1A1A", marginBottom: 2 }),
        addrDetail: { fontSize: 13, color: "#888", marginBottom: 2 },
        addrNote:   { fontSize: 12, color: "#aaa" },
        loading:  { textAlign: "center", padding: "40px 0", color: "#aaa", fontSize: 14 },
    };

    return (
        <div style={s.page}>
            <div style={s.topBar}>
                <button style={s.iconBtn} onClick={onBack}>
                    <IoArrowBack size={22} color="#1A1A1A" />
                </button>
                <span style={s.topTitle}>주소 설정</span>
                <button style={s.iconBtn} onClick={onEdit}>
                    <IoPencil size={20} color="#1A1A1A" />
                </button>
            </div>

            <div style={s.searchWrap}>
                <IoSearchOutline size={18} color="#aaa" />
                <input style={s.searchInput} placeholder="지번, 도로명, 건물명으로 검색"
                       value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <button style={s.currentLocBtn}>
                <MdMyLocation size={18} color="#555" />
                현재 위치로 찾기
            </button>

            <div style={s.homeAddRow}>
                <IoHomeOutline size={20} color="#555" />
                <span style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>우리집 추가</span>
            </div>

            {loading ? (
                <div style={s.loading}>주소 목록을 불러오는 중...</div>
            ) : filtered.map((addr) => {
                const isSel = addr.id === selectedId;
                return (
                    <div key={addr.id} style={s.addrItem(isSel)} onClick={() => handleSelect(addr)}>
                        {isSel
                            ? <IoLocation     size={20} color="#1A1A1A" style={{ marginTop: 2, flexShrink: 0 }} />
                            : <IoLocationOutline size={20} color="#ccc" style={{ marginTop: 2, flexShrink: 0 }} />}
                        <div style={s.addrInfo}>
                            {addr.isDefault && isSel && <div style={s.currentBadge}>현재 설정된 주소</div>}
                            <div style={s.addrLabel(isSel)}>{addr.label}</div>
                            <div style={s.addrDetail}>{addr.roadAddress} {addr.detailAddress}</div>
                            {addr.deliveryNote && <div style={s.addrNote}>{addr.deliveryNote}</div>}
                        </div>
                        {settingId === addr.id
                            ? <span style={{ fontSize: 12, color: "#aaa", alignSelf: "center" }}>설정 중…</span>
                            : isSel && <IoCheckmark size={20} color="#1A1A1A" style={{ alignSelf: "center", flexShrink: 0 }} />}
                    </div>
                );
            })}
        </div>
    );
};

export default AddressSettingPage;