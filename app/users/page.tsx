"use client";

import React, { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import {
  Table,
  Flex,
  Text,
  Badge,
  Avatar,
  Button,
  Box,
} from "@radix-ui/themes";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Plus,
  X,
  Mail,
  Phone,
  MoreVertical,
  Upload,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "../components/dynamic/PageHeader";

const UsersPage = () => {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "+1 234 567 8900",
      role: "Admin",
      status: "Active",
      avatar: "JD",
      color: "blue",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.w@company.com",
      phone: "+1 234 567 8901",
      role: "Project Manager",
      status: "Active",
      avatar: "SW",
      color: "purple",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.c@company.com",
      phone: "+1 234 567 8902",
      role: "Developer",
      status: "Active",
      avatar: "MC",
      color: "teal",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily.r@company.com",
      phone: "+1 234 567 8903",
      role: "Designer",
      status: "Inactive",
      avatar: "ER",
      color: "orange",
    },
    {
      id: 5,
      name: "David Kim",
      email: "david.k@company.com",
      phone: "+1 234 567 8904",
      role: "Developer",
      status: "Active",
      avatar: "DK",
      color: "green",
    },
    {
      id: 6,
      name: "Anna Smith",
      email: "anna.s@company.com",
      phone: "+1 234 567 8905",
      role: "Designer",
      status: "Active",
      avatar: "AS",
      color: "pink",
    },
    {
      id: 7,
      name: "Robert Fox",
      email: "robert.f@company.com",
      phone: "+1 234 567 8906",
      role: "Viewer",
      status: "Inactive",
      avatar: "RF",
      color: "gray",
    },
    // Add more objects as needed...
  ]);

  // --- LOGIC ---
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box p="3" className="bg-white min-h-screen">
      <PageHeader
        title="Users"
        searchPlaceholder="Search users..."
        searchValue={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onAddClick={() => {}}
        addButtonLabel="Add User"
      />
      <div className="max-w-7xl mx-auto">
        {/* Borderless Header Section */}

        {/* RADIX UI TABLE - Borderless (Ghost Variant) */}
        <Table.Root variant="ghost" className="mt-4">
          <Table.Header>
            <Table.Row className="border-b border-gray-100">
              <Table.ColumnHeaderCell className="pb-4">
                User
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="pb-4">
                Contact
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="pb-4">
                Role
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="pb-4">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="pb-4 text-right">
                Actions
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {paginatedUsers.map((user) => (
              <Table.Row
                key={user.id}
                align="center"
                className="hover:bg-gray-50/50 border-b border-gray-50 last:border-none transition-colors"
              >
                {/* User Info */}
                <Table.RowHeaderCell className="py-4">
                  <Flex gap="3" align="center">
                    <Avatar
                      size="3"
                      fallback={user.avatar}
                      color={user.color as any}
                      radius="full"
                    />
                    <Flex direction="column">
                      <Text size="2" weight="bold" className="text-gray-900">
                        {user.name}
                      </Text>
                      <Text size="1" color="gray">
                        {user.email}
                      </Text>
                    </Flex>
                  </Flex>
                </Table.RowHeaderCell>

                {/* Contact */}
                <Table.Cell className="py-4">
                  <Flex direction="column" gap="1">
                    <Text
                      size="1"
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Mail size={12} className="text-gray-400" /> {user.email}
                    </Text>
                    <Text
                      size="1"
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Phone size={12} className="text-gray-400" /> {user.phone}
                    </Text>
                  </Flex>
                </Table.Cell>

                {/* Role */}
                <Table.Cell className="py-4">
                  <Badge variant="soft" color="blue" radius="large">
                    {user.role}
                  </Badge>
                </Table.Cell>

                {/* Status */}
                <Table.Cell className="py-4">
                  <Badge
                    variant="surface"
                    color={user.status === "Active" ? "green" : "gray"}
                    radius="full"
                  >
                    {user.status}
                  </Badge>
                </Table.Cell>

                {/* Actions */}
                <Table.Cell className="py-4 text-right">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 transition-colors outline-none">
                        <MoreVertical size={18} />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        align="end"
                        sideOffset={5}
                        className="min-w-[150px] bg-white border border-gray-100 rounded-lg shadow-xl p-1 z-50"
                      >
                        <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer outline-none">
                          <Edit2 size={14} /> Edit User
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />
                        <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none">
                          <Trash2 size={14} /> Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {/* BORDERLESS PAGINATION SECTION */}
        <Flex align="center" justify="between" className="pt-8 pb-4">
          <Text size="1" color="gray">
            Showing <strong>{paginatedUsers.length}</strong> of{" "}
            <strong>{filteredUsers.length}</strong> results
          </Text>

          <Flex gap="3" align="center">
            <Button
              variant="ghost"
              color="gray"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="cursor-pointer"
            >
              <ChevronLeft size={16} /> Previous
            </Button>

            <Flex gap="1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "soft" : "ghost"}
                  color={currentPage === i + 1 ? "teal" : "gray"}
                  onClick={() => setCurrentPage(i + 1)}
                  className="cursor-pointer"
                >
                  {i + 1}
                </Button>
              ))}
            </Flex>

            <Button
              variant="ghost"
              color="gray"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="cursor-pointer"
            >
              Next <ChevronRight size={16} />
            </Button>
          </Flex>
        </Flex>
      </div>
    </Box>
  );
};

export default UsersPage;
