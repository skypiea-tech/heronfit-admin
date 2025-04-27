<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Announcements</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">All Announcements</h2>
        <button class="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">Create Announcement</button>
      </div>
      <div class="space-y-4">
        <div class="border-b pb-4">
          <h3 class="font-semibold text-lg mb-2">System Maintenance</h3>
          <p class="text-gray-600 mb-2">Scheduled maintenance will be performed on March 25th, 2024.</p>
          <div class="flex items-center text-sm text-gray-500">
            <span>Posted on: March 20, 2024</span>
            <span class="mx-2">•</span>
            <button class="text-blue-600 hover:text-blue-800">Edit</button>
            <span class="mx-2">•</span>
            <button class="text-red-600 hover:text-red-800">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>