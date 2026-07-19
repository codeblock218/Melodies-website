/* Nocturne v2 — lighter blues, real photos, story-as-modal, music-first.
   Palette: soft sky/dawn blues over warm cream; navy used as accent ink only. */

const D2 = window.MOC_DATA;
const { useState, useEffect, useRef } = React;


const PAPERS = {
  porcelain: { name: "Porcelain", desc: "Crisp porcelain white with cool undertone.", cream: "#f1f2ee" },
  mist: { name: "Mist", desc: "Pale cool grey-blue paper. Echoes the blue family.", cream: "#eef1f4" },
  mistSlate: { name: "Mist Slate", desc: "Cool slate-blue paper. Sets the blues quieter.", cream: "#dae2eb" },
  mistGradient: { name: "Mist → Mist Dusk", desc: "Gradient paper, light at top, deeper at bottom.", cream: "linear-gradient(180deg, #eef1f4 0%, #cfd8e3 100%)" }
};

const PALETTES = {
  dawn: {
    name: "Dawn Wash",
    desc: "Soft sky blue → cream. The current default.",
    cream: "#f7f1e3", ink: "#1f3556", inkSoft: "#3b5079",
    blueDeep: "#3d6bb3", blueMid: "#6e93cb", blueLight: "#a9c2e6", blueWash: "#dee9f7"
  },
  porcelain: {
    name: "Porcelain & Indigo",
    desc: "Cool porcelain wash with deep indigo ink.",
    cream: "#f4f0e6", ink: "#1a2c54", inkSoft: "#34457a",
    blueDeep: "#2f4d8a", blueMid: "#5e7bb3", blueLight: "#9eb2d6", blueWash: "#e2e7f1"
  },
  cyanotype: {
    name: "Cyanotype",
    desc: "Soft teal-blue wash, slightly warmer ink. Echoes vintage blueprints.",
    cream: "#f6efde", ink: "#1d3f56", inkSoft: "#3a627d",
    blueDeep: "#3a7aa3", blueMid: "#6ba3c4", blueLight: "#a7c9dd", blueWash: "#d5e6ee"
  },
  twilight: {
    name: "Twilight Periwinkle",
    desc: "Lavender-blue wash, deeper navy ink. A little dreamier.",
    cream: "#f7f1e3", ink: "#1d2a59", inkSoft: "#3a4880",
    blueDeep: "#5060a8", blueMid: "#8190c6", blueLight: "#bcc4e3", blueWash: "#e4e6f4"
  },
  riverstone: {
    name: "Riverstone",
    desc: "Slate-blue grey, calm and reverent.",
    cream: "#f4efe2", ink: "#27384a", inkSoft: "#445566",
    blueDeep: "#4f6e87", blueMid: "#7a93a6", blueLight: "#aebcc8", blueWash: "#dde4ea"
  },
  mistandink: {
    name: "Mist & Ink",
    desc: "Almost monochrome — misty blue-grey paper, deep ink. Editorial.",
    cream: "#f3eedf", ink: "#1c2336", inkSoft: "#3a4258",
    blueDeep: "#3c4d76", blueMid: "#6c7a9a", blueLight: "#a4adc4", blueWash: "#d8dce5"
  }
};
let C = PALETTES.dawn;

function staffMark(color = C.blueDeep, w = 30) {
  return (
    <svg width={w} height={w * 0.7} viewBox="0 0 30 21" style={{ display: "block" }}>
      <g stroke={color} fill="none" strokeWidth="0.7" strokeLinecap="round">
        <path d="M2 5 Q 15 -1 28 6" />
        <path d="M2 10 Q 15 4 28 11" />
        <path d="M2 15 Q 15 9 28 16" />
      </g>
      <circle cx="20" cy="10.5" r="1.6" fill={color} />
    </svg>);

}

