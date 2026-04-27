import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FBFBF7",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4.5 C20.6 4.5 23.5 7 23.5 11.2 L23.5 14.2 C23.5 16.1 22 17.2 19.8 17.2 L12.2 17.2 C10 17.2 8.5 16.1 8.5 14.2 L8.5 11.2 C8.5 7 11.4 4.5 16 4.5 Z"
            fill="#15375D"
          />
          <path
            d="M11.4 17.6 L11.4 22.5 C11.4 25.2 12.6 26.6 14.2 26.2 C15 26 15.2 24.4 15.2 22.4 L15.2 17.6 Z"
            fill="#2D8AAB"
          />
          <path
            d="M16.8 17.6 L16.8 25.4 C16.8 27.7 18.6 28.4 20.4 27.6 C22.4 26.7 22.4 23.4 21.7 19.6 L21.4 17.6 Z"
            fill="#15375D"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
