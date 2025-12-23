import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { ButtonCreateComponents } from "../btn/ButtonCreate";

interface PageHeaderProps {
  title: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  addButtonLabel?: string;
  showFilter?: boolean;
}

export const PageHeader = ({
  title,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  onAddClick,
  addButtonLabel = "Add New",
  showFilter = true,
}: PageHeaderProps) => {
  return (
    <div className="pb-4  flex items-center justify-between  rounded-t-xl">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={16}
          />
        </div>

        {/* Optional Filter Button */}
        {showFilter && (
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        )}

        <ButtonCreateComponents label={addButtonLabel} onClick={onAddClick} />
      </div>
    </div>
  );
};
