import React, { useState, useEffect } from 'react';
import { Search, Calendar, Info, Map as MapIcon } from 'lucide-react';
import { ScreenName } from '../types';

interface HomeProps {
  onNavigate: (screen: ScreenName) => void;
  lastSelected: ScreenName | null;
}

export const HomeScreen: React.FC<HomeProps> = ({ onNavigate, lastSelected }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => date.toLocaleDateString('en-CA', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  const formatTime = (date: Date) => date.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });

  const NavButton = ({ title, desc, icon: Icon, target }: any) => {
    const isActive = lastSelected === target;
    const colorClass = isActive
      ? 'bg-white border-[#C41230] text-[#C41230]'
      : 'bg-white border-gray-200 hover:border-[#C41230] text-[#1A1A1A]';

    return (
      <button onClick={() => onNavigate(target)} className={`relative overflow-hidden group p-8 rounded-2xl text-left border shadow-sm transition-all active:scale-95 touch-active flex flex-col justify-between h-full ${colorClass}`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 group-active:opacity-20 transition-opacity"><Icon className="w-32 h-32 transform rotate-12" /></div>
        <div className="bg-white/90 w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 z-10"><Icon className="w-8 h-8 text-current" /></div>
        <div className="z-10">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">{title}</h2>
          <p className="text-lg opacity-90 font-medium">{desc}</p>
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-8">
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#C41230] text-white flex items-center justify-center font-black text-2xl tracking-tighter rounded-lg shadow-md">UNB</div>
          <div>
            <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight uppercase">Information Technology Center</h1>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-[#1A1A1A] tabular-nums">{formatTime(currentTime)}</div>
          <div className="text-xl text-gray-500 font-medium mt-1">{formatDate(currentTime)}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-6 flex-1 mb-8">
        <NavButton title="Find a Room" desc="Classrooms, labs, and faculty offices" icon={Search} target={ScreenName.FIND_ROOM} />
        <NavButton title="Today's Events" desc="Lectures, career fairs, and workshops" icon={Calendar} target={ScreenName.EVENTS} />
        <NavButton title="Building Info" desc="Hours, emergency, and accessibility" icon={Info} target={ScreenName.BUILDING_INFO} />
        <NavButton title="Floor Maps" desc="Interactive wayfinding" icon={MapIcon} target={ScreenName.MAPS} />
      </div>
    </div>
  );
};
