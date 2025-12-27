import React, { useState } from 'react';
import { Task } from './KanbanBoard';
import { Calendar, User, AlertCircle, ChevronRight, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
  onMove: (taskId: string, newColumn: string) => void;
}

export function TaskCard({ task, onClick, onDelete, onMove }: TaskCardProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  const priorityConfig = {
    urgent: {
      color: 'bg-red-100 text-red-700 border-red-300',
      dot: 'bg-red-500',
    },
    high: {
      color: 'bg-orange-100 text-orange-700 border-orange-300',
      dot: 'bg-orange-500',
    },
    medium: {
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      dot: 'bg-blue-500',
    },
    low: {
      color: 'bg-gray-100 text-gray-700 border-gray-300',
      dot: 'bg-gray-500',
    },
  };

  const config = priorityConfig[task.priority];

  const columns = [
    { id: 'backlog', label: 'Backlog' },
    { id: 'todo', label: 'To Do' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'review', label: 'Review' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
      <div onClick={onClick}>
        {/* Priority Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs border ${config.color} capitalize`}>
            {task.priority}
          </span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMoveMenu(!showMoveMenu);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-gray-900 mb-2">{task.title}</h4>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>

        {/* Equipment */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <AlertCircle className="w-4 h-4" />
          <span className="truncate">{task.equipment}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span className="truncate max-w-[100px]">{task.assignee}</span>
          </div>
        </div>
      </div>

      {/* Move Menu */}
      {showMoveMenu && (
        <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
          <p className="text-xs text-gray-500 mb-2">Move to:</p>
          {columns.filter(col => col.id !== task.column).map((col) => (
            <button
              key={col.id}
              onClick={(e) => {
                e.stopPropagation();
                onMove(task.id, col.id);
                setShowMoveMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
            >
              {col.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
