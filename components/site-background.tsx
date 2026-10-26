import { ParticleField } from "@/components/particle-field";

export function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#010308]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 50% 0%, #050b1c 0%, #02040c 55%, #010308 100%)",
        }}
      />

      <ParticleField />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
