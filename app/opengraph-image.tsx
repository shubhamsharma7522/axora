import { ImageResponse } from "next/og";

export const alt = "AXORA GALAXY | NEET Coaching & Preparation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 10, color: "#8A8A8A" }}>
          AXORA GALAXY
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <div style={{ display: "flex" }}>TURN YOUR</div>
          <div style={{ display: "flex", color: "#4D84F2" }}>NEET DREAM</div>
          <div style={{ display: "flex" }}>INTO REALITY.</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#8A8A8A" }}>
          LEARN TODAY. HEAL TOMORROW.
        </div>
      </div>
    ),
    size,
  );
}
