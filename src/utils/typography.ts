import { TypographySettings } from '../types';

export const FONT_OPTIONS: { id: string; name: string; description: string; fontFamilyCss: string; isSerif?: boolean }[] = [
  {
    id: 'Pretendard',
    name: '프리텐다드 (Pretendard)',
    description: '가독성이 가장 뛰어나며 현대적인 모던 고딕 (기본 권장 서체)',
    fontFamilyCss: '"Pretendard Variable", Pretendard, "Inter", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif'
  },
  {
    id: 'Noto Sans KR',
    name: '본고딕 (Noto Sans KR)',
    description: '구글의 표준 한글 산세리프 서체, 정갈하고 안정적인 구조',
    fontFamilyCss: '"Noto Sans KR", "Pretendard Variable", Pretendard, sans-serif'
  },
  {
    id: 'Nanum Gothic',
    name: '나눔고딕 (Nanum Gothic)',
    description: '네이버의 대표 서체, 부드러운 굴림과 친근하고 편안한 인상',
    fontFamilyCss: '"Nanum Gothic", "Noto Sans KR", sans-serif'
  },
  {
    id: 'SUIT',
    name: '수트 (SUIT Variable)',
    description: '정돈된 선과 뛰어난 획 균형감의 차세대 디스플레이 서체',
    fontFamilyCss: '"SUIT Variable", "SUIT", "Pretendard Variable", sans-serif'
  },
  {
    id: 'Spoqa Han Sans Neo',
    name: '스포카 한 산스 네오 (Spoqa Han Sans)',
    description: '숫자와 한글의 조합이 아름다운 세련된 유러피안 감성',
    fontFamilyCss: '"Spoqa Han Sans Neo", "Pretendard Variable", sans-serif'
  },
  {
    id: 'Gmarket Sans',
    name: '지마켓 산스 (Gmarket Sans)',
    description: '굵고 직선적인 힘을 지닌 개성 있는 헤드라인 서체',
    fontFamilyCss: '"GmarketSansMedium", "Gmarket Sans", "Pretendard Variable", sans-serif'
  },
  {
    id: 'Nanum Myeongjo',
    name: '나눔명조 (Nanum Myeongjo)',
    description: '단아하고 품격 있는 클래식 세리프(명조) 서체',
    fontFamilyCss: '"Nanum Myeongjo", "Noto Serif KR", serif',
    isSerif: true
  },
  {
    id: 'Noto Serif KR',
    name: '본명조 (Noto Serif KR)',
    description: '조판의 아름다움과 깊은 격조를 주는 모던 명조 서체',
    fontFamilyCss: '"Noto Serif KR", "Nanum Myeongjo", serif',
    isSerif: true
  },
  {
    id: 'System Sans',
    name: '시스템 기본 (System UI)',
    description: 'OS 기본 내장 폰트 (빠른 로딩 및 네이티브 느낌)',
    fontFamilyCss: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
];

export const TYPOGRAPHY_PRESETS: { name: string; description: string; settings: Partial<TypographySettings> }[] = [
  {
    name: '표준 기본 (Standard)',
    description: '다듬디자인 공식 표준 밸런스 설정',
    settings: {
      fontFamily: 'Pretendard',
      headingFontFamily: 'inherit',
      baseFontSizePercent: 100,
      baseLetterSpacing: -0.015,
      baseLineHeight: 1.6,
      headingLetterSpacing: -0.025,
      headingLineHeight: 1.3
    }
  },
  {
    name: '시원한 큰 글씨 (Readable & Large)',
    description: '글자 크기 115%, 여유로운 자간과 행간으로 시인성 극대화',
    settings: {
      fontFamily: 'Pretendard',
      headingFontFamily: 'inherit',
      baseFontSizePercent: 115,
      baseLetterSpacing: -0.01,
      baseLineHeight: 1.7,
      headingLetterSpacing: -0.02,
      headingLineHeight: 1.35
    }
  },
  {
    name: '모던 고밀도 (Modern Dense)',
    description: '탄탄하고 타이트한 자간과 콤팩트한 현대적 카탈로그 스타일',
    settings: {
      fontFamily: 'SUIT',
      headingFontFamily: 'inherit',
      baseFontSizePercent: 98,
      baseLetterSpacing: -0.03,
      baseLineHeight: 1.5,
      headingLetterSpacing: -0.04,
      headingLineHeight: 1.2
    }
  },
  {
    name: '품격있는 명조 혼합 (Classic Serif)',
    description: '본문은 가독성 좋은 고딕, 제목은 고급스러운 나눔명조 서체',
    settings: {
      fontFamily: 'Pretendard',
      headingFontFamily: 'Nanum Myeongjo',
      baseFontSizePercent: 102,
      baseLetterSpacing: -0.015,
      baseLineHeight: 1.65,
      headingLetterSpacing: -0.01,
      headingLineHeight: 1.35
    }
  },
  {
    name: '본고딕 정갈형 (Noto Sans Standard)',
    description: '공공기관 및 조달 표준에 익숙한 본고딕 정형 배치',
    settings: {
      fontFamily: 'Noto Sans KR',
      headingFontFamily: 'inherit',
      baseFontSizePercent: 100,
      baseLetterSpacing: -0.02,
      baseLineHeight: 1.6,
      headingLetterSpacing: -0.03,
      headingLineHeight: 1.3
    }
  }
];

export function getFontFamilyCss(fontId: string): string {
  const found = FONT_OPTIONS.find(f => f.id === fontId);
  if (found) return found.fontFamilyCss;
  return `"${fontId}", sans-serif`;
}

export function applyTypographyToDOM(settings: TypographySettings): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const baseFontCss = getFontFamilyCss(settings.fontFamily);
  const headingFontCss = settings.headingFontFamily && settings.headingFontFamily !== 'inherit'
    ? getFontFamilyCss(settings.headingFontFamily)
    : 'inherit';

  root.style.setProperty('--site-font-family', baseFontCss);
  root.style.setProperty('--site-heading-font-family', headingFontCss);
  root.style.setProperty('--site-font-size-scale', `${settings.baseFontSizePercent}%`);
  root.style.setProperty('--site-letter-spacing', `${settings.baseLetterSpacing}em`);
  root.style.setProperty('--site-line-height', `${settings.baseLineHeight}`);
  root.style.setProperty('--site-heading-letter-spacing', `${settings.headingLetterSpacing}em`);
  root.style.setProperty('--site-heading-line-height', `${settings.headingLineHeight}`);

  // Apply directly to body for instant cascading without delay
  document.body.style.fontFamily = baseFontCss;
  document.body.style.letterSpacing = `${settings.baseLetterSpacing}em`;
  document.body.style.lineHeight = `${settings.baseLineHeight}`;
  document.body.style.fontSize = `${settings.baseFontSizePercent}%`;
}
