<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">User Management</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">User List</h2>
        <button class="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">Add New User</button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4">ID</th>
              <th class="text-left py-3 px-4">Name</th>
              <th class="text-left py-3 px-4">Email</th>
              <th class="text-left py-3 px-4">Role</th>
              <th class="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-3 px-4">001</td>
              <td class="py-3 px-4">John Doe</td>
              <td class="py-3 px-4">john@example.com</td>
              <td class="py-3 px-4">User</td>
              <td class="py-3 px-4">
                <button class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                <button class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>