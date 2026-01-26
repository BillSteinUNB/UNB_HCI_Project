import React from 'react';
import { ScreenContainer, Card } from '../components/UI';
import { MOCK_EVENTS } from '../constants';
import { Clock, MapPin, CalendarDays } from 'lucide-react';

const EventCard: React.FC<{ event: any, highlight?: boolean }> = ({ event, highlight = false }) => (
  <Card className={`mb-4 border-l-8 ${highlight ? 'border-[#C41230] bg-red-50/50' : 'border-gray-200'}`}>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        {highlight && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C41230] text-white text-sm font-bold rounded-full mb-3 shadow-sm animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span>HAPPENING NOW
          </div>
        )}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"><Clock className="w-5 h-5 text-[#C41230]" /><span className="font-medium">{event.startTime} - {event.endTime}</span></div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"><MapPin className="w-5 h-5 text-[#C41230]" /><span className="font-medium">{event.location}</span></div>
        </div>
      </div>
    </div>
  </Card>
);

export const EventsScreen: React.FC = () => {
  const liveEvents = MOCK_EVENTS.filter(e => e.isLive);
  const upcomingEvents = MOCK_EVENTS.filter(e => !e.isLive);

  return (
    <ScreenContainer className="bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center gap-3 mb-8 text-gray-500"><CalendarDays className="w-6 h-6" /><span className="text-xl font-medium">Tuesday, January 23, 2026</span></div>
        {liveEvents.length > 0 && (
          <section className="mb-10">
            <h2 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4 pl-1">Live Events</h2>
            {liveEvents.map(evt => <EventCard key={evt.id} event={evt} highlight />)}
          </section>
        )}
        <section>
          <h2 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4 pl-1">Coming Up Today</h2>
          {upcomingEvents.length > 0 ? upcomingEvents.map(evt => <EventCard key={evt.id} event={evt} />) : <div className="p-8 text-center text-gray-400 bg-white rounded-xl border border-gray-200">No more events scheduled for today.</div>}
        </section>
      </div>
    </ScreenContainer>
  );
};
