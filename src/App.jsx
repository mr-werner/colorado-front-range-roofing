import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
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
  Minus,
  Plus,

} from "lucide-react";



// -----------------------------------------------------------------------------

// COMPANY DETAILS AND CONTENT

// -----------------------------------------------------------------------------

const COMPANY = "Colorado Front Range Roofing";

const PHONE = "7195422330";

const EMAIL = "info@coloradofrroofing.com";
// Public contact details — edit here, no environment variables required.
const STUDIO_PHONE = ""; // Add your Blueprint WebStudio phone number.
const STUDIO_EMAIL = "hello@blueprintwebstudio.com";
const STUDIO_WEBSITE = "https://blueprintwebstudio.com";

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



function ConceptInterestModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const modalRef = React.useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement;
    modalRef.current?.focus();
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("https://blueprintwebstudio.com/api/demo-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect: COMPANY,
          source: "cfrr.blueprintwebstudio.com",
          page: window.location.href,
          action: "Partner Program Interest",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Please try again.");
    }
  }

  return (
    <div className="interest-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="interest-modal" role="dialog" aria-modal="true" aria-labelledby="interest-title" ref={modalRef} tabIndex={-1}>
        <button type="button" className="interest-close" onClick={onClose} aria-label="Close interest form"><X size={24} /></button>
        <span className="interest-kicker">BLUEPRINT WEBSTUDIO PARTNER PROGRAM</span>
        {status === "sent" ? (
          <div className="interest-success">
            <CheckCircle2 size={44} />
            <h2 id="interest-title">Thank you for your interest.</h2>
            <p>Your message has been sent to Blueprint WebStudio. We'll follow up using the contact information you provided.</p>
            <button type="button" className="interest-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="interest-title">Interested in this redesign?</h2>
            <p className="interest-intro">Send a quick note and Blueprint WebStudio will follow up about launching, customizing, or taking over the site.</p>
            <form onSubmit={submit} className="interest-form">
              <label>Name <span>*</span><input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
              <label>Email <span>*</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={254} autoComplete="email" /></label>
              <label>Phone<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} autoComplete="tel" /></label>
              <label>Budget <span>*</span>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} required>
                  <option value="">Select a range...</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$2,500">$1,000–$2,500</option>
                  <option value="$2,500–$5,000">$2,500–$5,000</option>
                  <option value="$5,000–$10,000">$5,000–$10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <label>Message <small>(optional)</small><textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={3000} rows={4} placeholder="Questions, ideas, or anything you'd like us to know..." /></label>
              <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="interest-submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send My Interest"}</button>
              <p className="interest-privacy">Your inquiry goes directly to Blueprint WebStudio, not Colorado Front Range Roofing.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [collapsed, setCollapsed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const closeForm = React.useCallback(() => setShowForm(false), []);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className={`concept-widget${collapsed ? " is-collapsed" : ""}`} aria-label="Independent website concept preview">
        <div className="concept-widget-head">
          <span>CONCEPT REVIEW · NOT FOR OFFICIAL USE</span>
          <button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand concept preview" : "Collapse concept preview"} aria-expanded={!collapsed}>
            {collapsed ? <Plus size={20} /> : <Minus size={20} />}
          </button>
        </div>
        {!collapsed && (
          <div className="concept-widget-body">
            <h2>Private Client Preview</h2>
            <span className="concept-widget-label">PARTNER PROGRAM ELIGIBILITY</span>
            <p>Reserved for review</p>
            <div className="concept-widget-timer" aria-label="Time remaining for concept review">
              {remaining.expired ? <strong>Review window ended</strong> : (
                [[remaining.days, "Days"], [remaining.hours, "Hours"], [remaining.minutes, "Minutes"]].map(([value, unit]) => (
                  <span key={unit}><strong>{String(value).padStart(2, "0")}</strong> {unit}</span>
                ))
              )}
            </div>
            <button type="button" className="concept-widget-cta" onClick={() => setShowForm(true)}>I'm Interested <ArrowUpRight size={18} /></button>
            <div className="concept-widget-links">
              {STUDIO_PHONE && <a href={`tel:${STUDIO_PHONE.replace(/[^+\d]/g, "")}`}>Call</a>}
              <a href={`mailto:${STUDIO_EMAIL}`}>Email</a>
              <a href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        )}
        <div className="concept-widget-footer">
          <a className="concept-widget-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Visit Blueprint WebStudio"><img src={blueprintLogo} alt="" /><span>Blueprint WebStudio</span></a>
          <span>Independent concept</span>
        </div>
      </aside>
      {showForm && <ConceptInterestModal onClose={closeForm} />}
    </>
  );
}


