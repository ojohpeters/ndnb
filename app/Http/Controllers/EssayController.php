<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Essay;
use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Requests\StoreEssayRequest;
use App\Http\Requests\UpdateEssayRequest;

class EssayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $essays = Essay::with('project')
            ->where('status', '!=', 'draft')
            ->latest()
            ->paginate(10)
            ->through(fn($essay) => [
                'id' => $essay->id,
                'title' => $essay->title,
                'slug' => $essay->slug,
                'author' => $essay->author,
                'project' => $essay->project ? $essay->project->title : null,
                'date_published' => $essay->date_published,
            ]);

          $years = Essay::selectRaw("YEAR(date_published) as year")
    ->distinct()
    ->whereNotNull('date_published')
    ->where('status', 'published')
    ->orderByDesc('year')
    ->pluck('year');


        return Inertia::render('Essays/Index', [
            'essays' => $essays,
            'filters' => [
                'search' => request('search'),
                'year' => request('year'),
            ],
            'years' => $years
        ]);
    }

    /**
     * Display drafts listing.
     */
    public function drafts()
    {
        $drafts = Essay::with('project')
            ->where('status', 'draft')
            ->latest()
            ->paginate(10)
            ->through(fn($essay) => [
                'id' => $essay->id,
                'title' => $essay->title,
                'slug' => $essay->slug,
                'author' => $essay->author,
                'project' => $essay->project ? $essay->project->title : null,
                'date_published' => $essay->date_published,
                'updated_at' => $essay->updated_at,
            ]);

        return Inertia::render('Essays/Drafts', [
            'drafts' => $drafts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::select('id', 'title')->get();

        return Inertia::render('Essays/Create', [
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEssayRequest $request)
    {
        $validated = $request->validated();
        $status = $request->input('action') === 'publish' ? 'published' : 'draft';

        $essay = Essay::create([
            ...$validated,
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
            'status' => $status,
        ]);

        $redirectRoute = $status === 'draft' ? 'essays.drafts' : 'essays.index';
        $message = $status === 'draft' ? 'Essay saved as draft successfully.' : 'Essay published successfully.';

        return redirect()->route($redirectRoute)->with('success', $message);
    }

    /**
     * Display the specified resource.
     */
    public function show(Essay $essay)
    {
        $essay->load('project');

        return Inertia::render('Essays/Show', [
            'essay' => [
                'title' => $essay->title,
                'slug' => $essay->slug,
                'content' => $essay->content,
                'author' => $essay->author,
                'date_published' => $essay->date_published,
                'project' => $essay->project ? [
                    'id' => $essay->project->id,
                    'title' => $essay->project->title,
                ] : null,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Essay $essay)
    {
        $projects = Project::select('id', 'title')->get();

        return Inertia::render('Essays/Edit', [
            'essay' => $essay,
            'projects' => $projects,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEssayRequest $request, Essay $essay)
    {
        $validated = $request->validated();
        $status = $request->input('action') === 'publish' ? 'published' : 'draft';

        $essay->update([
            ...$validated,
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
            'status' => $status,
        ]);

        $redirectRoute = $status === 'draft' ? 'essays.drafts' : 'essays.index';
        $message = $status === 'draft' ? 'Essay saved as draft successfully.' : 'Essay published successfully.';

        return redirect()->route($redirectRoute)->with('success', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Essay $essay)
    {
        $essay->delete();

        return redirect()->route('essays.index')->with('success', 'Essay deleted.');

    }
}