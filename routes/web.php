<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;



//Route::get('/', [DashboardController::class, 'index']);
//Route::get('/dashboard', [DashboardController::class, 'index']);

// Dashboard Route
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Booking Management
Route::get('/booking', [BookingController::class, 'index'])->name('booking.index');

// User Management
Route::get('/users', [UserController::class, 'index'])->name('users.index');

// Schedule Management
Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');

// Announcements
Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');

// Analytics
Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