// ---------- Top nav ----------
function Nav({ onOpenStory, home = true }) {
  const homeUrl = "index.html";
  const link = (anchor) => home ? `#${anchor}` : `${homeUrl}#${anchor}`;
  const storyHref = home ? undefined : `${homeUrl}?openStory=1`;
  const handleStory = (e) => {
    if (home && onOpenStory) {e.preventDefault();onOpenStory();}
  };
  return (
    <nav style={{
      position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
      padding: "26px 56px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      color: C.ink
    }}>
      <a href={home ? "#top" : homeUrl} style={{ display: "inline-block" }}>
        <img src="assets/logo.png" alt="Melodies of Courage" style={{ height: 126, display: "block" }} />
      </a>
      <div style={{
        display: "flex", gap: 32, alignItems: "center",
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: "18px", fontWeight: "500"
      }}>
        <a href={storyHref} onClick={handleStory} style={navLink}>His Story</a>
        <a href={link("music")} style={navLink}>Music</a>
        <a href="gallery.html" style={navLink}>Gallery</a>
        <a href={link("sheet")} style={navLink}>Sheet Music</a>
        <a href={D2.donateUrl} target="_blank" style={{
          ...navLink,
          background: C.blueDeep, color: C.cream,
          padding: "10px 20px", borderRadius: 2,
          fontStyle: "normal"
        }}>Donate</a>
      </div>
    </nav>);

}

const navLink = {
  color: C.ink, textDecoration: "none", cursor: "pointer",
  fontStyle: "italic"
};

