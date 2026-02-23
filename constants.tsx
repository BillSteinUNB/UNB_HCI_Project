import React from 'react';
import { Room, Event, BuildingSection } from './types';
import { Clock, MapPin, Phone, AlertTriangle, Car } from 'lucide-react';

export const UNB_RED = '#C41230';
export const UNB_BLACK = '#1A1A1A';

export const MOCK_ROOMS: Room[] = [
  { id: "b8", number: "B-8", type: "Classroom", floor: "B", capacity: 30, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "b17", number: "B-17", type: "Classroom", floor: "B", capacity: 25, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "b24", number: "B-24", type: "Classroom", floor: "B", capacity: 35, features: ["Projector", "Whiteboard"], currentStatus: 'busy', schedule: [
    { time: "09:00-10:30", course: "C-34A", name: "Intro to Programming" }
  ]},
  { id: "itb213", number: "ITB213", type: "Lab", floor: "B", capacity: 60, features: ["Projector", "Computers"], officeTitle: "Communications and Network Lab", currentStatus: 'available', schedule: [] },
  { id: "itb214", number: "ITB214", type: "Lab", floor: "B", capacity: 60, features: ["Projector", "Computers"], officeTitle: "Human Computer Interaction Lab", currentStatus: 'available', schedule: [] },
  { id: "itb217", number: "ITB217", type: "Lab", floor: "B", capacity: 60, features: ["Projector", "Computers"], officeTitle: "Secure Systems Lab", currentStatus: 'available', schedule: [] },
  { id: "itb222", number: "ITB222", type: "Lab", floor: "B", capacity: 60, features: ["Projector", "Computers"], officeTitle: "Human Computer Interaction Lab 2", currentStatus: 'available', schedule: [] },
  { id: "itb215", number: "ITB213", type: "Study Space", floor: "B", capacity: 10, features: ["Computers"], officeTitle: "FCS Grad Students", currentStatus: 'available', schedule: [] },
  { id: "c307", number: "307", type: "Classroom", floor: "C", capacity: 40, features: ["Projector", "Whiteboard"], currentStatus: 'busy', schedule: [
    { time: "11:00-12:30", course: "C-18A", name: "Circuits I", active: true }
  ]},
  { id: "c314", number: "314", type: "Classroom", floor: "C", capacity: 35, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "c315", number: "315", type: "Classroom", floor: "C", capacity: 30, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c317", number: "317", type: "Classroom", floor: "C", capacity: 40, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c127a", number: "C127A", type: "Classroom", floor: "C", capacity: 20, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c127", number: "C127", type: "Classroom", floor: "C", capacity: 25, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "c122", number: "C122", type: "Classroom", floor: "C", capacity: 30, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c112", number: "C112", type: "Classroom", floor: "C", capacity: 25, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c111", number: "C111", type: "Classroom", floor: "C", capacity: 30, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c9", number: "C-9", type: "Classroom", floor: "C", capacity: 20, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c10", number: "C-10", type: "Classroom", floor: "C", capacity: 20, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c11", number: "C-11", type: "Classroom", floor: "C", capacity: 25, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "c13", number: "C-13", type: "Classroom", floor: "C", capacity: 30, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c24", number: "C-24", type: "Classroom", floor: "C", capacity: 35, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c25", number: "C-25", type: "Classroom", floor: "C", capacity: 30, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "c28", number: "C-28", type: "Classroom", floor: "C", capacity: 25, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "readingroom", number: "Reading Room", type: "Study Space", floor: "C", capacity: 50, features: ["Quiet Study", "Power Outlets"], currentStatus: 'available', schedule: [] },
  { id: "studyhall", number: "Study Hall", type: "Study Space", floor: "C", capacity: 100, features: ["Group Study", "Power Outlets"], currentStatus: 'available', schedule: [] },
  { id: "c124", number: "C124", type: "Eng. Student Lounge", floor: "C", capacity: 60, features: ["Seating", "Microwave", "Vending"], currentStatus: 'available', schedule: [] },
  { id: "csoffice", number: "Comp. Sci. Office", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] },
  { id: "c123", number: "C123", type: "EUS & Society Offices", floor: "C", capacity: 10, features: ["Meeting Space"], currentStatus: 'available', schedule: [] },
  { id: "deanoffice", number: "Dean of Engineering Office", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] },
  { id: "itc304", number: "ITC304", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], officeTitle: "Dean's Office", currentStatus: 'available', schedule: [] },
  { id: "itc307", number: "ITC307", type: "Conference Room", floor: "C", capacity: 12, features: ["Projector"], currentStatus: 'available', schedule: [] },
  { id: "itc314", number: "ITC314", type: "Office", floor: "C", capacity: 10, features: ["Office Hours"], officeTitle: "CS Co-op", currentStatus: 'available', schedule: [] },
  { id: "itc315", number: "ITC315", type: "Office", floor: "C", capacity: 10, features: ["Office Hours"], officeTitle: "Shared Office", currentStatus: 'available', schedule: [] },
  { id: "itc316", number: "ITC316", type: "Mail Room", floor: "C", capacity: 6, features: [], currentStatus: 'available', schedule: [] },
  { id: "itc317", number: "ITC317", type: "Classroom", floor: "C", capacity: 60, features: ["Projector"], currentStatus: 'available', schedule: [] },
  { id: "itc318", number: "ITC318", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Ken Kent", currentStatus: 'available', schedule: [] },
  { id: "itc319", number: "ITC319", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Sonya Hull", currentStatus: 'available', schedule: [] },
  { id: "itc320", number: "ITC320", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Andrew McAllister", currentStatus: 'available', schedule: [] },
  { id: "itc321", number: "ITC321", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "David Bremmner", currentStatus: 'available', schedule: [] },
  { id: "itc322", number: "ITC322", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Patricia Evans", currentStatus: 'available', schedule: [] },
  { id: "itc323", number: "ITC323", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], officeTitle: "Financial Coordinator", currentStatus: 'available', schedule: [] },
  { id: "itd405", number: "ITD405", type: "Study Space", floor: "C", capacity: 15, features: [], officeTitle: "Collaboration Space", currentStatus: 'available', schedule: [] },
  { id: "itd414", number: "ITD414", type: "Lab", floor: "C", capacity: 60, features: ["Computers", "Whiteboard","Projector"], officeTitle: "FCS Lab 1", currentStatus: 'available', schedule: [] },
  { id: "itd415", number: "ITD415", type: "Lab", floor: "C", capacity: 60, features: ["Computers", "Whiteboard","Projector"], officeTitle: "FCS Lab 2", currentStatus: 'available', schedule: [] },
  { id: "itd418", number: "ITD418", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Dawn McIsaac", currentStatus: 'available', schedule: [] },
  { id: "itd419", number: "ITD419", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Wei Song", currentStatus: 'available', schedule: [] },
  { id: "itd420", number: "ITD420", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Michael Fleming", currentStatus: 'available', schedule: [] },
  { id: "itd421", number: "ITD421", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Paul Cook", currentStatus: 'available', schedule: [] },
  { id: "itd422", number: "ITD422", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Leah Bidlake", currentStatus: 'available', schedule: [] },
  { id: "itd423", number: "ITD423", type: "Office", floor: "C", capacity: 5, features: ["Office Hours"], professor: "Natalie Webber", currentStatus: 'available', schedule: [] },
  { id: "d414", number: "414", type: "Classroom", floor: "D", capacity: 40, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d415", number: "415", type: "Classroom", floor: "D", capacity: 35, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "d124a", number: "D124A", type: "Classroom", floor: "D", capacity: 20, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d124", number: "D124", type: "Classroom", floor: "D", capacity: 30, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d110", number: "D110", type: "Classroom", floor: "D", capacity: 25, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d108", number: "D108", type: "Classroom", floor: "D", capacity: 30, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d118", number: "D118", type: "Classroom", floor: "D", capacity: 25, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d117", number: "D117", type: "Classroom", floor: "D", capacity: 30, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "d33", number: "D33", type: "Classroom", floor: "D", capacity: 35, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d124old", number: "124", type: "Old Head Hall Room", floor: "D", capacity: 30, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d128old", number: "128", type: "Old Head Hall Room", floor: "D", capacity: 25, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "d135old", number: "135", type: "Old Head Hall Room", floor: "D", capacity: 30, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "headrest", number: "Head Rest", type: "Study Space", floor: "D", capacity: 40, features: ["Seating", "Coffee"], currentStatus: 'available', schedule: [] },
  { id: "itsreception", number: "ITS Reception", type: "Service Desk", floor: "D", capacity: 5, features: ["Tech Support"], currentStatus: 'available', schedule: [] },
  { id: "eceoffice", number: "Electrical and Computer Office", type: "Office", floor: "D", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] },
  { id: "coopoffice", number: "Co-op Office", type: "Office", floor: "D", capacity: 5, features: ["Advising"], currentStatus: 'available', schedule: [] },
  { id: "civiloffice", number: "Civil Office", type: "Office", floor: "D", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] },
  { id: "chemoffice", number: "Chemical Office", type: "Office", floor: "D", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] },
  { id: "e211", number: "211", type: "Classroom", floor: "E", capacity: 35, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "e214", number: "214", type: "Classroom", floor: "E", capacity: 30, features: ["Whiteboard", "Projector"], currentStatus: 'available', schedule: [] },
  { id: "e224", number: "224", type: "Classroom", floor: "E", capacity: 40, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [
    { time: "14:00-15:30", course: "C-15A", name: "Thermodynamics", active: true }
  ]},
  { id: "e225", number: "225", type: "Classroom", floor: "E", capacity: 35, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "e4", number: "E-4", type: "Classroom", floor: "E", capacity: 25, features: ["Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "e11", number: "E-11", type: "Classroom", floor: "E", capacity: 30, features: ["Projector", "Whiteboard"], currentStatus: 'available', schedule: [] },
  { id: "cssquare", number: "CS Square", type: "Study Space", floor: "E", capacity: 80, features: ["Seating", "Power Outlets", "Collaboration"], currentStatus: 'available', schedule: [] },
  { id: "cic", number: "Canadian Institute for Cybersecurity", type: "Research Space", floor: "E", capacity: 20, features: ["Research Lab"], currentStatus: 'available', schedule: [] },
  { id: "tmeoffice", number: "TME Office", type: "Office", floor: "E", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] },
  { id: "mechoffice", number: "Mechanical Office", type: "Office", floor: "E", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] },
  { id: "geomaticsoffice", number: "Geomatics and Geodesy Office", type: "Office", floor: "E", capacity: 5, features: ["Office Hours"], currentStatus: 'available', schedule: [] }
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
  { id: 'contact', title: 'IT Service Desk', icon: <Phone className="w-6 h-6" />, content: (
    <div className="space-y-3">
      <div className="mb-4">
        <h4 className="font-bold text-lg mb-2">Fall/Winter Hours</h4>
        <div className="space-y-1 text-gray-700">
          <div>Monday - Friday: 8 a.m. - 8 p.m.</div>
          <div>Weekends + Holidays: 10 a.m. - 4:30 p.m.</div>
          <p className="text-sm text-gray-600 mt-2 italic">*In-person support is available during evening, weekend and holiday hours at the Fredericton HIL Service Desk only.</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-bold text-lg mb-2">Summer Hours</h4>
        <div className="space-y-1 text-gray-700">
          <div>Monday - Friday: 8 a.m. - 4:30 p.m.</div>
          <div>Weekends + Holidays: 10 a.m. - 4:30 p.m. (email and phone support only)</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg"><div className="text-sm text-gray-500 mb-1">Location</div><div className="font-semibold text-lg">Harriet Irving Library 1st floor</div></div>
        <div className="p-4 bg-gray-50 rounded-lg"><div className="text-sm text-gray-500 mb-1">Phone</div><div className="font-semibold text-lg">(506) 939-3131</div></div>
        <div className="p-4 bg-gray-50 rounded-lg col-span-2"><div className="text-sm text-gray-500 mb-1">Email</div><div className="font-semibold text-lg">itservicedesk@unb.ca</div></div>
      </div>
    </div>
  )},
  { id: 'emergency', title: 'Emergency Information', icon: <AlertTriangle className="w-6 h-6" />, content: (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 border-l-4 border-[#C41230] rounded-r-lg">
        <div className="font-bold text-[#C41230] text-lg mb-1">Campus Security</div>
        <div className="text-2xl font-black text-[#C41230]">(506) 453-4830</div>
        <div className="text-sm text-red-800 mt-1">security@unb.ca</div>
        <div className="text-sm text-red-800 mt-1">Available 24/7. For immediate emergencies, call 911 first.</div>
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
      <p className="text-gray-600">All parking on campus requires a valid permit or parking session through HotSpot. Accessible parking spaces are available throughout campus for those with provincial disability placards.</p>
      <div className="space-y-3">
        <div className="p-4 bg-blue-50 text-blue-900 rounded-lg">
          <div className="font-bold mb-1">Faculty/Staff & Student Parking</div>
          <div className="text-sm">Purchase long-term permits through HotSpot portal and app. Valid in designated faculty, staff, student, residence, or general parking areas.</div>
        </div>
        <div className="p-4 bg-gray-100 text-gray-900 rounded-lg">
          <div className="font-bold mb-1">Visitor Parking</div>
          <div className="text-sm">Designated visitor spaces (1 hour max) or general lots (hourly/daily) via HotSpot app or pay-by-plate machines.</div>
        </div>
        <div className="p-4 bg-gray-50 text-gray-700 rounded-lg">
          <div className="font-bold mb-1">Questions?</div>
          <div className="text-sm">Email: parking@unb.ca (Mon-Fri 8am-4pm)</div>
          <div className="text-sm">Urgent: (506) 453-4830</div>
        </div>
      </div>
    </div>
  )}
];
