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

    // Reveal
    const reveals = document.querySelectorAll(".reveal, .day-block");
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
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="sr-root">
        <div className="cursor" id="cursor"></div>

        <nav>
          <a href="#home" className="nav-logo">
            <span className="nav-brand-graffiti">StreetRumble</span>
            <span className="nav-x">×</span>
            <span className="nav-brand-tech">NIBIRU</span>
          </a>
          <ul className="nav-links">
            <li><a href="#about">Despre</a></li>
            <li><a href="#categories">Categorii</a></li>
            <li><a href="#schedule">Program</a></li>
            <li><a href="#crew">Crew</a></li>
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
              <a href="#register" className="btn-tickets">Get your tickets now</a>
              <a href="#schedule" className="btn-ghost">Vezi programul</a>
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
                  <div className="stat-num">4<span>+</span></div>
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
              { num: "U15", desc: "Under 15", fmt: "3×3 · Mixed" },
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

        {/* SCHEDULE */}
        <section id="schedule">
          <div className="section-label">Program</div>
          <div className="schedule-wrap">
            {schedule.map((d) => (
              <div className="day-block" key={d.day}>
                <div className="day-header">
                  <div className="day-name">{d.day}</div>
                  <div className="day-date">{d.date}</div>
                </div>
                <div className="events">
                  {d.events.map((e, i) => (
                    <div className="event" key={i}>
                      <div className="event-time">{e.time}</div>
                      <div className="event-name">{e.name}</div>
                      <div className={`event-tag${e.highlight ? " highlight" : ""}`}>{e.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CREW */}
        <section id="crew">
          <div className="section-label">Mission Crew</div>
          <div className="crew-grid reveal">
            {[
              { name: "Adam Fletcher", role: "Commander" },
              { name: "Callum Price", role: "Pilot" },
              { name: "Emma Brooks", role: "Mission Specialist" },
            ].map((p) => (
              <div className="crew-card" key={p.name}>
                <div className="crew-badge" aria-hidden="true" />
                <div className="crew-name">{p.name}</div>
                <div className="crew-role">{p.role}</div>
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
            <a href="#" className="register-btn">Rezervă-ți biletul</a>
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

const schedule = [
  {
    day: "Day 01",
    date: "Luni · 20 iulie 2026",
    events: [
      { time: "09:00", name: "Check-in & înregistrare echipe", tag: "Toate categoriile" },
      { time: "11:00", name: "Ceremonia de deschidere", tag: "Main stage", highlight: true },
      { time: "12:00", name: "Grupe — U15", tag: "U15" },
      { time: "15:00", name: "Grupe — U18 F", tag: "U18 F" },
      { time: "18:00", name: "Grupe — U18 M", tag: "U18 M" },
    ],
  },
  {
    day: "Day 02",
    date: "Marți · 21 iulie 2026",
    events: [
      { time: "10:00", name: "Grupe — Open", tag: "Open" },
      { time: "13:00", name: "Sferturi — U15 & U18 F", tag: "Knockout" },
      { time: "16:00", name: "Sferturi — U18 M & Open", tag: "Knockout" },
      { time: "20:00", name: "Nibiru Night Session", tag: "Festival", highlight: true },
    ],
  },
  {
    day: "Day 03",
    date: "Miercuri · 22 iulie 2026",
    events: [
      { time: "11:00", name: "Semifinale — toate categoriile", tag: "Knockout" },
      { time: "14:00", name: "Locul 3 — U15 & U18 F", tag: "Bronze" },
      { time: "16:00", name: "Locul 3 — U18 M & Open", tag: "Bronze" },
      { time: "18:00", name: "Finale — toate categoriile", tag: "Main stage", highlight: true },
      { time: "20:00", name: "Premiere & închidere", tag: "Main stage", highlight: true },
    ],
  },
];

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
.sr-root .accent-orange {
  color: var(--orange);
  text-shadow: 0 0 18px rgba(255,177,59,0.55);
}
.sr-root .accent-magenta {
  color: var(--magenta);
  text-shadow: 0 0 24px rgba(214,51,255,0.7);
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
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
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

/* SCHEDULE */
.sr-root .schedule-wrap { max-width: 880px; }
.sr-root .day-block {
  border-top: 1px solid var(--border); padding: 40px 0;
  opacity: 0; transform: translateY(24px); transition: opacity .6s, transform .6s;
}
.sr-root .day-block.visible { opacity: 1; transform: translateY(0); }
.sr-root .day-header { display: flex; align-items: baseline; gap: 20px; margin-bottom: 28px; }
.sr-root .day-name {
  font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--white); line-height: 1;
}
.sr-root .day-date {
  font-family: 'Orbitron', sans-serif; font-size: 11px;
  letter-spacing: 0.22em; color: var(--muted); text-transform: uppercase;
}
.sr-root .events { display: flex; flex-direction: column; }
.sr-root .event {
  display: grid; grid-template-columns: 90px 1fr 140px;
  align-items: center; padding: 16px 0;
  border-bottom: 1px solid var(--border); transition: padding-left .2s;
}
.sr-root .event:hover { padding-left: 12px; }
.sr-root .event:hover .event-name { color: var(--white); }
.sr-root .event:last-child { border-bottom: none; }
.sr-root .event-time {
  font-family: 'Bebas Neue', sans-serif; font-size: 22px;
  color: var(--magenta); letter-spacing: 0.06em;
}
.sr-root .event-name {
  font-size: 14px; color: rgba(255,255,255,0.78);
  letter-spacing: 0.04em; transition: color .2s;
}
.sr-root .event-tag {
  font-family: 'Orbitron', sans-serif;
  font-size: 9px; letter-spacing: 0.2em; color: var(--muted);
  text-transform: uppercase; text-align: right;
  border: 1px solid var(--border); padding: 5px 10px;
  border-radius: 2px; justify-self: end;
}
.sr-root .event-tag.highlight {
  color: var(--magenta); border-color: rgba(214,51,255,0.5);
  box-shadow: 0 0 12px rgba(214,51,255,0.2);
}

/* CREW */
.sr-root .crew-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: var(--border); border: 1px solid var(--border);
}
.sr-root .crew-card {
  background: #0b0418; padding: 48px 32px; text-align: center;
  position: relative; overflow: hidden; transition: background .3s;
}
.sr-root .crew-card:hover { background: #160930; }
.sr-root .crew-badge {
  width: 64px; height: 64px; margin: 0 auto 24px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 35%, var(--magenta) 0%, var(--magenta-deep) 40%, #2a0640 80%),
    var(--black);
  box-shadow: 0 0 28px rgba(214,51,255,0.55), inset 0 0 0 1px rgba(255,255,255,0.2);
}
.sr-root .crew-name {
  font-family: 'Orbitron', sans-serif; font-weight: 700;
  font-size: 16px; letter-spacing: 0.18em;
  color: var(--white); text-transform: uppercase;
}
.sr-root .crew-role {
  margin-top: 8px;
  font-size: 11px; letter-spacing: 0.28em;
  color: var(--magenta); text-transform: uppercase;
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
  .sr-root .cats-grid { grid-template-columns: repeat(2, 1fr); }
  .sr-root .crew-grid { grid-template-columns: 1fr; }
  .sr-root .event { grid-template-columns: 60px 1fr; }
  .sr-root .event-tag { display: none; }
  .sr-root .scroll-hint { display: none; }
}
`;
