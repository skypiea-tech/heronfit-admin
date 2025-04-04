<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::with('user')->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'session_id' => 'required|exists:sessions,id',
            'status' => 'required|in:pending,confirmed,cancelled'
        ]);

        return Booking::create($validated);
    }

    public function getStats()
    {
        return [
            'totalBookings' => Booking::count(),
            'bookingsPerMonth' => Booking::selectRaw('COUNT(*) as count')
                ->groupByRaw('MONTH(created_at)')
                ->pluck('count'),
            'statusDistribution' => [
                'confirmed' => Booking::where('status', 'confirmed')->count(),
                'pending' => Booking::where('status', 'pending')->count(),
                'cancelled' => Booking::where('status', 'cancelled')->count(),
            ]
        ];
    }
}