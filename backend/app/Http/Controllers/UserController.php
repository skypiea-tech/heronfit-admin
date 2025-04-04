<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);

        return User::create($validated);
    }

    public function getStats()
    {
        return [
            'totalUsers' => User::count(),
            'activeUsers' => User::where('last_login', '>', now()->subDays(30))->count(),
            'newUsersPerMonth' => User::selectRaw('COUNT(*) as count')
                ->groupByRaw('MONTH(created_at)')
                ->pluck('count')
        ];
    }
}