import React from 'react';
import { ScreenContainer, Card, StatusBadge } from '../components/UI';
import { MOCK_ROOMS } from '../constants';
import { MapPin, Users, Monitor, Calendar } from 'lucide-react';
import { ScreenName } from '../types';

interface RoomDetailProps { roomId: string; onNavigate: (screen: ScreenName) => void; }

export const RoomDetailScreen: React.FC<RoomDetailProps> = ({ roomId, onNavigate }) => {
  const room = MOCK_ROOMS.find(r => r.id === roomId);
  if (!room) return <div className="p-12 text-2xl">Room not found</div>;
  const currentClass = room.schedule.find(s => s.active);

  return (
    <ScreenContainer className="bg-gray-50 p-6 space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5 space-y-6">
          <Card className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-[300px] relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <MapPin className="w-16 h-16 text-[#C41230] z-10 animate-bounce" />
            <div className="z-10 mt-4 font-bold text-xl">Floor {room.floor}</div>
            <div className="z-10 text-gray-400">East Wing</div>
            <button onClick={() => onNavigate(ScreenName.MAPS)} className="absolute bottom-6 px-6 py-2 bg-white text-black rounded-full text-sm font-bold shadow-lg active:scale-95 transition-transform">View Full Map</button>
          </Card>
          <Card>
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4">Room Features</h3>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, i) => <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-lg font-medium">{feature}</span>)}
            </div>
          </Card>
        </div>
        <div className="col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-5xl font-black text-[#1A1A1A] mb-2">{room.number}</h1>
                <p className="text-2xl text-gray-500 font-medium">{room.type}</p>
                {room.professor && <p className="text-xl text-[#C41230] font-semibold mt-1">{room.professor}</p>}
              </div>
              {room.currentStatus && <StatusBadge status={room.currentStatus} />}
            </div>
            <div className="flex gap-8 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600"><Users className="w-6 h-6" /></div>
                <div><div className="text-sm text-gray-500 font-bold uppercase">Capacity</div><div className="text-xl font-bold">{room.capacity} Seats</div></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600"><Monitor className="w-6 h-6" /></div>
                <div><div className="text-sm text-gray-500 font-bold uppercase">Equipment</div><div className="text-xl font-bold">Standard AV</div></div>
              </div>
            </div>
          </div>
          <Card className="flex-1">
            <div className="flex items-center gap-3 mb-6"><Calendar className="w-6 h-6 text-[#C41230]" /><h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3></div>
            {room.schedule.length > 0 ? (
              <div className="space-y-4">
                {room.schedule.map((slot, idx) => (
                  <div key={idx} className={`flex items-center p-4 rounded-xl border-l-4 ${slot.active ? 'bg-red-50 border-[#C41230]' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="w-32 font-mono font-bold text-lg text-gray-600">{slot.time}</div>
                    <div className="flex-1"><div className="font-bold text-lg">{slot.course}</div><div className="text-gray-600">{slot.name}</div></div>
                    {slot.active && <span className="px-3 py-1 bg-[#C41230] text-white text-xs font-bold uppercase rounded-full animate-pulse">Now</span>}
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-8 text-gray-500 text-lg">No classes scheduled today.</div>}
          </Card>
        </div>
      </div>
    </ScreenContainer>
  );
};
