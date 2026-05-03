import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Callline. Never miss a call. Never miss a job.";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4EFE6",
          color: "#0E0E0C",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontSize: 16,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(14,14,12,0.55)",
          }}
        >
          <span
            style={{
              display: "block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#FF5B1F",
            }}
          />
          <span style={{ display: "block" }}>On the line · 24/7</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontStyle: "italic",
            fontSize: 132,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          <span>Every missed call</span>
          <span>
            is a&nbsp;
            <span style={{ color: "#FF5B1F" }}>job</span>
          </span>
          <span style={{ fontStyle: "normal" }}>you just lost.</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontSize: 16,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(14,14,12,0.5)",
          }}
        >
          <span>Callline · AI receptionist for home service</span>
          <span>1 (866) 966-1988</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
