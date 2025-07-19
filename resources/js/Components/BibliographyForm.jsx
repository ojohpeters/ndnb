
import { useState } from 'react';

export default function BibliographyForm({ bibliography, setBibliography }) {
    const [currentEntry, setCurrentEntry] = useState({
        type: 'book',
        authors: '',
        title: '',
        publisher: '',
        year: '',
        place: '',
        pages: '',
        url: '',
        journal: '',
        volume: '',
        issue: ''
    });

    const addEntry = () => {
        if (currentEntry.title && currentEntry.authors) {
            setBibliography([...bibliography, { ...currentEntry, id: Date.now() }]);
            setCurrentEntry({
                type: 'book',
                authors: '',
                title: '',
                publisher: '',
                year: '',
                place: '',
                pages: '',
                url: '',
                journal: '',
                volume: '',
                issue: ''
            });
        }
    };

    const removeEntry = (id) => {
        setBibliography(bibliography.filter(entry => entry.id !== id));
    };

    const formatCitation = (entry) => {
        switch (entry.type) {
            case 'book':
                return `${entry.authors}. ${entry.title}. ${entry.place}: ${entry.publisher}, ${entry.year}.`;
            case 'journal':
                return `${entry.authors}. "${entry.title}." ${entry.journal} ${entry.volume}${entry.issue ? `, no. ${entry.issue}` : ''} (${entry.year})${entry.pages ? `: ${entry.pages}` : ''}.${entry.url ? ` ${entry.url}.` : ''}`;
            case 'newspaper':
                return `${entry.authors}. "${entry.title}." ${entry.journal}, ${entry.year}.${entry.url ? ` ${entry.url}.` : ''}`;
            default:
                return `${entry.authors}. ${entry.title}. ${entry.year}.`;
        }
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Bibliography</h3>
            
            {/* Add New Entry Form */}
            <div className="border rounded p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            value={currentEntry.type}
                            onChange={(e) => setCurrentEntry({...currentEntry, type: e.target.value})}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="book">Book</option>
                            <option value="journal">Journal Article</option>
                            <option value="newspaper">Newspaper/Magazine</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Authors *</label>
                        <input
                            type="text"
                            value={currentEntry.authors}
                            onChange={(e) => setCurrentEntry({...currentEntry, authors: e.target.value})}
                            placeholder="Lastname, Firstname"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <input
                            type="text"
                            value={currentEntry.title}
                            onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    
                    {currentEntry.type === 'book' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">Publisher</label>
                                <input
                                    type="text"
                                    value={currentEntry.publisher}
                                    onChange={(e) => setCurrentEntry({...currentEntry, publisher: e.target.value})}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Place of Publication</label>
                                <input
                                    type="text"
                                    value={currentEntry.place}
                                    onChange={(e) => setCurrentEntry({...currentEntry, place: e.target.value})}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </>
                    )}
                    
                    {(currentEntry.type === 'journal' || currentEntry.type === 'newspaper') && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {currentEntry.type === 'journal' ? 'Journal Name' : 'Publication Name'}
                                </label>
                                <input
                                    type="text"
                                    value={currentEntry.journal}
                                    onChange={(e) => setCurrentEntry({...currentEntry, journal: e.target.value})}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            {currentEntry.type === 'journal' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Volume</label>
                                        <input
                                            type="text"
                                            value={currentEntry.volume}
                                            onChange={(e) => setCurrentEntry({...currentEntry, volume: e.target.value})}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Issue</label>
                                        <input
                                            type="text"
                                            value={currentEntry.issue}
                                            onChange={(e) => setCurrentEntry({...currentEntry, issue: e.target.value})}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Pages</label>
                                        <input
                                            type="text"
                                            value={currentEntry.pages}
                                            onChange={(e) => setCurrentEntry({...currentEntry, pages: e.target.value})}
                                            placeholder="e.g., 229-248"
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Year</label>
                        <input
                            type="number"
                            value={currentEntry.year}
                            onChange={(e) => setCurrentEntry({...currentEntry, year: e.target.value})}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">URL (if online)</label>
                        <input
                            type="url"
                            value={currentEntry.url}
                            onChange={(e) => setCurrentEntry({...currentEntry, url: e.target.value})}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>
                
                <button
                    type="button"
                    onClick={addEntry}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Bibliography Entry
                </button>
            </div>
            
            {/* Bibliography List */}
            {bibliography.length > 0 && (
                <div>
                    <h4 className="font-medium mb-2">Bibliography Entries:</h4>
                    <div className="space-y-2">
                        {bibliography.map((entry) => (
                            <div key={entry.id} className="border rounded p-3 bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-sm">{formatCitation(entry)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeEntry(entry.id)}
                                        className="ml-2 text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
