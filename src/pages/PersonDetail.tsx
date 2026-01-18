import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    Calendar,
    Sparkles,
    Briefcase,
    User,
    CheckCircle2,
    MapPin,
    X
} from 'lucide-react';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { api, type Person } from '../services/api';

interface PersonDetailProps {
    conversations: any[];
}

const PersonDetail = ({ conversations }: PersonDetailProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const [person, setPerson] = useState<Person | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPerson = async () => {
            if (!id) return;
            try {
                const data = await api.people.getById(id);
                setPerson(data);
            } catch (error) {
                console.error('Failed to load person:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPerson();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!person) return null;

    const history = conversations.filter(c =>
        c.personId === id || (c.participants && c.participants.includes(id))
    );
    history.sort((a, b) => new Date(b.date.split('•')[0]).getTime() - new Date(a.date.split('•')[0]).getTime());

    return (
        <div className="pb-24 bg-stone-50 min-h-screen animate-in slide-in-from-right-10 duration-300">
            <div className="sticky top-0 bg-stone-50/90 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-stone-200 text-slate-600">
                    <ArrowLeft size={20} />
                </button>
                <button
                    onClick={() => setShowEdit(true)}
                    className="text-sm font-medium text-teal-700 px-3 py-1 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                    Edit
                </button>
            </div>

            <div className="px-6 flex flex-col items-center mb-8">
                <div className="mb-4">
                    <Avatar name={person.name} color={person.avatarColor} size="lg" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-1">{person.name}</h1>
                <p className="text-slate-500 text-sm mb-4">{person.role}</p>
                <div className="flex gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        Met {person.metCount} times
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        Last seen {person.lastMet}
                    </span>
                </div>
            </div>

            <div className="px-4 space-y-4">
                <Card className="bg-gradient-to-br from-white to-stone-50 border-indigo-100/50">
                    <SectionHeader title="Things to Remember" icon={Sparkles} />
                    <div className="space-y-3">
                        <div className="flex gap-3 items-start">
                            <Briefcase size={14} className="mt-1 text-slate-400 shrink-0" />
                            <p className="text-sm text-slate-700">{person.context}</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <User size={14} className="mt-1 text-slate-400 shrink-0" />
                            <div className="flex flex-wrap gap-2">
                                {person.interests.map(i => (
                                    <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100/50">
                                        {i}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {person.openFollowUps.length > 0 && (
                    <Card>
                        <SectionHeader title="Open Follow-ups" icon={CheckCircle2} />
                        <div className="space-y-2">
                            {person.openFollowUps.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-2 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer">
                                    <div className="w-5 h-5 rounded-full border-2 border-teal-200 mt-0.5 shrink-0" />
                                    <span className="text-sm text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">Conversation History</h3>
                    <div className="space-y-4 relative before:absolute before:left-6 before:top-4 before:bottom-0 before:w-px before:bg-stone-200 pl-2">
                        {history.length > 0 ? history.map(conv => (
                            <div key={conv.id} onClick={() => navigate(`/conversations/${conv.id}`)} className="relative pl-10 cursor-pointer group">
                                <div className="absolute left-[11px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-indigo-400 transition-colors z-10" />
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 group-hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-semibold text-slate-600 truncate max-w-[200px] block">{conv.title}</span>
                                        <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                                            <MapPin size={10} /> {conv.location}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-2">{conv.summary}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="pl-10 text-sm text-slate-400 italic">No recorded history.</div>
                        )}
                    </div>
                </div>
            </div>

            {showEdit && (
                <div className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm flex items-end sm:items-center justify-center">
                    <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg">Edit Memory</h3>
                            <button onClick={() => setShowEdit(false)}>
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Name</label>
                                <input type="text" defaultValue={person.name} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Context Notes</label>
                                <textarea defaultValue={person.context} rows={3} className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
                            </div>
                            <button onClick={() => setShowEdit(false)} className="w-full bg-teal-600 text-white font-medium py-3 rounded-xl mt-2 active:scale-[0.98] transition-transform">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonDetail;
