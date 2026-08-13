import React, { useState } from 'react';
import { Menu, X, Settings, PhoneCall, Layers, FileText, Info, ShieldCheck, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { Category, CompanyInfo } from '../types';

interface HeaderProps {
  activePage: 'home' | 'products' | 'procurement' | 'about' | 'inquiry' | 'admin' | 'construction' | 'cases';
  setActivePage: (page: 'home' | 'products' | 'procurement' | 'about' | 'inquiry' | 'admin' | 'construction' | 'cases') => void;
  setSelectedProductId: (id: string | null) => void;
  setSelectedCategory: (cat: string) => void;
  categories: Category[];
  companyInfo: CompanyInfo;
  isAdminLoggedIn: boolean;
  aboutTab?: 'philosophy' | 'history' | 'directions';
  setAboutTab?: (tab: 'philosophy' | 'history' | 'directions') => void;
  inquiryTab?: 'catalog' | 'price' | 'as';
  setInquiryTab?: (tab: 'catalog' | 'price' | 'as') => void;
}

export default function Header({
  activePage,
  setActivePage,
  setSelectedProductId,
  setSelectedCategory,
  categories,
  companyInfo,
  isAdminLoggedIn,
  aboutTab,
  setAboutTab,
  inquiryTab,
  setInquiryTab
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'about' | 'procurement' | 'products' | 'inquiry' | null>(null);

  const showPriceTab = companyInfo?.enablePriceTab ?? true;
  const showCatalogTab = companyInfo?.enableCatalogTab ?? true;
  const showAsTab = companyInfo?.enableAsTab ?? true;
  const defaultInquiryTab = showPriceTab ? 'price' : showCatalogTab ? 'catalog' : showAsTab ? 'as' : 'price';

  const toggleSection = (section: 'about' | 'procurement' | 'products' | 'inquiry') => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handleNav = (
    page: 'home' | 'products' | 'procurement' | 'about' | 'inquiry' | 'admin' | 'construction' | 'cases', 
    categoryId?: string,
    tabId?: 'philosophy' | 'history' | 'directions',
    inqTab?: 'catalog' | 'price' | 'as'
  ) => {
    setActivePage(page);
    setSelectedProductId(null);
    if (categoryId) {
      setSelectedCategory(categoryId);
    } else if (page === 'products' || page === 'procurement') {
      setSelectedCategory('all');
    }
    if (tabId && setAboutTab) {
      setAboutTab(tabId);
    }
    if (inqTab && setInquiryTab) {
      setInquiryTab(inqTab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center z-10">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center text-left cursor-pointer animate-fade-in"
              id="header-logo-btn"
            >
              <div>
                <span className="block text-3xl font-black font-sans tracking-tighter text-neutral-900 leading-none hover:text-neutral-700 transition-colors">
                  DADMDESIGN
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation (Centered) */}
          <nav className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 space-x-2 md:space-x-3.5 lg:space-x-6 xl:space-x-9 whitespace-nowrap">
            {/* 1. 회사소개 */}
            <div className="relative group">
              <button
                id="nav-about"
                onClick={() => handleNav('about', undefined, 'philosophy')}
                className={`flex items-center px-1.5 py-2 font-sans font-extrabold md:text-sm lg:text-base xl:text-lg tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  activePage === 'about'
                    ? 'text-neutral-900 border-b-2 border-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>회사소개</span>
              </button>
              
              {/* Dropdown Menu for About */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => handleNav('about', undefined, 'philosophy')}
                  className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  인사말
                </button>
                <button
                  onClick={() => handleNav('about', undefined, 'history')}
                  className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  연혁
                </button>
                <button
                  onClick={() => handleNav('about', undefined, 'directions')}
                  className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  오시는 길
                </button>
              </div>
            </div>

            {/* 2. 조달등록제품 */}
            <div className="relative group">
              <button
                id="nav-procurement"
                onClick={() => handleNav('procurement')}
                className={`flex items-center px-1.5 py-2 font-sans font-extrabold md:text-sm lg:text-base xl:text-lg tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  activePage === 'procurement'
                    ? 'text-neutral-900 border-b-2 border-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>조달등록제품</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {categories.filter((cat) => cat.id === 'all' || cat.isProcurement !== false).map((cat) => (
                  <button
                    key={`proc-${cat.id}`}
                    onClick={() => handleNav('procurement', cat.id)}
                    className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. 제품소개 */}
            <div className="relative group">
              <button
                id="nav-products"
                onClick={() => handleNav('products')}
                className={`flex items-center px-1.5 py-2 font-sans font-extrabold md:text-sm lg:text-base xl:text-lg tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  activePage === 'products'
                    ? 'text-neutral-900 border-b-2 border-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>제품소개</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {categories.filter((cat) => cat.id === 'all' || cat.isGeneral !== false).map((cat) => (
                  <button
                    key={`prod-${cat.id}`}
                    onClick={() => handleNav('products', cat.id)}
                    className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. 시공사례 */}
            <button
              id="nav-cases"
              onClick={() => handleNav('cases')}
              className={`flex items-center px-1.5 py-2 font-sans font-extrabold md:text-sm lg:text-base xl:text-lg tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                activePage === 'cases'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>시공사례</span>
            </button>

            {/* 5. 고객지원 */}
            <div className="relative group">
              <button
                id="nav-inquiry"
                onClick={() => handleNav('inquiry', undefined, undefined, defaultInquiryTab)}
                className={`flex items-center px-1.5 py-2 font-sans font-extrabold md:text-sm lg:text-base xl:text-lg tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  activePage === 'inquiry'
                    ? 'text-neutral-900 border-b-2 border-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>고객지원</span>
              </button>
              
              {/* Dropdown Menu */}
              {(showPriceTab || showCatalogTab || showAsTab) && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {showPriceTab && (
                    <button
                      onClick={() => handleNav('inquiry', undefined, undefined, 'price')}
                      className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      가격자료
                    </button>
                  )}
                  {showCatalogTab && (
                    <button
                      onClick={() => handleNav('inquiry', undefined, undefined, 'catalog')}
                      className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      카탈로그 신청
                    </button>
                  )}
                  {showAsTab && (
                    <button
                      onClick={() => handleNav('inquiry', undefined, undefined, 'as')}
                      className="block w-full text-left px-4 py-2 text-xs lg:text-sm font-sans font-bold tracking-wide text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      A/S 하자접수
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 6. 건설사업 */}
            <button
              id="nav-construction"
              onClick={() => handleNav('construction')}
              className={`flex items-center px-1.5 py-2 font-sans font-extrabold md:text-sm lg:text-base xl:text-lg tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                activePage === 'construction'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>건설사업</span>
            </button>
          </nav>

          {/* Mobile Right Utilities (Hamburger) */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-600 hover:text-neutral-900 focus:outline-none p-1.5"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            
            {/* 1. 회사소개 */}
            <div className="border-b border-gray-100 pb-2.5">
              <button
                id="mobile-nav-about"
                onClick={() => toggleSection('about')}
                className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  activePage === 'about' ? 'bg-neutral-50 text-neutral-950 font-black' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>회사소개 (About Us)</span>
                {expandedSection === 'about' ? (
                  <ChevronUp size={16} className="text-neutral-500 stroke-[2.5px]" />
                ) : (
                  <ChevronDown size={16} className="text-neutral-500 stroke-[2.5px]" />
                )}
              </button>
              
              {expandedSection === 'about' && (
                <div className="pl-3 pr-2 mt-1 py-1 space-y-1 bg-neutral-50/60 rounded-xl border border-neutral-100/60 animate-fade-in">
                  <button
                    onClick={() => handleNav('about', undefined, 'philosophy')}
                    className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                  >
                    인사말
                  </button>
                  <button
                    onClick={() => handleNav('about', undefined, 'history')}
                    className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                  >
                    연혁
                  </button>
                  <button
                    onClick={() => handleNav('about', undefined, 'directions')}
                    className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                  >
                    오시는 길
                  </button>
                </div>
              )}
            </div>

            {/* 2. 조달등록제품 */}
            <div className="border-b border-gray-100 pb-2.5">
              <button
                onClick={() => toggleSection('procurement')}
                className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  activePage === 'procurement' ? 'bg-neutral-50 text-neutral-950 font-black' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>조달등록제품 (Procurement)</span>
                {expandedSection === 'procurement' ? (
                  <ChevronUp size={16} className="text-neutral-500 stroke-[2.5px]" />
                ) : (
                  <ChevronDown size={16} className="text-neutral-500 stroke-[2.5px]" />
                )}
              </button>
              
              {expandedSection === 'procurement' && (
                <div className="pl-3 pr-2 mt-1 py-1 space-y-1 bg-neutral-50/60 rounded-xl border border-neutral-100/60 animate-fade-in max-h-60 overflow-y-auto">
                  {categories.filter((cat) => cat.id === 'all' || cat.isProcurement !== false).map((cat) => (
                    <button
                      key={`mob-proc-${cat.id}`}
                      onClick={() => handleNav('procurement', cat.id)}
                      className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* 3. 제품소개 */}
            <div className="border-b border-gray-100 pb-2.5">
              <button
                onClick={() => toggleSection('products')}
                className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  activePage === 'products' ? 'bg-neutral-50 text-neutral-950 font-black' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>제품소개 (Products)</span>
                {expandedSection === 'products' ? (
                  <ChevronUp size={16} className="text-neutral-500 stroke-[2.5px]" />
                ) : (
                  <ChevronDown size={16} className="text-neutral-500 stroke-[2.5px]" />
                )}
              </button>
              
              {expandedSection === 'products' && (
                <div className="pl-3 pr-2 mt-1 py-1 space-y-1 bg-neutral-50/60 rounded-xl border border-neutral-100/60 animate-fade-in max-h-60 overflow-y-auto">
                  {categories.filter((cat) => cat.id === 'all' || cat.isGeneral !== false).map((cat) => (
                    <button
                      key={`mob-prod-${cat.id}`}
                      onClick={() => handleNav('products', cat.id)}
                      className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. 시공사례 */}
            <div className="border-b border-gray-100 pb-2.5">
              <button
                id="mobile-nav-cases"
                onClick={() => handleNav('cases')}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  activePage === 'cases' ? 'bg-neutral-950 text-white font-black' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                시공사례
              </button>
            </div>

            {/* 5. 고객지원 */}
            <div className="border-b border-gray-100 pb-2.5">
              <button
                onClick={() => {
                  if (!showPriceTab && !showCatalogTab && !showAsTab) {
                    handleNav('inquiry', undefined, undefined, defaultInquiryTab);
                  } else {
                    toggleSection('inquiry');
                  }
                }}
                className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  activePage === 'inquiry' ? 'bg-neutral-50 text-neutral-950 font-black' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>고객지원 (Support)</span>
                {(showPriceTab || showCatalogTab || showAsTab) && (
                  expandedSection === 'inquiry' ? (
                    <ChevronUp size={16} className="text-neutral-500 stroke-[2.5px]" />
                  ) : (
                    <ChevronDown size={16} className="text-neutral-500 stroke-[2.5px]" />
                  )
                )}
              </button>
              
              {expandedSection === 'inquiry' && (showPriceTab || showCatalogTab || showAsTab) && (
                <div className="pl-3 pr-2 mt-1 py-1 space-y-1 bg-neutral-50/60 rounded-xl border border-neutral-100/60 animate-fade-in">
                  {showPriceTab && (
                    <button
                      onClick={() => handleNav('inquiry', undefined, undefined, 'price')}
                      className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                    >
                      가격자료
                    </button>
                  )}
                  {showCatalogTab && (
                    <button
                      onClick={() => handleNav('inquiry', undefined, undefined, 'catalog')}
                      className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                    >
                      카탈로그 신청
                    </button>
                  )}
                  {showAsTab && (
                    <button
                      onClick={() => handleNav('inquiry', undefined, undefined, 'as')}
                      className="block w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 rounded-lg transition-all cursor-pointer"
                    >
                      A/S 하자접수
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 6. 건설사업 */}
            <div className="border-b border-gray-100 pb-2.5">
              <button
                id="mobile-nav-construction"
                onClick={() => handleNav('construction')}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  activePage === 'construction' ? 'bg-neutral-950 text-white font-black' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                건설사업 (Portfolio)
              </button>
            </div>
            
            <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-mono text-neutral-400 bg-neutral-50 p-3 rounded-lg">
              <PhoneCall size={12} />
              <span>문의전화: {companyInfo.tel}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
