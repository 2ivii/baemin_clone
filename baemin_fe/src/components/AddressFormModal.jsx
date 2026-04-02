import { useState } from "react";
import { IoClose, IoCheckmarkCircle, IoLocationSharp } from "react-icons/io5";
import { addressApi } from "../api/addressApi";

const AddressFormModal = ({ onClose, onSaved }) => {
    const [form, setForm] = useState({
        label: "",
        roadAddress: "",
        detailAddress: "",
        deliveryNote: "",
        isDefault: false,
    });
    const [saving, setSaving] = useState(false);
    const [done, setDone]     = useState(false);
    const [error, setError]   = useState(null);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSave = async () => {
        if (!form.label.trim())       { setError("주소 별명을 입력해주세요. (예: 집, 회사)"); return; }
        if (!form.roadAddress.trim()) { setError("도로명 주소를 입력해주세요."); return; }
        setSaving(true); setError(null);
        try {
            await addressApi.add(form);
            setDone(true);
            setTimeout(() => { onSaved?.(); onClose(); }, 1200);
        } catch (e) {
            setError(e.message || "주소 추가에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    const LABEL_PRESETS = ["집", "회사", "학교", "헬스장", "기타"];

    const s = {
        overlay: {
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 500, display: "flex", alignItems: "flex-end", justifyContent: "center",
        },
        sheet: {
            width: "100%", maxWidth: 430, background: "#fff",
            borderRadius: "20px 20px 0 0", maxHeight: "90vh",
            overflowY: "auto", paddingBottom: 32,
        },
        topBar: {
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 20px 14px", borderBottom: "1px solid #f0f0f0",
            position: "sticky", top: 0, background: "#fff", zIndex: 1,
        },
        title:   { fontSize: 17, fontWeight: 800, color: "#1A1A1A" },
        closeBtn:{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
        body:    { padding: "20px" },
        group:   { marginBottom: 18 },
        label:   { fontSize: 12, fontWeight: 700, color: "#555", marginBottom: 7, display: "block" },
        input: (err) => ({
            width: "100%", padding: "13px 14px", borderRadius: 12,
            border: `1.5px solid ${err ? "#FF3B30" : "#e8e8e8"}`,
            fontSize: 14, color: "#1A1A1A", outline: "none",
            background: "#fafafa", boxSizing: "border-box",
        }),
        textarea: {
            width: "100%", padding: "13px 14px", borderRadius: 12,
            border: "1.5px solid #e8e8e8", fontSize: 14, color: "#1A1A1A",
            outline: "none", background: "#fafafa", boxSizing: "border-box",
            resize: "none", minHeight: 80, fontFamily: "inherit", lineHeight: 1.5,
        },
        presets: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 },
        preset: (active) => ({
            padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700,
            background: active ? "#1A1A1A" : "#f5f5f5",
            color: active ? "#fff" : "#555", border: "none", cursor: "pointer",
        }),
        toggleRow: {
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 0", borderTop: "1px solid #f5f5f5",
        },
        toggleLabel:{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" },
        toggleSub:  { fontSize: 12, color: "#aaa", marginTop: 2 },
        toggle: (on) => ({
            width: 44, height: 24, borderRadius: 12,
            background: on ? "#29D3C4" : "#ccc",
            position: "relative", cursor: "pointer", border: "none", transition: "background 0.2s",
        }),
        toggleDot: (on) => ({
            position: "absolute", top: 2, left: on ? 20 : 2,
            width: 20, height: 20, borderRadius: "50%",
            background: "#fff", transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }),
        errBox: {
            background: "#FFF0F0", border: "1px solid #FFD0D0", borderRadius: 10,
            padding: "10px 14px", fontSize: 13, color: "#FF3B30", marginBottom: 14,
        },
        saveBtn: (d) => ({
            width: "100%", padding: "15px", border: "none", borderRadius: 13,
            background: d ? "#aaa" : "#29D3C4", color: "#fff",
            fontSize: 15, fontWeight: 800, cursor: d ? "not-allowed" : "pointer", marginTop: 8,
        }),
        doneWrap: { textAlign: "center", padding: "24px 0" },
        hint: { fontSize: 12, color: "#aaa", marginTop: 6, lineHeight: 1.5 },
    };

    return (
        <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div style={s.sheet}>
                <div style={s.topBar}>
                    <span style={s.title}>새 주소 추가</span>
                    <button style={s.closeBtn} onClick={onClose}>
                        <IoClose size={22} color="#555" />
                    </button>
                </div>

                <div style={s.body}>
                    {done ? (
                        <div style={s.doneWrap}>
                            <IoCheckmarkCircle size={56} color="#29D3C4" />
                            <div style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginTop: 12 }}>
                                주소가 추가되었어요!
                            </div>
                        </div>
                    ) : (
                        <>
                            {error && <div style={s.errBox}>{error}</div>}

                            {/* 별명 */}
                            <div style={s.group}>
                                <label style={s.label}>주소 별명 *</label>
                                <input
                                    style={s.input(!form.label)}
                                    placeholder="예) 집, 회사, 학교"
                                    value={form.label}
                                    onChange={(e) => set("label", e.target.value)}
                                />
                                <div style={s.presets}>
                                    {LABEL_PRESETS.map((p) => (
                                        <button
                                            key={p}
                                            style={s.preset(form.label === p)}
                                            onClick={() => set("label", p)}
                                        >{p}</button>
                                    ))}
                                </div>
                            </div>

                            {/* 도로명 주소 */}
                            <div style={s.group}>
                                <label style={s.label}>도로명 주소 *</label>
                                <input
                                    style={s.input(!form.roadAddress)}
                                    placeholder="예) 서울특별시 마포구 월드컵북로 21"
                                    value={form.roadAddress}
                                    onChange={(e) => set("roadAddress", e.target.value)}
                                />
                                <div style={s.hint}>
                                    도로명 주소, 지번 주소 모두 입력 가능해요
                                </div>
                            </div>

                            {/* 상세 주소 */}
                            <div style={s.group}>
                                <label style={s.label}>상세 주소</label>
                                <input
                                    style={s.input(false)}
                                    placeholder="예) 101동 1004호"
                                    value={form.detailAddress}
                                    onChange={(e) => set("detailAddress", e.target.value)}
                                />
                            </div>

                            {/* 배달 요청사항 */}
                            <div style={s.group}>
                                <label style={s.label}>배달 요청사항</label>
                                <textarea
                                    style={s.textarea}
                                    placeholder="예) 문 앞에 놔주세요, 벨 누르지 마세요"
                                    value={form.deliveryNote}
                                    onChange={(e) => set("deliveryNote", e.target.value.slice(0, 200))}
                                />
                            </div>

                            {/* 기본 주소 설정 */}
                            <div style={s.toggleRow}>
                                <div>
                                    <div style={s.toggleLabel}>기본 배달 주소로 설정</div>
                                    <div style={s.toggleSub}>주문 시 이 주소가 자동 선택돼요</div>
                                </div>
                                <button
                                    style={s.toggle(form.isDefault)}
                                    onClick={() => set("isDefault", !form.isDefault)}
                                >
                                    <div style={s.toggleDot(form.isDefault)} />
                                </button>
                            </div>

                            <button
                                style={s.saveBtn(saving)}
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "추가 중..." : "주소 추가하기"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressFormModal;