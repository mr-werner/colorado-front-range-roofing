import React, { useEffect, useState, useMemo } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  CloudLightning,
  ExternalLink,
  Facebook,
  House,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Music2,
  Phone,
  Search,
  ShieldCheck,
  Wrench,
  X,
  Youtube,
} from "lucide-react";

// -----------------------------------------------------------------------------
// COMPANY DETAILS AND CONTENT
// -----------------------------------------------------------------------------
const COMPANY = "Colorado Front Range Roofing";
const PHONE = "7195422330";
const EMAIL = "info@coloradofrroofing.com";
const END_DATE =
  import.meta.env.VITE_CONCEPT_END_DATE || "2026-10-19T23:59:59-06:00";

const SERVICES = [
  {
    title: "Residential Roofing",
    desc: "Roofing solutions designed for Colorado homes and changing seasons.",
    icon: House,
  },
  {
    title: "Commercial Roofing",
    desc: "Dependable systems and service for businesses and commercial properties.",
    icon: Building2,
  },
  {
    title: "Storm & Hail Damage",
    desc: "Inspections and restoration guidance after damaging Colorado weather.",
    icon: CloudLightning,
  },
  {
    title: "Roof Repair",
    desc: "Targeted repairs for leaks, aging materials, and roof damage.",
    icon: Wrench,
  },
  {
    title: "Roof Inspections",
    desc: "Free, no-pressure inspections with clear recommendations.",
    icon: Search,
  },
  {
    title: "Exterior Services",
    desc: "Siding, gutters, downspouts, stucco, and exterior improvements.",
    icon: Layers,
  },
];

const SYSTEMS = [
  "Asphalt Shingles",
  "Metal Roofing",
  "Tile Roofing",
  "TPO Roofing",
  "PVC Roofing",
  "EPDM Roofing",
  "Built-Up Roofing (BUR)",
  "Roof Coatings",
];

const AREAS = [
  "Pueblo",
  "Pueblo West",
  "Colorado Springs",
  "Cañon City",
  "Fountain",
  "La Junta",
  "Peyton",
  "Lamar",
  "Trinidad",
  "Fowler",
  "Rocky Ford",
  "Rye",
  "Walsenburg",
  "Colorado City",
  "Bessemer",
  "Penrose",
  "Salida",
  "Security",
  "Beulah",
  "Westcliffe",
];

const PROCESS = [
  ["01", "Free Inspection", "We assess your roof and identify damage or wear."],
  ["02", "Clear Recommendations", "You receive an explanation of the options and next steps."],
  ["03", "Professional Roofing", "The team completes the agreed-upon repair or installation."],
  ["04", "Final Walkthrough", "Review the completed work and get answers to your questions."],
];

// Add verified company profile URLs here. Blank entries are hidden automatically.
const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/coloradofrontrangeroofing", icon: Facebook },
  { name: "Instagram", url: "https://www.instagram.com/cofrontrangeroofing/", icon: Instagram },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/cofrontrangeroofing/", icon: Linkedin },
  { name: "YouTube", url: "", icon: Youtube },
  { name: "TikTok", url: "https://www.tiktok.com/@colorado.front.ra", icon: Music2 },
  { name: "Nextdoor", url: "", icon: ExternalLink },
];

// -----------------------------------------------------------------------------
// CONCEPT COUNTDOWN
// -----------------------------------------------------------------------------
function getRemaining() {
  const ms = Math.max(0, new Date(END_DATE).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    expired: ms === 0,
  };
}

