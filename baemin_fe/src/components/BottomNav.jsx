import { IoHomeOutline, IoHome } from "react-icons/io5";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { IoReceiptOutline, IoReceipt } from "react-icons/io5";
import { IoPersonOutline, IoPerson } from "react-icons/io5";

const tabs = [
  { id: "home",  label: "홈",      Icon: IoHomeOutline,    ActiveIcon: IoHome    },
  { id: "fav",   label: "찜",      Icon: IoHeartOutline,   ActiveIcon: IoHeart   },
  { id: "order", label: "주문내역", Icon: IoReceiptOutline, ActiveIcon: IoReceipt },
  { id: "my",    label: "마이배민", Icon: IoPersonOutline,  ActiveIcon: IoPerson  },
];

const BottomNav = ({ activeTab, onTabChange }) => {
  const styles = {
    nav: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: "#fff",
      borderTop: "1px solid #eee",
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 0 14px",
      zIndex: 100,
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      cursor: "pointer",
      padding: "4px 16px",
      background: "none",
      border: "none",
    },
    label: (active) => ({
      fontSize: 10,
      fontWeight: 700,
      color: active ? "#29D3C4" : "#aaa",
    }),
  };

  return (
      <div style={styles.nav}>
        {tabs.map(({ id, label, Icon, ActiveIcon }) => {
          const active = activeTab === id;
          const Comp = active ? ActiveIcon : Icon;
          return (
              <button key={id} style={styles.item} onClick={() => onTabChange(id)}>
                <Comp size={24} color={active ? "#29D3C4" : "#aaa"} />
                <span style={styles.label(active)}>{label}</span>
              </button>
          );
        })}
      </div>
  );
};

export default BottomNav;