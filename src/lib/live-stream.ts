import { format, isWithinInterval, parseISO, startOfDay, addHours, addMinutes } from 'date-fns';

export interface ServiceSchedule {
  name: string;
  day: number; // 0 = Sunday, 1 = Monday, etc.
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  description: string;
  language: string;
}

export interface CurrentServiceInfo {
  isLive: boolean;
  currentService: ServiceSchedule | null;
  nextService: ServiceSchedule | null;
  timeUntilNext: string | null;
}

export interface SpecialEvent {
  name: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  startTime: string; // 24-hour format "HH:MM"
  endTime: string;
  language: string;
  daysOfWeek?: number[]; // Optional: specific days, if not provided applies to all days in range
}

export const SERVICE_SCHEDULE: ServiceSchedule[] = [
  {
    name: "Sunday Morning Worship",
    day: 0, // Sunday
    startHour: 9,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    description: "Join us for worship, prayer, and the Word",
    language: "English & Haitian Creole"
  },
  {
    name: "Sunday Afternoon Service",
    day: 0, // Sunday
    startHour: 12,
    startMinute: 30,
    endHour: 14,
    endMinute: 30,
    description: "Continued worship and fellowship",
    language: "Haitian Creole"
  },
  {
    name: "Monday Fasting & Prayer",
    day: 1, // Monday
    startHour: 8,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    description: "Morning fasting and prayer service",
    language: "Multilingual"
  },
  {
    name: "Wednesday Prayer Service",
    day: 3, // Wednesday
    startHour: 19,
    startMinute: 0,
    endHour: 21,
    endMinute: 0,
    description: "Mid-week prayer and Bible study",
    language: "Multilingual"
  }
];

// Special events that override regular schedule
export const SPECIAL_EVENTS: SpecialEvent[] = [
  // Example: Revival Week - uncomment and update dates when needed
  // {
  //   name: "Revival Week",
  //   description: "Nightly revival services",
  //   startDate: "2024-03-10", // Update with actual dates
  //   endDate: "2024-03-16",
  //   startTime: "19:00",
  //   endTime: "21:45",
  //   language: "Multilingual"
  // }
];

/**
 * Check if there's an active special event
 */
function getActiveSpecialEvent(now: Date): SpecialEvent | null {
  const currentDate = format(now, 'yyyy-MM-dd');
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  for (const event of SPECIAL_EVENTS) {
    // Check if current date is within event range
    if (currentDate >= event.startDate && currentDate <= event.endDate) {
      // If specific days are defined, check if today is included
      if (event.daysOfWeek && !event.daysOfWeek.includes(currentDay)) {
        continue;
      }

      // Parse event times
      const [startHour, startMinute] = event.startTime.split(':').map(Number);
      const [endHour, endMinute] = event.endTime.split(':').map(Number);
      const eventStartInMinutes = startHour * 60 + startMinute;
      const eventEndInMinutes = endHour * 60 + endMinute;

      // Check if current time is within event time
      if (currentTimeInMinutes >= eventStartInMinutes && currentTimeInMinutes <= eventEndInMinutes) {
        return event;
      }
    }
  }

  return null;
}

/**
 * Check if current time falls within a service schedule
 */
function isServiceActive(service: ServiceSchedule, now: Date): boolean {
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
  if (currentDay !== service.day) {
    return false;
  }
  
  const serviceStartInMinutes = service.startHour * 60 + service.startMinute;
  const serviceEndInMinutes = service.endHour * 60 + service.endMinute;
  
  return currentTimeInMinutes >= serviceStartInMinutes && currentTimeInMinutes <= serviceEndInMinutes;
}

/**
 * Get the next upcoming service
 */
