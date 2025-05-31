<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        // Search by title or description
        if (request('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by launch year
        if (request('year')) {
            $query->whereYear('launched_on', request('year'));
        }

        // For filter dropdown
        $years = Project::selectRaw("strftime('%Y', launched_on) as year")
            ->distinct()
            ->whereNotNull('launched_on')
            ->orderBy('year', 'desc')
            ->pluck('year');

        $projects = $query->latest()->paginate(15)->withQueryString();

        return inertia('Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'search' => request('search'),
                'year' => request('year'),
            ],
            'years' => $years,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();
        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;
        // Handle file upload for cover image
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('projects', 'public');
        }

        Project::create($validated);

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return inertia('Projects/Show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Projects/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();
        // Generate slug from title
        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Project::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;
        // Handle file upload for cover image
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('projects', 'public');
        }

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
