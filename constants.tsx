import React from 'react';
import { Room, Event, BuildingSection } from './types';
import { Clock, MapPin, Phone, AlertTriangle, Car } from 'lucide-react';

export const UNB_RED = '#C41230';
export const UNB_BLACK = '#1A1A1A';

export const MOCK_ROOMS: Room[] = [
  { id: "e101", number: "E-101", type: "Lecture Hall", floor: 1, capacity: 120, features: ["Projector", "Whiteboard", "Accessible", "Tiered Seating"], currentStatus: 'busy', schedule: [
    { time: "09:00-10:30", course: "C-34A", name: "Intro to Programming" },
    { time: "11:00-12:30", course: "C-18A", name: "Circuits I" },
    { time: "14:00-15:30", course: "C-15A", name: "Thermodynamics", active: true },
    { time: "16:00-17:30", course: "C-15D", name: "Statics" }
  ]},
  { id: "e105", number: "E-105", type: "Computer Lab", floor: 1, capacity: 40, features: ["40 Workstations", "Printer", "Scanner"], currentStatus: 'available', schedule: [
    { time: "08:30-11:30", course: "C-14A", name: "Software Engineering I" },
    { time: "13:30-16:30", course: "C-14B", name: "Operating Systems" }
  ]},
  { id: "e110", number: "E-110", type: "Faculty Office", floor: 1, capacity: 3, professor: "Dr. Sarah Smith", features: ["Office Hours: Mon/Wed 10-12"], currentStatus: 'available', schedule: [] },
  { id: "e204", number: "E-204", type: "Study Room", floor: 2, capacity: 8, features: ["Whiteboard", "TV Screen", "Power Outlets"], currentStatus: 'available', schedule: [{ time: "18:00-21:00", course: "C-34A", name: "Finals Prep" }] },
  { id: "hc12", number: "HC-12", type: "Lecture Hall", floor: 0, capacity: 200, features: ["Projector", "Sound System"], currentStatus: 'busy', schedule: [{ time: "13:00-14:30", course: "C-18A", name: "Calculus II" }] },
  { id: "e301", number: "E-301", type: "Chemical Eng Lab", floor: 3, capacity: 25, features: ["Fume Hoods", "Safety Shower"], currentStatus: 'available', schedule: [] }
];

export const MOCK_EVENTS: Event[] = [
  { id: "evt1", title: "Engineering Career Fair", date: "2026-01-23", startTime: "10:00", endTime: "16:00", location: "E-Hall Lobby", description: "Meet employers from top engineering firms across Canada. Bring your resume and portfolio. Casual networking lunch provided at noon.", isLive: true },
  { id: "evt2", title: "Guest Lecture: Predictive Modeling in Civil Engineering", date: "2026-01-23", startTime: "15:30", endTime: "17:00", location: "Room E-101", description: "Dr. James Chen discusses the impact of predictive modeling on structural integrity monitoring.", isLive: false },
  { id: "evt3", title: "EUS Study Session: Finals Prep", date: "2026-01-23", startTime: "18:00", endTime: "21:00", location: "Room E-204", description: "Join the Engineering Undergraduate Society for a study marathon. Snacks and coffee provided.", isLive: false }
];

export const BUILDING_INFO_SECTIONS: BuildingSection[] = [
  { id: 'hours', title: 'Hours of Operation', icon: <Clock className="w-6 h-6" />, isOpenDefault: true, content: (
    <div className="space-y-2">
      <div className="flex justify-between border-b border-gray-100 pb-2"><span className="font-medium">Monday - Friday</span><span>7:00 AM - 11:00 PM</span></div>
      <div className="flex justify-between border-b border-gray-100 pb-2"><span className="font-medium">Saturday</span><span>8:00 AM - 6:00 PM</span></div>
      <div className="flex justify-between"><span className="font-medium">Sunday</span><span>10:00 AM - 6:00 PM</span></div>
      <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-600"></span>
        <span className="font-bold">Building is currently OPEN</span>
      </div>
    </div>
  )},
  { id: 'contact', title: 'Contact & Help Desk', icon: <Phone className="w-6 h-6" />, content: (
    <div className="space-y-3">
      <p className="text-gray-600">The main engineering office is located on the first floor near the main entrance.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg"><div className="text-sm text-gray-500 mb-1">General Inquiries</div><div className="font-semibold text-lg">Room E-123</div></div>
        <div className="p-4 bg-gray-50 rounded-lg"><div className="text-sm text-gray-500 mb-1">Phone</div><div className="font-semibold text-lg">(506) 453-4500</div></div>
        <div className="p-4 bg-gray-50 rounded-lg col-span-2"><div className="text-sm text-gray-500 mb-1">Email</div><div className="font-semibold text-lg">headhall@unb.ca</div></div>
      </div>
    </div>
  )},
  { id: 'emergency', title: 'Emergency Information', icon: <AlertTriangle className="w-6 h-6" />, content: (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 border-l-4 border-[#C41230] rounded-r-lg">
        <div className="font-bold text-[#C41230] text-lg mb-1">Campus Security</div>
        <div className="text-2xl font-black text-[#C41230]">(506) 453-4830</div>
        <div className="text-sm text-red-800 mt-1">Available 24/7. Use any red emergency phone.</div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
          <div className="bg-gray-100 p-2 rounded">🚑</div>
          <div><div className="font-semibold">First Aid Kit</div><div className="text-sm text-gray-500">Room E-100 (Main Office)</div></div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
          <div className="bg-gray-100 p-2 rounded">🧯</div>
          <div><div className="font-semibold">AED Defibrillator</div><div className="text-sm text-gray-500">Main Lobby by Elevators</div></div>
        </div>
      </div>
    </div>
  )},
  { id: 'parking', title: 'Parking & Accessibility', icon: <Car className="w-6 h-6" />, content: (
    <div className="space-y-3">
      <p className="text-gray-600">Accessible parking is available directly in front of the main entrance (Head Hall Service Rd).</p>
      <div className="flex gap-4">
        <div className="flex-1 p-4 bg-blue-50 text-blue-900 rounded-lg"><div className="font-bold mb-1">Student Parking</div><div className="text-sm">Lot 15 & 16 (Red Permit)</div></div>
        <div className="flex-1 p-4 bg-gray-100 text-gray-900 rounded-lg"><div className="font-bold mb-1">Visitor Parking</div><div className="text-sm">Pay & Display (Main Loop)</div></div>
      </div>
    </div>
  )}
];
