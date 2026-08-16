import { Category } from '../types';
import { defaultCategories } from '../data/defaultData';

export const CATEGORY_ICON_MIGRATION_MAP: Record<string, string> = {
  // Category IDs or old icon names -> new custom pictograms
  pavilion: '1전통정자',
  '전통정자': '1전통정자',
  '전통형정자': '1전통정자',
  Landmark: '1전통정자',
  Castle: '1전통정자',

  pergola: '2 파고라',
  '파고라': '2 파고라',
  Umbrella: '2 파고라',
  Tent: '2 파고라',

  bin: '3 분리수거장',
  '분리수거장': '3 분리수거장',
  Recycle: '3 분리수거장',
  Trash2: '3 분리수거장',

  bicycle: '4 자전거 보관대',
  '자전거보관대': '4 자전거 보관대',
  '자전거 보관대': '4 자전거 보관대',
  Bike: '4 자전거 보관대',

  bench: '5 옥외용 벤치',
  '옥외용벤치': '5 옥외용 벤치',
  '옥외용 벤치': '5 옥외용 벤치',
  Sofa: '5 옥외용 벤치',

  tree_bench: '6 수목보호의자',
  '수목보호의자': '6 수목보호의자',

  bus_shelter: '7 버스승강장',
  '버스승강장': '7 버스승강장',

  kids_bus_shelter: '8 어린이 버스승강장',
  '어린이버스승강장': '8 어린이 버스승강장',
  '어린이 버스승강장': '8 어린이 버스승강장',

  fitness: '9 야외운동시설',
  '야외운동시설': '9 야외운동시설',
  '야외운동시설물': '9 야외운동시설',
  Dumbbell: '9 야외운동시설',

  fence: '10 휀스',
  '휀스': '10 휀스',
  Fence: '10 휀스',

  playground: '11 어린이놀이터',
  '어린이놀이터': '11 어린이놀이터',

  pet_park: '12 반려동물 놀이터',
  '반려동물놀이터': '12 반려동물 놀이터',
  '반려동물 놀이터': '12 반려동물 놀이터',

  noise_barrier: '13 방음벽',
  '방음벽': '13 방음벽',

  maintenance: '14 시설물 보수',
  '시설물보수': '14 시설물 보수',
  '시설물 보수': '14 시설물 보수',

  other_facilities: '15 기타 조경 시설물',
  '기타조경시설물': '15 기타 조경 시설물',
  '기타 조경 시설물': '15 기타 조경 시설물',
  '기타공공시설': '15 기타 조경 시설물',
  bollard: '15 기타 조경 시설물',
  Trees: '15 기타 조경 시설물'
};

export function migrateCategoryIcons(categories: Category[]): Category[] {
  if (!Array.isArray(categories) || categories.length === 0) {
    return defaultCategories;
  }

  // Only update icons for existing categories, do NOT resurrect deleted categories
  return categories.map(cat => {
    let icon = cat.icon;
    if (icon && CATEGORY_ICON_MIGRATION_MAP[icon]) {
      icon = CATEGORY_ICON_MIGRATION_MAP[icon];
    } else if (CATEGORY_ICON_MIGRATION_MAP[cat.id]) {
      icon = CATEGORY_ICON_MIGRATION_MAP[cat.id];
    } else if (CATEGORY_ICON_MIGRATION_MAP[cat.name]) {
      icon = CATEGORY_ICON_MIGRATION_MAP[cat.name];
    }
    return { ...cat, icon };
  });
}
