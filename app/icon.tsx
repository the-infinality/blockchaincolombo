import { ImageResponse } from "next/og";

// PLACEHOLDER: the legacy site's ACF `site_favicon` option field pointed at
// attachment ID 488, which no longer exists in the database (dead
// reference — see PROJECT-README.md) — there was no real favicon to port.
// This is a brand-colored monogram standing in until a real one is supplied.
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
          background: "#0b1a33",
          color: "#f5f7f9",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        BC
      </div>
    ),
    size
  );
}
