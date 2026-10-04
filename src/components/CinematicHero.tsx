// ============================================================
// SevaPath — Cinematic Hero (Full-Viewport Immersive)
// ============================================================
// Canvas-based 3D particle network + CSS depth layers + scroll parallax
// All existing CTA buttons preserved and functional

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ChevronRight, Search, CheckCircle2, Lock, Sparkles } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  size: number;
  opacity: number;
  color: string;
  type: 'node' | 'dot' | 'path';
}

interface Connection {
  a: number; b: number;
  alpha: number;
}

// ─── Canvas 3D Network ───────────────────────────────────
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#16856A', '#1EB993', '#67D9FF', '#3B82F6', '#16856A'];
    let W = 0, H = 0;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Build particles
    function buildParticles() {
      const count = Math.min(90, Math.floor((W * H) / 14000));
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        const type = i < count * 0.15 ? 'node' : i < count * 0.4 ? 'path' : 'dot';
        particlesRef.current.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: Math.random() * 600 + 100,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.12,
          vz: 0,
          size: type === 'node' ? Math.random() * 3 + 2.5 : Math.random() * 1.5 + 0.5,
          opacity: type === 'node' ? Math.random() * 0.6 + 0.4 : Math.random() * 0.4 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
          type,
        });
      }
      buildConnections();
    }

    function buildConnections() {
      connectionsRef.current = [];
      const ps = particlesRef.current;
      const maxDist = Math.min(W, H) * 0.22;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist && connectionsRef.current.length < 180) {
            connectionsRef.current.push({ a: i, b: j, alpha: (1 - dist / maxDist) * 0.35 });
          }
        }
      }
    }

    buildParticles();

    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.003;
      const scrollOffset = scrollRef.current * 0.15;

      const ps = particlesRef.current;

      // Update
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      }

      // Draw connections
      const cs = connectionsRef.current;
      for (const c of cs) {
        const pa = ps[c.a], pb = ps[c.b];
        const depth = (pa.z + pb.z) / 2;
        const depthFactor = 700 / (depth + scrollOffset);
        const alpha = c.alpha * depthFactor * 0.6;
        if (alpha < 0.01) continue;

        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(22,133,106,${alpha})`;
        ctx!.lineWidth = depthFactor * 0.5;
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.stroke();
      }

      // Draw particles
      for (const p of ps) {
        const depth = 700 / (p.z + scrollOffset + 100);
        const screenSize = p.size * depth;
        const alpha = p.opacity * Math.min(1, depth * 1.2);
        if (alpha < 0.02 || screenSize < 0.3) continue;

        if (p.type === 'node') {
          // Glowing node
          const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, screenSize * 4);
          const hex = p.color === '#1EB993' ? '30,185,147' : p.color === '#67D9FF' ? '103,217,255' : '22,133,106';
          grd.addColorStop(0, `rgba(${hex},${alpha})`);
          grd.addColorStop(0.4, `rgba(${hex},${alpha * 0.5})`);
          grd.addColorStop(1, `rgba(${hex},0)`);
          ctx!.beginPath();
          ctx!.fillStyle = grd;
          ctx!.arc(p.x, p.y, screenSize * 4, 0, Math.PI * 2);
          ctx!.fill();

          // Core dot
          ctx!.beginPath();
          ctx!.fillStyle = p.color;
          ctx!.globalAlpha = alpha;
          ctx!.arc(p.x, p.y, screenSize, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        } else {
          ctx!.beginPath();
          ctx!.fillStyle = p.color;
          ctx!.globalAlpha = alpha * 0.7;
          ctx!.arc(p.x, p.y, screenSize, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        }
      }

      // Flowing path lines (signature journey visual)
      drawJourneyPaths(ctx!, W, H, t, scrollOffset);

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    setTimeout(buildConnections, 2000);

    // Scroll listener
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
}

function drawJourneyPaths(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  scrollOffset: number
) {
  const paths = [
    { y: H * 0.38, amplitude: 38, speed: 0.6, color: '22,133,106', alpha: 0.18 },
    { y: H * 0.55, amplitude: 28, speed: 0.4, color: '30,185,147', alpha: 0.12 },
    { y: H * 0.72, amplitude: 22, speed: 0.8, color: '103,217,255', alpha: 0.09 },
  ];

  for (const p of paths) {
    ctx.beginPath();
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * W;
      const wave = Math.sin((i / segments) * Math.PI * 3 + t * p.speed) * p.amplitude;
      const depth = 0.7 + (Math.sin(i / segments * Math.PI) * 0.3);
      const y = p.y + wave * depth - scrollOffset * 0.1;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }

    // Dash animation
    ctx.setLineDash([8, 14]);
    ctx.lineDashOffset = -t * 80;
    ctx.strokeStyle = `rgba(${p.color},${p.alpha})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Node milestones on primary path
  const milestones = [0.12, 0.28, 0.46, 0.64, 0.82];
  for (const mx of milestones) {
    const x = mx * W;
    const wave = Math.sin(mx * Math.PI * 3 + t * 0.6) * 38;
    const y = H * 0.38 + wave - scrollOffset * 0.1;
    
    // Outer ring
    const pulse = Math.sin(t * 2 + mx * 10) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, 8 + pulse * 4, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(22,133,106,${0.12 + pulse * 0.1})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Inner dot
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(30,185,147,0.75)`;
    ctx.fill();
  }
}

// ─── Main Hero Component ─────────────────────────────────
export default function CinematicHero() {
  const navigate = useNavigate();
  const { t } = useApp();
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxY = scrollY * 0.4;
  const textParallaxY = scrollY * 0.25;
  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section
      className="cinema-hero"
      aria-label="SevaPath Hero"
    >
      {/* ── Deep Space Background ── */}
      <div className="cinema-hero__bg">
        {/* Base gradient */}
        <div className="cinema-hero__gradient" />
        
        {/* Depth planes */}
        <div
          className="cinema-hero__depth-plane cinema-hero__depth-plane--far"
          style={{ transform: `translateY(${parallaxY * 0.3}px)` }}
        />
        <div
          className="cinema-hero__depth-plane cinema-hero__depth-plane--mid"
          style={{ transform: `translateY(${parallaxY * 0.5}px)` }}
        />
        <div
          className="cinema-hero__depth-plane cinema-hero__depth-plane--near"
          style={{ transform: `translateY(${parallaxY * 0.7}px)` }}
        />

        {/* Canvas network */}
        <div
          className="cinema-hero__canvas-wrap"
          style={{ transform: `translateY(${parallaxY * 0.2}px)`, opacity }}
        >
          <NetworkCanvas />
        </div>

        {/* Ambient glow orbs */}
        <div
          className="cinema-orb cinema-orb--1"
          style={{ transform: `translate(-50%, calc(-50% + ${parallaxY * 0.4}px))` }}
        />
        <div
          className="cinema-orb cinema-orb--2"
          style={{ transform: `translate(-50%, calc(-50% + ${parallaxY * 0.6}px))` }}
        />
        <div
          className="cinema-orb cinema-orb--3"
          style={{ transform: `translate(-50%, calc(-50% + ${parallaxY * 0.3}px))` }}
        />

        {/* Vignette */}
        <div className="cinema-hero__vignette" />
        
        {/* Bottom fade */}
        <div className="cinema-hero__bottom-fade" />
      </div>

      {/* ── Floating decorative elements ── */}
      <div
        className="cinema-hero__floaters"
        style={{ transform: `translateY(${parallaxY * 0.15}px)`, opacity }}
        aria-hidden="true"
      >
        {/* Document floating panel */}
        <div className="cinema-floater cinema-floater--doc">
          <div className="cinema-floater__lines">
            <span /><span /><span style={{ width: '60%' }} />
          </div>
          <div className="cinema-floater__badge">✓ Eligible</div>
        </div>

        {/* Stats chip */}
        <div className="cinema-floater cinema-floater--stat">
          <span className="cinema-floater__num">₹15K</span>
          <span className="cinema-floater__sub">Direct Benefit</span>
        </div>

        {/* Status node */}
        <div className="cinema-floater cinema-floater--node">
          <span className="cinema-floater__pulse" />
          <span className="cinema-floater__label">Live Match</span>
        </div>
      </div>

      {/* ── Hero Content ── */}
      <div
        className="cinema-hero__content"
        style={{ transform: `translateY(${textParallaxY}px)`, opacity }}
      >
        <div className={`cinema-hero__inner ${visible ? 'cinema-visible' : ''}`}>
          
          {/* Badge */}
          <div className="cinema-badge">
            <span className="cinema-badge__dot" />
            <span>Public Civic Platform</span>
            <span className="cinema-badge__divider">|</span>
            <span>Telangana &amp; Central</span>
          </div>

          {/* Main heading */}
          <h1 className="cinema-heading">
            <span className="cinema-heading__brand">SEVAPATH</span>
            <span className="cinema-heading__sub">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="cinema-subtitle">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="cinema-ctas">
            <button
              id="hero-cta-primary"
              onClick={() => navigate('/questionnaire')}
              className="cinema-btn cinema-btn--primary"
            >
              <Sparkles size={16} className="cinema-btn__icon" />
              <span>{t('hero.cta.primary')}</span>
              <ChevronRight size={16} className="cinema-btn__arrow" />
            </button>
            <button
              id="hero-cta-secondary"
              onClick={() => navigate('/find')}
              className="cinema-btn cinema-btn--secondary"
            >
              <Search size={16} />
              <span>{t('hero.cta.secondary')}</span>
            </button>
          </div>

          {/* Trust row */}
          <div className="cinema-trust">
            <div className="cinema-trust__item">
              <CheckCircle2 size={13} />
              <span>100% Free Public Good</span>
            </div>
            <div className="cinema-trust__sep" />
            <div className="cinema-trust__item">
              <Lock size={13} />
              <span>Zero Data Stored</span>
            </div>
          </div>

          {/* Journey nodes preview */}
          <div className="cinema-journey-preview" aria-label="Journey stages">
            {['Discover', 'Check', 'Prepare', 'Understand', 'Apply', 'Track'].map((stage, i) => (
              <React.Fragment key={stage}>
                <div
                  className="cinema-journey-node"
                  style={{ animationDelay: `${0.6 + i * 0.08}s` }}
                >
                  <span className="cinema-journey-node__dot" />
                  <span className="cinema-journey-node__label">{stage}</span>
                </div>
                {i < 5 && <div className="cinema-journey-connector" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="cinema-scroll-hint"
        style={{ opacity: Math.max(0, 1 - scrollY / 120) }}
        aria-hidden="true"
      >
        <div className="cinema-scroll-hint__mouse">
          <div className="cinema-scroll-hint__wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
