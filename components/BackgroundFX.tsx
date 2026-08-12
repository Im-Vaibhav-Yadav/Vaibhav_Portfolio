export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -left-40 top-[-10%] h-[560px] w-[560px] rounded-full bg-acid/[0.10] blur-[120px] animate-drift" />
      <div className="absolute right-[-10%] top-[20%] h-[480px] w-[480px] rounded-full bg-amber/[0.08] blur-[130px] animate-driftSlow" />
      <div className="absolute left-[15%] bottom-[-15%] h-[500px] w-[500px] rounded-full bg-acid/[0.06] blur-[140px] animate-drift" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
