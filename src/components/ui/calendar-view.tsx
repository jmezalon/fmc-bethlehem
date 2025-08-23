'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface CalendarViewProps {
  events: any[];
  onEventClick: (event: any) => void;
}

export function CalendarView({ events, onEventClick }: CalendarViewProps) {
  const t = useTranslations('events.calendar');
  const locale = useLocale() as 'en' | 'ht' | 'fr';
  
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = useMemo(() => {
    const names = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2024, i, 1);
      names.push(date.toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'long' }));
    }
    return names;
  }, [locale]);

  const dayNames = useMemo(() => {
    const names = [];
    const startDate = new Date(2024, 0, 7); // Start with Sunday
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      names.push(date.toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short' }));
    }
    return names;
  }, [locale]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-card-foreground">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={goToToday}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {t('today')}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map((day, index) => (
          <div key={index} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isCurrentDay = isToday(date);
          
          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 border border-border/50 ${
                date ? 'bg-background hover:bg-muted/50 cursor-pointer' : 'bg-muted/20'
              } ${isCurrentDay ? 'bg-primary/10 border-primary/30' : ''}`}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentDay ? 'text-primary' : 'text-foreground'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event, eventIndex) => (
                      <button
                        key={eventIndex}
                        onClick={() => onEventClick(event)}
                        className="w-full text-left p-1 bg-primary/20 text-primary text-xs rounded truncate hover:bg-primary/30 transition-colors"
                      >
                        {event.title[locale]}
                      </button>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents.length - 2} {t('more')}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
