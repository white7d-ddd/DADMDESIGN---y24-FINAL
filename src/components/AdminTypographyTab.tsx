import React, { useState, useEffect } from 'react';
import {
  Type,
  Sliders,
  RotateCcw,
  Sparkles,
  Check,
  ZoomIn,
  AlignLeft,
  Save,
  CheckCircle2,
  RefreshCw,
  Eye
} from 'lucide-react';
import { TypographySettings } from '../types';
import { FONT_OPTIONS, TYPOGRAPHY_PRESETS, getFontFamilyCss, applyTypographyToDOM } from '../utils/typography';

interface AdminTypographyTabProps {
  typographySettings?: TypographySettings;
  onUpdateTypographySettings?: (settings: TypographySettings) => void;
}

const DEFAULT_SETTINGS: TypographySettings = {
  fontFamily: 'Pretendard',
  headingFontFamily: 'inherit',
  baseFontSizePercent: 100,
  baseLetterSpacing: -0.015,
  baseLineHeight: 1.6,
  headingLetterSpacing: -0.025,
  headingLineHeight: 1.3
};

export default function AdminTypographyTab({
  typographySettings = DEFAULT_SETTINGS,
  onUpdateTypographySettings
}: AdminTypographyTabProps) {
  const [form, setForm] = useState<TypographySettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...typographySettings
  }));

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewTab, setPreviewTab] = useState<'mixed' | 'product' | 'article'>('mixed');

  useEffect(() => {
    if (typographySettings) {
      setForm({ ...DEFAULT_SETTINGS, ...typographySettings });
    }
  }, [typographySettings]);

  const handleChange = <K extends keyof TypographySettings>(key: K, value: TypographySettings[K]) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    // Realtime live update on DOM
    applyTypographyToDOM(updated);
  };

  const handleApplyPreset = (presetSettings: Partial<TypographySettings>) => {
    const updated = { ...form, ...presetSettings };
    setForm(updated);
    applyTypographyToDOM(updated);
    if (onUpdateTypographySettings) {
      onUpdateTypographySettings(updated);
    }
    showSavedNotification();
  };

  const handleResetToDefault = () => {
    if (window.confirm('폰트 및 타이포그래피 설정을 초기 기본값으로 복원하시겠습니까?')) {
      setForm(DEFAULT_SETTINGS);
      applyTypographyToDOM(DEFAULT_SETTINGS);
      if (onUpdateTypographySettings) {
        onUpdateTypographySettings(DEFAULT_SETTINGS);
      }
      showSavedNotification();
    }
  };

  const handleSave = () => {
    if (onUpdateTypographySettings) {
      onUpdateTypographySettings(form);
    }
    applyTypographyToDOM(form);
    showSavedNotification();
  };

  const showSavedNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const currentFontObj = FONT_OPTIONS.find(f => f.id === form.fontFamily) || FONT_OPTIONS[0];
  const headingFontObj = form.headingFontFamily && form.headingFontFamily !== 'inherit'
    ? FONT_OPTIONS.find(f => f.id === form.headingFontFamily)
    : null;

  return (
    <div className="space-y-8 animate-fade-in" id="admin-typography-management-panel">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-neutral-900 text-white rounded-xl shadow-sm">
              <Type size={18} />
            </span>
            <h2 className="text-base font-bold text-neutral-900 font-sans">
              홈페이지 텍스트 폰트 & 스타일 통합 제어
            </h2>
          </div>
          <p className="text-xs text-neutral-500 font-sans mt-1">
            홈페이지 전체 서체(Font), 글자 크기(Font Size), 자간(Letter Spacing), 행간(Line Height)을 실시간으로 조절하고 즉시 반영합니다.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all cursor-pointer"
            title="기본값으로 초기화"
          >
            <RotateCcw size={14} />
            <span>기본값 복원</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-5 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-sm cursor-pointer"
            id="save-typography-settings-btn"
          >
            <Save size={14} />
            <span>설정 저장 적용</span>
          </button>
        </div>
      </div>

      {/* Save Toast Banner */}
      {savedSuccess && (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl animate-fade-in shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span className="text-xs font-bold font-sans">
              폰트 및 텍스트 스타일 설정이 성공적으로 저장 및 전체 페이지에 실시간 반영되었습니다!
            </span>
          </div>
          <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-full font-mono font-semibold">
            저장완료
          </span>
        </div>
      )}

      {/* 1. Quick Presets Section */}
      <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-neutral-800">
          <Sparkles size={15} className="text-amber-500" />
          <span>원클릭 추천 스타일 프리셋 (빠른 적용)</span>
        </div>
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          전문 디자이너가 조화롭게 조율한 타이포그래피 조합을 한 번의 클릭으로 즉시 적용해 보세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {TYPOGRAPHY_PRESETS.map((preset, idx) => {
            const isMatch =
              form.fontFamily === (preset.settings.fontFamily || 'Pretendard') &&
              form.baseFontSizePercent === (preset.settings.baseFontSizePercent || 100);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset.settings)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isMatch
                    ? 'bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900'
                    : 'bg-white/80 border-neutral-200 hover:border-neutral-400 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">{preset.name}</span>
                    {isMatch && <Check size={14} className="text-neutral-900" />}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1 leading-snug">{preset.description}</p>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-mono">
                    {preset.settings.fontFamily || 'Pretendard'}
                  </span>
                  <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-mono">
                    크기 {preset.settings.baseFontSizePercent}%
                  </span>
                  <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-mono">
                    행간 {preset.settings.baseLineHeight}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Section 1: Font Family Selection */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-neutral-100 pb-3">
              <Type size={16} className="text-neutral-700" />
              <h3 className="text-xs font-bold text-neutral-900">1. 홈페이지 기본 서체 (Font Family)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FONT_OPTIONS.map((font) => {
                const isSelected = form.fontFamily === font.id;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => handleChange('fontFamily', font.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm ring-2 ring-neutral-900/20'
                        : 'bg-neutral-50/50 hover:bg-neutral-100/80 border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{font.name}</span>
                      {isSelected ? (
                        <Check size={14} className="text-white" />
                      ) : font.isSerif ? (
                        <span className="text-[9px] bg-neutral-200 text-neutral-700 px-1 rounded">명조</span>
                      ) : null}
                    </div>
                    <p
                      className={`text-[11px] mt-1.5 truncate ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                      style={{ fontFamily: font.fontFamilyCss }}
                    >
                      다듬디자인 명품 조경시설 0123
                    </p>
                    <p className={`text-[9px] mt-1 line-clamp-1 ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                      {font.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Heading specific font option */}
            <div className="pt-2 border-t border-neutral-100">
              <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                대제목 / 헤드라인 전용 서체
              </label>
              <select
                value={form.headingFontFamily || 'inherit'}
                onChange={(e) => handleChange('headingFontFamily', e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all cursor-pointer font-sans"
              >
                <option value="inherit">본문 서체와 동일하게 적용 (기본값)</option>
                {FONT_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-neutral-400 mt-1">
                ※ 대제목에 명조나 지마켓 산스를 지정하여 감각적인 포인트를 연출할 수 있습니다.
              </p>
            </div>
          </div>

          {/* Section 2: Font Size Scale */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <ZoomIn size={16} className="text-neutral-700" />
                <h3 className="text-xs font-bold text-neutral-900">2. 전체 글자 크기 비율 (Font Size Scale)</h3>
              </div>
              <span className="font-mono text-xs font-black px-2.5 py-1 bg-neutral-900 text-white rounded-lg">
                {form.baseFontSizePercent}%
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-[11px] text-neutral-400 font-mono">85%</span>
                <input
                  type="range"
                  min="85"
                  max="140"
                  step="1"
                  value={form.baseFontSizePercent}
                  onChange={(e) => handleChange('baseFontSizePercent', Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
                />
                <span className="text-[11px] text-neutral-400 font-mono">140%</span>
              </div>

              {/* Quick Size Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {[
                  { label: '작게 (90%)', val: 90 },
                  { label: '기본 표준 (100%)', val: 100 },
                  { label: '약간 크게 (108%)', val: 108 },
                  { label: '크게 (115%)', val: 115 },
                  { label: '시원하게 (125%)', val: 125 },
                  { label: '최대 (135%)', val: 135 }
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => handleChange('baseFontSizePercent', s.val)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                      form.baseFontSizePercent === s.val
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Letter Spacing (자간) */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <AlignLeft size={16} className="text-neutral-700" />
                <h3 className="text-xs font-bold text-neutral-900">3. 자간 조절 (Letter Spacing)</h3>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-md">
                본문: {form.baseLetterSpacing}em / 제목: {form.headingLetterSpacing}em
              </span>
            </div>

            {/* Base Letter Spacing */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700">본문 및 메뉴 자간</span>
                <span className="font-mono font-bold text-neutral-900">{form.baseLetterSpacing} em</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] text-neutral-400 font-mono">-0.05em</span>
                <input
                  type="range"
                  min="-0.06"
                  max="0.08"
                  step="0.005"
                  value={form.baseLetterSpacing}
                  onChange={(e) => handleChange('baseLetterSpacing', parseFloat(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
                />
                <span className="text-[10px] text-neutral-400 font-mono">+0.08em</span>
              </div>
              <div className="flex gap-1.5 pt-1">
                {[
                  { label: '좁게 (-0.03em)', val: -0.03 },
                  { label: '한글권장 (-0.015em)', val: -0.015 },
                  { label: '표준 (0em)', val: 0 },
                  { label: '넓게 (+0.025em)', val: 0.025 }
                ].map((ls) => (
                  <button
                    key={ls.label}
                    type="button"
                    onClick={() => handleChange('baseLetterSpacing', ls.val)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer ${
                      Math.abs(form.baseLetterSpacing - ls.val) < 0.001
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {ls.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Heading Letter Spacing */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700">대제목/헤드라인 전용 자간</span>
                <span className="font-mono font-bold text-neutral-900">{form.headingLetterSpacing} em</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] text-neutral-400 font-mono">-0.08em</span>
                <input
                  type="range"
                  min="-0.08"
                  max="0.06"
                  step="0.005"
                  value={form.headingLetterSpacing}
                  onChange={(e) => handleChange('headingLetterSpacing', parseFloat(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
                />
                <span className="text-[10px] text-neutral-400 font-mono">+0.06em</span>
              </div>
            </div>
          </div>

          {/* Section 4: Line Height (행간) */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders size={16} className="text-neutral-700" />
                <h3 className="text-xs font-bold text-neutral-900">4. 행간 조절 (Line Height - 줄 간격)</h3>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-md">
                본문: {form.baseLineHeight} / 제목: {form.headingLineHeight}
              </span>
            </div>

            {/* Base Line Height */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700">본문 문단 행간 (Line Height)</span>
                <span className="font-mono font-bold text-neutral-900">{form.baseLineHeight}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] text-neutral-400 font-mono">1.2 (촘촘)</span>
                <input
                  type="range"
                  min="1.2"
                  max="2.2"
                  step="0.05"
                  value={form.baseLineHeight}
                  onChange={(e) => handleChange('baseLineHeight', parseFloat(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
                />
                <span className="text-[10px] text-neutral-400 font-mono">2.2 (넓음)</span>
              </div>
              <div className="flex gap-1.5 pt-1">
                {[
                  { label: '조밀 (1.4)', val: 1.4 },
                  { label: '표준권장 (1.6)', val: 1.6 },
                  { label: '여유있게 (1.75)', val: 1.75 },
                  { label: '넓게 (1.9)', val: 1.9 }
                ].map((lh) => (
                  <button
                    key={lh.label}
                    type="button"
                    onClick={() => handleChange('baseLineHeight', lh.val)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer ${
                      Math.abs(form.baseLineHeight - lh.val) < 0.01
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {lh.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Heading Line Height */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-700">대제목 줄 간격</span>
                <span className="font-mono font-bold text-neutral-900">{form.headingLineHeight}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] text-neutral-400 font-mono">1.0</span>
                <input
                  type="range"
                  min="1.0"
                  max="1.8"
                  step="0.05"
                  value={form.headingLineHeight}
                  onChange={(e) => handleChange('headingLineHeight', parseFloat(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
                />
                <span className="text-[10px] text-neutral-400 font-mono">1.8</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Live Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-lg space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <Eye size={16} className="text-amber-400" />
                <span className="text-xs font-bold tracking-wide">실시간 타이포그래피 미리보기</span>
              </div>
              <div className="flex items-center space-x-1 bg-neutral-800 p-0.5 rounded-lg text-[10px]">
                <button
                  type="button"
                  onClick={() => setPreviewTab('mixed')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    previewTab === 'mixed' ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  종합
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('product')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    previewTab === 'product' ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  제품/조달
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('article')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    previewTab === 'article' ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  회사/본문
                </button>
              </div>
            </div>

            {/* Active Settings Summary Pills */}
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-neutral-300">
              <span className="bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                서체: {currentFontObj.name.split(' ')[0]}
              </span>
              <span className="bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                스케일: {form.baseFontSizePercent}%
              </span>
              <span className="bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                자간: {form.baseLetterSpacing}em
              </span>
              <span className="bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                행간: {form.baseLineHeight}
              </span>
            </div>

            {/* Dynamic Preview Container */}
            <div
              className="bg-white text-neutral-900 rounded-xl p-5 space-y-4 shadow-inner border border-neutral-700 overflow-hidden transition-all"
              style={{
                fontFamily: currentFontObj.fontFamilyCss,
                letterSpacing: `${form.baseLetterSpacing}em`,
                lineHeight: form.baseLineHeight,
                fontSize: `${form.baseFontSizePercent}%`
              }}
            >
              {previewTab === 'mixed' && (
                <div className="space-y-3">
                  <div
                    className="text-lg font-black text-neutral-950 border-b border-neutral-200 pb-2"
                    style={{
                      fontFamily: headingFontObj ? headingFontObj.fontFamilyCss : 'inherit',
                      letterSpacing: `${form.headingLetterSpacing}em`,
                      lineHeight: form.headingLineHeight
                    }}
                  >
                    품격 있는 가로 경관 디자인, (주)다듬디자인
                  </div>
                  <p className="text-xs text-neutral-700">
                    다듬디자인은 사람과 자연, 도시가 조화롭게 숨 쉬는 친환경 옥외 시설물을 연구하고 직접 제작 및 시공합니다.
                  </p>
                  <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 space-y-1 text-[11px]">
                    <div className="font-bold text-neutral-900">디럭스 스마트 휴게 파고라 [DADM-PG-01]</div>
                    <div className="text-neutral-500 font-mono text-[10px]">
                      조달식별: 24901234 | 규격: 4200 x 3000 x 2800 mm
                    </div>
                    <div className="font-bold text-emerald-700 font-mono">단가: 18,500,000 원 (VAT 포함)</div>
                  </div>
                </div>
              )}

              {previewTab === 'product' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      나라장터 우수 조달 가로시설물
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">신뢰 보증 100%</span>
                  </div>
                  <div
                    className="text-base font-bold text-neutral-900"
                    style={{
                      fontFamily: headingFontObj ? headingFontObj.fontFamilyCss : 'inherit',
                      letterSpacing: `${form.headingLetterSpacing}em`,
                      lineHeight: form.headingLineHeight
                    }}
                  >
                    컴포트 하이브리드 야외 평벤치
                  </div>
                  <p className="text-xs text-neutral-600">
                    천연 목재와 고강도 주철 프레임으로 제작되어 내구성과 안락함을 동시에 갖춘 옥외 벤치입니다.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-neutral-100 p-2 rounded">
                    <div>
                      <span className="text-neutral-500 block">목재 규격:</span>
                      <span className="font-semibold text-neutral-900">천연 하드우드 40T</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">마감 사양:</span>
                      <span className="font-semibold text-neutral-900">친환경 분체도장</span>
                    </div>
                  </div>
                </div>
              )}

              {previewTab === 'article' && (
                <div className="space-y-3">
                  <div
                    className="text-base font-bold text-neutral-900"
                    style={{
                      fontFamily: headingFontObj ? headingFontObj.fontFamilyCss : 'inherit',
                      letterSpacing: `${form.headingLetterSpacing}em`,
                      lineHeight: form.headingLineHeight
                    }}
                  >
                    (주)다듬디자인 기업 철학
                  </div>
                  <p className="text-xs text-neutral-700">
                    단순한 조경 시설물을 넘어 도시민에게 가장 편안한 쉼과 휴식을 선사하는 공공 공간을 창조합니다. 설계부터 조달 등록, 정밀 제작, 현장 앙카 시공까지 직영 엔지니어가 책임집니다.
                  </p>
                  <blockquote className="border-l-2 border-neutral-900 pl-2.5 text-[11px] italic text-neutral-600">
                    "가장 아름다운 디자인은 사람과 자연이 함께 머무는 곳에서 시작됩니다."
                  </blockquote>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Preview Panel */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSave}
                className="w-full flex items-center justify-center space-x-2 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs py-3 rounded-xl transition-all shadow cursor-pointer"
              >
                <Save size={15} />
                <span>현재 타이포그래피 전체 적용 및 저장</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
