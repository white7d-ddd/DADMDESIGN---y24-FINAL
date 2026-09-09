import { Category, Product, Banner, CompanyInfo, ConstructionProject, HomeSectionInfo, PageHeaders, PopupItem, TypographySettings, PriceData } from '../types';

export const defaultCategories: Category[] = [
  {
    "id": "all",
    "name": "전체상품",
    "description": "DADMDESIGN의 명품 가로 시설물 전체 라인업을 소개합니다.",
    "icon": "Grid"
  },
  {
    "id": "pergola",
    "name": "파고라",
    "description": "공원과 보행 공간에 격조 높은 휴식과 그늘을 선사하는 모던한 디자인 파고라",
    "icon": "2 파고라",
    "isProcurement": false,
    "isGeneral": true
  },
  {
    "id": "pavilion",
    "name": "전통정자",
    "description": "한국 고유의 멋과 기품을 담아낸 전통형 정자 및 야외 쉼터",
    "icon": "1전통정자",
    "isProcurement": false,
    "isGeneral": true
  },
  {
    "id": "bench",
    "name": "옥외용 벤치",
    "description": "유려한 곡선과 최고급 천연 휴먼 목재가 주는 따뜻한 감각의 명품 야외 벤치",
    "icon": "5 옥외용 벤치"
  },
  {
    "id": "bicycle",
    "name": "자전거 보관대",
    "description": "자전거와 모빌리티를 안전하고 깔끔하게 보관하는 전용 보관대 및 쉘터",
    "icon": "4 자전거 보관대",
    "isProcurement": false,
    "isGeneral": true
  },
  {
    "id": "tree_bench",
    "name": "수목보호의자",
    "description": "도심 속 녹지 공간과 가로수를 감싸며 자연과 어우러지는 수목보호 벤치",
    "icon": "6 수목보호의자",
    "isProcurement": false,
    "isGeneral": true
  },
  {
    "id": "noise_barrier",
    "name": "방음벽",
    "description": "도심 교통 소음 및 산업 소음을 효과적으로 차단/흡음하는 친환경 방음벽 패널",
    "icon": "13 방음벽",
    "isProcurement": false,
    "isGeneral": true
  },
  {
    "id": "maintenance",
    "name": "시설물 보수",
    "description": "가로/공공 조경 시설물의 완벽한 사후 관리, 수리 및 부품 교체 보수 서비스",
    "icon": "14 시설물 보수",
    "isProcurement": false,
    "isGeneral": true
  },
  {
    "id": "other_facilities",
    "name": "기타 조경 시설물",
    "description": "볼라드, 플랜터, 경관 조명, 안내사인 등 다채로운 공공 가로 경관 조경 시설물",
    "icon": "15 기타 조경 시설물",
    "isProcurement": false,
    "isGeneral": true
  }
];

export const defaultBanners: Banner[] = [
  {
    "id": "banner1",
    "title": "자연과 도심이 조화롭게 만나는 휴게 공간",
    "subtitle": "도심속의 자연을 표현 하고자 합니다.  DADMDESIGN",
    "imageUrl": ""
  },
  {
    "id": "banner2",
    "title": "품질 우선주의와 우수한 내구성 지향",
    "subtitle": "금속재료와 천연재료의 조합으로 우수한 품질과 내구성 확보를 위하여 노력합니다. ",
    "imageUrl": ""
  },
  {
    "id": "banner3",
    "title": "지속 가능한 내일을 디자인",
    "subtitle": "내일은 생각하는 디자인 추구합니다. ",
    "imageUrl": ""
  }
];

