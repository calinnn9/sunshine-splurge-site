import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import cosmicBall from "@/assets/cosmic-ball.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StreetRumble × Nibiru — Cel mai mare turneu de baschet 2026" },
      {
        name: "description",
        content:
          "StreetRumble × Nibiru — cel mai mare turneu de baschet din Nibiru. 20–22 iulie 2026, Costinești. Get your tickets now.",
      },
      { property: "og:title", content: "StreetRumble × Nibiru — Basketball Tournament 2026" },
      { property: "og:description", content: "Cel mai mare turneu de baschet din Nibiru. 20–22 iulie 2026." },
      { property: "og:image", content: cosmicBall },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;700&family=Orbitron:wght@500;700;900&display=swap",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  useEffect(() => {
    // Cursor
    const cursor = document.getElementById("cursor");
    const onMove = (e: MouseEvent) => {
      if (!cursor) return;
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMove);
    const hoverables = document.querySelectorAll("a, button, .cat-card");
    const enter = () => cursor?.classList.add("big");
    const leave = () => cursor?.classList.remove("big");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    // Stars
    const canvas = document.getElementById("starsCanvas") as HTMLCanvasElement | null;
    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; speed: number; dir: number }[] = [];
    const ctx = canvas?.getContext("2d") ?? null;
    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    const init = () => {
      if (!canvas) return;
      stars = [];
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.2,
          a: Math.random(),
          speed: Math.random() * 0.01 + 0.003,
          dir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.speed * s.dir;
        if (s.a >= 1 || s.a <= 0.05) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a.toFixed(2)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    resize();
    init();
    raf = requestAnimationFrame(draw);
    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    // Flying basketballs
    const fly = document.getElementById("flyCanvas") as HTMLCanvasElement | null;
    const fctx = fly?.getContext("2d") ?? null;
    let balls: { x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; hue: number }[] = [];
    const fresize = () => {
      if (!fly) return;
      fly.width = window.innerWidth;
      fly.height = window.innerHeight;
    };
    const spawnBall = (x?: number, y?: number) => {
      if (!fly) return;
      balls.push({
        x: x ?? Math.random() * fly.width,
        y: y ?? -40,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 2 + 1,
        r: Math.random() * 22 + 14,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        hue: Math.random() > 0.5 ? 300 : 30,
      });
      if (balls.length > 40) balls.shift();
    };
    const fdraw = () => {
      if (!fctx || !fly) return;
      fctx.clearRect(0, 0, fly.width, fly.height);
      balls.forEach((b) => {
        b.vy += 0.08;
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr;
        if (b.x < -50 || b.x > fly.width + 50 || b.y > fly.height + 80) {
          b.x = Math.random() * fly.width;
          b.y = -40;
          b.vy = Math.random() * 2 + 1;
          b.vx = (Math.random() - 0.5) * 4;
        }
        fctx.save();
        fctx.translate(b.x, b.y);
        fctx.rotate(b.rot);
        const grd = fctx.createRadialGradient(-b.r * 0.3, -b.r * 0.3, 2, 0, 0, b.r);
        grd.addColorStop(0, `hsla(${b.hue},100%,75%,0.95)`);
        grd.addColorStop(0.6, `hsla(${b.hue},100%,45%,0.85)`);
        grd.addColorStop(1, `hsla(${b.hue},100%,15%,0.7)`);
        fctx.fillStyle = grd;
        fctx.shadowColor = `hsla(${b.hue},100%,60%,0.9)`;
        fctx.shadowBlur = 24;
        fctx.beginPath();
        fctx.arc(0, 0, b.r, 0, Math.PI * 2);
        fctx.fill();
        fctx.strokeStyle = "rgba(0,0,0,0.55)";
        fctx.lineWidth = 1.2;
        fctx.shadowBlur = 0;
        fctx.beginPath(); fctx.moveTo(-b.r, 0); fctx.lineTo(b.r, 0); fctx.stroke();
        fctx.beginPath(); fctx.moveTo(0, -b.r); fctx.lineTo(0, b.r); fctx.stroke();
        fctx.beginPath(); fctx.arc(0, 0, b.r, -Math.PI / 3, Math.PI / 3); fctx.stroke();
        fctx.beginPath(); fctx.arc(0, 0, b.r, Math.PI - Math.PI / 3, Math.PI + Math.PI / 3); fctx.stroke();
        fctx.restore();
      });
      fraf = requestAnimationFrame(fdraw);
    };
    let fraf = 0;
    fresize();
    for (let i = 0; i < 12; i++) spawnBall(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    fraf = requestAnimationFrame(fdraw);
    const onClickSpawn = (e: MouseEvent) => {
      for (let i = 0; i < 6; i++) {
        balls.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.8) * 12,
          r: Math.random() * 18 + 10,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.4,
          hue: Math.random() > 0.5 ? 300 : 30,
        });
      }
      if (balls.length > 60) balls.splice(0, balls.length - 60);
    };
    document.addEventListener("click", onClickSpawn);
    const onFResize = () => fresize();
    window.addEventListener("resize", onFResize);

    // Parallax on hero ball + title
    const heroBall = document.querySelector(".hero-ball") as HTMLElement | null;
    const heroTitle = document.querySelector(".hero-title") as HTMLElement | null;
    const onParallax = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      if (heroBall) heroBall.style.transform = `translateX(-50%) translate(${cx * 20}px, ${cy * 16}px) rotate(${cx * 4}deg)`;
      if (heroTitle) heroTitle.style.transform = `translate(${cx * -8}px, ${cy * -6}px)`;
    };
    window.addEventListener("mousemove", onParallax);

    // Scroll parallax
    const onScroll = () => {
      const y = window.scrollY;
      if (heroBall) heroBall.style.setProperty("--scrollY", `${y * 0.3}px`);
      const ball = document.querySelector(".hero-ball") as HTMLElement | null;
      if (ball) ball.style.filter = `saturate(1.1) brightness(${1.05 - y / 2000}) hue-rotate(${y / 8}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Magnetic buttons
    const magnets = document.querySelectorAll(".magnetic");
    const magMove = (e: Event) => {
      const ev = e as MouseEvent;
      const el = ev.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = ev.clientX - r.left - r.width / 2;
      const y = ev.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    const magLeave = (e: Event) => {
      (e.currentTarget as HTMLElement).style.transform = "";
    };
    magnets.forEach((el) => {
      el.addEventListener("mousemove", magMove);
      el.addEventListener("mouseleave", magLeave);
    });

    // Reveal
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", onFResize);
      window.removeEventListener("mousemove", onParallax);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClickSpawn);
      magnets.forEach((el) => {
        el.removeEventListener("mousemove", magMove);
        el.removeEventListener("mouseleave", magLeave);
      });
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fraf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="sr-root">
        <div className="cursor" id="cursor"></div>
        <canvas className="fly-canvas" id="flyCanvas"></canvas>


        <nav>
          <a href="#home" className="nav-logo">
            <span className="nav-brand-graffiti">StreetRumble</span>
            <span className="nav-x">×</span>
            <span className="nav-brand-tech">NIBIRU</span>
          </a>
          <ul className="nav-links">
            <li><a href="#about">Despre</a></li>
            <li><a href="#categories">Categorii</a></li>
          </ul>
          <a href="#register" className="nav-cta">Get tickets</a>
        </nav>

        {/* HERO */}
        <section className="hero" id="home">
          <canvas className="stars-canvas" id="starsCanvas"></canvas>
          <div
            className="hero-ball"
            style={{ backgroundImage: `url(${cosmicBall})` }}
            aria-hidden="true"
          />
          <div className="hero-ball-glow" aria-hidden="true" />

          <div className="hero-content">
            <div className="hero-brandline">
              <span className="brand-graffiti">StreetRumble</span>
              <span className="brand-x">×</span>
              <span className="brand-tech">NIBIRU</span>
            </div>

            <h1 className="hero-title">
              THE <span className="accent-orange">BIGGEST</span><br />
              BASKETBALL<br />
              <span className="outline">TOURNAMENT</span> IN<br />
              <span className="accent-magenta">NIBIRU</span>
            </h1>

            <div className="hero-date">20 – 22 IULIE 2026 · COSTINEȘTI</div>

            <div className="hero-actions">
              <a href="#register" className="btn-tickets magnetic">Get your tickets now</a>
            </div>
          </div>

          <div className="scroll-hint">
            <span>Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="section-label">Despre turneu</div>
          <div className="about-grid reveal">
            <div>
              <h2 className="about-headline">
                CEL MAI MARE <span className="outline">3×3</span> DE PE COASTĂ
              </h2>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-num">3</div>
                  <div className="stat-label">Categorii</div>
                </div>
                <div className="stat">
                  <div className="stat-num">3</div>
                  <div className="stat-label">Zile de joc</div>
                </div>
                <div className="stat">
                  <div className="stat-num">1<span>st</span></div>
                  <div className="stat-label">Ediție la Nibiru</div>
                </div>
                <div className="stat">
                  <div className="stat-num">3×3</div>
                  <div className="stat-label">Format</div>
                </div>
              </div>
            </div>
            <div className="about-body">
              <p>
                StreetRumble aterizează în Nibiru — noua destinație premium de pe litoralul
                românesc. Trei zile, patru categorii, un singur teren care contează.
              </p>
              <br />
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
                Baschet 3×3 rapid, la intersecția dintre sport și cultură festival. Deschis
                tuturor nivelurilor — competitiv cât să însemne ceva.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" style={{ paddingTop: 0 }}>
          <div className="section-label">Categorii</div>
          <div className="cats-grid reveal">
            {[
              { num: "U18 M", desc: "Under 18 · Băieți", fmt: "3×3 · Men" },
              { num: "U18 F", desc: "Under 18 · Fete", fmt: "3×3 · Women" },
              { num: "OPEN", desc: "Toate vârstele", fmt: "3×3 · Open" },
            ].map((c) => (
              <div className="cat-card" key={c.num}>
                <div className="cat-accent"></div>
                <div className="cat-num">{c.num}</div>
                <div className="cat-desc">{c.desc}</div>
                <div className="cat-format">{c.fmt}</div>
              </div>
            ))}
          </div>
        </section>

        {/* REGISTER */}
        <section id="register" className="register-section">
          <div className="register-bg"></div>
          <div className="reveal">
            <h2 className="register-title">
              GET YOUR<br />
              <span className="outline">TICKETS</span><br />
              <span className="accent-magenta">NOW</span>
            </h2>
            <p className="register-sub">Locuri limitate · un singur teren, toate categoriile</p>
            <a href="#" className="register-btn magnetic">Rezervă-ți biletul</a>
            <p className="deadline">Deadline înscriere · 10 iulie 2026</p>
          </div>
        </section>

        <footer>
          <div className="footer-logo">Nibiru × StreetRumble</div>
          <div className="footer-copy">Costinești · 20–22 iulie 2026</div>
        </footer>
      </div>
    </>
  );
}


const css = `
.sr-root {
  --black: #07020e;
  --magenta: #d633ff;
  --magenta-deep: #8a18b8;
  --pink: #ff3aa0;
  --orange: #ffb13b;
  --yellow: #ffe14a;
  --white: #ffffff;
  --muted: rgba(255,255,255,0.45);
  --border: rgba(255,255,255,0.08);
  background: var(--black);
  color: var(--white);
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  cursor: none;
  min-height: 100vh;
}
.sr-root * { box-sizing: border-box; }
.sr-root a, .sr-root button { cursor: none; }
.sr-root h1, .sr-root h2 { margin: 0; }
html, body { overflow-x: hidden; }

.sr-root .cursor {
  position: fixed; width: 10px; height: 10px;
  background: var(--magenta); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%,-50%);
  transition: width .2s, height .2s, background .2s;
  mix-blend-mode: screen;
}
.sr-root .cursor.big { width: 44px; height: 44px; background: rgba(214,51,255,0.3); }

