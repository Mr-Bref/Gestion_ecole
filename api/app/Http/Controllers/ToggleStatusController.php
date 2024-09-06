<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class ToggleStatusController extends Controller
{
    public function toggleUserStatus(Request $request)
    {
        // Validate the input
        $validator = Validator::make($request->all(), [
            'user_ids' => 'required|array',
            'user_ids.*' => 'integer|exists:users,id', // Each ID should be an integer and must exist in the users table
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // If validation passes, toggle the statuses
        $userIds = $request->input('user_ids');
        $users = User::whereIn('id', $userIds)->get();

        foreach ($users as $user) {
            $user->statut = !$user->statut; // Assuming status is a boolean field
            $user->save();
        }

        return response()->json(['message' => 'User statuses toggled successfully.']);
    }
}
