import React, { useState } from 'react';
import { ScreenContainer } from '../components/UI';
import { ZoomIn, ZoomOut, Compass } from 'lucide-react';
import BLevel from '../BLevel.png';
import CLevel from '../CLevel.png';
import DLevel from '../DLevel.png';
import ELevel from '../ELevel.png';

const floorMaps: Record<string, string> = {
  'B': BLevel,
  'C': CLevel,
  'D': DLevel,
  'E': ELevel
};

export const MapScreen: React.FC = () => {
  const [level, setLevel] = useState<string>('B');

  return (
    <ScreenContainer className="bg-gray-100 flex flex-col h-full relative overflow-hidden">
      <div className="absolute right-6 top-6 flex flex-col gap-4 z-20">
        <div className="bg-white rounded-xl shadow-md p-2 flex flex-col gap-2">
          {['B', 'C', 'D', 'E'].map(l => (
            <button key={l} onClick={() => setLevel(l)} className={`w-14 h-14 rounded-lg font-bold text-xl flex items-center justify-center transition-all active:scale-95 shadow-sm border ${level === l ? 'bg-[#C41230] text-white border-[#C41230]' : 'bg-white text-gray-700 border-gray-200'}`}>{l}</button>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-md p-2 flex flex-col gap-2">
          <button className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border border-gray-200 active:bg-gray-50"><ZoomIn className="w-6 h-6" /></button>
          <button className="w-14 h-14 bg-white rounded-lg flex items-center justify-center border border-gray-200 active:bg-gray-50"><ZoomOut className="w-6 h-6" /></button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-12 overflow-hidden bg-gray-100 cursor-move">
        <div className="relative w-full h-full max-w-4xl max-h-[80vh] bg-white rounded-3xl shadow-xl border-4 border-white transform transition-transform duration-500 flex items-center justify-center group">
          <div className="absolute top-8 left-8 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 shadow-sm z-10"><Compass className="w-5 h-5 text-[#C41230]" /><span className="font-bold text-gray-600">Level {level}</span></div>
          <img src={floorMaps[level]} alt={`Floor ${level} Plan`} className="max-w-full max-h-full object-contain" />
          {level === 'C' && (
            <div className="absolute bottom-1/4 left-[50%] flex flex-col items-center animate-bounce">
              <div className="bg-[#C41230] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg mb-1 whitespace-nowrap">You Are Here</div>
              <MapPinFilled />
            </div>
          )}
        </div>
      </div>
    </ScreenContainer>
  );
};

const MapPinFilled = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="#C41230" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3" fill="white"></circle>
  </svg>
);