function getNextService(now: Date): ServiceSchedule | null {
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
  // First, check for services later today
  const todayServices = SERVICE_SCHEDULE.filter(service => service.day === currentDay);
  const upcomingTodayServices = todayServices.filter(service => {
    const serviceStartInMinutes = service.startHour * 60 + service.startMinute;
    return serviceStartInMinutes > currentTimeInMinutes;
  });
  
  if (upcomingTodayServices.length > 0) {
    return upcomingTodayServices[0];
  }
  
  // If no services today, find the next service in the week
  for (let dayOffset = 1; dayOffset <= 7; dayOffset++) {
    const targetDay = (currentDay + dayOffset) % 7;
    const servicesOnDay = SERVICE_SCHEDULE.filter(service => service.day === targetDay);
    
    if (servicesOnDay.length > 0) {
      // Return the first service of that day
      return servicesOnDay.sort((a, b) => {
        const aTime = a.startHour * 60 + a.startMinute;
        const bTime = b.startHour * 60 + b.startMinute;
        return aTime - bTime;
      })[0];
    }
  }
  
  return null;
}

/**
 * Calculate time until next service
 */
function getTimeUntilNext(nextService: ServiceSchedule, now: Date): string {
  const currentDay = now.getDay();
  const nextServiceDay = nextService.day;
  
  let daysUntil = nextServiceDay - currentDay;
  if (daysUntil <= 0) {
    daysUntil += 7;
  }
  
  const nextServiceDate = new Date(now);
  nextServiceDate.setDate(nextServiceDate.getDate() + daysUntil);
  nextServiceDate.setHours(nextService.startHour, nextService.startMinute, 0, 0);
  
  // If it's the same day, calculate hours/minutes
  if (daysUntil === 0 || (daysUntil === 7 && nextServiceDay === currentDay)) {
    const timeDiff = nextServiceDate.getTime() - now.getTime();
    const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesUntil = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursUntil > 0) {
      return `${hoursUntil}h ${minutesUntil}m`;
    } else {
      return `${minutesUntil}m`;
    }
  }
  
  // For different days
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeString = `${nextService.startHour.toString().padStart(2, '0')}:${nextService.startMinute.toString().padStart(2, '0')}`;
  
  if (daysUntil === 1) {
    return `Tomorrow at ${timeString}`;
  } else {
    return `${dayNames[nextServiceDay]} at ${timeString}`;
  }
}

/**
 * Get current live stream status and service information
 */
export function getCurrentServiceInfo(): CurrentServiceInfo {
  const now = new Date();
  
  // First check for special events (they override regular schedule)
  const activeSpecialEvent = getActiveSpecialEvent(now);
  
  if (activeSpecialEvent) {
    // Convert special event to service format for consistency
    const specialService: ServiceSchedule = {
      name: activeSpecialEvent.name,
      day: now.getDay(),
      startHour: parseInt(activeSpecialEvent.startTime.split(':')[0]),
      startMinute: parseInt(activeSpecialEvent.startTime.split(':')[1]),
      endHour: parseInt(activeSpecialEvent.endTime.split(':')[0]),
      endMinute: parseInt(activeSpecialEvent.endTime.split(':')[1]),
      description: activeSpecialEvent.description,
      language: activeSpecialEvent.language
    };
    
    return {
      isLive: true,
      currentService: specialService,
      nextService: getNextService(now),
      timeUntilNext: null // Special events don't show countdown
    };
  }
  
  // Check regular schedule if no special event
  const currentService = SERVICE_SCHEDULE.find(service => isServiceActive(service, now)) || null;
  const isLive = currentService !== null;
  
  // Get next service
  const nextService = getNextService(now);
  const timeUntilNext = nextService ? getTimeUntilNext(nextService, now) : null;
  
  return {
    isLive,
    currentService,
    nextService,
    timeUntilNext
  };
}

/**
 * Format service time for display
 */
export function formatServiceTime(service: ServiceSchedule): string {
  const startTime = `${service.startHour.toString().padStart(2, '0')}:${service.startMinute.toString().padStart(2, '0')}`;
  const endTime = `${service.endHour.toString().padStart(2, '0')}:${service.endMinute.toString().padStart(2, '0')}`;
  return `${startTime} - ${endTime}`;
}

/**
 * Get day name from day number
 */
export function getDayName(dayNumber: number): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[dayNumber];
}
