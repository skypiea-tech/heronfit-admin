<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Session Management</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Active Sessions</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4">Session ID</th>
              <th class="text-left py-3 px-4">User</th>
              <th class="text-left py-3 px-4">Start Time</th>
              <th class="text-left py-3 px-4">Duration</th>
              <th class="text-left py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-3 px-4">S001</td>
              <td class="py-3 px-4">John Doe</td>
              <td class="py-3 px-4">10:00 AM</td>
              <td class="py-3 px-4">1h 30m</td>
              <td class="py-3 px-4"><span class="px-2 py-1 bg-green-100 text-green-800 rounded">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>