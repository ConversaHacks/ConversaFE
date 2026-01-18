import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    MoreHorizontal,
    MapPin,
    Sparkles,
    CheckCircle2,
    Check,
    ChevronUp,
    ChevronDown,
    Users,
    ChevronRight,
    FileText
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import Avatar from '../components/Avatar';
import { api, type Conversation, type Person } from '../services/api';

interface ConversationDetailProps {
    conversations: any[];
    onToggleItem: (convId: string, itemId: string) => void;
}

const ConversationDetail = ({ conversations, onToggleItem }: ConversationDetailProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showCompleted, setShowCompleted] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            try {
                setLoading(true);
                // Load conversation details and all people in parallel
                const [convData, peopleData] = await Promise.all([
                    api.conversations.getById(id),
                    api.people.getAll()
                ]);

                setConversation(convData);
                setPeople(peopleData);
            } catch (error) {
                console.error('Failed to load conversation:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!conversation) return null;

    const participantIds = conversation.participants || [conversation.personId];
    const participants = participantIds.map((id: string) => people.find(p => p.id === id)).filter(Boolean);

    const activeItems = conversation.actionItems?.filter((i: any) => !i.completed) || [];
    const completedItems = conversation.actionItems?.filter((i: any) => i.completed) || [];

    return (
        <div className="pb-24 bg-white min-h-screen animate-in slide-in-from-right-10 duration-300">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-stone-100 z-40 px-6 py-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-600">
                    <ArrowLeft size={20} />
                </button>
                <div className="text-center">
                    <h2 className="font-semibold text-slate-800 text-sm truncate max-w-[200px]">{conversation.title}</h2>
                    <p className="text-xs text-slate-400">{conversation.date.split('•')[0]}</p>
                </div>
                <button className="p-2 -mr-2 rounded-full hover:bg-slate-50 text-slate-400">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="p-6 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{conversation.title}</h1>
                    <p className="text-slate-500 text-sm flex items-center gap-1.5">
                        <MapPin size={14} /> {conversation.location}
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={16} className="text-indigo-500 fill-indigo-100" />
                        <h3 className="text-sm font-semibold text-indigo-900">Summary</h3>
                    </div>
                    <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100/50 shadow-sm">
                        <p className="text-slate-700 leading-relaxed text-[15px]">
                            {conversation.summary}
                        </p>
                    </div>
                </div>

                <div>
                    <SectionHeader title="Key Points" icon={null} />
                    <ul className="space-y-3">
                        {conversation.keyPoints?.map((point: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                                <span className="block w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {(activeItems.length > 0 || completedItems.length > 0) && (
                    <div>
                        <SectionHeader title="Action Items" icon={CheckCircle2} />
                        <div className="space-y-2">
                            {activeItems.map((item: any) => (
                                <div
                                    key={item.id}
                                    onClick={() => onToggleItem(conversation.id, item.id)}
                                    className="flex items-start gap-3 bg-white border border-stone-200 p-3 rounded-lg shadow-sm cursor-pointer hover:border-teal-200 transition-colors group"
                                >
                                    <div className="w-5 h-5 rounded border-2 border-slate-300 mt-0.5 shrink-0 group-hover:border-teal-400 transition-colors" />
                                    <span className="text-sm text-slate-700 font-medium">{item.text}</span>
                                </div>
                            ))}
                            {completedItems.length > 0 && (
                                <div className="pt-2">
                                    {activeItems.length > 0 && <div className="h-px bg-stone-100 mb-3" />}
                                    <button
                                        onClick={() => setShowCompleted(!showCompleted)}
                                        className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1 mb-2 hover:text-slate-600"
                                    >
                                        Completed({completedItems.length})
                                        {showCompleted ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                    </button>
                                    {showCompleted && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                                            {completedItems.map((item: any) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => onToggleItem(conversation.id, item.id)}
                                                    className="flex items-start gap-3 bg-stone-50 border border-stone-100 p-3 rounded-lg opacity-60 cursor-pointer"
                                                >
                                                    <div className="w-5 h-5 rounded border-2 border-slate-300 mt-0.5 shrink-0 bg-slate-200 flex items-center justify-center">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                    <span className="text-sm text-slate-500 font-medium line-through decoration-slate-300">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div>
                    <SectionHeader title="Linked People" icon={Users} />
                    <div className="space-y-3">
                        {participants.map((person: any) => (
                            <div
                                key={person.id}
                                onClick={() => navigate(`/people/${person.id}`)}
                                className="flex items-center justify-between bg-stone-50 p-3 rounded-xl cursor-pointer active:bg-stone-100 transition-colors border border-stone-100"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar name={person.name} color={person.avatarColor} size="md" />
                                    <div>
                                        <h3 className="font-semibold text-slate-800 text-sm">{person.name}</h3>
                                        <p className="text-xs text-slate-500">
                                            {person.id === conversation.personId ? 'Primary Speaker' : 'Participant'}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-400" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                    <button
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors mx-auto py-2"
                    >
                        <FileText size={16} />
                        {showTranscript ? "Hide transcript" : "View transcript"}
                    </button>

                    {showTranscript && (
                        <div className="mt-4 animate-in slide-in-from-bottom-2 fade-in duration-300">
                            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
                                <p className="text-[13px] text-slate-500 leading-relaxed font-mono whitespace-pre-wrap">
                                    {conversation.fullTranscript || "Transcript not available for this session."}
                                </p>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-3 text-center uppercase tracking-widest">
                                End of Raw Transcript
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationDetail;
