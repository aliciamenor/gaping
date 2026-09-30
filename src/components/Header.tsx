import { Link, useLocation } from 'react-router-dom';
import logoArrow from '@/assets/icons/logo-arrow.webp';
import heroG1 from '@/assets/logo/hero-g1.png';
import heroA from '@/assets/logo/hero-a.png';
import heroP from '@/assets/logo/hero-p.png';
import heroI from '@/assets/logo/hero-i.png';
import heroN from '@/assets/logo/hero-n.png';
import heroG2 from '@/assets/logo/hero-g2.png';

const WORDMARK_LETTERS = [heroG1, heroA, heroP, heroI, heroN, heroG2];

const navItems = [
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const location = useLocation();

  // Shared by the logo and every nav item that points to "/": a same-route
  // Link click doesn't trigger a navigation, so ScrollToTop's pathname
  // effect never fires for it — scroll manually when already on the
  // landing page.
  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2.5 leading-none"
            aria-label="GAPING"
            onClick={handleHomeClick}
          >
            <img src={logoArrow} alt="" aria-hidden="true" className="h-[26px] w-auto" />
            <span className="flex items-center">
              {WORDMARK_LETTERS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="inline-block select-none h-[24px] w-auto"
                  style={{ marginRight: i < WORDMARK_LETTERS.length - 1 ? '0.07em' : 0 }}
                />
              ))}
            </span>
          </Link>

          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={item.path === '/' ? handleHomeClick : undefined}
                    className={`relative px-4 py-2 font-sans font-medium text-base transition-colors duration-300 rounded-md ${
                      isActive ? 'text-[#42767f]' : 'text-[#6b7280] hover:text-[#42767f]'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#42767f] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
