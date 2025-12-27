import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 27)); // December 27, 2025

  const events = [
    { date: 28, title: 'Forklift #A-203 - Oil Change', status: 'urgent' },
    { date: 30, title: 'Generator B-45 - Filter Replacement', status: 'upcoming' },
    { date: 2, title: 'HVAC Unit #12 - Inspection', status: 'upcoming', nextMonth: true },
    { date: 5, title: 'Truck Fleet #7 - Tire Rotation', status: 'scheduled', nextMonth: true },
    { date: 8, title: 'Compressor C-19 - Pressure Check', status: 'scheduled', nextMonth: true },
    { date: 15, title: 'Forklift #A-203 - Completed', status: 'completed' },
    { date: 12, title: 'Generator B-45 - Completed', status: 'completed' },
    { date: 10, title: 'Compressor C-19 - Emergency Repair', status: 'completed' },
  ];

  const statusColors = {
    completed: 'bg-green-100 text-green-700 border-green-300',
    urgent: 'bg-red-100 text-red-700 border-red-300',
    upcoming: 'bg-orange-100 text-orange-700 border-orange-300',
    scheduled: 'bg-blue-100 text-blue-700 border-blue-300',
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date(2025, 11, 27); // December 27, 2025
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    const isCurrentMonth = currentDate.getMonth() === 11; // December
    const isNextMonth = currentDate.getMonth() === 0; // January
    
    return events.filter(event => {
      if (isCurrentMonth && !event.nextMonth && event.date === day) return true;
      if (isNextMonth && event.nextMonth && event.date === day) return true;
      return false;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Maintenance Calendar</h1>
          <p className="text-gray-600 mt-1">Schedule and track maintenance activities</p>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square p-2"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEvents = getEventsForDay(day);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`aspect-square p-2 border rounded-lg transition-all hover:shadow-md ${
                  today
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className={`text-sm mb-1 ${
                    today ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-1 rounded border ${
                        statusColors[event.status as keyof typeof statusColors]
                      } truncate`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
            <span className="text-gray-700">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
            <span className="text-gray-700">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-100 border border-orange-300"></div>
            <span className="text-gray-700">Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
            <span className="text-gray-700">Urgent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
