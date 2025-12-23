import React from "react";

const TimelineComponent = ({ tasks }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
            Today
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <button className="p-1 hover:bg-slate-100 rounded">
              <span className="text-lg">‹</span>
            </button>
            <span className="font-medium">September 08 – 14</span>
            <button className="p-1 hover:bg-slate-100 rounded">
              <span className="text-lg">›</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded transition-colors">
            Day view
          </button>
          <button className="px-3 py-1.5 text-sm text-teal-600 bg-teal-50 font-medium rounded transition-colors">
            Week view
          </button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 bg-slate-50">
          <div className="border-r border-slate-200"></div>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, idx) => (
            <div
              key={day}
              className="px-4 py-3 text-center border-r border-slate-200 last:border-r-0"
            >
              <div className="text-xs font-semibold text-slate-500 mb-1">
                {day}
              </div>
              <div
                className={`text-lg font-semibold ${
                  idx === 1
                    ? "w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto"
                    : "text-slate-700"
                }`}
              >
                {8 + idx}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8 min-h-[600px]">
          <div className="border-r border-slate-200 bg-slate-50">
            {[...Array(24)].map((_, hour) => (
              <div
                key={hour}
                className="h-20 border-b border-slate-200 px-3 py-2 text-xs text-slate-400"
              >
                {hour.toString().padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {[...Array(7)].map((_, dayIdx) => (
            <div
              key={dayIdx}
              className="border-r border-slate-200 last:border-r-0 relative"
            >
              {[...Array(24)].map((_, hour) => (
                <div
                  key={hour}
                  className="h-20 border-b border-slate-200"
                ></div>
              ))}

              {tasks
                .filter((task) => task.timelineDay === dayIdx)
                .map((task, taskIdx) => (
                  <div
                    key={task.id}
                    className="absolute left-1 right-1 bg-white rounded-lg border-l-4 shadow-sm p-3 hover:shadow-md transition-shadow"
                    style={{
                      top: `${80 + taskIdx * 120}px`,
                      height: "110px",
                      borderLeftColor:
                        task.progress === 100
                          ? "#10b981"
                          : task.priority === "Priority 1"
                          ? "#ef4444"
                          : task.priority === "Priority 2"
                          ? "#f97316"
                          : "#3b82f6",
                    }}
                  >
                    <h4 className="text-xs font-semibold text-slate-800 mb-2 line-clamp-2">
                      {task.name}
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      {task.team.slice(0, 2).map((member, idx) => (
                        <div
                          key={idx}
                          className={`w-5 h-5 rounded-full ${task.teamColors[idx]} flex items-center justify-center text-white text-[10px] font-semibold`}
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            task.progress === 100
                              ? "bg-green-500"
                              : task.progress >= 50
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