.sr-root .fly-canvas {
  position: fixed; inset: 0; width: 100vw; height: 100vh;
  pointer-events: none; z-index: 50; mix-blend-mode: screen;
}
.sr-root .magnetic { transition: transform .25s cubic-bezier(.2,.8,.2,1); display: inline-block; will-change: transform; }
.sr-root .hero-ball { transition: transform .15s ease-out, filter .2s ease-out; will-change: transform, filter; }
.sr-root .hero-title { transition: transform .25s ease-out; will-change: transform; }

.sr-root .cat-card { transform-style: preserve-3d; transition: background .4s, transform .4s cubic-bezier(.2,.8,.2,1); }
.sr-root .cat-card:hover { transform: translateY(-8px) rotate(-1deg); box-shadow: 0 30px 60px -20px rgba(214,51,255,0.4); }
.sr-root .cat-card::before {
  content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px;
  background: linear-gradient(135deg, var(--magenta), var(--orange), var(--pink));
  opacity: 0; transition: opacity .4s; z-index: -1; filter: blur(12px);
}
.sr-root .cat-card:hover::before { opacity: .6; }
.sr-root .cat-num { display: inline-block; transition: color .3s, transform .3s; }
.sr-root .cat-card:hover .cat-num { transform: translateX(6px) scale(1.08); }

