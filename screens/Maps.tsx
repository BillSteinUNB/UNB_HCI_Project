import React from 'react';
import { ScreenContainer } from '../components/UI';

interface MapScreenProps {
  destination?: string;
  floor?: string;
  officeTitle?: string;
  professor?: string;
}

export const MapScreen: React.FC<MapScreenProps> = ({ destination, floor, officeTitle, professor }) => {
  const params = new URLSearchParams();
  if (destination) params.set('destination', destination);
  if (floor) params.set('floor', floor);
  if (officeTitle) params.set('officeTitle', officeTitle);
  if (professor) params.set('professor', professor);
  const src = `/indoor-map.html${params.toString() ? `?${params.toString()}` : ''}`;

  return (
    <ScreenContainer className="flex flex-col h-full">
      <iframe
        src={src}
        title="Information Technology Center Indoor Map"
        className="w-full flex-1 border-0"
        allow="fullscreen"
        style={{ minHeight: 0 }}
      />
    </ScreenContainer>
  );
};
