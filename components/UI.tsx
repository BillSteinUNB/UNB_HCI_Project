import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface HeaderProps { title: string; onBack: () => void; onHome: () => void; showBack?: boolean; }

export const Header: React.FC<HeaderProps> = ({ title, onBack, onHome, showBack = true }) => (
  <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
    <div className="flex items-center w-1/4">
      {showBack && (
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg active:bg-gray-200 active:scale-95 transition-all text-lg font-medium text-gray-700 touch-active" aria-label="Go Back">
          <ArrowLeft className="w-6 h-6" /><span>Back</span>
        </button>
      )}
    </div>
    <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight uppercase w-1/2 text-center truncate">{title}</h1>
    <div className="flex items-center justify-end w-1/4">
      <button onClick={onHome} className="flex items-center gap-2 px-6 py-3 bg-[#C41230] text-white rounded-lg active:bg-[#9E0E27] active:scale-95 transition-all text-lg font-bold shadow-md touch-active" aria-label="Go Home">
        <Home className="w-6 h-6" /><span>Home</span>
      </button>
    </div>
  </header>
);

export const ScreenContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <main className={`flex-1 overflow-y-auto overflow-x-hidden ${className}`}>{children}</main>
);

export const Card: React.FC<{ children: React.ReactNode, onClick?: () => void, className?: string }> = ({ children, onClick, className = "" }) => (
  <div onClick={onClick} className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 ${onClick ? 'active:bg-gray-50 active:scale-[0.99] cursor-pointer transition-all touch-active' : ''} ${className}`}>{children}</div>
);

export const StatusBadge: React.FC<{ status: 'available' | 'busy' }> = ({ status }) => {
  const isAvailable = status === 'available';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-green-600' : 'bg-red-600'}`}></span>
      {isAvailable ? 'Available' : 'Busy'}
    </span>
  );
};

interface ListItemProps { title: string; subtitle: string; meta?: string; onClick: () => void; rightElement?: React.ReactNode; }

export const ListItem: React.FC<ListItemProps> = ({ title, subtitle, meta, onClick, rightElement }) => (
  <div onClick={onClick} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between active:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer touch-active mb-4">
    <div className="flex flex-col gap-1">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <div className="flex items-center gap-3 text-gray-600 text-lg">
        <span>{subtitle}</span>
        {meta && <><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span><span>{meta}</span></>}
      </div>
    </div>
    <div className="flex items-center text-gray-400">{rightElement}<ChevronRight className="w-8 h-8 ml-4" /></div>
  </div>
);
