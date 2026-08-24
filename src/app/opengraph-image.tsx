import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

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
          justifyContent: "space-between",
          background: "#201d1a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 56, fontWeight: 600, color: "#f7f4ee" }}>
          <span style={{ color: "#c2543a" }}>Ed</span>
          <span>mat</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 44, color: "#f7f4ee", maxWidth: 900 }}>
            Meble na wymiar i osłony okienne w Krośnie
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#c9c2b6" }}>
            {siteConfig.address.city} · od {siteConfig.foundedYear} roku
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
