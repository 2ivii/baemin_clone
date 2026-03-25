import { useState } from "react";

const initialAddresses = [
    {
        id: 1,
        label: "경기 고양시 일산서구 가좌2로 22",
        detail: "경기 고양시 일산서구 가좌2로 22 602-1704",
        note: "문 앞에 두고 벨 눌러주세요",
        isCurrent: true,
    },
    {
        id: 2,
        label: "할머니댁",
        detail: "전남 나주시 토계안길 17 주택",
        note: "문 앞에 두고 벨 눌러주세요",
        isCurrent: false,
    },
    {
        id: 3,
        label: "인천 중구 서해대로417번길 1",
        detail: "인천 중구 서해대로417번길 1 A동1902호",
        note: "문 앞에 두고 벨 눌러주세요",
        isCurrent: false,
    },
    {
        id: 4,
        label: "경기 고양시 덕양구 항공대학로 76",
        detail: "경기 고양시 덕양구 항공대학로 76 전자관 4층 419호",
        note: "문 앞에 두고 노크해주세요\n엘레베이터 타신다면 내려서 오른쪽입니다",
        isCurrent: false,
    },
    {
        id: 5,
        label: "토계동 476",
        detail: "전남 나주시 토계안길 19 토계안길17",
        note: "문 앞에 두고 벨 눌러주세요",
        isCurrent: false,
    },
    {
        id: 6,
        label: "서교동 377-4",
        detail: "서울 마포구 서교동 377-4",
        note: "문 앞에 두고 벨 눌러주세요",
        isCurrent: false,
    },
];

const AddressEditPage = ({ onBack }) => {
    const [addresses, setAddresses] = useState(initialAddresses);

    const handleDelete = (id) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    const s = {
        page: { background: "#fff", minHeight: "100vh", paddingBottom: 40 },
        topBar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 100,
        },
        iconBtn: {
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#1A1A1A",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        topTitle: { fontSize: 17, fontWeight: 800, color: "#1A1A1A" },
        placeholder: { width: 36 },
        addrList: { padding: "8px 0" },
        addrItem: {
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            padding: "20px 16px",
            borderBottom: "1px solid #f0f0f0",
        },
        pinIcon: {
            fontSize: 20,
            color: "#555",
            marginTop: 2,
            flexShrink: 0,
        },
        addrInfo: { flex: 1 },
        topRow: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3,
            flexWrap: "wrap",
        },
        addrLabel: {
            fontSize: 16,
            fontWeight: 800,
            color: "#1A1A1A",
        },
        currentBadge: {
            display: "inline-block",
            background: "#E8F0FE",
            color: "#3D7BF4",
            fontSize: 11,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 4,
        },
        addrDetail: {
            fontSize: 13,
            color: "#666",
            marginBottom: 3,
        },
        addrNote: {
            fontSize: 12,
            color: "#aaa",
            whiteSpace: "pre-line",
            marginBottom: 12,
        },
        btnRow: {
            display: "flex",
            gap: 8,
        },
        editBtn: {
            border: "1px solid #ddd",
            background: "#fff",
            borderRadius: 8,
            padding: "7px 18px",
            fontSize: 13,
            fontWeight: 600,
            color: "#333",
            cursor: "pointer",
        },
        deleteBtn: {
            border: "1px solid #ddd",
            background: "#fff",
            borderRadius: 8,
            padding: "7px 18px",
            fontSize: 13,
            fontWeight: 600,
            color: "#333",
            cursor: "pointer",
        },
    };

    return (
        <div style={s.page}>
            {/* Top Bar */}
            <div style={s.topBar}>
                <button style={s.iconBtn} onClick={onBack}>←</button>
                <span style={s.topTitle}>주소 편집</span>
                <div style={s.placeholder} />
            </div>

            {/* Address List */}
            <div style={s.addrList}>
                {addresses.map((addr) => (
                    <div key={addr.id} style={s.addrItem}>
                        <span style={s.pinIcon}>📍</span>
                        <div style={s.addrInfo}>
                            <div style={s.topRow}>
                                <span style={s.addrLabel}>{addr.label}</span>
                                {addr.isCurrent && (
                                    <span style={s.currentBadge}>현재 설정된 주소</span>
                                )}
                            </div>
                            <div style={s.addrDetail}>{addr.detail}</div>
                            <div style={s.addrNote}>{addr.note}</div>
                            <div style={s.btnRow}>
                                <button style={s.editBtn}>수정</button>
                                {!addr.isCurrent && (
                                    <button style={s.deleteBtn} onClick={() => handleDelete(addr.id)}>
                                        삭제
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressEditPage;