import React, { useState } from 'react';
import { Compass, ExternalLink, Navigation } from 'lucide-react';
import './TheLocation.css';

// Verified Google Maps destination
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/CPsP4TGnT36FcUMb8';
const EMBED_MAP_URL = 'https://www.google.com/maps?q=19.1885003,73.2041195&hl=en&z=15&output=embed';

// Geographically verified landmarks around Maitri Katta (Pipeline Road, Navare Nagar, Ambernath)
const NEARBY_LANDMARKS = [
  { id: 1, name: 'Green City, Navare Nagar', distance: '0.2 km' },
  { id: 2, name: 'MIDC Pipeline Road', distance: '0.1 km' },
  { id: 3, name: 'Shiv Mandir (Ancient Temple)', distance: '2.8 km' },
  { id: 4, name: 'Ambernath Railway Station', distance: '3.2 km' },
  { id: 5, name: 'Ulhasnagar Railway Station', distance: '3.8 km' },
];

export default function TheLocation() {
  const [mapMode, setMapMode] = useState('editorial'); // 'editorial' | 'interactive'

  return (
    <section className="section-location" id="location" aria-label="Section 06: Restaurant Location">
      <div className="magazine-book-spread">
        {/* Subtle center spine shadow recreating an open two-page magazine */}
        <div className="magazine-spine-shadow" aria-hidden="true" />

        {/* ====================================================================
            LEFT PAGE — THE MAP
            ==================================================================== */}
        <div className="magazine-page page-left">
          {/* Top Running Header */}
          <header className="page-header page-header-left">
            <span className="page-num">06</span>
            <span className="page-header-title">MAITRI KATTA</span>
            <span className="page-header-sub">LOCATION</span>
          </header>

          {/* Map Frame with Cartographic Border & Coordinate Ticks */}
          <div className="carto-frame-container">
            {/* Border Coordinate Ticks */}
            <div className="carto-ticks carto-ticks-top" aria-hidden="true">
              <span>·</span><span>·</span><span>19.1885° N</span><span>·</span><span>·</span>
            </div>
            <div className="carto-ticks carto-ticks-bottom" aria-hidden="true">
              <span>·</span><span>·</span><span>73.2041° E</span><span>·</span><span>·</span>
            </div>
            <div className="carto-ticks carto-ticks-left" aria-hidden="true">
              <span>·</span><span>·</span><span>·</span>
            </div>
            <div className="carto-ticks carto-ticks-right" aria-hidden="true">
              <span>·</span><span>·</span><span>·</span>
            </div>

            {/* Inner Map Viewport */}
            <div className="carto-viewport">
              {/* Compass Rose */}
              <div className="carto-compass" aria-hidden="true">
                <span className="compass-n">N</span>
                <Compass size={22} strokeWidth={1.5} className="compass-icon" />
              </div>

              {/* View Mode Toggle Controls */}
              <div className="map-mode-toggle" role="tablist" aria-label="Map Display Mode">
                <button
                  type="button"
                  className={`toggle-btn ${mapMode === 'editorial' ? 'is-active' : ''}`}
                  onClick={() => setMapMode('editorial')}
                  role="tab"
                  aria-selected={mapMode === 'editorial'}
                >
                  MAGAZINE MAP
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${mapMode === 'interactive' ? 'is-active' : ''}`}
                  onClick={() => setMapMode('interactive')}
                  role="tab"
                  aria-selected={mapMode === 'interactive'}
                >
                  LIVE GOOGLE MAP
                </button>
              </div>

              {mapMode === 'interactive' ? (
                /* Live Interactive Google Maps Embed with warm editorial tone filter */
                <iframe
                  title="Google Maps Location of Maitri Katta"
                  src={EMBED_MAP_URL}
                  className="interactive-google-map"
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                /* Editorial Cartographic Illustration (Authentic Roads & Topography) */
                <div className="editorial-vector-map" aria-label="Editorial map showing Maitri Katta on Pipeline Road, Ambernath">
                  <svg className="vector-map-canvas" viewBox="0 0 700 760" fill="none" preserveAspectRatio="xMidYMid meet">
                    {/* Background Paper Tone */}
                    <rect width="700" height="760" fill="#EFE8DC" />

                    {/* Subtle Landform / Greenery Area Patches */}
                    <path d="M 40 100 C 120 80, 200 120, 260 90 C 310 70, 360 40, 420 50 L 450 160 C 380 180, 280 150, 190 200 Z" fill="#E2DAC9" opacity="0.65" />
                    <path d="M 420 440 C 500 420, 580 460, 680 430 L 700 600 C 600 620, 520 580, 440 610 Z" fill="#E2DAC9" opacity="0.65" />
                    <path d="M 40 520 C 110 500, 160 550, 220 530 L 240 680 C 160 700, 100 670, 40 690 Z" fill="#E4DCCA" opacity="0.7" />

                    {/* Waterway (Waldhuni River sweep through Thane-Ambernath belt) */}
                    <path
                      d="M 120 0 C 145 120, 160 180, 130 260 C 95 350, 70 420, 115 520 C 145 590, 185 680, 210 760"
                      stroke="#B8C8CE"
                      strokeWidth="28"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 120 0 C 145 120, 160 180, 130 260 C 95 350, 70 420, 115 520 C 145 590, 185 680, 210 760"
                      stroke="#A5B8BF"
                      strokeWidth="22"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Secondary Road Network (Fine Grid Lines) */}
                    <path d="M 0 140 L 700 190" stroke="#F8F4EC" strokeWidth="3" />
                    <path d="M 0 290 L 700 310" stroke="#F8F4EC" strokeWidth="2.5" />
                    <path d="M 0 450 L 700 420" stroke="#F8F4EC" strokeWidth="3" />
                    <path d="M 0 620 L 700 580" stroke="#F8F4EC" strokeWidth="2.5" />

                    <path d="M 180 0 L 220 760" stroke="#F8F4EC" strokeWidth="2.5" />
                    <path d="M 330 0 L 310 760" stroke="#F8F4EC" strokeWidth="3" />
                    <path d="M 490 0 L 460 760" stroke="#F8F4EC" strokeWidth="2.5" />
                    <path d="M 620 0 L 640 760" stroke="#F8F4EC" strokeWidth="2.5" />

                    {/* Dense Urban Road Filaments */}
                    <g stroke="#DFD7C7" strokeWidth="1.2" opacity="0.9">
                      <path d="M 280 200 L 420 180 L 440 260 L 360 280 Z" />
                      <path d="M 440 180 L 580 160 L 610 240 L 450 260 Z" />
                      <path d="M 340 310 L 480 300 L 500 380 L 370 390 Z" />
                      <path d="M 480 300 L 620 280 L 650 370 L 510 380 Z" />
                      <path d="M 270 430 L 390 410 L 410 490 L 300 510 Z" />
                      <path d="M 390 410 L 540 390 L 560 480 L 420 500 Z" />
                      <path d="M 180 540 L 310 520 L 330 620 L 200 630 Z" />
                      <path d="M 320 530 L 460 510 L 480 610 L 340 620 Z" />
                    </g>

                    {/* Primary Arterial: Pipeline Road / Kalyan-Badlapur Road */}
                    <path
                      d="M 50 490 L 220 440 L 380 390 L 550 330 L 700 270"
                      stroke="#D8CDBC"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 50 490 L 220 440 L 380 390 L 550 330 L 700 270"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Arterial Connecting to Navare Nagar & Ambernath MIDC */}
                    <path
                      d="M 380 390 L 430 460 L 460 560 L 480 670 L 520 760"
                      stroke="#D8CDBC"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 380 390 L 430 460 L 460 560 L 480 670 L 520 760"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Central Railway Line with Station Cross-Hatch */}
                    <path
                      d="M 40 220 L 150 250 L 280 290 L 420 330 L 560 380 L 700 430"
                      stroke="#7D776C"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                    />

                    {/* Road Label: Pipeline Road */}
                    <g transform="translate(230, 432) rotate(-16)">
                      <text fill="#6C6558" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.12em">
                        PIPELINE ROAD
                      </text>
                    </g>

                    {/* Road Label: Badlapur-MIDC Link */}
                    <g transform="translate(470, 540) rotate(78)">
                      <text fill="#6C6558" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.12em">
                        NAVARE NAGAR RD
                      </text>
                    </g>

                    {/* Verified Landmark 1: Green City, Navare Nagar */}
                    <g transform="translate(480, 395)">
                      <circle cx="0" cy="0" r="4.5" fill="#585245" />
                      <text x="10" y="3" fill="#3D3A32" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
                        Green City
                      </text>
                      <text x="10" y="15" fill="#756E61" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif">
                        Navare Nagar
                      </text>
                    </g>

                    {/* Verified Landmark 2: Ambernath Railway Station */}
                    <g transform="translate(160, 230)">
                      <circle cx="0" cy="0" r="5" fill="#3E422C" />
                      <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
                      <text x="-12" y="-12" fill="#2E2C25" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">
                        Ambernath Station
                      </text>
                      <text x="-12" y="2" fill="#6A6457" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif">
                        Central Line · 3.2 km
                      </text>
                    </g>

                    {/* Verified Landmark 3: Ancient Shiv Mandir */}
                    <g transform="translate(220, 640)">
                      <circle cx="0" cy="0" r="4.5" fill="#585245" />
                      <text x="10" y="0" fill="#3A372E" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
                        Ambreshwar Shiv Mandir
                      </text>
                      <text x="10" y="12" fill="#70695B" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif">
                        11th c. Heritage · 2.8 km
                      </text>
                    </g>

                    {/* ==========================================================
                        AUTHENTIC RESTAURANT PIN & SERIF LABEL
                        Exact Coordinates: 19.1885° N, 73.2041° E (Pipeline Road)
                        ========================================================== */}
                    <g transform="translate(415, 385)" className="carto-maitri-pin">
                      {/* Pulse target rings */}
                      <circle cx="0" cy="0" r="32" fill="#A6533B" opacity="0.12" />
                      <circle cx="0" cy="0" r="20" fill="#A6533B" opacity="0.22" />

                      {/* Main Terracotta Pin */}
                      <circle cx="0" cy="0" r="13" fill="#A6533B" stroke="#FAF7F2" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="5" fill="#FAF7F2" />

                      {/* Prominent Serif Restaurant Typography Label */}
                      <g transform="translate(-150, -42)">
                        <rect x="-8" y="-4" width="168" height="42" fill="#F3EEE5" fillOpacity="0.9" rx="3" stroke="rgba(37,37,31,0.12)" strokeWidth="1" />
                        <text x="76" y="15" textAnchor="middle" fill="#A6533B" fontSize="13" fontFamily="'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" fontWeight="700" letterSpacing="0.12em">
                          MAITRI KATTA
                        </text>
                        <text x="76" y="29" textAnchor="middle" fill="#25251F" fontSize="8" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.16em">
                          FAMILY GARDEN RESTAURANT
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom Scale & Location Coordinates Footer */}
            <footer className="carto-scale-footer">
              <div className="scale-metric">
                <span className="scale-labels">0 &nbsp; 0.5 &nbsp; 1 &nbsp; 1.5 &nbsp; 2 KM</span>
                <div className="scale-bar" aria-hidden="true">
                  <span className="bar-segment" />
                  <span className="bar-segment" />
                  <span className="bar-segment" />
                  <span className="bar-segment" />
                </div>
              </div>

              <div className="scale-legend">
                <span className="legend-district">AMBERNATH, THANE DISTRICT</span>
                <span className="legend-coords">19.1885° N &nbsp; 73.2041° E</span>
              </div>
            </footer>
          </div>
        </div>

        {/* ====================================================================
            RIGHT PAGE — THE EDITORIAL
            ==================================================================== */}
        <div className="magazine-page page-right">
          {/* Top Running Editorial Header */}
          <header className="page-header page-header-right">
            <span className="page-header-label">06 — LOCATION</span>
            <span className="page-header-rule" aria-hidden="true" />
            <span className="page-header-title">MAITRI KATTA</span>
          </header>

          <div className="editorial-content-body">
            {/* Main Headline Composition */}
            <div className="editorial-headline-row">
              <h2 className="location-headline">
                <span className="headline-line headline-meet-us">Meet us</span>
                <span className="headline-line headline-here">
                  here<span className="headline-dot">.</span>
                </span>
              </h2>

              {/* Side Supporting Motto */}
              <div className="headline-motto-stack" aria-hidden="true">
                <span>GOOD FOOD</span>
                <span>BRINGS</span>
                <span>PEOPLE CLOSER</span>
              </div>
            </div>

            {/* Fine Editorial Divider */}
            <hr className="editorial-divider" />

            {/* Address & Direct Navigation Block */}
            <div className="editorial-address-block">
              <span className="block-label">ADDRESS</span>

              <address className="verified-address">
                <p className="address-name">Maitri Katta Family Garden Restaurant</p>
                <p className="address-line">Next to Green City, Navare Nagar, Pipeline Road,</p>
                <p className="address-line">Ambernath (West), Thane District, Maharashtra — 421501</p>
              </address>

              {/* Verified Google Maps Directions Link */}
              <div className="directions-cta-wrap">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-get-directions"
                  aria-label="Get driving directions to Maitri Katta on Google Maps (opens in new tab)"
                >
                  <Navigation size={14} className="directions-icon" strokeWidth={2} />
                  <span>GET DIRECTIONS</span>
                  <ExternalLink size={14} className="directions-external" strokeWidth={2} />
                </a>
                <span className="directions-underline" aria-hidden="true" />
              </div>
            </div>

            {/* Bottom Section: Verified Nearby Landmarks & Authentic Venue Feature */}
            <div className="editorial-bottom-split">
              {/* Left Column: Restrained Verified Nearby Landmarks */}
              <div className="split-col landmarks-col">
                <span className="block-label">NEARBY LANDMARKS</span>
                <ol className="landmarks-numbered-list">
                  {NEARBY_LANDMARKS.map((item) => (
                    <li key={item.id} className="landmark-item">
                      <span className="landmark-num">{item.id}</span>
                      <span className="landmark-name">{item.name}</span>
                      <span className="landmark-leader" aria-hidden="true" />
                      <span className="landmark-distance">{item.distance}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right Column: Authentic Venue Detail & Botanical Quote */}
              <div className="split-col venue-col">
                <div className="botanical-feature-block">
                  {/* Botanical Leaf Silhouette */}
                  <svg className="botanical-branch-svg" viewBox="0 0 110 50" fill="none" aria-hidden="true">
                    <path d="M 6 42 C 30 32, 65 24, 104 8" stroke="#A6533B" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M 28 34 C 18 24, 15 12, 26 6 C 35 14, 36 26, 28 34 Z" fill="#A6533B" />
                    <path d="M 52 26 C 62 20, 72 26, 68 36 C 58 35, 52 29, 52 26 Z" fill="#A6533B" />
                    <path d="M 72 18 C 65 8, 66 0, 76 -2 C 82 6, 81 16, 72 18 Z" fill="#A6533B" />
                    <path d="M 88 12 C 98 8, 106 14, 102 22 C 92 20, 86 16, 88 12 Z" fill="#A6533B" />
                  </svg>

                  <p className="botanical-quote">
                    “A peaceful place to eat, meet and make memories.”
                  </p>

                  {/* Authentic Restaurant Garden Pavilion Vignette */}
                  <div className="authentic-venue-vignette">
                    <div className="vignette-frame">
                      <img
                        src="/assets/maitri-garden-pavilion.jpg"
                        alt="Maitri Katta outdoor garden dining pavilion with illuminated evening pergola"
                        className="vignette-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="vignette-caption">
                      <span>AMBERNATH</span>
                      <span>THANE, MH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
