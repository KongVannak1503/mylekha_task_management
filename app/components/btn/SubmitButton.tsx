import React from "react";
import { Button } from "@radix-ui/themes";
import { Save } from "lucide-react";

interface SubmitButtonProps {
  label?: string;
  loading?: boolean;
  onClick?: () => void;
}

export const SubmitButton = ({
  label = "Create User",
  loading,
  onClick,
}: SubmitButtonProps) => {
  return (
    <Button
      size="3"
      variant="solid"
      color="teal"
      loading={loading} // Radix UI automatically shows a spinner when true
      onClick={onClick}
      className="cursor-pointer hover:opacity-90 transition-all active:scale-95"
    >
      {!loading && <Save size={18} />}
      {label}
    </Button>
  );
};