export const defaultCompanyInfo: CompanyInfo = {
  "name": "주식회사 다듬디자인",
  "englishName": "DADMDESIGN CO., LTD.",
  "representative": "임정자",
  "tel": "053-327-0015",
  "fax": "053-327-1015",
  "email": "dadmdesign@naver.com",
  "address": "대구 북구 서변로21길 7, 102호",
  "factoryAddress": "경북 김천 영남대로3251",
  "businessNo": "",
  "mailOrderNo": "",
  "website": "http://www.dadmdesign.com",
  "aboutUsTitle": "자연과 인간, 그리고 도시를 잇는 아름다움",
  "aboutUsText": "주식회사 다듬디자인은 조달청 나라장터 등록업체로 파고라, 옥외용 벤치, 전통정자, 플랜터, 도시 환경 공공 시설물 기획,  제작 납품하고 있으며 조경시설물설치공사 및 식재공사, 조경 유지관리공사 전문 업체입니다.  견고함과 자연주의적 디자인과 우수한 시공 관리 및 품질을 지향하고 있습니다.",
  "aboutUsImage": "",
  "mapAddress": "대구 북구 서변로21길 7, 102호",
  "asAlertEmail": "dadmdesign@naver.com",
  "catalogAlertEmail": "dadmdesign@naver.com",
  "narajangterMarkUrl": "",
  "newProductMarkUrl": "",
  "enablePriceTab": false,
  "enableCatalogTab": false,
  "enableAsTab": true,
  "historyList": [
    {
      "id": "h-1",
      "year": "2026",
      "yearShort": "26",
      "badge": "Global & Procurement Expansion",
      "title": "조경 시설물 품목 추가 및 라인업 확대",
      "bullets": [
        "04 직접생산증명 확인(퍼걸러, 기타조경시설물, 옥외용벤치, 야외운동기구)",
        "08 옥외용벤치 9종 신규 등록",
        "09 홈페이지 구축"
      ]
    },
    {
      "id": "h-2",
      "year": "2025",
      "yearShort": "25",
      "badge": "R&D",
      "title": "나라장터 쇼핑몰 제품 등록",
      "bullets": [
        "03 나라장터 옥외용 벤치 2종 등록"
      ]
    },
    {
      "id": "h-3",
      "year": "2024",
      "yearShort": "24",
      "badge": "Corporation Setup",
      "title": "건설면허, 공장등록, 직접생산증명 확인",
      "bullets": [
        "01 대구 북구 조경시설물설치, 식재공사 건설면허 획득",
        "02 김천공장 공장등록",
        "04 직접생산증명 확인(퍼걸러, 기타조경시설물, 옥외용벤치)"
      ]
    },
    {
      "id": "h-4",
      "year": "2021",
      "yearShort": "21",
      "badge": "Foundation",
      "title": "다듬디자인  설립",
      "bullets": [
        "04 주식회사 다듬디자인 설립"
      ]
    }
  ],
  "carDirections": "네비게이션에 '다듬디자인' 또는 본사 주소인 대구 북구 서변로21길 7 검색. 방문 고객 전용 지상 무료 주차 2시간을 상시 지원합니다.",
  "subwayDirections": "6호선 / 경의중앙선 / 공항철도 디지털미디어시티역 9번 출구에서 수색교 방면으로 도보 약 8분 거리(약 600m)에 위치하고 있습니다.",
  "busDirections": "누리꿈스퀘어.MBC 및 첨단산업센터 버스정류장 하차 후 도보 2분. 지선 7711, 7730, 간선 271, 470, 광역 9711 버스 이용 시 편리합니다."
};

export const defaultHomeSectionInfo: HomeSectionInfo = {
  "slogan": "Our Integrity & Trust",
  "title": "나라가 보장하는 안심 제품 & 우수 자재",
  "description": "(주)다듬디자인은 생산 라인을 경북 김천 공장에서 엄격히 직영 가동합니다. 금속재료와 선별된 목재 원료만을 엄선하여 우수한 품질과 내구성을 추구합니다.",
  "point1Title": "나라장터 조달물품 등록 업체",
  "point1Text": "조달청 나라장터 종합쇼핑몰 정식 제품 등록 및 직접생산증명 필한 정식 인증 업체",
  "point2Title": "품질 우선과  A/S",
  "point2Text": "품질을 우선하여 생산하며 책임감 있는 A/S",
  "point3Title": "도면 및 CAD 설계 협조",
  "point3Text": "세부 dwg 설계 도면 제공 및 3D 모델링 랜더링 지원",
  "imageUrl": "",
  "imageTitle": "크레텍 책임 경산물류센터",
  "imageSubtitle": "대형 파고라 디자인",
  "catShowcaseSlogan": "DADMDESIGN Collections",
  "catShowcaseTitle": "공공 시설 제품군",
  "featuredSlogan": "Featured Products",
  "featuredTitle": "다듬디자인 조달 등록제품",
  "procurementAutoPlayInterval": 4
};

export const defaultPageHeaders: PageHeaders = {
  "about": {
    "slogan": "About DADMDESIGN",
    "title": "다듬디자인을 소개합니다",
    "description": ""
  },
  "procurement": {
    "slogan": "나라장터 조달청 종합쇼핑몰 등재제품",
    "title": "조달등록제품 전시관",
    "description": ""
  },
  "products": {
    "slogan": "DADMDESIGN Catalog",
    "title": "제품 전시관",
    "description": ""
  },
  "inquiry": {
    "slogan": "Customer Support Center",
    "title": "다듬디자인 고객지원 센터",
    "description": ""
  },
  "construction": {
    "slogan": "Construction Portfolio",
    "title": "건설사업 및 시공 실적",
    "description": ""
  },
  "cases": {
    "slogan": "Installation Cases",
    "title": "시공사례",
    "description": ""
  },
  "catalog": {
    "slogan": "",
    "title": "종합 카탈로그 / 지면용 도면 브로셔 신청",
    "description": "원하시는 제품군의 정밀 설계 규격과 카탈로그를 바로 요청하실 수 있습니다."
  },
  "as": {
    "slogan": "",
    "title": "하자접수 및 유지보수 신청",
    "description": "다듬디자인 하자보증 보장 서비스입니다."
  }
};

