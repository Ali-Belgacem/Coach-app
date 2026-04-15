import React from 'react'
import { assets } from '../assets'

const Footer = ({ scrollToSection }) => {
  const handleWhatsApp = () => {
    const phone = "213657495826"
    const msg = "Hi, I'm interested in your services!✅"
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const links = [
    { label: "Home",           id: "home"           },
    { label: "About Us",       id: "about-us"       },
    { label: "Program",        id: "program"        },
    { label: "Transformation", id: "transformation" },
    { label: "Subscribe",      id: "subscribe"      },
  ]

  return (
    <footer className="relative bg-black border-t border-violet-900/30 overflow-hidden">
      {/* Glow blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-40 bg-violet-900/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-14 relative z-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand col */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={assets.Logo} alt="Coach Fares" className="w-12 rounded-xl ring-2 ring-violet-700/40" />
              <span className="text-white font-extrabold text-lg tracking-wide">COACH FARES</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional fitness coaching — transform your body and mindset with certified IFBB Pro trainer.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-2">
              <a href="https://www.facebook.com/fa.res.648560" target="_blank" rel="noreferrer"
                className="p-2 rounded-xl glass-card hover:border-blue-500/60 transition hover:scale-110">
                <img src={assets.Facebook} alt="Facebook" className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/coach_fitness_fb" target="_blank" rel="noreferrer"
                className="p-2 rounded-xl glass-card hover:border-pink-500/60 transition hover:scale-110">
                <img src={assets.instagram} alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@coach.98fitness" target="_blank" rel="noreferrer"
                className="p-2 rounded-xl glass-card hover:border-gray-400/60 transition hover:scale-110">
                <img src={assets.tiktok} alt="TikTok" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToSection && scrollToSection(l.id)}
                    className="text-gray-400 hover:text-violet-300 transition text-sm text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">Get in Touch</h3>
            <p className="text-gray-400 text-sm mb-4">
              Ready to start your transformation? Book a free consultation today.
            </p>
            <button
              onClick={handleWhatsApp}
              className="btn-violet px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider shadow-md"
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-700/40 to-transparent mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Coach Fares. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed &amp; Built by&nbsp;
            <a
              href="https://www.instagram.com/aliix_dev?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="text-violet-400 hover:text-violet-300 font-semibold transition hover:underline flex items-center gap-1"
            >
              {/* Instagram mini-icon inline SVG */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              aliix_dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
