import React from "react";
import { Button } from "@radix-ui/themes";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface CancelButtonProps {
  label?: string;
  onClick?: () => void; // Add this prop
}

export const CancelButton = ({
  label = "Cancel",
  onClick,
}: CancelButtonProps) => {
  const router = useRouter();

  // If the user provides an onClick, use it.
  // Otherwise, default to going back to the users list.
  const handleCancel = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/users");
    }
  };

  return (
    <Button
      variant="soft"
      color="gray"
      size="3"
      onClick={handleCancel}
      style={{ cursor: "pointer" }}
      className="px-6 hover:bg-gray-200 transition-colors"
    >
      <XCircle size={18} />
      {label}
    </Button>
  );
};
