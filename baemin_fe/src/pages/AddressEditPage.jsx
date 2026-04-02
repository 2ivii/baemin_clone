import { useState, useEffect } from "react";
import { IoArrowBack, IoLocationSharp, IoAddOutline } from "react-icons/io5";
import { addressApi } from "../api/addressApi";
import AddressFormModal from "../components/AddressFormModal";

const AddressEditPage = ({ onBack }) => {
    const [addresses, setAddresses]   = useState([]);
    const [loading, setLoading]       = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => { fetchAddresses(); }, []);

    const fetchAddresses = async () => {
        setLoading(true);
        try { setAddresses(await addressApi.getAll()); }
        catch { setAddresses([]); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("이 주소를 삭제하시겠어요?")) return;
        setDeletingId(id);
        try {
            await addressApi.delete(id);
            setAddresses((prev) => prev.filter((a) => a.id !== id));
        } catch (e) {
            alert(e.message || "삭제에 실패했습니다.");
        } finally {
            setDeletingId(null);
        }
    };

    const s = {
        page:    { background: "#fff", minHeight: "100vh", paddingBottom: 100 },
        topBar:  { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 100 },
        iconBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4 },
        topTitle:{ fontSize: 17, fontWeight: 800, color: "#1A1A1A" },
        ph:      { width: 30 },
        addBtn: {
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            width: "calc(100% - 32px)", maxWidth: 398,
            padding: "16px", background: "#29D3C4", color: "#fff",
            border: "none", borderRadius: 14, fontSize: 15, fontWeight: 800,
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, zIndex: 50,
            boxShadow: "0 4px 16px rgba(41,211,196,0.35)",
        },
        addrItem:{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 16px", borderBottom: "1px solid #f0f0f0" },
        addrInfo:{ flex: 1 },
        topRow:  { display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" },
        addrLabel:{ fontSize: 16, fontWeight: 800, color: "#1A1A1A" },
        currentBadge: { display: "inline-block", background: "#E8F0FE", color: "#3D7BF4", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4 },
        addrDetail: { fontSize: 13, color: "#666", marginBottom: 3 },
        addrNote:   { fontSize: 12, color: "#aaa", whiteSpace: "pre-line", marginBottom: 12 },
        btnRow:  { display: "flex", gap: 8 },
        editBtn: { border: "1px solid #ddd", background: "#fff", borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 600, color: "#333", cursor: "pointer" },
        delBtn: (d) => ({ border: "1px solid #ddd", background: "#fff", borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 600, color: d ? "#ccc" : "#FF3B30", cursor: d ? "not-allowed" : "pointer" }),
        loading: { textAlign: "center", padding: "40px 0", color: "#aaa", fontSize: 14 },
        empty: { textAlign: "center", padding: "60px 20px", color: "#bbb" },
    };

    return (
        <div style={s.page}>
            <div style={s.topBar}>
                <button style={s.iconBtn} onClick={onBack}><IoArrowBack size={22} color="#1A1A1A" /></button>
                <span style={s.topTitle}>주소 편집</span>
                <div style={s.ph} />
            </div>

            {loading ? (
                <div style={s.loading}>주소 목록을 불러오는 중...</div>
            ) : addresses.length === 0 ? (
                <div style={s.empty}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📍</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#999" }}>등록된 주소가 없어요</div>
                    <div style={{ fontSize: 13, color: "#bbb", marginTop: 4 }}>아래 버튼을 눌러 주소를 추가해보세요!</div>
                </div>
            ) : addresses.map((addr) => (
                <div key={addr.id} style={s.addrItem}>
                    <IoLocationSharp size={20} color="#29D3C4" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div style={s.addrInfo}>
                        <div style={s.topRow}>
                            <span style={s.addrLabel}>{addr.label}</span>
                            {addr.isDefault && <span style={s.currentBadge}>현재 설정된 주소</span>}
                        </div>
                        <div style={s.addrDetail}>{addr.roadAddress} {addr.detailAddress}</div>
                        {addr.deliveryNote && <div style={s.addrNote}>{addr.deliveryNote}</div>}
                        <div style={s.btnRow}>
                            <button style={s.editBtn}>수정</button>
                            {!addr.isDefault && (
                                <button
                                    style={s.delBtn(deletingId === addr.id)}
                                    onClick={() => handleDelete(addr.id)}
                                    disabled={deletingId === addr.id}
                                >
                                    {deletingId === addr.id ? "삭제 중..." : "삭제"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* 주소 추가 버튼 (하단 고정) */}
            <button style={s.addBtn} onClick={() => setShowAddForm(true)}>
                <IoAddOutline size={20} color="#fff" />
                새 주소 추가하기
            </button>

            {/* 주소 추가 모달 */}
            {showAddForm && (
                <AddressFormModal
                    onClose={() => setShowAddForm(false)}
                    onSaved={() => {
                        setShowAddForm(false);
                        fetchAddresses();
                    }}
                />
            )}
        </div>
    );
};

export default AddressEditPage;