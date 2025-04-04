<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Booking Management</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Upcoming Bookings</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4">ID</th>
              <th class="text-left py-3 px-4">User</th>
              <th class="text-left py-3 px-4">Date</th>
              <th class="text-left py-3 px-4">Status</th>
              <th class="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-3 px-4">001</td>
              <td class="py-3 px-4">John Doe</td>
              <td class="py-3 px-4">2024-03-20</td>
              <td class="py-3 px-4"><span class="px-2 py-1 bg-green-100 text-green-800 rounded">Confirmed</span></td>
              <td class="py-3 px-4">
                <button class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                <button class="text-red-600 hover:text-red-800">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>