// -----------------------------------------------------------------------------

// STICKY TOP BAR + NAVIGATION

// -----------------------------------------------------------------------------

function SiteHeader({ reviewData }) {

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



          {typeof reviewData?.rating === "number" && (
            <a className="topline-rating" href={reviewData.googleMapsUri || "#reviews"}
               target={reviewData.googleMapsUri ? "_blank" : undefined}
               rel={reviewData.googleMapsUri ? "noopener noreferrer" : undefined}>
              <span className="rating-stars" aria-hidden="true">★★★★★</span>
              <strong>{reviewData.rating.toFixed(1)}</strong> on Google
              {typeof reviewData.userRatingCount === "number" &&
                <span>· {reviewData.userRatingCount.toLocaleString()} reviews</span>}
            </a>
          )}

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


            <a href="#systems" onClick={closeMenu}>Roofing Systems</a>

            <a href="#areas" onClick={closeMenu}>Service Areas</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>

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

function Hero({ reviewData }) {

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

        {typeof reviewData?.rating === "number" && (
          <a className="hero-rating" href={reviewData.googleMapsUri || "#reviews"}
             target={reviewData.googleMapsUri ? "_blank" : undefined}
             rel={reviewData.googleMapsUri ? "noopener noreferrer" : undefined}>
            <span className="hero-rating-stars" aria-hidden="true">★★★★★</span>
            <span><strong>{reviewData.rating.toFixed(1)} / 5</strong> on Google
              {typeof reviewData.userRatingCount === "number" &&
                <small>Based on {reviewData.userRatingCount.toLocaleString()} Google ratings</small>}
            </span>
            <ArrowUpRight size={18} />
          </a>
        )}

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




// Service-area pins represent listed communities, not a guaranteed coverage boundary.
const AREA_PINS = [
  { name: "Pueblo", lat: 38.2544, lng: -104.6091 },
  { name: "Pueblo West", lat: 38.3500, lng: -104.7228 },
  { name: "Colorado Springs", lat: 38.8339, lng: -104.8214 },
  { name: "Cañon City", lat: 38.4494, lng: -105.2253 },
  { name: "Fountain", lat: 38.6822, lng: -104.7008 },
  { name: "La Junta", lat: 37.9850, lng: -103.5438 },
  { name: "Peyton", lat: 39.0289, lng: -104.4839 },
  { name: "Lamar", lat: 38.0872, lng: -102.6207 },
  { name: "Trinidad", lat: 37.1695, lng: -104.5005 },
  { name: "Fowler", lat: 38.1292, lng: -104.0241 },
  { name: "Rocky Ford", lat: 38.0525, lng: -103.7202 },
  { name: "Rye", lat: 37.9222, lng: -104.9308 },
  { name: "Walsenburg", lat: 37.6242, lng: -104.7803 },
  { name: "Colorado City", lat: 37.9453, lng: -104.8353 },
  { name: "Bessemer", lat: 38.2350, lng: -104.6360 },
  { name: "Penrose", lat: 38.4250, lng: -105.0111 },
  { name: "Salida", lat: 38.5347, lng: -105.9989 },
  { name: "Security", lat: 38.7447, lng: -104.7269 },
  { name: "Beulah", lat: 38.0767, lng: -104.9878 },
  { name: "Westcliffe", lat: 38.1347, lng: -105.4658 },
];

let googleMapsScriptPromise;
function loadGoogleMaps(apiKey) {
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (!googleMapsScriptPromise) {
    googleMapsScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly`;
      script.async = true;
      script.onload = () => window.google?.maps ? resolve(window.google.maps) : reject(new Error("Google Maps did not initialize."));
      script.onerror = () => reject(new Error("Google Maps script could not be loaded."));
      document.head.appendChild(script);
    }).catch((error) => {
      googleMapsScriptPromise = null;
      throw error;
    });
  }
  return googleMapsScriptPromise;
}

function ServiceAreaMap() {
  const containerRef = React.useRef(null);
  const [error, setError] = useState("");
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!key || !containerRef.current) return;
    let cancelled = false;
    loadGoogleMaps(key).then((maps) => {
      if (cancelled || !containerRef.current) return;
      const map = new maps.Map(containerRef.current, {
        center: { lat: 38.25, lng: -104.65 },
        zoom: 8,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      const bounds = new maps.LatLngBounds();
      const info = new maps.InfoWindow();
      AREA_PINS.forEach((area) => {
        const position = { lat: area.lat, lng: area.lng };
        bounds.extend(position);
        const marker = new maps.Marker({ map, position, title: area.name });
        marker.addListener("click", () => {
          const label = document.createElement("strong");
          label.textContent = area.name;
          info.setContent(label);
          info.open({ map, anchor: marker });
        });
      });
      map.fitBounds(bounds, 35);
    }).catch((err) => {
      if (!cancelled) setError(err.message);
    });
    return () => { cancelled = true; };
  }, [key]);

  if (!key) {
    return <div className="area-map-fallback">Add VITE_GOOGLE_MAPS_API_KEY to display the interactive map.</div>;
  }
  return (
    <div className="area-map-wrap">
      {error ? <div className="area-map-fallback">{error} Check your API key and website restrictions.</div> :
        <div ref={containerRef} className="area-map" role="region" aria-label="Interactive map of Southern Colorado service communities" />}
    </div>
  );
}

function GoogleReviews({ data, error }) {
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">CUSTOMER FEEDBACK</span>
            <h2>What our customers<br /><em>are saying.</em></h2>
          </div>
          <p>Read feedback from customers on Google. Reviews and ratings are provided by Google Maps.</p>
        </div>
        {data && (
          <>
            <div className="reviews-summary">
              <div>
                <span className="google-wordmark">Google</span>
                <strong>{typeof data.rating === "number" ? data.rating.toFixed(1) : "—"} <span className="review-stars">★</span></strong>
                <span>{typeof data.userRatingCount === "number" ? `${data.userRatingCount.toLocaleString()} Google ratings` : "Google reviews"}</span>
              </div>
              {data.googleMapsUri && <a className="reviews-link" href={data.googleMapsUri} target="_blank" rel="noopener noreferrer">View on Google <ArrowUpRight size={17} /></a>}
            </div>
            {data.reviews?.length > 0 ? (
              <div className="reviews-grid">
                {data.reviews.map((review, i) => (
                  <article className="review-card" key={`${review.publishTime || i}-${i}`}>
                    <div className="review-card-head">
                      {review.authorAttribution?.photoUri && <img src={review.authorAttribution.photoUri} alt="" referrerPolicy="no-referrer" />}
                      <div>
                        {review.authorAttribution?.uri ?
                          <a href={review.authorAttribution.uri} target="_blank" rel="noopener noreferrer">{review.authorAttribution.displayName || "Google reviewer"}</a> :
                          <strong>{review.authorAttribution?.displayName || "Google reviewer"}</strong>}
                        <small>{review.relativePublishTimeDescription || (review.publishTime ? new Date(review.publishTime).toLocaleDateString() : "")}</small>
                      </div>
                    </div>
                    <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating || 0))))}</div>
                    <p>{review.text?.text || review.originalText?.text || "Rating only"}</p>
                  </article>
                ))}
              </div>
            ) : <p className="reviews-status">No review excerpts were returned by Google.</p>}
            <p className="reviews-attribution">Reviews provided by Google Maps. A limited selection is displayed.</p>
          </>
        )}
        {!data && <p className="reviews-status">{error || "Loading Google reviews…"}</p>}
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

        <ServiceAreaMap />
      <p className="area-map-note">Pins show communities listed as service areas; contact the company to confirm availability at your address.</p>
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


          <a href="#systems">Roofing Systems</a>

          <a href="#areas">Service Areas</a>
          <a href="#reviews">Google Reviews</a>

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

        <a className="footer-studio-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Website concept by Blueprint WebStudio">
          <span>Concept by</span>
          <img src={blueprintLogo} alt="" />
          <strong>Blueprint WebStudio</strong>
        </a>

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
  const [reviewData, setReviewData] = useState(null);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Reviews are temporarily unavailable.");
        return response.json();
      })
      .then(setReviewData)
      .catch((err) => { if (err.name !== "AbortError") setReviewError(err.message); });
    return () => controller.abort();
  }, []);


  return (

    <>

      <Countdown />

      <SiteHeader reviewData={reviewData} />

      <main id="home">

        <Hero reviewData={reviewData} />

        <Stats />

        <Services />


        <RoofingSystems />

        <Process />

        <Financing />

        <ServiceAreas />
        <GoogleReviews data={reviewData} error={reviewError} />

        <Contact />

      </main>

      <Footer />

    </>

  );

}
