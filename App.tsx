import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/UI';
import { HomeScreen } from './screens/Home';
import { FindRoomScreen } from './screens/FindRoom';
import { RoomDetailScreen } from './screens/RoomDetail';
import { EventsScreen } from './screens/Events';
import { BuildingInfoScreen } from './screens/BuildingInfo';
import { MapScreen } from './screens/Maps';
import { ScreenName, NavigationState } from './types';

const TIMEOUT_MS = 60000;

const App: React.FC = () => {
  const [history, setHistory] = useState<NavigationState[]>([{ screen: ScreenName.HOME }]);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const warningTimeoutRef = useRef<number | null>(null);

  const currentNav = history[history.length - 1];
  const currentScreen = currentNav.screen;
  const currentParams = currentNav.params;

  const navigateTo = (screen: ScreenName, params?: any) => setHistory(prev => [...prev, { screen, params }]);
  const goBack = () => history.length > 1 && setHistory(prev => prev.slice(0, -1));
  const goHome = useCallback(() => { setHistory([{ screen: ScreenName.HOME }]); setShowTimeoutWarning(false); }, []);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    setShowTimeoutWarning(false);
    if (currentScreen !== ScreenName.HOME) {
      warningTimeoutRef.current = window.setTimeout(() => setShowTimeoutWarning(true), TIMEOUT_MS - 10000);
      timeoutRef.current = window.setTimeout(() => goHome(), TIMEOUT_MS);
    }
  }, [currentScreen, goHome]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const handleActivity = () => resetTimer();
    events.forEach(e => window.addEventListener(e, handleActivity));
    resetTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [resetTimer]);

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
      case ScreenName.FIND_ROOM: return <FindRoomScreen onNavigate={navigateTo} />;
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
      <div className="flex-1 overflow-hidden relative">{renderScreen()}</div>
      {showTimeoutWarning && (
        <div onClick={() => resetTimer()} className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg mx-4">
            <h2 className="text-4xl font-black text-[#C41230] mb-4">Are you still there?</h2>
            <p className="text-2xl text-gray-600 mb-8">Returning to home screen in a few seconds...</p>
            <button className="px-10 py-5 bg-[#1A1A1A] text-white text-xl font-bold rounded-xl shadow-lg animate-pulse">Tap to Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