// ---------- Hero ----------
function Hero({ onOpenStory }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section style={{
      position: "relative",
      color: C.ink,
      paddingTop: 200, paddingBottom: 120,
      overflow: "hidden",
      isolation: "isolate"
    }}>
      {/* Background photograph */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `url('assets/kevin-hero-bg.jpg') center/cover no-repeat`,
        filter: "saturate(0.9) brightness(0.92)"
      }} />
      {/* Right-side wash so text reads but the subject on the left stays visible */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `linear-gradient(95deg, rgba(238,241,244,0) 0%, rgba(238,241,244,0.04) 38%, rgba(238,241,244,0.45) 62%, rgba(238,241,244,0.72) 100%)`
      }} />
      {/* Subtle top fade to blend the nav */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `linear-gradient(180deg, rgba(238,241,244,0.45) 0%, rgba(238,241,244,0) 26%, rgba(238,241,244,0) 100%)`
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        padding: "60px 64px 0",
        display: "flex", justifyContent: "flex-end"
      }}>
        {/* Title block */}
        <div style={{ maxWidth: 540, width: "100%" }}>
          <div style={{ ...{
              fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
              color: C.blueDeep, letterSpacing: "0.05em",
              marginBottom: 18, fontSize: "20px", textAlign: "left"
            }, color: "rgb(31, 53, 86)", fontWeight: "500" }}>
            ♪ In loving memory · Kevin Chen · 2009 — 2025
          </div>
          <h1 style={{
            fontFamily: "'EB Garamond', 'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: 88, lineHeight: 0.95, margin: 0,
            letterSpacing: "-0.025em", color: C.ink, textAlign: "left"
          }}>
            Melodies<br />
            <em style={{ fontStyle: "italic", color: C.blueDeep }}>of</em> Courage
          </h1>
          <p style={{
            marginTop: 28, marginBottom: 36,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 22, lineHeight: 1.55, maxWidth: 620,
            color: C.inkSoft, textAlign: "left", fontWeight: "500"
          }}>
            The story and music of <em style={{ fontWeight: "500" }}>Kevin Chen</em> — a young composer
            whose melodies speak in ways words cannot.
          </p>

          <div style={{ textAlign: "left", marginBottom: 44, fontWeight: "500" }}>
            <button onClick={onOpenStory} style={{ ...{
                background: "rgba(247,247,247,0.65)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                border: `1px solid ${C.blueDeep}`,
                color: C.blueDeep,
                padding: "13px 28px",
                fontFamily: "'EB Garamond', Georgia, serif",
                fontStyle: "italic", fontSize: 17, cursor: "pointer"
              }, border: "1.21226px solid rgb(61, 107, 179)" }}>
              Read his story →
            </button>
          </div>

          {/* Inline featured player */}
          <div style={{
            border: `1px solid ${C.blueLight}`,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: 22,
            display: "flex", alignItems: "center", gap: 22,
            boxShadow: "0 18px 48px -20px rgba(31,53,86,0.4)"
          }}>
            <button onClick={() => setPlaying((p) => !p)} style={{
              width: 56, height: 56, borderRadius: "50%",
              background: C.blueDeep, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0
            }}>
              {playing ?
              <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="2" width="3.5" height="12" fill={C.cream} />
                  <rect x="9.5" y="2" width="3.5" height="12" fill={C.cream} />
                </svg> :

              <svg width="18" height="18" viewBox="0 0 18 18">
                  <polygon points="4,2 16,9 4,16" fill={C.cream} />
                </svg>
              }
            </button>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
                fontSize: 11, color: C.blueDeep, letterSpacing: "0.18em",
                textTransform: "uppercase", marginBottom: 4
              }}>♪ Featured · 2022</div>
              <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 26, fontStyle: "italic", color: C.ink, lineHeight: 1.1
              }}>Going Home</div>
              {/* fake waveform */}
              <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 18, marginTop: 10 }}>
                {Array.from({ length: 60 }).map((_, i) =>
                <div key={i} style={{
                  width: 2,
                  height: `${20 + Math.abs(Math.sin(i * 0.6) * 60) + i % 5 * 8}%`,
                  background: i < (playing ? 25 : 0) ? C.blueDeep : C.blueLight,
                  transition: "background 0.3s"
                }} />
                )}
              </div>
            </div>
          </div>
          {playing &&
          <div style={{ marginTop: 14, aspectRatio: "16/9" }}>
              <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${D2.featuredVideoId}?autoplay=1`}
              title="Going Home" frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
            
            </div>
          }
        </div>
      </div>
    </section>);

}

// ---------- Music Library ----------
function MusicLibrary() {
  return (
    <section id="music" style={{
      padding: "120px 64px",
      background: C.cream,
      color: C.ink,
      position: "relative"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            color: C.blueDeep, letterSpacing: "0.1em", marginBottom: 14, fontSize: "24px"
          }}>♪ Music Library</div>
          <h2 style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontWeight: 400, fontSize: 60, lineHeight: 1, margin: 0, letterSpacing: "-0.02em"
          }}>
            Listen to <em style={{ color: C.blueDeep }}>his compositions.</em>
          </h2>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontStyle: "italic", fontSize: 18, color: C.inkSoft,
            marginTop: 18, maxWidth: 600, marginLeft: "auto", marginRight: "auto"
          }}>
            Pieces composed during treatment, in hospital rooms, and in quiet moments at home —
            a living, breathing body of music.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {D2.videos.map((v, i) =>
          <div key={v.id}>
              <div style={{
              fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
              color: C.blueDeep, fontSize: 13, marginBottom: 10,
              letterSpacing: "0.06em"
            }}>No. {String(i + 1).padStart(2, '0')}</div>
              <div style={{
              aspectRatio: "16/9",
              border: `1px solid ${C.blueLight}`,
              background: "#000",
              boxShadow: "0 12px 30px -16px rgba(31,53,86,0.3)"
            }}>
                <iframe
                width="100%" height="100%"
                src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.title} frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen style={{ display: "block" }} />
              
              </div>
              <div style={{ paddingTop: 16 }}>
                <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontStyle: "italic", fontSize: 26, lineHeight: 1.1, marginBottom: 6
              }}>{v.title}</div>
                <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 14, color: C.inkSoft
              }}>{v.subtitle}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <a href="https://www.youtube.com/" target="_blank" style={{
            color: C.blueDeep,
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            textDecoration: "none",
            borderBottom: `1px solid ${C.blueDeep}`, paddingBottom: 4, fontSize: "20px"
          }}>
            Visit the full YouTube channel →
          </a>
        </div>
      </div>
    </section>);

}

// ---------- Story teaser strip ----------
function StoryTeaser({ onOpenStory }) {
  return (
    <section style={{
      padding: "100px 64px",
      background: `linear-gradient(180deg, ${C.cream} 0%, ${C.blueWash} 100%)`,
      color: C.ink,
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center"
      }}>
        <div style={{
          aspectRatio: "4/3",
          background: `url('assets/kevin-piano-1.jpg') center/cover no-repeat`,
          boxShadow: "0 24px 60px -20px rgba(31,53,86,0.4), 0 0 0 1px rgba(31,53,86,0.08)"
        }} />
        <div>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            color: C.blueDeep, letterSpacing: "0.1em", marginBottom: 16, fontSize: "24px"
          }}>♪ His Story</div>
          <h2 style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 400,
            fontSize: 48, lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: "0 0 24px"
          }}>
            <em>"He spoke a language</em><br />beyond words."
          </h2>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 19, lineHeight: 1.6, color: C.inkSoft,
            margin: "0 0 32px"
          }}>
            From his first touch of a piano at four, Kevin spoke through music
            with breathtaking fluency. Through diagnosis, treatment, and his
            final months, he kept composing — leaving behind a living, breathing
            body of work.
          </p>
          <button onClick={onOpenStory} style={{
            background: C.blueDeep, color: C.cream,
            border: "none", padding: "16px 32px",
            fontFamily: "'EB Garamond', Georgia, serif",
            fontStyle: "italic", fontSize: 17,
            cursor: "pointer", letterSpacing: "0.02em"
          }}>
            Read Kevin's full story →
          </button>
        </div>
      </div>
    </section>);

}

// ---------- Story modal ----------
function StoryModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(31,53,86,0.55)",
      backdropFilter: "blur(6px)",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      padding: "60px 24px",
      overflowY: "auto",
      animation: "fadeIn 0.3s ease"
    }}>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
               @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }`}</style>
      <article onClick={(e) => e.stopPropagation()} style={{
        background: C.cream, color: C.ink,
        maxWidth: 760, width: "100%",
        padding: "72px 72px 80px",
        position: "relative",
        boxShadow: "0 40px 80px rgba(31,53,86,0.5)",
        animation: "slideUp 0.4s ease"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 22, right: 22,
          background: "transparent", border: `1px solid ${C.inkSoft}`,
          color: C.inkSoft,
          width: 40, height: 40, borderRadius: "50%",
          cursor: "pointer", fontSize: 20,
          fontFamily: "'EB Garamond', Georgia, serif"
        }}>×</button>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            color: C.blueDeep, fontSize: 15, letterSpacing: "0.1em", marginBottom: 14
          }}>♪ His Story · Kevin Chen · 2009 — 2025</div>
          <h2 style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 400,
            fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: 0
          }}>
            <em>"He spoke a language</em><br />beyond words."
          </h2>
        </div>

        {D2.kevin.storyParagraphs.map((p, i) =>
        <p key={i} style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 19, lineHeight: 1.7,
          margin: i === 0 ? "0 0 22px" : "0 0 22px",
          color: C.ink
        }}>{p}</p>
        )}

        <div style={{
          marginTop: 40, padding: "32px 0",
          borderTop: `1px solid ${C.blueLight}`,
          borderBottom: `1px solid ${C.blueLight}`,
          textAlign: "center"
        }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            fontSize: 22, lineHeight: 1.5, color: C.ink
          }}>"{D2.quote.body}"</div>
          <div style={{
            marginTop: 14, fontStyle: "italic", fontSize: 14,
            fontFamily: "'EB Garamond', Georgia, serif", color: C.blueDeep
          }}>— {D2.quote.attribution}</div>
        </div>
      </article>
    </div>);

}