@keyframes float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.sr-root .hero-brandline { animation: float 4s ease-in-out infinite, fadeUp .8s .2s forwards; }

@keyframes shine {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.sr-root .accent-magenta {
  background: linear-gradient(90deg, var(--magenta) 0%, var(--pink) 40%, var(--orange) 50%, var(--pink) 60%, var(--magenta) 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s linear infinite;
}
.sr-root .accent-orange {
  background: linear-gradient(90deg, var(--orange) 0%, var(--yellow) 50%, var(--orange) 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  text-shadow: 0 0 18px rgba(255,177,59,0.55);
}
.sr-root .btn-tickets, .sr-root .register-btn { position: relative; overflow: hidden; }
.sr-root .btn-tickets::after, .sr-root .register-btn::after {
  content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left .6s;
}
.sr-root .btn-tickets:hover::after, .sr-root .register-btn:hover::after { left: 100%; }

.sr-root .stat { transition: background .3s, transform .3s; }
.sr-root .stat:hover { background: #160930; transform: translateY(-4px); }
.sr-root .stat:hover .stat-num { color: var(--magenta); text-shadow: 0 0 20px rgba(214,51,255,0.7); }
.sr-root .stat-num { transition: color .3s, text-shadow .3s; }

.sr-root nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 40px;
  background: linear-gradient(to bottom, rgba(7,2,14,0.92) 0%, transparent 100%);
}
.sr-root .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.sr-root .nav-brand-graffiti {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px; letter-spacing: 0.04em;
  color: var(--pink);
  text-shadow: 1px 1px 0 #ffe14a, 2px 2px 0 rgba(0,0,0,0.6);
  transform: skewX(-6deg);
}
.sr-root .nav-x { color: var(--white); opacity: .7; }
.sr-root .nav-brand-tech {
  font-family: 'Orbitron', sans-serif; font-weight: 700;
  font-size: 14px; letter-spacing: 0.32em; color: var(--white);
}
.sr-root .nav-links { display: flex; gap: 32px; list-style: none; padding: 0; margin: 0; }
.sr-root .nav-links a {
  font-size: 11px; letter-spacing: 0.2em;
  color: var(--muted); text-decoration: none;
  text-transform: uppercase; transition: color .3s;
}
.sr-root .nav-links a:hover { color: var(--white); }
.sr-root .nav-cta {
  font-family: 'Orbitron', sans-serif;
  font-size: 11px; letter-spacing: 0.22em;
  color: var(--white); text-decoration: none; text-transform: uppercase;
  border: 1px solid var(--magenta); padding: 9px 20px; border-radius: 2px;
  background: linear-gradient(135deg, rgba(214,51,255,0.2), rgba(255,58,160,0.2));
  transition: background .3s, box-shadow .3s;
}
.sr-root .nav-cta:hover {
  background: linear-gradient(135deg, var(--magenta), var(--pink));
  box-shadow: 0 0 24px rgba(214,51,255,0.6);
}

/* HERO */
.sr-root .hero {
  position: relative; min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px 48px 80px; overflow: hidden;
  background: radial-gradient(ellipse at 50% 95%, #2a0840 0%, var(--black) 60%);
}
.sr-root .stars-canvas { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; }
.sr-root .hero-ball {
  position: absolute; left: 50%; bottom: -22%;
  transform: translateX(-50%);
  width: min(140vw, 1400px); height: min(140vw, 1400px);
  background-size: cover; background-position: center;
  z-index: 1; filter: saturate(1.1) brightness(1.05);
  mask-image: radial-gradient(circle at 50% 45%, #000 55%, transparent 70%);
  -webkit-mask-image: radial-gradient(circle at 50% 45%, #000 55%, transparent 70%);
}
.sr-root .hero-ball-glow {
  position: absolute; left: 50%; bottom: -25%;
  width: 120vw; height: 90vh;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(214,51,255,0.55) 0%, rgba(255,58,160,0.2) 30%, transparent 60%);
  filter: blur(40px); z-index: 1; pointer-events: none;
}

.sr-root .hero-content {
  position: relative; z-index: 10; max-width: 920px; margin: 0 auto; text-align: center;
}
.sr-root .hero-brandline {
  display: inline-flex; align-items: center; gap: 18px; margin-bottom: 28px;
  opacity: 0; animation: fadeUp .8s .2s forwards;
}
.sr-root .brand-graffiti {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 4vw, 48px);
  color: var(--pink); transform: skewX(-8deg);
  text-shadow: 2px 2px 0 var(--yellow), 4px 4px 0 rgba(0,0,0,0.7);
  letter-spacing: 0.02em;
}
.sr-root .brand-x { font-size: clamp(24px, 3vw, 36px); color: rgba(255,255,255,0.7); }
.sr-root .brand-tech {
  font-family: 'Orbitron', sans-serif; font-weight: 900;
  font-size: clamp(24px, 3.4vw, 42px); letter-spacing: 0.18em; color: var(--white);
  text-shadow: 0 0 20px rgba(214,51,255,0.6);
}

.sr-root .hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(56px, 9vw, 132px);
  line-height: .92; letter-spacing: .01em;
  opacity: 0; animation: fadeUp 1s .45s forwards;
  text-shadow: 0 4px 40px rgba(0,0,0,0.6);
}
.sr-root .hero-title .outline {
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.7); color: transparent;
}

.sr-root .hero-date {
  margin-top: 32px;
  font-family: 'Orbitron', sans-serif; font-weight: 500;
  font-size: clamp(13px, 1.4vw, 16px); letter-spacing: 0.35em;
  color: var(--white);
  opacity: 0; animation: fadeUp .8s .75s forwards;
}

.sr-root .hero-actions {
  margin-top: 44px; display: flex; gap: 18px; justify-content: center;
  align-items: center; flex-wrap: wrap;
  opacity: 0; animation: fadeUp .8s 1s forwards;
}
.sr-root .btn-tickets {
  font-family: 'Orbitron', sans-serif; font-weight: 700;
  font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--white); text-decoration: none;
  padding: 16px 38px; border-radius: 2px;
  background: linear-gradient(135deg, var(--magenta) 0%, var(--pink) 100%);
  box-shadow: 0 0 32px rgba(214,51,255,0.55), inset 0 0 0 1px rgba(255,255,255,0.2);
  transition: transform .2s, box-shadow .2s;
}
.sr-root .btn-tickets:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 48px rgba(214,51,255,0.9), inset 0 0 0 1px rgba(255,255,255,0.3);
}
.sr-root .btn-ghost {
  font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted); text-decoration: none;
  border-bottom: 1px solid var(--border); padding-bottom: 4px;
  transition: color .2s, border-color .2s;
}
.sr-root .btn-ghost:hover { color: var(--white); border-color: var(--magenta); }

