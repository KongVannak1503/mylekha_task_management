"use client";

import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button, Flex } from "@radix-ui/themes";
import { XCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface CancelConfirmProps {
  redirectTo: string; // This makes the destination dynamic
  triggerLabel?: string;
}

export const CancelButtonWithConfirm = ({
  redirectTo,
  triggerLabel = "Cancel",
}: CancelConfirmProps) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button
          variant="soft"
          color="gray"
          size="3"
          className="cursor-pointer px-6"
        >
          <XCircle size={18} />
          {triggerLabel}
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[90vw] max-w-md p-6 z-50 animate-in zoom-in-95">
          <Flex
            direction="column"
            gap="3"
            align="center"
            className="text-center"
          >
            <div className="p-3 bg-orange-100 rounded-full text-orange-600 mb-2">
              <AlertTriangle size={32} />
            </div>
            <AlertDialog.Title className="text-xl font-bold">
              Discard Changes?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-gray-500 text-sm">
              Any unsaved data will be lost. Are you sure you want to go back?
            </AlertDialog.Description>
          </Flex>
          <hr className="border-0 py-2" />
          <Flex gap="5" mt="6" justify="center">
            <AlertDialog.Cancel asChild>
              <Button
                variant="soft"
                size="3"
                className="flex-1 cursor-pointer !bg-gray-100 !rounded !px-2"
              >
                No, stay
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Button
                variant="solid"
                size="3"
                className="flex-1 cursor-pointer !text-red-500 !ml-2 !rounded !bg-red-50 hover:!bg-red-100 !px-2"
                onClick={() => router.push(redirectTo)} // Dynamic navigation happens here
              >
                Yes, discard
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