export const defaultInstallationCases: ConstructionProject[] = [
  {
    "id": "case-3",
    "title": "DBB-9000 외 1종",
    "location": "경남 창원시 진해근대역사문화공간",
    "period": "2025. 06 ~ 2025. 12",
    "items": "1600×579×850mm",
    "description": "하늘공원 광장에 대용량 트윈 분리수거함과 수목 보호용 스틸 플랜터를 패키지로 배치 시공 완료하였습니다.",
    "image": "",
    "image2": "",
    "tag": "옥외용벤치"
  }
];

export const defaultConstructionProjects: ConstructionProject[] = [
  {
    "id": "proj-3",
    "title": "침목계단 설치공사",
    "location": "대구 달성군",
    "period": "2026. 01 ~ 2026. 02",
    "items": "산책로 침목계단 설치공사",
    "description": "비슬산 산책로의 보행환경 개선으로 기존의 노후된 야자매트를 철거하고 침목계단을 설치 하였습니다.",
    "image": "",
    "image2": "",
    "tag": "공공기관 공사"
  }
];

export const defaultPopups: PopupItem[] = [
  {
    "id": "popup-1",
    "title": "2026년 신규제품 나라장터 등록",
    "content": "다듬디자인의 신규 옥외용벤치 9종이 조달청 나라장터에 공식 등록이 완료 되었습니다. ",
    "imageUrl": "",
    "linkUrl": "",
    "isActive": true,
    "width": 440,
    "height": 520,
    "left": 80,
    "top": 100,
    "createdAt": "2026-07-12"
  }
];

export const defaultProducts: Product[] = [
  {
    "id": "prod-1788863526189",
    "categoryId": "bench",
    "name": "DDB-2000B",
    "identificationNo": "26346213",
    "size": "1672×614×788mm",
    "price": 490000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788863472272",
    "categoryId": "bench",
    "name": "DDB-2000A 평의자",
    "identificationNo": "26346212",
    "size": "1672×462×557mm",
    "price": 370000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788863401850",
    "categoryId": "bench",
    "name": "DDB-1200B",
    "identificationNo": "26346211",
    "size": "1672×520×640mm",
    "price": 490000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788863350598",
    "categoryId": "bench",
    "name": "DDB-1200A 평의",
    "identificationNo": "26346210",
    "size": "1672×424×440mm",
    "price": 370000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788863302591",
    "categoryId": "bench",
    "name": "DDB-1100C 등의자",
    "identificationNo": "26346209",
    "size": "1672×570×760mm",
    "price": 480000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788862929557",
    "categoryId": "bench",
    "name": "DDB-1100B 등의자",
    "identificationNo": "26346208",
    "size": "672×570×760mm",
    "price": 470000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788862876557",
    "categoryId": "bench",
    "name": "DDB-1100A 평의자",
    "identificationNo": "26346207",
    "size": "1672×490×440mm",
    "price": 350000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788862831896",
    "categoryId": "bench",
    "name": "DDB-1000B 등의자",
    "identificationNo": "26346206",
    "size": "1672×590×859mm",
    "price": 480000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788862755505",
    "categoryId": "bench",
    "name": "DDB-1000A 평의자",
    "identificationNo": "26346205",
    "size": "672×424×452mm",
    "price": 350000,
    "images": [],
    "material": "AL PRAME, 하드우드, 오일스테인",
    "finish": "야외 가로용 정전분체 마감",
    "featureText": "",
    "description": "제품에 대한 상세 설명을 여기에 마크다운/텍스트 형식으로 편하게 기술하세요.",
    "drawingNo": "DADM-375X",
    "options": "색상 지정 도장 가능, 목재 종류 변경 옵션",
    "hasCad": true,
    "hasPdf": true,
    "isProcurement": true,
    "isSignature": true,
    "isNew": true,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788862606079",
    "categoryId": "bench",
    "name": "DBB-9000 등의자",
    "identificationNo": "25593148",
    "size": "1600×579×850mm",
    "price": 470000,
    "images": [],
    "material": "STL PLATE, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": false,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  },
  {
    "id": "prod-1788862537673",
    "categoryId": "bench",
    "name": "DFB-9000 평의자",
    "identificationNo": "25593149",
    "size": "1600×470×420mm",
    "price": 360000,
    "images": [],
    "material": "STL PLATE, 하드우드, 오일스테인",
    "finish": "",
    "featureText": "",
    "description": "",
    "drawingNo": "",
    "options": "",
    "hasCad": false,
    "hasPdf": false,
    "isProcurement": true,
    "isSignature": true,
    "isNew": false,
    "designMaterialEnabled": false,
    "designMaterialUrl": "",
    "createdAt": "2026-09-08"
  }
];

export const defaultPriceData: PriceData[] = [];

export const defaultTypographySettings: TypographySettings = {
  fontFamily: 'Pretendard',
  headingFontFamily: 'inherit',
  baseFontSizePercent: 100,
  baseLetterSpacing: -0.015,
  baseLineHeight: 1.6,
  headingLetterSpacing: -0.025,
  headingLineHeight: 1.3
};
