"use client";

import React, { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/Card";
import { Task } from "@/types";
import { Plus } from "lucide-react";

export default function TasksPage() {
  const {
    tasks: filteredTasks,
    allTasks,
    completionRate,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    setFilter,
    reorderTasks,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSubmit = (task: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(null);
    } else {
      addTask(task);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Trading Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your daily trading tasks and maintain discipline
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditingTask(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          New Task
        </Button>
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Tasks
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {allTasks.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Completion Rate
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {completionRate}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p className="text-2xl font-bold text-green-600">
                {allTasks.filter((t) => t.status === "completed").length}/
                {allTasks.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      {showForm && (
        <TaskForm
          initialTask={editingTask || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onCompleteTask={completeTask}
        onDeleteTask={deleteTask}
        onEditTask={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
        onReorderTasks={reorderTasks}
        showFilters={true}
        onFilterChange={(filters) => {
          setFilter(filters);
        }}
      />
    </div>
  );
}
