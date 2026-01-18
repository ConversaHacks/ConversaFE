import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import HeaderBlob from '../components/HeaderBlob';
import Avatar from '../components/Avatar';
import { api, type Person } from '../services/api';

const PeopleScreen = () => {
    const navigate = useNavigate();
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPeople = async () => {
            try {
                const data = await api.people.getAll();
                setPeople(data);
            } catch (error) {
                console.error('Failed to load people:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPeople();
    }, []);

    return (
        <div className="pb-24 animate-in fade-in duration-500">
            <div className="relative pt-12 px-6 pb-6 flex items-center justify-between">
                <HeaderBlob color="bg-emerald-100" />
                <div className="relative z-10">
                    <h1 className="text-3xl font-semibold text-slate-800 mb-1">People</h1>
                    <p className="text-slate-500 text-sm">Your circle</p>
                </div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-sm border border-stone-100">
                    <User size={20} className="text-slate-400" />
                </div>
            </div>

            <div className="px-6 space-y-3">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                    </div>
                ) : people.map(person => (
                    <div
                        key={person.id}
                        onClick={() => navigate(`/people/${person.id}`)}
                        className="bg-white p-4 rounded-2xl border border-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-center gap-4 cursor-pointer active:scale-[0.99] transition-all"
                    >
                        <Avatar name={person.name} color={person.avatarColor} size="md" />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-slate-800">{person.name}</h3>
                                <span className="text-[10px] bg-stone-100 text-slate-500 px-2 py-0.5 rounded-full">
                                    Last Met {person.lastMet}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{person.context}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeopleScreen;
