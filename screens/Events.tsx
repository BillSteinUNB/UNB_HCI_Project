import React from 'react';
import { ScreenContainer, Card } from '../components/UI';
import { MOCK_EVENTS } from '../constants';
import { Clock, MapPin, CalendarDays, MapPinned } from 'lucide-react';
import { ScreenName } from '../types';

const EVENT_DESTINATIONS = ['ITC 317', 'C-13', 'C-11'] as const;

const buildMapDestination = (label: string): string => label.replace(/\s+/g, '');

const EventCard: React.FC<{
  event: any;
  highlight?: boolean;
  destinationLabel: string;
  onGetDirections: (destinationLabel: string) => void;
}> = ({ event, highlight = false, destinationLabel, onGetDirections }) => (
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
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm"><MapPin className="w-5 h-5 text-[#C41230]" /><span className="font-medium">{destinationLabel}</span></div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => onGetDirections(destinationLabel)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#C41230] text-white rounded-xl font-bold text-base shadow-sm active:bg-[#9E0E27] active:scale-95 transition-all"
          >
            <MapPinned className="w-5 h-5" />
            <span>Get Directions</span>
          </button>
        </div>
      </div>
    </div>
  </Card>
);

interface EventsScreenProps {
  onNavigate: (screen: ScreenName, params?: any) => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({ onNavigate }) => {
  const eventsWithDestinations = MOCK_EVENTS.map((event, index) => ({
    ...event,
    destinationLabel: EVENT_DESTINATIONS[index] ?? event.location,
  }));
  const liveEventsWithDestinations = eventsWithDestinations.filter(e => e.isLive);
  const upcomingEventsWithDestinations = eventsWithDestinations.filter(e => !e.isLive);

  const handleGetDirections = (destinationLabel: string) => {
    onNavigate(ScreenName.MAPS, {
      destination: buildMapDestination(destinationLabel),
      floor: 'C',
    });
  };

  return (
    <ScreenContainer className="bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center gap-3 mb-8 text-gray-500"><CalendarDays className="w-6 h-6" /><span className="text-xl font-medium">Thursday, February 26, 2026</span></div>
        {liveEventsWithDestinations.length > 0 && (
          <section className="mb-10">
            <h2 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4 pl-1">Live Events</h2>
            {liveEventsWithDestinations.map(evt => (
              <EventCard key={evt.id} event={evt} highlight destinationLabel={evt.destinationLabel} onGetDirections={handleGetDirections} />
            ))}
          </section>
        )}
        <section>
          <h2 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4 pl-1">Coming Up Today</h2>
          {upcomingEventsWithDestinations.length > 0 ? upcomingEventsWithDestinations.map(evt => (
            <EventCard key={evt.id} event={evt} destinationLabel={evt.destinationLabel} onGetDirections={handleGetDirections} />
          )) : <div className="p-8 text-center text-gray-400 bg-white rounded-xl border border-gray-200">No more events scheduled for today.</div>}
        </section>
      </div>
    </ScreenContainer>
  );
};
