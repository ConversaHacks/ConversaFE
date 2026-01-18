import { MessageSquare, User, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentTab = location.pathname.startsWith('/people') ? 'people' : 'conversations';

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-6 py-4 flex justify-around items-center pb-8 z-50">
                <button
                    onClick={() => navigate('/conversations')}
                    className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'conversations' ? 'text-indigo-600' : 'text-slate-400'}`}
                >
                    <MessageSquare size={24} strokeWidth={currentTab === 'conversations' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">Conversations</span>
                </button>
                <button
                    onClick={() => navigate('/people')}
                    className={`flex flex-col items-center gap-1 transition-colors ${currentTab === 'people' ? 'text-indigo-600' : 'text-slate-400'}`}
                >
                    <User size={24} strokeWidth={currentTab === 'people' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">People</span>
                </button>
            </div>
            <button className="fixed bottom-24 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg shadow-slate-900/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
                <Plus size={24} />
            </button>
        </>
    );
};

export default BottomNav;
