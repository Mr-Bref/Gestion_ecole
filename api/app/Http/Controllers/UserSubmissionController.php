<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;


class UserSubmissionController extends Controller
{
    public function toggleVerificationStatus(Request $request)
    {
        // Validate the input using request()->validate
        $validated = $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'integer|exists:users,id', // Ensure each ID exists in the user_submissions table
        ]);

        $submissionIds = $validated['user_ids'];

        // Fetch the submissions and toggle their verified status
        $submissions = User::whereIn('id', $submissionIds)->get();

        foreach ($submissions as $submission) {
            $submission->verified = !$submission->verified; // Toggle the boolean field
            $submission->save();
        }

        return response()->json(['message' => 'Submission verification statuses toggled successfully.']);
    }
}