// ---------- Gallery ----------
function Gallery() {
  const photos = [
  { src: "assets/kevin-piano-1.jpg", caption: "At the Steinway", span: "big" },
  { src: "assets/kevin-piano-2.jpg", caption: "In recital" },
  { src: "assets/kevin-piano-3.jpg", caption: "Performance" },
  { src: "assets/kevin-piano-4.jpg", caption: "At the keys" },
  { src: "assets/kevin-piano-5.jpg", caption: "Stage" }];

  return (
    <section id="gallery" style={{
      padding: "120px 64px",
      background: `linear-gradient(180deg, ${C.blueWash} 0%, ${C.cream} 100%)`,
      color: C.ink
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            color: C.blueDeep, letterSpacing: "0.1em", marginBottom: 14, fontSize: "24px"
          }}>♪ Remembrances</div>
          <h2 style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 400,
            fontSize: 56, lineHeight: 1, margin: 0, letterSpacing: "-0.02em"
          }}>Moments <em style={{ color: C.blueDeep }}>held close.</em></h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "200px",
          gap: 16
        }}>
          {photos.map((p, i) =>
          <figure key={i} style={{
            margin: 0,
            gridColumn: p.span === "big" ? "span 2" : "span 1",
            gridRow: p.span === "big" ? "span 2" : "span 1",
            background: `url('${p.src}') center/cover no-repeat`,
            position: "relative",
            boxShadow: "0 12px 30px -16px rgba(31,53,86,0.3)"
          }}>
              <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 60%, rgba(31,53,86,0.7) 100%)"
            }} />
              <figcaption style={{
              position: "absolute", bottom: 12, left: 14,
              color: C.cream,
              fontFamily: "'EB Garamond', Georgia, serif",
              fontStyle: "italic", fontSize: 14
            }}>— {p.caption}</figcaption>
            </figure>
          )}
          {/* placeholder slots for more photos */}
          <figure style={{
            margin: 0, gridColumn: "span 1",
            background: `linear-gradient(160deg, ${C.blueLight} 0%, ${C.blueMid} 100%)`,
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.cream,
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            fontSize: 13,
            border: `1px dashed ${C.blueDeep}`
          }}>
            Share a photograph
          </figure>
        </div>

        <div style={{
          textAlign: "center", marginTop: 40,
          fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
          fontSize: 17, color: C.inkSoft
        }}>
          To share a memory or photograph,{" "}
          <a href="mailto:" style={{ color: C.blueDeep, textDecoration: "underline" }}>write to us</a>.
        </div>
      </div>
    </section>);

}

