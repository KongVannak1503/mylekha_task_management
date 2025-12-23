"use client";

import React, { useState } from "react";
import {
  Kanban,
  ListChecks,
  BarChart3,
  Archive,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Clock,
  MessageSquare,
  Paperclip,
  CheckSquare,
} from "lucide-react";
import TaskComponent from "./components/home/TaskComponent";
import KanbanComponent from "./components/home/KanbanComponent";
import TimelineComponent from "./components/home/TimelineComponent";

const Home = () => {
  const [activeTab, setActiveTab] = useState("task");

  const stats = [
    {
      label: "Total Task",
      value: "02",
      icon: ListChecks,
      color: "text-teal-600",
    },
    {
      label: "Unassigned",
      value: "19",
      icon: ListChecks,
      color: "text-teal-600",
    },
    {
      label: "Assigned",
      value: "05",
      icon: ListChecks,
      color: "text-teal-600",
    },
    { label: "Overdue", value: "03", icon: ListChecks, color: "text-teal-600" },
    {
      label: "High Priority",
      value: "03",
      icon: ListChecks,
      color: "text-teal-600",
    },
  ];

  const tasks = [
    {
      id: 1,
      name: "Create Mid-Fidelity Wireframe",
      team: ["M", "T", "B"],
      teamColors: ["bg-red-400", "bg-teal-400", "bg-blue-500"],
      deadline: "Jun 20, 2025",
      priority: "Priority 1",
      priorityColor: "bg-red-50 text-red-600",
      status: "Completed",
      statusColor: "bg-green-50 text-green-600",
      progress: 100,
      column: "done",
      comments: 3,
      attachments: 5,
      subtasks: "8/10",
    },
    {
      id: 2,
      name: "Develop UI Component Library",
      team: ["T", "P", "M"],
      teamColors: ["bg-teal-400", "bg-pink-500", "bg-purple-400"],
      deadline: "Jun 29, 2025",
      priority: "Priority 2",
      priorityColor: "bg-orange-50 text-orange-600",
      status: "In Progress",
      statusColor: "bg-blue-50 text-blue-600",
      progress: 70,
      column: "doing",
      comments: 4,
      attachments: 2,
      subtasks: "3/5",
    },
    {
      id: 3,
      name: "Run Usability Testing",
      team: ["B", "P"],
      teamColors: ["bg-blue-500", "bg-pink-500"],
      deadline: "Oct 15 2025",
      priority: "Priority 3",
      priorityColor: "bg-blue-50 text-blue-600",
      status: "Completed",
      statusColor: "bg-green-50 text-green-600",
      progress: 100,
      column: "done",
      comments: 3,
      attachments: 5,
      subtasks: "5/10",
    },
    {
      id: 4,
      name: "Design Responsive Layouts",
      team: ["A", "S", "Z"],
      teamColors: ["bg-gray-300", "bg-green-400", "bg-orange-400"],
      deadline: "Mar 3 2025",
      priority: "Priority 1",
      priorityColor: "bg-red-50 text-red-600",
      status: "Up Coming",
      statusColor: "bg-red-50 text-red-600",
      progress: 0,
      column: "todo",
      comments: 3,
      attachments: 5,
      subtasks: "0/10",
    },
    {
      id: 5,
      name: "Document Design Guidelines",
      team: ["M", "H", "B"],
      teamColors: ["bg-red-400", "bg-green-400", "bg-blue-500"],
      deadline: "Jun 20, 2025",
      priority: "Priority 3",
      priorityColor: "bg-blue-50 text-blue-600",
      status: "In Progress",
      statusColor: "bg-blue-50 text-blue-600",
      progress: 20,
      column: "doing",
      comments: 3,
      attachments: 5,
      subtasks: "2/10",
    },
    {
      id: 6,
      name: "Analyze insights",
      team: ["H"],
      teamColors: ["bg-yellow-400"],
      deadline: "Sep 23",
      priority: "Priority 1",
      priorityColor: "bg-red-50 text-red-600",
      status: "In Progress",
      statusColor: "bg-blue-50 text-blue-600",
      progress: 40,
      column: "doing",
      comments: 3,
      attachments: 2,
      subtasks: "3/10",
    },
  ];

  const tabs = [
    { id: "kanban", label: "Kanban", icon: Kanban },
    { id: "task", label: "Task", icon: ListChecks },
    { id: "timeline", label: "Timeline", icon: BarChart3 },
    { id: "archive", label: "Archive", icon: Archive },
  ];

  const kanbanColumns = [
    { id: "todo", title: "To Do", color: "border-red-400" },
    { id: "doing", title: "Doing", color: "border-blue-400" },
    { id: "done", title: "Done", color: "border-green-400" },
  ];

  const getTasksByColumn = (columnId) => {
    return tasks.filter((task) => task.column === columnId);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {/* Tabs Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-teal-600 bg-teal-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Kanban View */}
        {activeTab === "kanban" && (
          <KanbanComponent
            kanbanColumns={kanbanColumns}
            getTasksByColumn={getTasksByColumn}
          />
        )}

        {/* Task Table View */}
        {activeTab === "task" && <TaskComponent tasks={tasks} />}

        {activeTab === "archive" && (
          <KanbanComponent
            kanbanColumns={kanbanColumns}
            getTasksByColumn={getTasksByColumn}
          />
        )}

        {/* Timeline & Archive Views */}
        {activeTab === "timeline" && <TimelineComponent tasks={tasks} />}
      </div>
    </div>
  );
};

export default Home;
