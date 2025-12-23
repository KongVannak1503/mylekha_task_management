"use client";

import React, { useState, useRef, use } from "react";
import {
  Grid,
  Box,
  TextField,
  Text,
  Button,
  Flex,
  Avatar,
  Select,
  Switch,
} from "@radix-ui/themes";
import { Upload, X, User as UserIcon } from "lucide-react";
import { SubmitButton } from "@/app/components/btn/SubmitButton";
import { useRouter } from "next/navigation";
import { CancelButton } from "@/app/components/btn/CancelButton";
import { CancelButtonWithConfirm } from "@/app/components/btn/CancelButtonWithConfirm";

type UserRole =
  | "Admin"
  | "Project Manager"
  | "Developer"
  | "Designer"
  | "Viewer";

interface Props {
  params: Promise<{ id: string }>;
}

const UserEditPage = ({ params }: Props) => {
  // 2. Main State for the form
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>("Developer");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    // 1. Start the spinner
    setIsSubmitting(true);

    try {
      // 2. Simulate an API call (wait 2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("User Saved successfully!");
      // Here you would usually navigate away: router.push('/users')
    } catch (error) {
      console.error(error);
    } finally {
      // 3. Stop the spinner
      setIsSubmitting(false);
    }
  };

  const onCancel = () => {
    const confirmLeave = window.confirm(
      "Are you sure? Unsaved changes will be lost."
    );
    if (confirmLeave) {
      router.push("/users");
    }
  };

  return (
    <Box className="bg-gray-50 min-h-screen">
      <Box p="6" className="bg-white rounded-xl shadow-sm max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">New User {id}</h1>

        <Grid columns={{ initial: "1", md: "1fr 2fr" }} gap="8" align="start">
          {/* LEFT SIDE: Image Section (1/3) */}
          <Flex
            direction="column"
            align="center"
            gap="4"
            className="p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 relative"
          >
            <Text size="2" weight="bold" color="gray">
              Profile Picture
            </Text>

            <Box position="relative">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-40 h-40 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <Avatar
                  size="8"
                  fallback={<UserIcon size={48} />}
                  radius="full"
                  color="gray"
                  variant="soft"
                />
              )}
            </Box>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <Button
              variant="outline"
              color="teal"
              size="2"
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer"
            >
              <Upload size={16} />
              {previewUrl ? "Change Image" : "Choose Image"}
            </Button>

            <Text size="1" color="gray" align="center">
              Allowed JPG, PNG or GIF. Max size 2MB.
            </Text>
          </Flex>

          {/* RIGHT SIDE: Form Section (2/3) */}
          <div className="space-y-6">
            <Grid columns={{ initial: "1", sm: "2" }} gap="5">
              <Box>
                <Text as="label" size="2" mb="1" weight="bold" display="block">
                  Name
                </Text>
                <TextField.Root
                  size="3"
                  placeholder="First name"
                  className="focus-within:ring-2 focus-within:ring-teal-500 outline-none"
                />
              </Box>

              <Box>
                <Text as="label" size="2" mb="1" weight="bold" display="block">
                  Email
                </Text>
                <TextField.Root
                  size="3"
                  type="email"
                  placeholder="Email address"
                  className="focus-within:ring-2 focus-within:ring-teal-500 outline-none"
                />
              </Box>

              <Box>
                <Text as="label" size="2" mb="1" weight="bold" display="block">
                  Password
                </Text>
                <TextField.Root
                  size="3"
                  type="password"
                  placeholder="Enter password"
                  className="focus-within:ring-2 focus-within:ring-teal-500 outline-none"
                />
              </Box>

              <Box>
                <Text as="label" size="2" mb="1" weight="bold" display="block">
                  Confirm Password
                </Text>
                <TextField.Root
                  size="3"
                  type="password"
                  placeholder="Repeat password"
                  className="focus-within:ring-2 focus-within:ring-teal-500 outline-none"
                />
              </Box>
            </Grid>
            <Box>
              <Text as="label" size="2" mb="1" weight="bold" display="block">
                Select Role
              </Text>
              <Select.Root
                value={role}
                onValueChange={(val) => setRole(val as UserRole)}
              >
                <Select.Trigger
                  variant="surface"
                  size="3"
                  className="!w-full" // This ensures it fills the grid column properly
                />
                <Select.Content position="popper">
                  <Select.Group>
                    <Select.Label>Management</Select.Label>
                    <Select.Item value="Admin">Admin</Select.Item>
                    <Select.Item value="Project Manager">
                      Project Manager
                    </Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.Label>Execution</Select.Label>
                    <Select.Item value="Developer">Developer</Select.Item>
                    <Select.Item value="Designer">Designer</Select.Item>
                    <Select.Item value="Viewer">Viewer</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Box>
            <Box className="flex flex-col p-3 border border-gray-200 rounded-lg bg-gray-50/50">
              <Text as="label" size="2" mb="1" weight="bold" display="block">
                Account Status
              </Text>
              <Flex align="center" justify="between" className="h-[40px] ">
                <Text
                  size="2"
                  color={isActive ? "teal" : "gray"}
                  weight="medium"
                >
                  {isActive ? "Active" : "Inactive"}
                </Text>
                <Switch
                  size="2"
                  color="teal"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  style={{ cursor: "pointer" }}
                />
              </Flex>
            </Box>
            <Flex gap="3" mt="6" justify="end">
              <CancelButtonWithConfirm redirectTo="/users" />
              <SubmitButton
                loading={isSubmitting}
                label="Save User"
                onClick={handleSave}
              />
            </Flex>
          </div>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserEditPage;
