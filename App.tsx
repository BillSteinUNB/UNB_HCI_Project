import React, { useState } from 'react';
import { Header } from './components/UI';
import { HomeScreen } from './screens/Home';
import { FindRoomScreen } from './screens/FindRoom';
import { RoomDetailScreen } from './screens/RoomDetail';
import { EventsScreen } from './screens/Events';
import { BuildingInfoScreen } from './screens/BuildingInfo';
import { MapScreen } from './screens/Maps';
import { ScreenName, NavigationState } from './types';

const App: React.FC = () => {
  const [history, setHistory] = useState<NavigationState[]>([{ screen: ScreenName.HOME }]);

  const currentNav = history[history.length - 1];
  const currentScreen = currentNav.screen;
  const currentParams = currentNav.params;

  const navigateTo = (screen: ScreenName, params?: any) => setHistory(prev => [...prev, { screen, params }]);
  const goBack = () => history.length > 1 && setHistory(prev => prev.slice(0, -1));
  const goHome = () => setHistory([{ screen: ScreenName.HOME }]);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case ScreenName.FIND_ROOM: return 'Find a Room';
      case ScreenName.ROOM_DETAIL: return currentParams?.roomId ? `Room ${currentParams.roomId.toUpperCase()}` : 'Room Detail';
      case ScreenName.EVENTS: return "Today's Events";
      case ScreenName.BUILDING_INFO: return 'Building Information';
      case ScreenName.MAPS: return 'Floor Maps';
      default: return 'Head Hall';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenName.HOME: return <HomeScreen onNavigate={navigateTo} />;
      case ScreenName.FIND_ROOM: return <FindRoomScreen />;
      case ScreenName.ROOM_DETAIL: return <RoomDetailScreen roomId={currentParams?.roomId} onNavigate={navigateTo} />;
      case ScreenName.EVENTS: return <EventsScreen />;
      case ScreenName.BUILDING_INFO: return <BuildingInfoScreen />;
      case ScreenName.MAPS: return <MapScreen />;
      default: return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50 relative font-sans text-base antialiased">
      {currentScreen !== ScreenName.HOME && (
        <Header title={getScreenTitle()} onBack={goBack} onHome={goHome} showBack={history.length > 1} />
      )}
      <div className="flex-1 relative">{renderScreen()}</div>
    </div>
  );
};

export default App;