// ---------- Sheet music ----------
function Sheet() {
  return (
    <section id="sheet" style={{
      padding: "120px 64px",
      background: C.cream,
      color: C.ink
    }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            color: C.blueDeep, letterSpacing: "0.1em", marginBottom: 14, fontSize: "24px"
          }}>♪ Sheet Music</div>
          <h2 style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 400,
            fontSize: 48, lineHeight: 1, margin: "0 0 14px", letterSpacing: "-0.02em"
          }}>Take his music <em style={{ color: C.blueDeep }}>home.</em></h2>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
            fontSize: 17, color: C.inkSoft, margin: 0
          }}>All proceeds support the Kevin Chen Osteosarcoma & Music Fund.</p>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: `1px solid ${C.blueLight}` }}>
          {D2.sheetMusic.map((s, i) =>
          <li key={i} style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto auto auto",
            alignItems: "center", gap: 24,
            padding: "22px 0",
            borderBottom: `1px solid ${C.blueLight}`
          }}>
              <div style={{
              fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
              color: C.blueDeep, width: 40, fontSize: 16
            }}>No. {String(i + 1).padStart(2, '0')}</div>
              <div>
                <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontStyle: "italic", fontSize: 26, lineHeight: 1.1
              }}>{s.title}</div>
                <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                color: C.inkSoft, marginTop: 4, fontSize: "18px"
              }}>{s.subtitle}</div>
              </div>
              <button style={{
              background: "transparent", border: "none",
              color: C.blueDeep, cursor: "pointer",
              fontFamily: "'EB Garamond', Georgia, serif",
              fontStyle: "italic", fontSize: 15,
              borderBottom: `1px solid ${C.blueDeep}`, paddingBottom: 2
            }}>Preview</button>
              <div style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 22, color: C.blueDeep
            }}>{s.price}</div>
              <button style={{
              background: C.blueDeep, color: C.cream,
              border: "none", padding: "12px 26px", cursor: "pointer",
              fontFamily: "'EB Garamond', Georgia, serif",
              fontStyle: "italic", fontSize: 15
            }}>Buy →</button>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

