"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Users,
  Loader2,
  MoreVertical,
} from "lucide-react";
import {
  Table,
  Flex,
  Text,
  Avatar,
  Badge,
  Button,
  Box,
  DropdownMenu,
} from "@radix-ui/themes";
import { PageHeader } from "../components/dynamic/PageHeader";
import { useRouter } from "next/navigation";

const RolesPage = () => {
  // --- States ---
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [rolesData, setRolesData] = useState(initialRoles); // Displays data
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- API Search Logic ---
  const handleSearchApi = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      // Replace this with your actual fetch call:
      // const res = await fetch(`/api/roles?search=${query}`);
      // const data = await res.json();
      // setRolesData(data);

      console.log("Searching API for:", query);

      // Simulate API Filter
      const filtered = initialRoles.filter((role) =>
        role.name.toLowerCase().includes(query.toLowerCase())
      );

      // Simulate Network Delay
      await new Promise((resolve) => setTimeout(resolve, 400));
      setRolesData(filtered);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchApi(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearchApi]);

  // --- Handlers ---
  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions);
    setIsEditRoleOpen(true);
  };

  return (
    <div className="p-3">
      <PageHeader
        title="Roles"
        searchPlaceholder="Search roles..."
        searchValue={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onAddClick={() => router.push("/roles/form")}
        addButtonLabel="Add Role"
      />

      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Table.Root variant="ghost">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Role Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Permissions</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Users</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="right">
                Actions
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rolesData.length > 0 ? (
              rolesData.map((role) => (
                <Table.Row key={role.id} align="center">
                  <Table.RowHeaderCell>
                    <Flex direction="column">
                      <Text weight="bold" size="1">
                        {role.name}
                      </Text>
                      {/* <Text size="1" color="gray">
                        {role.description}
                      </Text> */}
                    </Flex>
                  </Table.RowHeaderCell>
                  <Table.Cell py="1">
                    <Flex gap="1" wrap="wrap">
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" color="gray" size="1">
                          +{role.permissions.length - 3}
                        </Badge>
                      )}
                    </Flex>
                  </Table.Cell>
                  <Table.Cell py="1">
                    <Badge variant="surface" color="blue" radius="full">
                      <Users size={12} className="mr-1" /> {role.userCount}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell py="1" align="right">
                    <DropdownMenu.Root>
                      {/* Use Trigger directly without the Portal wrapper */}
                      <DropdownMenu.Trigger>
                        <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors outline-none cursor-pointer">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenu.Trigger>

                      {/* The Content handles the "Portaling" automatically in Themes */}
                      <DropdownMenu.Content align="end" size="2">
                        {/* Edit Option */}
                        <DropdownMenu.Item
                          onClick={() => handleEditRole(role)}
                          shortcut="⌘ E"
                        >
                          <Edit2 size={14} className="mr-2" />
                          Edit Role
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator />

                        {/* Delete Option - Using the 'red' color prop for danger */}
                        <DropdownMenu.Item
                          color="red"
                          onClick={() => console.log("Delete", role.id)}
                          shortcut="⌘ ⌫"
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete Role
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  py="1"
                  colSpan={4}
                  align="center"
                  className="py-10 text-gray-400"
                >
                  {isLoading
                    ? "Searching..."
                    : "No roles found matching your search."}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>

      {/* --- Modals (Add/Edit) use the same logic as your previous code --- */}
      {/* ... Add/Edit Dialogs here ... */}
    </div>
  );
};

// Mock Data
const initialRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    userCount: 2,
    permissions: ["Create", "Read", "Update", "Delete", "Manage Users"],
  },
  {
    id: 2,
    name: "Developer",
    description: "Project work",
    userCount: 12,
    permissions: ["Read", "Update", "Upload Files", "Comment"],
  },
];

const availablePermissions = [
  "Create",
  "Read",
  "Update",
  "Delete",
  "Manage Users",
  "Manage Roles",
  "Upload Files",
  "Comment",
];

export default RolesPage;
