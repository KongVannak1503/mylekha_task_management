"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Users,
} from "lucide-react";

const RolesPage = () => {
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const roles = [
    {
      id: 1,
      name: "Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      permissions: [
        "Create",
        "Read",
        "Update",
        "Delete",
        "Manage Users",
        "Manage Roles",
      ],
      color: "bg-red-100 text-red-800",
      borderColor: "border-red-200",
    },
    {
      id: 2,
      name: "Project Manager",
      description: "Can manage projects and teams",
      userCount: 5,
      permissions: [
        "Create",
        "Read",
        "Update",
        "Manage Projects",
        "Assign Tasks",
      ],
      color: "bg-purple-100 text-purple-800",
      borderColor: "border-purple-200",
    },
    {
      id: 3,
      name: "Developer",
      description: "Can work on assigned tasks and projects",
      userCount: 12,
      permissions: ["Read", "Update", "Comment", "Upload Files"],
      color: "bg-blue-100 text-blue-800",
      borderColor: "border-blue-200",
    },
    {
      id: 4,
      name: "Designer",
      description: "Can create and manage design assets",
      userCount: 4,
      permissions: ["Read", "Update", "Upload Files", "Comment"],
      color: "bg-pink-100 text-pink-800",
      borderColor: "border-pink-200",
    },
    {
      id: 5,
      name: "Viewer",
      description: "Read-only access to projects",
      userCount: 8,
      permissions: ["Read", "Comment"],
      color: "bg-gray-100 text-gray-800",
      borderColor: "border-gray-200",
    },
  ];

  const availablePermissions = [
    "Create",
    "Read",
    "Update",
    "Delete",
    "Manage Users",
    "Manage Roles",
    "Manage Projects",
    "Assign Tasks",
    "Upload Files",
    "Comment",
    "Export Data",
    "View Reports",
  ];

  const handleAddRole = () => {
    console.log("Add role", selectedPermissions);
    setIsAddRoleOpen(false);
    setSelectedPermissions([]);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions);
    setIsEditRoleOpen(true);
  };

  const handleUpdateRole = () => {
    console.log("Update role", selectedRole, selectedPermissions);
    setIsEditRoleOpen(false);
    setSelectedPermissions([]);
  };

  const handleDeleteRole = (roleId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this role? Users with this role will need to be reassigned."
      )
    ) {
      console.log("Delete role", roleId);
    }
  };

  const togglePermission = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Roles & Permissions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Define roles and their access levels
            </p>
          </div>
          <button
            onClick={() => setIsAddRoleOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700"
          >
            <Plus size={16} />
            Add Role
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search roles..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`bg-white border-2 ${role.borderColor} rounded-lg p-6 hover:shadow-lg transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {role.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${role.color}`}
                  >
                    <Users size={12} />
                    {role.userCount} users
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEditRole(role)}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                >
                  <Edit2 size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="p-1.5 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 min-h-[40px]">
              {role.description}
            </p>

            <div className="border-t border-gray-200 pt-4">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wide">
                Permissions ({role.permissions.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                  >
                    <Check size={12} className="text-teal-600" />
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Role Modal */}
      <Dialog.Root open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-50 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Add New Role
              </Dialog.Title>
              <Dialog.Close className="p-1 hover:bg-gray-100 rounded">
                <X size={20} className="text-gray-500" />
              </Dialog.Close>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Content Writer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the role and responsibilities..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions *
                  <span className="text-xs text-gray-500 font-normal ml-2">
                    ({selectedPermissions.length} selected)
                  </span>
                </label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {availablePermissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission)}
                          onChange={() => togglePermission(permission)}
                          className="w-4 h-4 text-teal-600 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 flex-1">
                          {permission}
                        </span>
                        {selectedPermissions.includes(permission) && (
                          <Check size={14} className="text-teal-600" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsAddRoleOpen(false);
                    setSelectedPermissions([]);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRole}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700"
                >
                  Add Role
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Edit Role Modal */}
      <Dialog.Root open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-50 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Edit Role
              </Dialog.Title>
              <Dialog.Close className="p-1 hover:bg-gray-100 rounded">
                <X size={20} className="text-gray-500" />
              </Dialog.Close>
            </div>

            {selectedRole && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedRole.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedRole.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions *
                    <span className="text-xs text-gray-500 font-normal ml-2">
                      ({selectedPermissions.length} selected)
                    </span>
                  </label>
                  <div className="border border-gray-200 rounded-lg p-3 max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {availablePermissions.map((permission) => (
                        <label
                          key={permission}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(permission)}
                            onChange={() => togglePermission(permission)}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700 flex-1">
                            {permission}
                          </span>
                          {selectedPermissions.includes(permission) && (
                            <Check size={14} className="text-teal-600" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Users size={16} className="text-blue-600 mt-0.5" />
                    <div className="text-xs text-blue-800">
                      <span className="font-medium">
                        {selectedRole.userCount} users
                      </span>{" "}
                      are currently assigned to this role
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsEditRoleOpen(false);
                      setSelectedPermissions([]);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateRole}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700"
                  >
                    Update Role
                  </button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default RolesPage;
