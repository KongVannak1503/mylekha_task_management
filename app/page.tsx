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
} from "lucide-react";

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
    },
    {
      id: 2,
      name: "Develop UI Component Library",
      team: ["T", "P", "M"],
      teamColors: ["bg-teal-400", "bg-pink-500"],
      deadline: "Jun 29, 2025",
      priority: "Priority 2",
      priorityColor: "bg-orange-50 text-orange-600",
      status: "In Progress",
      statusColor: "bg-blue-50 text-blue-600",
      progress: 70,
    },
    {
      id: 3,
      name: "Run Usability Testing",
      team: ["B", "P"],
      teamColors: ["bg-teal-400", "bg-gray-400", "bg-purple-400"],
      deadline: "Oct 15 2025",
      priority: "Priority 3",
      priorityColor: "bg-blue-50 text-blue-600",
      status: "Completed",
      statusColor: "bg-green-50 text-green-600",
      progress: 100,
    },
    {
      id: 4,
      name: "Design Responsive Layouts",
      team: ["A", "S", "Z"],
      teamColors: ["bg-gray-300", "bg-gray-300", "bg-orange-400"],
      deadline: "Mar 3 2025",
      priority: "Priority 1",
      priorityColor: "bg-red-50 text-red-600",
      status: "Up Coming",
      statusColor: "bg-red-50 text-red-600",
      progress: 70,
    },
    {
      id: 5,
      name: "Document Design Guidelines",
      team: ["M", "H", "B"],
      teamColors: ["bg-red-400", "bg-green-400", "bg-gray-400"],
      deadline: "Jun 20, 2025",
      priority: "Priority 3",
      priorityColor: "bg-blue-50 text-blue-600",
      status: "In Progress",
      statusColor: "bg-blue-50 text-blue-600",
      progress: 20,
    },
  ];

  const tabs = [
    { id: "kanban", label: "Kanban", icon: Kanban },
    { id: "task", label: "Task", icon: ListChecks },
    { id: "timeline", label: "Timeline", icon: BarChart3 },
    { id: "archive", label: "Archive", icon: Archive },
  ];

  return (
    <div className="space-y-6">
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Team Members
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {task.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {task.team.map((member, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-full ${task.teamColors[idx]} flex items-center justify-center text-white text-xs font-semibold border-2 border-white`}
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {task.deadline}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${task.priorityColor}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${task.statusColor}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600 min-w-[35px]">
                        {task.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <span className="text-sm text-slate-500">Showing 1-5 from 26</span>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition-colors">
              ‹
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded transition-colors ${
                  page === 1
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-slate-400 px-2">...</span>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded transition-colors">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
