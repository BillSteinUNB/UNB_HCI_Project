import React, { useState } from 'react';
import { ScreenContainer } from '../components/UI';
import { BUILDING_INFO_SECTIONS } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const BuildingInfoScreen: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(BUILDING_INFO_SECTIONS[0].id);
  const toggleSection = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <ScreenContainer className="bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-4 pb-12">
        {BUILDING_INFO_SECTIONS.map((section) => {
          const isOpen = openSection === section.id;
          return (
            <div key={section.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#C41230] shadow-md' : 'border-gray-200'}`}>
              <button onClick={() => toggleSection(section.id)} className="w-full flex items-center justify-between p-6 text-left active:bg-gray-50 touch-active focus:outline-none">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isOpen ? 'bg-red-50 text-[#C41230]' : 'bg-gray-100 text-gray-600'}`}>{section.icon}</div>
                  <span className={`text-2xl font-bold ${isOpen ? 'text-[#1A1A1A]' : 'text-gray-700'}`}>{section.title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-8 h-8 text-gray-400" /> : <ChevronDown className="w-8 h-8 text-gray-400" />}
              </button>
              {isOpen && <div className="px-6 pb-8 pl-[5.5rem] pt-0 animate-in slide-in-from-top-2 fade-in duration-200"><div className="text-xl leading-relaxed text-gray-700">{section.content}</div></div>}
            </div>
          );
        })}
      </div>
    </ScreenContainer>
  );
};
