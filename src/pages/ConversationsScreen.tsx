import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import HeaderBlob from '../components/HeaderBlob';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import { api, type Person } from '../services/api';

interface ConversationsScreenProps {
    conversations: any[];
}

const ConversationsScreen = ({ conversations }: ConversationsScreenProps) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [activePersonFilter, setActivePersonFilter] = useState('all');
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        const loadPeople = async () => {
            try {
                const data = await api.people.getAll();
                setPeople(data);
            } catch (error) {
                console.error('Failed to load people:', error);
            }
        };

        loadPeople();
    }, []);

    const filteredConversations = useMemo(() => {
        return conversations.filter(conv => {
            if (activePersonFilter !== 'all' && conv.personId !== activePersonFilter) {
                return false;
            }
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            const person = people.find(p => p.id === conv.personId);
            const personName = person?.name.toLowerCase() || '';
            return (
                conv.title.toLowerCase().includes(query) ||
                conv.summary.toLowerCase().includes(query) ||
                personName.includes(query) ||
                conv.keyPoints?.some((kp: string) => kp.toLowerCase().includes(query))
            );
        });
    }, [conversations, searchQuery, activePersonFilter, people]);

    return (
        <div className="pb-24 animate-in fade-in duration-500 min-h-screen">
            <div className="relative overflow-hidden pt-12 px-6 pb-6 flex justify-between items-end">
                <HeaderBlob color="bg-indigo-100" />
                <div className="relative z-10">
                    <h1 className="text-3xl font-semibold text-slate-800 mb-1">Conversa</h1>
                    <p className="text-slate-500 text-sm">Captured moments</p>
                </div>
            </div>

            <div className="px-6 mb-6">
                <div className="flex gap-2">
                    <div className="bg-white rounded-xl shadow-sm border border-stone-100 flex items-center px-4 py-3 gap-3 flex-1">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search topics, people..."
                            className="bg-transparent w-full outline-none text-slate-700 placeholder:text-slate-400 text-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')}>
                                <X size={14} className="text-slate-400" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-colors ${filterOpen || activePersonFilter !== 'all' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-stone-100 text-slate-400 shadow-sm'}`}
                    >
                        <Filter size={18} />
                    </button>
                </div>

                {filterOpen && (
                    <div className="mt-3 bg-white p-3 rounded-xl border border-stone-100 shadow-sm animate-in slide-in-from-top-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Filter by Person</p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActivePersonFilter('all')}
                                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activePersonFilter === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-stone-200'}`}
                            >
                                All
                            </button>
                            {people.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setActivePersonFilter(p.id)}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activePersonFilter === p.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-stone-200'}`}
                                >
                                    {p.name.split(' ')[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="px-6 space-y-4">
                {filteredConversations.length > 0 ? (
                    filteredConversations.map(conv => {
                        const person = people.find(p => p.id === conv.personId);
                        const activeActionItems = conv.actionItems?.filter((i: any) => !i.completed).length || 0;
                        return (
                            <Card key={conv.id} onClick={() => navigate(`/conversations/${conv.id}`)}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-slate-800 leading-tight text-lg pr-4">{conv.title}</h3>
                                    {activeActionItems > 0 && (
                                        <Badge color="bg-teal-50 text-teal-700 border border-teal-100 shrink-0">
                                            {activeActionItems} Actions
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Avatar name={person?.name || ''} color={person?.avatarColor || ''} size="sm" />
                                    <span className="text-sm text-slate-500">{person?.name}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-xs text-slate-400">{conv.date.split('•')[0]}</span>
                                </div>

                                <div className="relative pl-3 border-l-2 border-indigo-100">
                                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                                        {conv.summary}
                                    </p>
                                </div>
                            </Card>
                        );
                    })
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-sm">No conversations found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationsScreen;
