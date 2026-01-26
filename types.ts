import React from 'react';

export enum ScreenName { HOME = 'HOME', FIND_ROOM = 'FIND_ROOM', ROOM_DETAIL = 'ROOM_DETAIL', EVENTS = 'EVENTS', EVENT_DETAIL = 'EVENT_DETAIL', BUILDING_INFO = 'BUILDING_INFO', MAPS = 'MAPS' }

export interface ScheduleItem { time: string; course: string; name: string; active?: boolean; }
export interface Room { id: string; number: string; type: string; floor: number; capacity: number; professor?: string; features: string[]; schedule: ScheduleItem[]; currentStatus?: 'available' | 'busy'; }
export interface Event { id: string; title: string; date: string; startTime: string; endTime: string; location: string; description: string; isLive: boolean; }
export interface BuildingSection { id: string; title: string; content: React.ReactNode; icon: React.ReactNode; isOpenDefault?: boolean; }
export interface NavigationState { screen: ScreenName; params?: Record<string, any>; }