.sr-root .scroll-hint {
  position: absolute; bottom: 32px; right: 40px; z-index: 10;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: fadeUp .6s 1.4s forwards;
}
.sr-root .scroll-hint span {
  font-size: 9px; letter-spacing: 0.22em; color: var(--muted);
  text-transform: uppercase; writing-mode: vertical-rl;
}
.sr-root .scroll-line {
  width: 1px; height: 48px;
  background: linear-gradient(to bottom, var(--magenta), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%,100% { transform: scaleY(1); opacity:.6; }
  50% { transform: scaleY(.7); opacity:1; }
}

/* SECTIONS */
.sr-root section { padding: 120px 48px; position: relative; }
.sr-root .section-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px; letter-spacing: 0.34em; color: var(--magenta);
  text-transform: uppercase; margin-bottom: 48px;
  display: flex; align-items: center; gap: 16px;
}
.sr-root .section-label::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(to right, var(--magenta), transparent);
  max-width: 180px;
}

/* ABOUT */
.sr-root .about-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
}
.sr-root .about-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(40px, 5vw, 72px); line-height: .92; letter-spacing: .02em;
}
.sr-root .about-headline .outline {
  -webkit-text-stroke: 1px rgba(214,51,255,0.7); color: transparent;
}
.sr-root .about-body { color: var(--muted); font-size: 15px; line-height: 1.8; max-width: 440px; }
.sr-root .about-stats {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
  background: var(--border); margin-top: 48px; border: 1px solid var(--border);
}
.sr-root .stat { background: #0b0418; padding: 28px 24px; }
.sr-root .stat-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: var(--white); line-height: 1;
}
.sr-root .stat-num span { color: var(--magenta); }
.sr-root .stat-label {
  font-size: 10px; letter-spacing: 0.22em; color: var(--muted);
  text-transform: uppercase; margin-top: 6px;
}

