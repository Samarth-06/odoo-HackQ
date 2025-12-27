import React from 'react';
import { Task } from './KanbanBoard';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: {
    id: string;
    title: string;
    color: string;
  };
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskDelete: (id: string) => void;
  onTaskMove: (taskId: string, newColumn: string) => void;
}

export function KanbanColumn({ column, tasks, onTaskClick, onTaskDelete, onTaskMove }: KanbanColumnProps) {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-green-100 text-green-700',
  };

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`px-4 py-3 rounded-lg mb-4 flex items-center justify-between ${colorClasses[column.color as keyof typeof colorClasses]}`}>
        <h3>{column.title}</h3>
        <span className="px-2 py-1 bg-white bg-opacity-50 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
            onDelete={() => onTaskDelete(task.id)}
            onMove={onTaskMove}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="bg-white bg-opacity-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
