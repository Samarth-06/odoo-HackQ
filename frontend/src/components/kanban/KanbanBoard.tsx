import React, { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from './TaskModal';
import { Plus, Filter } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  equipment: string;
  dueDate: string;
  tags: string[];
  column: 'backlog' | 'todo' | 'in-progress' | 'review' | 'completed';
}

export function KanbanBoard() {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Forklift Oil Change',
      description: 'Replace oil and filters on Forklift #A-203',
      priority: 'urgent',
      assignee: 'Mike Johnson',
      equipment: 'Forklift #A-203',
      dueDate: 'Dec 28, 2025',
      tags: ['Maintenance', 'Urgent'],
      column: 'todo',
    },
    {
      id: '2',
      title: 'Generator Inspection',
      description: 'Quarterly inspection of Generator B-45',
      priority: 'medium',
      assignee: 'Sarah Chen',
      equipment: 'Generator B-45',
      dueDate: 'Dec 30, 2025',
      tags: ['Inspection'],
      column: 'in-progress',
    },
    {
      id: '3',
      title: 'HVAC Filter Replacement',
      description: 'Replace filters in HVAC Unit #12',
      priority: 'medium',
      assignee: 'Tom Wilson',
      equipment: 'HVAC Unit #12',
      dueDate: 'Jan 2, 2026',
      tags: ['Maintenance'],
      column: 'todo',
    },
    {
      id: '4',
      title: 'Compressor Repair',
      description: 'Fix pressure issue in Compressor C-19',
      priority: 'high',
      assignee: 'Mike Johnson',
      equipment: 'Compressor C-19',
      dueDate: 'Dec 27, 2025',
      tags: ['Repair', 'High Priority'],
      column: 'review',
    },
    {
      id: '5',
      title: 'CNC Calibration',
      description: 'Calibrate CNC Machine #5',
      priority: 'low',
      assignee: 'David Lee',
      equipment: 'CNC Machine #5',
      dueDate: 'Jan 5, 2026',
      tags: ['Calibration'],
      column: 'backlog',
    },
    {
      id: '6',
      title: 'Truck Tire Rotation',
      description: 'Rotate tires on Truck Fleet #7',
      priority: 'medium',
      assignee: 'Sarah Chen',
      equipment: 'Truck Fleet #7',
      dueDate: 'Jan 5, 2026',
      tags: ['Maintenance', 'Fleet'],
      column: 'in-progress',
    },
    {
      id: '7',
      title: 'Conveyor Belt Inspection',
      description: 'Monthly safety inspection',
      priority: 'high',
      assignee: 'Mike Johnson',
      equipment: 'Conveyor #3',
      dueDate: 'Dec 29, 2025',
      tags: ['Safety', 'Inspection'],
      column: 'backlog',
    },
    {
      id: '8',
      title: 'Welding Equipment Service',
      description: 'Annual service and safety check',
      priority: 'low',
      assignee: 'Tom Wilson',
      equipment: 'Welder #A-5',
      dueDate: 'Jan 10, 2026',
      tags: ['Maintenance'],
      column: 'completed',
    },
  ]);

  const columns = [
    { id: 'backlog', title: 'Backlog', color: 'gray' },
    { id: 'todo', title: 'To Do', color: 'blue' },
    { id: 'in-progress', title: 'In Progress', color: 'orange' },
    { id: 'review', title: 'Review', color: 'purple' },
    { id: 'completed', title: 'Completed', color: 'green' },
  ];

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, task]);
    setShowModal(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    setShowModal(false);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const moveTask = (taskId: string, newColumn: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, column: newColumn as any } : task
      )
    );
  };

  const filteredTasks = filterPriority === 'all'
    ? tasks
    : tasks.filter(task => task.priority === filterPriority);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Task Board</h1>
          <p className="text-gray-600 mt-1">
            Manage maintenance requests and track progress
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C3AED] text-white rounded-lg transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filter by priority:</span>
          </div>
          <div className="flex gap-2">
            {['all', 'urgent', 'high', 'medium', 'low'].map((priority) => (
              <button
                key={priority}
                onClick={() => setFilterPriority(priority)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${
                  filterPriority === priority
                    ? 'bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] text-[#6366F1] border border-[#C7D2FE]'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={filteredTasks.filter((task) => task.column === column.id)}
            onTaskClick={handleEdit}
            onTaskDelete={handleDeleteTask}
            onTaskMove={moveTask}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={editingTask ? handleEditTask : handleAddTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
