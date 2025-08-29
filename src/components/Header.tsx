import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if we're on the main page or a sub-page
  const isMainPage = window.location.pathname === '/';
  
  // Navigation links - use full URLs when not on main page
  const getNavLink = (section: string) => {
    return isMainPage ? `#${section}` : `/#${section}`;
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <img src="/clinoteicon.svg" alt="Clinote" className="w-10 h-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Clinote
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href={getNavLink('features')} className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href={getNavLink('demo')} className="text-gray-600 hover:text-blue-600 transition-colors">Demo</a>
            <a href={getNavLink('pricing')} className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href={getNavLink('support')} className="text-gray-600 hover:text-blue-600 transition-colors">Support</a>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="/download" className="hidden md:block bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Download
            </a>
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-4">
              <a 
                href={getNavLink('features')} 
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              >
                Features
              </a>
              <a 
                href={getNavLink('demo')} 
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              >
                Demo
              </a>
              <a 
                href={getNavLink('pricing')} 
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              >
                Pricing
              </a>
              <a 
                href={getNavLink('support')} 
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              >
                Support
              </a>
              <div className="px-4 pt-2">
                <a href="/download" className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center block">
                  Download
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;