import { ImageResponse } from "next/og";

export const alt = "Julevbágo – Samiske språkressurser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#1e293b",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700 }}>Julevbágo</div>
        <div style={{ fontSize: 48, marginTop: 24, color: "#cbd5e1" }}>
          Samiske språkressurser
        </div>
      </div>
    ),
    size
  );
}