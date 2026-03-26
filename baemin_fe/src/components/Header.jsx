import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { addressApi } from "../api/addressApi";

const Header = ({ cartCount, onCartClick, onAddressClick }) => {
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    addressApi.getAll()
        .then((list) => {
          const def = list.find((a) => a.isDefault) ?? list[0] ?? null;
          setDefaultAddress(def);
        })
        .catch(() => setDefaultAddress(null));
  }, []);

  // 주소 레이블 축약 (너무 길면 자르기)
  const addressLabel = (() => {
    if (!defaultAddress) return "주소를 설정해주세요";
    const label = defaultAddress.label || defaultAddress.roadAddress || "";
    return label.length > 14 ? label.slice(0, 14) + "…" : label;
  })();

  const styles = {
    header: {
      background: "#29D3C4",
      padding: "14px 20px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    addressBar: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      cursor: "pointer",
      flex: 1,
    },
    addressTextWrap: { display: "flex", flexDirection: "column" },
    addressLabel: { fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 500 },
    addressText: {
      fontSize: 14,
      color: "#fff",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 2,
    },
    logo: {
      fontSize: 20,
      fontWeight: 900,
      color: "#fff",
      letterSpacing: -1,
      fontFamily: "'Black Han Sans', sans-serif",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    },
    icons: {
      display: "flex",
      gap: 12,
      alignItems: "center",
    },
    iconBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      position: "relative",
      padding: 0,
      display: "flex",
      alignItems: "center",
    },
    badge: {
      position: "absolute",
      top: -6,
      right: -6,
      background: "#FF3B30",
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      borderRadius: 10,
      padding: "1px 5px",
      minWidth: 16,
      textAlign: "center",
    },
  };

  return (
      <div style={styles.header}>
        <div style={styles.addressBar} onClick={onAddressClick}>
          <MdLocationOn size={22} color="#fff" />
          <div style={styles.addressTextWrap}>
            <span style={styles.addressLabel}>배달주소</span>
            <span style={styles.addressText}>
            {addressLabel}
              <MdKeyboardArrowDown size={16} color="rgba(255,255,255,0.9)" />
          </span>
          </div>
        </div>

        <div style={styles.logo}>배달의민족</div>

        <div style={styles.icons}>
          <button style={styles.iconBtn} onClick={onCartClick}>
            <IoBagOutline size={26} color="#fff" />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </button>
          <button style={styles.iconBtn}>
            <IoNotificationsOutline size={26} color="#fff" />
          </button>
        </div>
      </div>
  );
};

export default Header;