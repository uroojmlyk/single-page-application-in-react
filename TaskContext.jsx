// src/context/TaskContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

const initialTasks = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create responsive design for homepage',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-20',
    assignee: 'John Doe',
    tags: ['design', 'frontend'],
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    title: 'Fix Authentication Bug',
    description: 'Login not working on mobile devices',
    status: 'pending',
    priority: 'urgent',
    dueDate: '2024-01-15',
    assignee: 'Jane Smith',
    tags: ['backend', 'bug'],
    createdAt: '2024-01-12',
  },
  {
    id: '3',
    title: 'Write Documentation',
    description: 'API documentation for new endpoints',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-01-18',
    assignee: 'Alex Johnson',
    tags: ['documentation'],
    createdAt: '2024-01-08',
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflow-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const saveToStorage = useCallback((updatedTasks) => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(updatedTasks));
  }, []);

  const addTask = useCallback((newTask) => {
    const taskWithId = {
      ...newTask,
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    
    setTasks(prev => {
      const updated = [taskWithId, ...prev];
      saveToStorage(updated);
      return updated;
    });
    
    return taskWithId;
  }, [saveToStorage]);

  const updateTask = useCallback((taskId, updates) => {
    setTasks(prev => {
      const updated = prev.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => {
      const updated = prev.filter(task => task.id !== taskId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const toggleTaskStatus = useCallback((taskId) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          const newStatus = task.status === 'completed' ? 'pending' : 'completed';
          return { ...task, status: newStatus };
        }
        return task;
      });
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const getTaskStats = useCallback(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, inProgress, pending, progress };
  }, [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      getTaskStats,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};