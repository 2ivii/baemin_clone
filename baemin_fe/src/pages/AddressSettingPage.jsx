import { useState } from "react";

const addresses = [
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

const AddressSettingPage = ({ onBack, onEdit }) => {
    const [selected, setSelected] = useState(1);
    const [search, setSearch] = useState("");

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
        searchWrap: {
            margin: "16px 16px 10px",
            background: "#f5f5f5",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 14px",
        },
        searchInput: {
            border: "none",
            background: "transparent",
            outline: "none",
            flex: 1,
            fontSize: 14,
            color: "#333",
        },
        currentLocBtn: {
            margin: "0 16px 16px",
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: "#1A1A1A",
            background: "#fff",
            cursor: "pointer",
            width: "calc(100% - 32px)",
        },
        homeAddRow: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 16px",
            borderTop: "1px solid #f0f0f0",
            borderBottom: "8px solid #f5f5f5",
            cursor: "pointer",
        },
        homeIcon: { fontSize: 20, color: "#555" },
        homeLabel: { fontSize: 15, fontWeight: 700, color: "#1A1A1A" },
        addrList: {},
        addrItem: (isSelected) => ({
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: "18px 16px",
            borderBottom: "1px solid #f5f5f5",
            cursor: "pointer",
            background: isSelected ? "#fafafa" : "#fff",
        }),
        pinIcon: (isSelected) => ({
            fontSize: 18,
            color: isSelected ? "#1A1A1A" : "#bbb",
            marginTop: 2,
            flexShrink: 0,
        }),
        addrInfo: { flex: 1 },
        currentBadge: {
            display: "inline-block",
            background: "#E8F0FE",
            color: "#3D7BF4",
            fontSize: 11,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 4,
            marginBottom: 4,
        },
        addrLabel: (isSelected) => ({
            fontSize: 15,
            fontWeight: isSelected ? 800 : 600,
            color: "#1A1A1A",
            marginBottom: 2,
        }),
        addrDetail: {
            fontSize: 13,
            color: "#888",
            marginBottom: 2,
        },
        addrNote: {
            fontSize: 12,
            color: "#aaa",
        },
        checkIcon: {
            fontSize: 18,
            color: "#1A1A1A",
            fontWeight: 900,
            flexShrink: 0,
            alignSelf: "center",
        },
    };

    return (
        <div style={s.page}>
            {/* Top Bar */}
            <div style={s.topBar}>
                <button style={s.iconBtn} onClick={onBack}>←</button>
                <span style={s.topTitle}>주소 설정</span>
                <button style={s.iconBtn} onClick={onEdit}>✏️</button>
            </div>

            {/* Search */}
            <div style={s.searchWrap}>
                <span style={{ fontSize: 16, color: "#aaa" }}>🔍</span>
                <input
                    style={s.searchInput}
                    placeholder="지번, 도로명, 건물명으로 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Current Location Button */}
            <button style={s.currentLocBtn}>
                <span>⊙</span> 현재 위치로 찾기
            </button>

            {/* Home Add */}
            <div style={s.homeAddRow}>
                <span style={s.homeIcon}>🏠</span>
                <span style={s.homeLabel}>우리집 추가</span>
            </div>

            {/* Address List */}
            <div style={s.addrList}>
                {addresses
                    .filter((a) => !search || a.label.includes(search) || a.detail.includes(search))
                    .map((addr) => {
                        const isSelected = selected === addr.id;
                        return (
                            <div
                                key={addr.id}
                                style={s.addrItem(isSelected)}
                                onClick={() => setSelected(addr.id)}
                            >
                <span style={s.pinIcon(isSelected)}>
                  {isSelected ? "📍" : "◎"}
                </span>
                                <div style={s.addrInfo}>
                                    {addr.isCurrent && isSelected && (
                                        <div style={s.currentBadge}>현재 설정된 주소</div>
                                    )}
                                    <div style={s.addrLabel(isSelected)}>{addr.label}</div>
                                    <div style={s.addrDetail}>{addr.detail}</div>
                                    <div style={s.addrNote}>{addr.note}</div>
                                </div>
                                {isSelected && <span style={s.checkIcon}>✓</span>}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default AddressSettingPage;