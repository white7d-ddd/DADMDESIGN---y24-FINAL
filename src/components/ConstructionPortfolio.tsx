import React from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { CompanyInfo, ConstructionProject, PageHeaders } from '../types';
import EditableHeader from './EditableHeader';
import { getDirectImageUrl } from '../utils/imageUtils';
import { sortProjectsByPeriod } from '../utils/dateUtils';

interface ConstructionPortfolioProps {
  companyInfo: CompanyInfo;
  onInquiryTrigger: () => void;
  projects: ConstructionProject[];
  isAdminLoggedIn: boolean;
  onAdd: () => void;
  onEdit: (project: ConstructionProject) => void;
  onDelete: (id: string) => void;
  pageHeaders?: PageHeaders;
  onUpdatePageHeaders?: (updated: PageHeaders) => void;
  activePage?: 'construction' | 'cases';
}

export default function ConstructionPortfolio({
  companyInfo,
  onInquiryTrigger,
  projects,
  isAdminLoggedIn,
  onAdd,
  onEdit,
  onDelete,
  pageHeaders,
  onUpdatePageHeaders,
  activePage = 'construction'
}: ConstructionPortfolioProps) {
  const isCases = activePage === 'cases';
  const displayProjects = sortProjectsByPeriod(projects);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24" id={isCases ? 'view-cases-portfolio' : 'view-construction-portfolio'}>
      {/* Page Header */}
      <div className="text-center space-y-4 mb-16">
        {pageHeaders && onUpdatePageHeaders ? (
          <EditableHeader
            pageKey={isCases ? "cases" : "construction"}
            pageHeaders={pageHeaders}
            isAdminLoggedIn={isAdminLoggedIn}
            onUpdateHeaders={onUpdatePageHeaders}
            centered={true}
          />
        ) : isCases ? (
          <>
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-100 border border-neutral-200/60 rounded-full text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-bold">
              <span>Installation Cases</span>
            </span>
            <h1 className="text-3xl font-extrabold text-neutral-950 font-sans tracking-tight">
              시공사례
            </h1>
            <p className="text-sm text-neutral-500 font-sans tracking-wide max-w-xl mx-auto leading-relaxed">
              다듬디자인의 고품질 시설물 제품들이 전국 주요 현장에 설치 완료된 시공사례 모음입니다.
            </p>
          </>
        ) : (
          <>
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-neutral-100 border border-neutral-200/60 rounded-full text-[10px] font-mono tracking-widest uppercase text-neutral-500 font-bold">
              <span>Construction Portfolio</span>
            </span>
            <h1 className="text-3xl font-extrabold text-neutral-950 font-sans tracking-tight">
              건설사업 및 시공 실적
            </h1>
            <p className="text-sm text-neutral-500 font-sans tracking-wide max-w-xl mx-auto leading-relaxed">
              다듬디자인의 엄격한 자재 선별과 완벽한 밀착 직영 시공팀이 완성한 격조 높은 조경 시설 현장들입니다.
            </p>
          </>
        )}

        {/* Admin Register Action */}
        {isAdminLoggedIn && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={onAdd}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-sans font-extrabold text-xs px-5 py-3 rounded-xl shadow-md border border-amber-400 transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>{isCases ? '새 시공사례 등록 (추가)' : '새 시공 실적 사례 등록 (추가)'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Projects */}
      <div className={isCases ? "space-y-12" : "space-y-16"}>
        {displayProjects.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
            <p className="text-neutral-400 text-sm font-sans">등록된 사례가 없습니다.</p>
          </div>
        ) : isCases ? (
          /* 시공사례 PAGE: Photos-focused 3-Info Layout */
          displayProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-white border border-neutral-200/80 p-5 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-6"
              id={`portfolio-card-${proj.id}`}
            >
              {/* Card Header: Tag & Admin Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black font-sans bg-neutral-900 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                    {proj.tag || '시공사례'}
                  </span>
                  {proj.period && (
                    <span className="text-sm sm:text-base font-mono text-neutral-500 font-semibold">
                      {proj.period}
                    </span>
                  )}
                </div>

                {/* Admin Management Buttons */}
                {isAdminLoggedIn && (
                  <div className="flex items-center space-x-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
                    <button
                      onClick={() => onEdit(proj)}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded hover:bg-white transition-colors cursor-pointer"
                      title="수정"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('이 시공 사례를 정말로 삭제하시겠습니까?')) {
                          onDelete(proj.id);
                        }
                      }}
                      className="p-1.5 text-neutral-600 hover:text-red-600 rounded hover:bg-red-50 transition-colors cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>

              {/* 2 Photos Showcase Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Photo 1 */}
                <div className="overflow-hidden rounded-2xl aspect-16/10 bg-neutral-100 border border-neutral-200/70 relative group">
                  <img
                    src={getDirectImageUrl(proj.image)}
                    alt={`${proj.title} - 사진 1`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider">
                    사진 1
                  </div>
                </div>

                {/* Photo 2 */}
                <div className="overflow-hidden rounded-2xl aspect-16/10 bg-neutral-100 border border-neutral-200/70 relative group">
                  <img
                    src={getDirectImageUrl(proj.image2 || proj.image)}
                    alt={`${proj.title} - 사진 2`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider">
                    사진 2
                  </div>
                </div>
              </div>

              {/* 3 Information Fields ONLY (제품명, 현장명, 규격) */}
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200/70 p-5 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80">
                  {/* 1. 제품명 */}
                  <div className="flex flex-col space-y-1 pb-3 md:pb-0 md:pr-4">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">제품명</span>
                    <span className="text-base font-black text-neutral-950 leading-snug">{proj.title}</span>
                  </div>

                  {/* 2. 현장명 */}
                  <div className="flex flex-col space-y-1 pt-3 md:pt-0 md:px-4">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">현장명</span>
                    <span className="text-sm font-bold text-neutral-800 leading-snug">{proj.location}</span>
                  </div>

                  {/* 3. 규격 */}
                  <div className="flex flex-col space-y-1 pt-3 md:pt-0 md:pl-4">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">규격</span>
                    <span className="text-sm font-medium text-neutral-700 leading-snug">{proj.items}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          /* 건설사업 PAGE: Original Construction Portfolio Layout */
          displayProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-neutral-100 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              id={`portfolio-card-${proj.id}`}
            >
              {/* Image (6 columns) */}
              <div className={`lg:col-span-6 overflow-hidden rounded-2xl aspect-16/10 bg-neutral-100 border border-neutral-200/50 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                <img
                  src={getDirectImageUrl(proj.image)}
                  alt={proj.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content (6 columns) */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[13px] font-bold font-sans bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full uppercase tracking-wider">
                      {proj.tag}
                    </span>
                    <span className="text-sm sm:text-base font-mono text-neutral-500 font-semibold">
                      {proj.period}
                    </span>
                  </div>

                  {/* Admin Management Buttons */}
                  {isAdminLoggedIn && (
                    <div className="flex items-center space-x-1 bg-neutral-50 p-1 rounded-lg border border-neutral-200/55">
                      <button
                        onClick={() => onEdit(proj)}
                        className="p-1 text-neutral-500 hover:text-neutral-900 rounded hover:bg-white transition-colors cursor-pointer"
                        title="실적 수정"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('이 시공 실적 사례를 정말로 삭제하시겠습니까?')) {
                            onDelete(proj.id);
                          }
                        }}
                        className="p-1 text-neutral-500 hover:text-red-600 rounded hover:bg-red-50 transition-colors cursor-pointer"
                        title="실적 삭제"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-900 leading-snug">
                  {proj.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed whitespace-pre-line">
                  {proj.description}
                </p>

                {/* Specification Mini Table */}
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100/80 space-y-2 text-xs font-sans">
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-500 font-medium w-16 shrink-0">공사위치</span>
                    <span className="text-neutral-900 font-semibold">{proj.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-500 font-medium w-16 shrink-0">공사내용</span>
                    <span className="text-neutral-900 font-medium">{proj.items}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
