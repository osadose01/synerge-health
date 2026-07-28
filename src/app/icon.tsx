import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060B09",
          borderRadius: "8px",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 200 200" fill="none">
          <g transform="translate(100,100)" strokeLinecap="round">
            <ellipse rx="72" ry="40" transform="rotate(15)" stroke="#5FF5CC" strokeWidth="14" />
            <ellipse rx="72" ry="40" transform="rotate(60)" stroke="#7FCBF2" strokeWidth="14" />
            <ellipse rx="72" ry="40" transform="rotate(105)" stroke="#F2C877" strokeWidth="14" />
            <ellipse rx="72" ry="40" transform="rotate(150)" stroke="#A9E4F5" strokeWidth="14" />
            <circle r="16" fill="#2BE0B0" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
