import React from 'react';
import { Layers, Calendar, Tag, HardHat, Edit2, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { getDirectImageUrl } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  isAdminLoggedIn?: boolean;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  key?: React.Key;
  narajangterMarkUrl?: string;
  newProductMarkUrl?: string;
}

export default function ProductCard({ product, onClick, isAdminLoggedIn = false, onEdit, onDelete, narajangterMarkUrl, newProductMarkUrl }: ProductCardProps) {
  // Utility to format KRW currency number
  const formatPriceNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  const newMarkImage = product.newMarkImageUrl || newProductMarkUrl;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-neutral-200/80 rounded-xl overflow-hidden hover:shadow-xl hover:border-neutral-900/40 transition-all duration-300 flex flex-col h-full cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Admin Quick Action Floating Buttons */}
      {isAdminLoggedIn && (
        <div className="absolute top-2 right-2 z-20 flex space-x-1.5 opacity-90 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(e);
            }}
            className="p-2 bg-white/95 hover:bg-white text-neutral-800 hover:text-neutral-950 rounded-lg shadow-md border border-neutral-200 transition-all scale-95 hover:scale-105 cursor-pointer flex items-center justify-center"
            title="수정"
          >
            <Edit2 size={12} className="stroke-[2.5px]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(e);
            }}
            className="p-2 bg-white/95 hover:bg-red-600 text-red-500 hover:text-white rounded-lg shadow-md border border-red-100 hover:border-red-600 transition-all scale-95 hover:scale-105 cursor-pointer flex items-center justify-center"
            title="삭제"
          >
            <Trash2 size={12} className="stroke-[2.5px]" />
          </button>
        </div>
      )}

      {/* Product Image Stage */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 border-b border-neutral-100">
        {/* NEW Product Badge on Top Left - Synology image or text */}
        {product.isNew && (
          newMarkImage ? (
            <div className="absolute top-2.5 left-2.5 z-10 max-h-8 max-w-[90px] flex items-center select-none pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              <img
                src={getDirectImageUrl(newMarkImage)}
                alt="신제품"
                className="h-6 sm:h-7 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <span
              className="absolute top-2.5 left-2.5 z-10 text-red-600 font-sans font-black text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)] select-none pointer-events-none"
              title="NEW"
            >
              NEW
            </span>
          )
        )}

        <img
          src={getDirectImageUrl(product.images[0])}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          id={`product-thumb-${product.id}`}
        />
        {product.isProcurement && (
          <div className="absolute bottom-2.5 left-2.5 z-10 w-8 h-8 bg-white/95 rounded-full p-1.5 shadow-md flex items-center justify-center border border-neutral-200">
            {narajangterMarkUrl ? (
              <img
                src={getDirectImageUrl(narajangterMarkUrl)}
                alt="나라장터 마크"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path 
                  d="M 50 14 C 64 14 78 22 84 35 C 90 48 88 64 80 74 C 77 78 72 82 67 84 C 68 76 65 67 59 60 C 53 53 44 49 35 48 C 30 47.5 25 48 20 49 C 16 38 21 26 31 19 C 37 15 44 14 50 14 Z" 
                  fill="#cd2e3a" 
                />
                <path 
                  d="M 50 86 C 36 86 22 78 16 65 C 10 52 12 36 20 26 C 23 22 28 18 33 16 C 32 24 35 33 41 40 C 47 47 56 51 65 52 C 70 52.5 75 52 80 51 C 84 62 79 74 69 81 C 63 85 56 86 50 86 Z" 
                  fill="#0047a0" 
                />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Product Info Section (Styled after Urbanscape table layout for extreme clarity) */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title */}
        <h3 className="text-[19px] sm:text-[20px] font-bold text-neutral-900 font-sans tracking-tight mb-4 group-hover:text-neutral-700 transition-colors">
          {product.name}
        </h3>

        {/* Specifications Grid */}
        <div className="space-y-3 text-[15px] font-sans text-neutral-600 flex-grow border-t border-neutral-100 pt-3.5">
          <div className="flex justify-between items-center">
            <span className="text-[15px] font-semibold text-neutral-500 tracking-normal shrink-0">모델명</span>
            <span className="text-[15px] font-sans tabular-nums font-bold text-neutral-800 text-right tracking-tight">{product.name}</span>
          </div>
          
          <div className="flex justify-between items-start">
            <span className="text-[15px] font-semibold text-neutral-500 tracking-normal shrink-0">규격</span>
            <span className="text-[15px] font-sans tabular-nums text-right text-neutral-800 font-semibold leading-relaxed tracking-tight">{product.size}</span>
          </div>

          <div className={`flex justify-between items-center ${product.isProcurement ? '' : 'invisible'}`}>
            <span className="text-[15px] font-semibold text-neutral-500 tracking-normal shrink-0">식별번호</span>
            <span className="text-[15px] font-sans tabular-nums text-neutral-800 font-bold text-right tracking-tight">{product.identificationNo || '-'}</span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
            <span className="text-[15px] font-bold text-neutral-600 tracking-normal shrink-0">판매 금액</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-[18px] sm:text-[20.5px] font-black font-sans tabular-nums text-neutral-950 tracking-tight">
                {formatPriceNumber(product.price)}
              </span>
              <span className="text-[15px] font-bold text-neutral-800">원</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
