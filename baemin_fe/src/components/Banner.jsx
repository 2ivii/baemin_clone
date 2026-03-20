import { useState } from "react";
import { banners } from "../data/mockData";

const Banner = () => {
  const [idx, setIdx] = useState(0);

  const styles = {
    banner: {
      margin: "0 16px",
      borderRadius: 16,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    title: {
      fontSize: 18,
      fontWeight: 800,
      color: "#fff",
    },
    sub: {
      fontSize: 13,
      color: "rgba(255,255,255,0.85)",
      fontWeight: 500,
    },
    hint: {
      fontSize: 11,
      color: "rgba(255,255,255,0.7)",
      marginTop: 2,
    },
    dots: {
      display: "flex",
      justifyContent: "center",
      gap: 6,
      marginTop: 8,
      marginBottom: 4,
    },
    dot: (active) => ({
      width: active ? 18 : 6,
      height: 6,
      borderRadius: 3,
      background: active ? "#29D3C4" : "#ccc",
      transition: "width 0.3s",
      cursor: "pointer",
    }),
  };

  const next = () => setIdx((idx + 1) % banners.length);

  return (
    <>
      <div
        style={{ ...styles.banner, background: banners[idx].bg }}
        onClick={next}
      >
        <div style={styles.title}>{banners[idx].text}</div>
        <div style={styles.sub}>{banners[idx].sub}</div>
        <div style={styles.hint}>
          탭하여 다음 배너 보기 ({idx + 1}/{banners.length})
        </div>
      </div>
      <div style={styles.dots}>
        {banners.map((_, i) => (
          <div
            key={i}
            style={styles.dot(i === idx)}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </>
  );
};

export default Banner;
