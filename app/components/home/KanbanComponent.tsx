import { CheckSquare, Clock, MessageSquare, Paperclip } from "lucide-react";
import React from "react";

const KanbanComponent = ({ kanbanColumns, getTasksByColumn }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kanbanColumns.map((column) => (
          <div key={column.id} className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-1 h-6 rounded ${column.color} border-2`}
                ></div>
                <h3 className="font-semibold text-slate-700">{column.title}</h3>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <span className="text-xl">⋮</span>
              </button>
            </div>
            <div className="space-y-3 flex-1">
              {getTasksByColumn(column.id).map((task) => (
                <div
                  key={task.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-800 flex-1">
                      {task.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${task.priorityColor}`}
                    >
                      {task.priority.replace("Priority ", "P")}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${task.statusColor}`}
                    >
                      {task.status === "Up Coming" ? "Check" : "Approve"}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500">Progress</span>
                      <span className="text-xs font-medium text-slate-600">
                        {task.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {task.team.map((member, idx) => (
                        <div
                          key={idx}
                          className={`w-7 h-7 rounded-full ${task.teamColors[idx]} flex items-center justify-center text-white text-xs font-semibold border-2 border-white`}
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{task.deadline.split(",")[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{task.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{task.attachments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>{task.subtasks}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-sm text-slate-500 hover:border-teal-300 hover:text-teal-600 transition-colors">
                + Add new task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanComponent;