// ---------- Donate ----------
function Donate() {
  return (
    <section id="donate" style={{
      padding: "140px 64px",
      background: `linear-gradient(180deg, ${C.cream} 0%, ${C.blueWash} 60%, ${C.blueLight} 100%)`,
      color: C.ink, textAlign: "center", position: "relative", overflow: "hidden"
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} preserveAspectRatio="none" viewBox="0 0 1400 700">
        <g stroke={C.blueDeep} fill="none" strokeWidth="0.9" strokeLinecap="round" opacity="0.7">
          <path d="M-60 248 C 200 220, 380 286, 580 254 S 920 214, 1120 268 S 1360 314, 1480 270" />
          <path d="M-60 288 C 220 264, 400 332, 620 296 S 940 252, 1140 304 S 1360 354, 1480 312" />
          <path d="M-60 328 C 160 308, 360 372, 560 338 S 900 296, 1100 348 S 1320 396, 1480 354" />
          <path d="M-60 368 C 240 340, 420 410, 620 376 S 960 332, 1160 386 S 1360 432, 1480 392" />
          <path d="M-60 408 C 200 384, 400 446, 600 416 S 940 374, 1140 426 S 1360 472, 1480 432" />
        </g>
      </svg>
      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
          color: C.blueDeep, letterSpacing: "0.1em", marginBottom: 16, fontSize: "24px"
        }}>♪ Kevin Chen Osteosarcoma & Music Fund</div>
        <h2 style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 400,
          fontSize: 64, lineHeight: 1.05, margin: "0 0 28px", letterSpacing: "-0.02em"
        }}><em>Carry his music</em> forward.</h2>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 21, lineHeight: 1.6, color: C.inkSoft,
          margin: "0 auto 44px", maxWidth: 580
        }}>
          The fund supports <em>osteosarcoma research</em> and <em style={{ paddingRight: "0.15em" }}>music scholarships</em> for young musicians — two causes close to Kevin's heart.
        </p>
        <a href={D2.donateUrl} target="_blank" style={{
          display: "inline-block",
          background: C.blueDeep, color: C.cream,
          padding: "22px 56px", textDecoration: "none",
          fontFamily: "'EB Garamond', Georgia, serif",
          fontStyle: "italic", fontSize: 20,
          boxShadow: "0 16px 40px -12px rgba(31,53,86,0.5)"
        }}>Donate to the fund →</a>
        <div style={{
          marginTop: 32,
          fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
          fontSize: 16, color: C.inkSoft
        }}>Fund Name: Kevin Chen · Fund ID: 711151</div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer style={{
      padding: "40px 64px",
      background: C.ink, color: "rgba(247,241,227,0.65)",
      fontFamily: "'EB Garamond', Georgia, serif", fontStyle: "italic",
      fontSize: 14,
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="assets/logo.png" alt="Melodies of Courage" style={{ height: 56, display: "block", opacity: 0.85 }} />
        <span>· In memory of Kevin Chen</span>
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" style={{
          color: "rgba(247,241,227,0.75)", display: "inline-flex"
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="https://substack.com/" target="_blank" rel="noopener" aria-label="Substack" style={{
          color: "rgba(247,241,227,0.75)", display: "inline-flex"
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.5 4h17v2.5h-17V4zm0 4.7h17v2.5h-17V8.7zm0 4.7h17V20l-8.5-4.5L3.5 20v-6.6z" />
          </svg>
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" style={{
          color: "rgba(247,241,227,0.75)", display: "inline-flex"
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.25-1.5 1.55-1.5H17V4.4c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.03H8v3h2.45V21h3.05z" />
          </svg>
        </a>
        <span style={{ marginLeft: 6 }}>© 2026</span>
      </span>
    </footer>);

}

// ---------- Page ----------
window.MOCSite = function MOCSite({ paletteId = "dawn", paperId = "cream" }) {
  const [storyOpen, setStoryOpen] = useState(false);
  const basePalette = PALETTES[paletteId] || PALETTES.dawn;
  const paperEntry = PAPERS[paperId];
  const paperBg = paperEntry && paperEntry.cream || basePalette.cream;
  const solidMatch = typeof paperBg === "string" ? paperBg.match(/#[0-9a-f]{3,8}/gi) : null;
  const paperSolid = solidMatch ? solidMatch[solidMatch.length - 1] : paperBg;
  C = { ...basePalette, cream: paperSolid };
  const open = () => setStoryOpen(true);
  const close = () => setStoryOpen(false);
  useEffect(() => {
    try {
      if (new URLSearchParams(window.location.search).get("openStory") === "1") {
        setStoryOpen(true);
      }
    } catch (e) {}
  }, []);
  return (
    <div style={{ background: paperBg, position: "relative" }}>
      <Nav onOpenStory={open} />
      <Hero onOpenStory={open} />
      <MusicLibrary />
      <StoryTeaser onOpenStory={open} />
      <Sheet />
      <Donate />
      <Footer />
      <StoryModal open={storyOpen} onClose={close} />
    </div>);

};

window.MOCGallery = function MOCGallery({ paletteId = "dawn", paperId = "mist" }) {
  const basePalette = PALETTES[paletteId] || PALETTES.dawn;
  const paperEntry = PAPERS[paperId];
  const paperBg = paperEntry && paperEntry.cream || basePalette.cream;
  const solidMatch = typeof paperBg === "string" ? paperBg.match(/#[0-9a-f]{3,8}/gi) : null;
  const paperSolid = solidMatch ? solidMatch[solidMatch.length - 1] : paperBg;
  C = { ...basePalette, cream: paperSolid };
  return (
    <div style={{ background: paperBg, position: "relative", minHeight: "100vh" }}>
      <Nav home={false} />
      <div style={{ height: 178 }} />
      <Gallery />
      <Footer />
    </div>);
};

window.MOC_PALETTES = PALETTES;
window.MOC_PAPERS = PAPERS;