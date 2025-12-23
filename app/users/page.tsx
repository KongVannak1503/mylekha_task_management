"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  Flex,
  Text,
  Badge,
  Avatar,
  Button,
  Box,
  DropdownMenu,
  IconButton,
} from "@radix-ui/themes";
import {
  Mail,
  Phone,
  MoreVertical,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "../components/dynamic/PageHeader";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  // Mock Data (unchanged)
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
  ]);

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
    <Box p="3">
      <PageHeader
        title="Users"
        searchPlaceholder="Search users..."
        searchValue={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onAddClick={() => router.push("/users/form")}
        addButtonLabel="Add User"
      />

      {/* Main Table Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table.Root variant="ghost">
          <Table.Header>
            <Table.Row className="border-b border-gray-50/60">
              <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Contact</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="right">
                Actions
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {paginatedUsers.map((user) => (
              <Table.Row
                key={user.id}
                align="center"
                className="hover:bg-gray-50/50 transition-colors"
              >
                <Table.RowHeaderCell>
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

                <Table.Cell py="1">
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

                <Table.Cell py="1">
                  <Badge variant="soft" color="blue" radius="large">
                    {user.role}
                  </Badge>
                </Table.Cell>

                <Table.Cell py="1">
                  <Badge
                    variant="surface"
                    color={user.status === "Active" ? "green" : "gray"}
                    radius="full"
                  >
                    {user.status}
                  </Badge>
                </Table.Cell>

                <Table.Cell py="1" align="right">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <IconButton
                        variant="ghost"
                        color="gray"
                        className="cursor-pointer"
                      >
                        <MoreVertical size={18} />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end" size="2">
                      <DropdownMenu.Item
                        onClick={() => router.push(`/users/form/${user.id}`)}
                      >
                        <Edit2 size={14} className="mr-2" /> Edit User
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        color="red"
                        onClick={() => console.log("Delete", user.id)}
                      >
                        <Trash2 size={14} className="mr-2" /> Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {/* Pagination Section - Integrated into the card */}
        <Flex
          align="center"
          justify="between"
          p="4"
          className="border-t border-gray-50"
        >
          <Text size="1" color="gray">
            Showing <strong>{paginatedUsers.length}</strong> of{" "}
            <strong>{filteredUsers.length}</strong> results
          </Text>

          <Flex gap="2" align="center">
            <Button
              variant="ghost"
              color="gray"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="cursor-pointer"
            >
              <ChevronLeft size={16} /> Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "solid" : "ghost"}
                color={currentPage === i + 1 ? "teal" : "gray"}
                onClick={() => setCurrentPage(i + 1)}
                className="cursor-pointer px-3"
              >
                {i + 1}
              </Button>
            ))}

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
