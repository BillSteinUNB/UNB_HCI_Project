import React, { useState, useMemo } from 'react';
import { ScreenContainer, ListItem } from '../components/UI';
import { MOCK_ROOMS } from '../constants';
import { ScreenName } from '../types';
import { Search, User } from 'lucide-react';

interface FindRoomProps { onNavigate: (screen: ScreenName, params?: any) => void; }

export const FindRoomScreen: React.FC<FindRoomProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
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

  return (
    <ScreenContainer className="bg-gray-50 flex flex-col h-full">
      <div className="bg-white p-6 pb-4 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"><Search className="h-8 w-8 text-gray-400" /></div>
          <input type="text" className="block w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#C41230] text-2xl font-medium transition-colors" placeholder="Search room number or professor..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setSelectedFloor(null)} className={`px-6 py-3 rounded-xl text-lg font-bold transition-all whitespace-nowrap active:scale-95 ${selectedFloor === null ? 'bg-[#1A1A1A] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>All Levels</button>
          {floors.map(floor => (
            <button key={floor} onClick={() => setSelectedFloor(floor)} className={`px-6 py-3 rounded-xl text-lg font-bold transition-all whitespace-nowrap active:scale-95 ${selectedFloor === floor ? 'bg-[#C41230] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>Level {floor}</button>
          ))}
        </div>
      </div>
      <div className="p-6 pb-24">
        <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4 ml-1">{filteredRooms.length} Results Found</h3>
        {filteredRooms.length > 0 ? (
          <div className="space-y-4">
            {filteredRooms.map((room) => (
              <ListItem key={room.id} title={room.number} subtitle={room.type} meta={`Level ${room.floor}`} onClick={() => onNavigate(ScreenName.ROOM_DETAIL, { roomId: room.id })} rightElement={room.professor ? <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-3 py-1 rounded-lg text-sm font-semibold"><User className="w-4 h-4"/> {room.professor}</div> : null} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-24 h-24 mb-6 opacity-20" />
            <p className="text-2xl font-medium">No rooms found</p>
            <p className="mt-2">Try a different search term or clear filters.</p>
            <button onClick={() => { setQuery(''); setSelectedFloor(null); }} className="mt-8 px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold active:bg-gray-300">Clear Search</button>
          </div>
        )}
      </div>
    </ScreenContainer>
  );
};
