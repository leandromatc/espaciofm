import { ImageResponse } from "next/og";

/* eslint-disable @next/next/no-img-element -- ImageResponse renders this embedded SVG into the generated PNG. */

export const runtime = "edge";

const MARK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11.49 16'%3E%3Cpath fill='%23e81717' d='M3.72 0h7.77v3.49H3.72zM0 3.49h3.72v12.5H0zM3.72 3.49h7.12v2.66H3.72zM3.72 6.15h7.12v3.38H3.72zM3.72 12.51h7.77V16H3.72z'/%3E%3C/svg%3E";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f5f2",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={MARK} width="58" height="80" alt="" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#ff5252",
              }}
            />
            EN VIVO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "116px",
              fontWeight: 900,
              letterSpacing: "-4px",
              lineHeight: 0.78,
            }}
          >
            <span>ESPACIO</span>
            <span>SPORT</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "34px",
              color: "#ff5252",
              fontSize: "54px",
              fontWeight: 800,
              letterSpacing: "1px",
            }}
          >
            91.5 FM
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(245, 245, 242, 0.35)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: "430px",
              fontSize: "23px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            La radio del deporte de Mercedes
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(245, 245, 242, 0.7)",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            URUGUAY
          </div>
        </div>
      </div>
    ),
    {
      width: 720,
      height: 720,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      },
    },
  );
}
