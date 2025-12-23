import React from "react";
import { Plus } from "lucide-react";

interface Props {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const ButtonCreateComponents = ({
  label,
  onClick,
  icon = <Plus size={16} />,
  variant = "primary",
}: Props) => {
  const baseStyles =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95";

  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-teal-100",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {icon}
      {label}
    </button>
  );
};
