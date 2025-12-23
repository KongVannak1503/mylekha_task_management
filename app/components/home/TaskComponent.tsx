import { Edit2, Trash2 } from "lucide-react";
import React from "react";

const TaskComponent = ({ tasks }) => {
  return (
    <>
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
        <span className="text-sm text-slate-500">
          Showing 1-{tasks.length} from 26
        </span>
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
    </>
  );
};

export default TaskComponent;