function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (hidden) {
    return (
      <button className="restore" onClick={() => setHidden(false)}>
        Concept preview
      </button>
    );
  }

  return (
    <aside className="concept" aria-label="Concept website notice">
      <div className="concept-inner">
        <div className="concept-copy">
          <span className="eyebrow">BLUEPRINT WEBSTUDIO · INDEPENDENT CONCEPT</span>
          <strong>This is a website redesign preview, not the company's official website.</strong>
          <span>
            Created for review. Interested in this design?{" "}
            <a href="mailto:hello@blueprintwebstudio.com?subject=Colorado%20Front%20Range%20Roofing%20Concept">
              Contact Blueprint WebStudio <ArrowUpRight size={13} />
            </a>
          </span>
        </div>

        <div className="timer" aria-label="Concept review time remaining">
          {remaining.expired ? (
            <strong>Review window ended</strong>
          ) : (
            ["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit}>
                <strong>{String(remaining[unit]).padStart(2, "0")}</strong>
                <small>{unit}</small>
              </div>
            ))
          )}
        </div>

        <button
          className="close"
          onClick={() => setHidden(true)}
          aria-label="Dismiss concept banner"
        >
          <X size={18} />
        </button>
      </div>
    </aside>
  );
}

// -----------------------------------------------------------------------------
// STICKY TOP BAR + NAVIGATION
// -----------------------------------------------------------------------------
function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky-header">
      <div className="topline">
        <div className="container topline-inner">
          <div className="topline-contact">
            <a href={`tel:${PHONE}`}><Phone size={13} /> (719) 542-2330</a>
            <a href={`mailto:${EMAIL}`}><Mail size={13} /> {EMAIL}</a>
          </div>

          <div className="topline-social">
            {SOCIAL_LINKS.filter(({ url }) => url).map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container nav">
          <a className="brand" href="#home" onClick={closeMenu} aria-label={`${COMPANY} home`}>
            <img src="/cfrr-logo.png" alt={COMPANY} className="brand-logo" />
          </a>

          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#systems" onClick={closeMenu}>Roofing Systems</a>
            <a href="#areas" onClick={closeMenu}>Service Areas</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <a className="nav-cta" href={`tel:${PHONE}`}>
            Free Inspection <ArrowUpRight size={17} />
          </a>

          <button
            className="mobile-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu((current) => !current)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE SECTIONS
// -----------------------------------------------------------------------------
function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <span className="pill"><span className="pulse" /> FAMILY OWNED · SERVING COLORADO SINCE 2010</span>
        <h1>Built for Colorado.<br /><em>Made to Last.</em></h1>
        <p>
          Reliable roofing, honest inspections, and expert storm restoration for homes
          and businesses across Pueblo, Colorado Springs, and Southern Colorado.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href={`tel:${PHONE}`}>
            Schedule a Free Inspection <ArrowUpRight size={19} />
          </a>
          <a className="btn ghost" href="#services">
            Explore Our Services <ArrowRight size={18} />
          </a>
        </div>
        <div className="hero-foot">
          <span><ShieldCheck size={18} /> Locally Owned & Operated</span>
          <span><CheckCircle2 size={18} /> Residential & Commercial</span>
        </div>
      </div>
      <div className="hero-side">ROOFING WITH INTEGRITY <span>—</span> SOUTHERN COLORADO</div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        <div><strong>5,000+</strong><span>Completed roofing projects*</span></div>
        <div><strong>2010</strong><span>Year established</span></div>
        <div><strong>400+</strong><span>Permits reported in 2025*</span></div>
        <div><strong>3 Years</strong><span>Three Best Rated recognition*</span></div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE DO</span>
            <h2>Protection for every<br /><em>roof and property.</em></h2>
          </div>
          <p>
            From your first inspection to the final installation, our team provides
            practical solutions built around the demands of Southern Colorado weather.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map(({ title, desc, icon: Icon }, index) => (
            <article className="service-card" key={title}>
              <div className="service-top">
                <span className="service-icon"><Icon size={25} strokeWidth={1.6} /></span>
                <span className="service-num">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry: ${title}`)}`}>
                Ask about this service <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="split" id="about">
      <div className="split-image">
        <div className="image-label">PROUDLY SERVING SOUTHERN COLORADO</div>
      </div>
      <div className="split-copy">
        <span className="kicker">OUR STORY</span>
        <h2>Local roots.<br /><em>Lasting trust.</em></h2>
        <p>
          Founded in 2010 with roofing experience dating back to the 1980s,
          Colorado Front Range Roofing is a family-owned business dedicated to
          quality craftsmanship and straightforward communication.
        </p>
        <p>
          Whether your roof needs a simple repair or a complete replacement after
          a hailstorm, the team focuses on helping you understand your options
          and move forward with confidence.
        </p>
        <div className="check-row"><CheckCircle2 /> Honest, no-pressure inspections</div>
        <div className="check-row"><CheckCircle2 /> Guidance with storm damage and insurance claims</div>
        <div className="check-row"><CheckCircle2 /> Roofing systems suited to Colorado conditions</div>
        <a href="#contact" className="text-link">
          Talk with our team <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}

function RoofingSystems() {
  return (
    <section className="section systems" id="systems">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">MATERIALS & SYSTEMS</span>
            <h2>The right roof.<br /><em>For the long run.</em></h2>
          </div>
          <p>
            Residential and commercial roofing systems chosen for durability,
            performance, and the needs of your property.
          </p>
        </div>
        <div className="systems-list">
          {SYSTEMS.map((system, index) => (
            <div key={system}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{system}</strong>
              <ChevronRight size={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">HOW IT WORKS</span>
            <h2>A simpler path to<br /><em>peace of mind.</em></h2>
          </div>
        </div>
        <div className="process-grid">
          {PROCESS.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Financing() {
  return (
    <section className="finance">
      <div className="container finance-inner">
        <div>
          <span className="kicker">FLEXIBLE FINANCING</span>
          <h2>Don't put off the roof<br /><em>your home needs.</em></h2>
          <p>
            Colorado Front Range Roofing advertises financing options through Acorn Finance,
            including checking rates without impacting your credit score.
          </p>
        </div>
        <a className="btn light" href={`mailto:${EMAIL}?subject=Roofing%20Financing%20Inquiry`}>
          Ask About Financing <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}

function ServiceAreas() {
  return (
    <section className="section areas" id="areas">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">WHERE WE WORK</span>
            <h2>Southern Colorado<br /><em>is our home.</em></h2>
          </div>
          <p>Based in Pueblo and serving communities throughout Southern Colorado and the Front Range.</p>
        </div>
        <div className="area-list">
          {AREAS.map((area) => (
            <span key={area}><MapPin size={13} /> {area}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact-inner">
        <div>
          <span className="kicker">LET'S GET STARTED</span>
          <h2>Your roof deserves<br /><em>the right team.</em></h2>
          <p>Schedule a free, no-obligation inspection and find out where your roof stands.</p>
          <a className="btn primary" href={`tel:${PHONE}`}>
            Call for a Free Inspection <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="contact-details">
          <a href={`tel:${PHONE}`}>
            <Phone /> <span><small>CALL US</small>(719) 542-2330</span>
          </a>
          <a href={`mailto:${EMAIL}`}>
            <Mail /> <span><small>EMAIL US</small>{EMAIL}</span>
          </a>
          <div>
            <MapPin /> <span><small>VISIT US</small>4289 N Elizabeth St, Pueblo, CO 81008</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <strong>COLORADO FRONT RANGE ROOFING</strong>
          <p>Family-owned roofing solutions serving Pueblo, Colorado Springs, and Southern Colorado since 2010.</p>
        </div>
        <div>
          <b>Explore</b>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#systems">Roofing Systems</a>
          <a href="#areas">Service Areas</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>(719) 542-2330</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>Pueblo, Colorado</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {COMPANY} — Independent design concept, not an official company website.</span>
        <span>
          Concept by{" "}
          <a href="https://blueprintwebstudio.com" target="_blank" rel="noreferrer">
            Blueprint WebStudio
          </a>
        </span>
      </div>
      <div className="container footnote">
        *Company-reported statistics and recognition, pending independent verification.
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// APP — PAGE ORDER
// -----------------------------------------------------------------------------
export default function App() {
  return (
    <>
      <Countdown />
      <SiteHeader />
      <main id="home">
        <Hero />
        <Stats />
        <Services />
        <About />
        <RoofingSystems />
        <Process />
        <Financing />
        <ServiceAreas />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
