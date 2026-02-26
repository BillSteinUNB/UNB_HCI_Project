import React, { useState, useMemo, useRef } from 'react';
import { ScreenContainer, StatusBadge } from '../components/UI';
import { MOCK_ROOMS } from '../constants';
import { Search, X, User, ChevronDown, Users, Monitor, Calendar, Delete, CornerDownLeft, Space } from 'lucide-react';

const KEYBOARD_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const OnScreenKeyboard: React.FC<{
  onKey: (key: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onClose: () => void;
}> = ({ onKey, onBackspace, onClear, onClose }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t-2 border-gray-300 px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-50">
    <div className="max-w-2xl mx-auto space-y-1">
      {KEYBOARD_ROWS.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-1">
          {row.map((key) => (
            <button key={key} onClick={() => onKey(key)} className="w-10 h-10 bg-white rounded-lg border border-gray-200 shadow-sm text-base font-bold text-gray-800 active:bg-gray-200 active:scale-95 transition-all">
              {key}
            </button>
          ))}
          {ri === 3 && (
            <button onClick={onBackspace} className="w-16 h-10 bg-gray-200 rounded-lg border border-gray-300 shadow-sm text-xs font-bold text-gray-600 active:bg-gray-300 active:scale-95 transition-all flex items-center justify-center">
              <Delete className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-center gap-1">
        <button onClick={onClear} className="px-4 h-10 bg-gray-200 rounded-lg border border-gray-300 shadow-sm text-xs font-bold text-gray-600 active:bg-gray-300 active:scale-95 transition-all">Clear</button>
        <button onClick={() => onKey(' ')} className="flex-1 max-w-xs h-10 bg-white rounded-lg border border-gray-200 shadow-sm text-sm font-bold text-gray-500 active:bg-gray-200 active:scale-95 transition-all">Space</button>
        <button onClick={onClose} className="px-5 h-10 bg-[#C41230] rounded-lg shadow-sm text-xs font-bold text-white active:bg-[#9E0E27] active:scale-95 transition-all">Done</button>
      </div>
    </div>
  </div>
);

export const FindRoomScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const floors = ['B', 'C', 'D', 'E'];

  const filteredRooms = useMemo(() => {
    let results = MOCK_ROOMS;
    if (selectedFloor) results = results.filter(r => r.floor === selectedFloor);
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(r =>
        r.number.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.professor?.toLowerCase().includes(q) ||
        r.officeTitle?.toLowerCase().includes(q)
      );
    }
    return results;
  }, [query, selectedFloor]);

  const toggleRoom = (roomId: string) => {
    setExpandedRoomId(prev => prev === roomId ? null : roomId);
  };

  const handleKey = (key: string) => setQuery(prev => prev + key);
  const handleBackspace = () => setQuery(prev => prev.slice(0, -1));
  const handleClearSearch = () => { setQuery(''); setSelectedFloor(null); };

  return (
    <ScreenContainer className="bg-gray-50 flex flex-col h-full">
      <div className="bg-white p-6 pb-4 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"><Search className="h-8 w-8 text-gray-400" /></div>
          <input
            ref={inputRef}
            type="text"
            readOnly
            className="block w-full pl-16 pr-14 py-5 border-2 border-gray-200 rounded-2xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#C41230] text-2xl font-medium transition-colors cursor-pointer"
            placeholder="Search room number or professor..."
            value={query}
            onClick={() => setShowKeyboard(true)}
          />
          {query && (
            <button onClick={handleClearSearch} className="absolute inset-y-0 right-0 pr-5 flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center active:bg-gray-300 transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </div>
            </button>
          )}
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setSelectedFloor(null)} className={`px-6 py-3 rounded-xl text-lg font-bold transition-all whitespace-nowrap active:scale-95 ${selectedFloor === null ? 'bg-[#1A1A1A] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>All Levels</button>
          {floors.map(floor => (
            <button key={floor} onClick={() => setSelectedFloor(floor)} className={`px-6 py-3 rounded-xl text-lg font-bold transition-all whitespace-nowrap active:scale-95 ${selectedFloor === floor ? 'bg-[#C41230] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>Level {floor}</button>
          ))}
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto p-6 ${showKeyboard ? 'pb-64' : 'pb-24'}`}>
        <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4 ml-1">{filteredRooms.length} Results Found</h3>
        {filteredRooms.length > 0 ? (
          <div className="space-y-4">
            {filteredRooms.map((room) => {
              const isExpanded = expandedRoomId === room.id;
              return (
                <div key={room.id} className={`bg-white rounded-xl border shadow-sm transition-all ${isExpanded ? 'border-[#C41230]/30 shadow-md' : 'border-gray-200'}`}>
                  <div onClick={() => toggleRoom(room.id)} className="p-6 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors rounded-xl">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-2xl font-bold text-gray-900">{room.number}</h3>
                      <div className="flex items-center gap-3 text-gray-600 text-lg">
                        <span>{room.type}</span>
                        {room.officeTitle && (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            <span className="text-gray-500">{room.officeTitle}</span>
                          </>
                        )}
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span>Level {room.floor}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {room.professor && (
                        <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-3 py-1 rounded-lg text-sm font-semibold">
                          <User className="w-4 h-4" /> {room.professor}
                        </div>
                      )}
                      {room.currentStatus && <StatusBadge status={room.currentStatus} />}
                      <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${isExpanded ? 'bg-[#C41230] text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <span>{isExpanded ? 'Close' : 'Details'}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">
                      <div className="flex gap-8">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600"><Users className="w-5 h-5" /></div>
                          <div><div className="text-xs text-gray-500 font-bold uppercase">Capacity</div><div className="text-lg font-bold">{room.capacity} Seats</div></div>
                        </div>
                        {(room.type === 'Classroom' || room.type === 'Lab') && (
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600"><Monitor className="w-5 h-5" /></div>
                            <div><div className="text-xs text-gray-500 font-bold uppercase">Equipment</div><div className="text-lg font-bold">Standard AV</div></div>
                          </div>
                        )}
                      </div>

                      {room.features.length > 0 && (
                        <div>
                          <h4 className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-3">Room Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {room.features.map((feature, i) => (
                              <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-base font-medium">{feature}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-5 h-5 text-[#C41230]" />
                          <h4 className="text-gray-500 font-bold uppercase tracking-wider text-xs">Today's Schedule</h4>
                        </div>
                        {room.schedule.length > 0 ? (
                          <div className="space-y-3">
                            {room.schedule.map((slot, idx) => (
                              <div key={idx} className={`flex items-center p-3 rounded-xl border-l-4 ${slot.active ? 'bg-red-50 border-[#C41230]' : 'bg-gray-50 border-gray-300'}`}>
                                <div className="w-28 font-mono font-bold text-base text-gray-600">{slot.time}</div>
                                <div className="flex-1"><div className="font-bold text-base">{slot.course}</div><div className="text-gray-600 text-sm">{slot.name}</div></div>
                                {slot.active && <span className="px-3 py-1 bg-[#C41230] text-white text-xs font-bold uppercase rounded-full animate-pulse">Now</span>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-400 text-base">No classes scheduled today.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-24 h-24 mb-6 opacity-20" />
            <p className="text-2xl font-medium">No rooms found</p>
            <p className="mt-2">Try a different search term or clear filters.</p>
            <button onClick={() => { handleClearSearch(); setShowKeyboard(false); }} className="mt-8 px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold active:bg-gray-300">Clear Search</button>
          </div>
        )}
      </div>
      {showKeyboard && (
        <OnScreenKeyboard
          onKey={handleKey}
          onBackspace={handleBackspace}
          onClear={handleClearSearch}
          onClose={() => setShowKeyboard(false)}
        />
      )}
    </ScreenContainer>
  );
};