/* CATEGORIES */
.sr-root .cats-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
  background: var(--border); border: 1px solid var(--border);
}
.sr-root .cat-card {
  background: #0b0418; padding: 44px 28px; position: relative; overflow: hidden;
  transition: background .4s;
}
.sr-root .cat-card:hover { background: #160930; }
.sr-root .cat-card:hover .cat-accent { opacity: 1; transform: scale(1); }
.sr-root .cat-card:hover .cat-num { color: var(--magenta); }
.sr-root .cat-accent {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 60%, rgba(214,51,255,0.18) 0%, transparent 70%);
  opacity: 0; transform: scale(.8); transition: opacity .4s, transform .4s;
}
.sr-root .cat-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 56px; line-height: 1;
  color: var(--white); transition: color .3s; position: relative;
}
.sr-root .cat-desc {
  font-size: 10px; letter-spacing: 0.22em; color: var(--muted);
  text-transform: uppercase; margin-top: 10px; position: relative;
}
.sr-root .cat-format {
  margin-top: 24px; font-family: 'Orbitron', sans-serif;
  font-size: 10px; letter-spacing: 0.18em;
  color: rgba(214,51,255,0.8); text-transform: uppercase; position: relative;
}


/* REGISTER */
.sr-root .register-section {
  text-align: center; padding: 160px 48px; position: relative; overflow: hidden;
}
.sr-root .register-bg {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 60%,
    rgba(214,51,255,0.22) 0%, rgba(255,58,160,0.1) 40%, transparent 70%);
}
.sr-root .register-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(64px, 10vw, 140px); line-height: .9; position: relative;
}
.sr-root .register-title .outline {
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.4); color: transparent;
}
.sr-root .register-sub {
  margin-top: 24px; font-family: 'Orbitron', sans-serif;
  font-size: 13px; letter-spacing: 0.2em;
  color: var(--muted); text-transform: uppercase; position: relative;
}
.sr-root .register-btn {
  display: inline-block; margin-top: 48px;
  font-family: 'Orbitron', sans-serif; font-weight: 700;
  font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--white); text-decoration: none;
  padding: 20px 60px; border-radius: 2px;
  background: linear-gradient(135deg, var(--magenta), var(--pink));
  box-shadow: 0 0 40px rgba(214,51,255,0.5), inset 0 0 0 1px rgba(255,255,255,0.2);
  transition: transform .2s, box-shadow .2s; position: relative;
}
.sr-root .register-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 60px rgba(214,51,255,0.9);
}
.sr-root .deadline {
  margin-top: 24px; font-size: 10px; letter-spacing: 0.24em;
  color: rgba(255,255,255,0.3); text-transform: uppercase; position: relative;
}

/* FOOTER */
.sr-root footer {
  padding: 40px 48px; border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.sr-root .footer-logo {
  font-family: 'Orbitron', sans-serif; font-weight: 700;
  font-size: 12px; letter-spacing: 0.3em;
  color: rgba(255,255,255,0.35); text-transform: uppercase;
}
.sr-root .footer-copy {
  font-size: 11px; letter-spacing: 0.14em; color: rgba(255,255,255,0.25);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.sr-root .reveal {
  opacity: 0; transform: translateY(32px);
  transition: opacity .7s ease, transform .7s ease;
}
.sr-root .reveal.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 880px) {
  .sr-root nav { padding: 18px 20px; }
  .sr-root .nav-links { display: none; }
  .sr-root section { padding: 80px 24px; }
  .sr-root .hero { padding: 120px 20px 60px; }
  .sr-root .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .sr-root .cats-grid { grid-template-columns: 1fr; }
  .sr-root .scroll-hint { display: none; }
}
`;
