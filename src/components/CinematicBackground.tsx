// ============================================================
// SevaPath — Cinematic Dark Background (replaces SevaPathBackground)
// ============================================================
// For the homepage hero: deep navy environment
// For other pages: subtle dark-to-light transition

import { useLocation } from 'react-router-dom';

export default function CinematicBackground() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return (
      <div className="cinematic-global-bg" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        {/* Dark navy base — only behind hero, fades to warm below */}
        <div className="cinematic-global-bg__dark-top" />
        {/* Transition zone */}
        <div className="cinematic-global-bg__transition" />
        {/* Content area: warm subtle background */}
        <div className="cinematic-global-bg__warm-body" />
      </div>
    );
  }

  // Other pages: keep the existing warm civic feel
  return (
    <div className="seva-bg" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <div className="seva-bg-wash seva-bg-wash--top-left" />
      <div className="seva-bg-wash seva-bg-wash--top-right" />
      <div className="seva-bg-wash seva-bg-wash--bottom-right" />
      <div className="seva-bg-wash seva-bg-wash--bottom-left" />
      <div className="seva-bg-wash seva-bg-wash--center" />
      <div className="seva-bg-vignette" />
    </div>
  );
}
