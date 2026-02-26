import React from 'react';
import { ScreenContainer } from '../components/UI';

export const MapScreen: React.FC = () => {
  return (
    <ScreenContainer className="flex flex-col h-full">
      <iframe
        src="/indoor-map.html"
        title="Head Hall Indoor Map"
        className="w-full flex-1 border-0"
        allow="fullscreen"
        style={{ minHeight: 0 }}
      />
    </ScreenContainer>
  );
};
