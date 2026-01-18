import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConversationsScreen from './pages/ConversationsScreen';
import ConversationDetail from './pages/ConversationDetail';
import PeopleScreen from './pages/PeopleScreen';
import PersonDetail from './pages/PersonDetail';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { api, type Conversation } from './services/api';

const App = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [showSplash, setShowSplash] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load conversations from API
    useEffect(() => {
        const loadConversations = async () => {
            try {
                setLoading(true);
                const data = await api.conversations.getAll();
                setConversations(data as any); // Cast needed for list vs detail types
                setError(null);
            } catch (err) {
                console.error('Failed to load conversations:', err);
                setError('Failed to load conversations. Is the backend running?');
            } finally {
                setLoading(false);
            }
        };

        loadConversations();
    }, []);

    const toggleActionItem = async (convId: string, itemId: string) => {
        try {
            const conv = conversations.find(c => c.id === convId);
            if (!conv) return;

            const actionItem = conv.actionItems.find(item => item.id === itemId);
            if (!actionItem) return;

            // Toggle in API
            const updated = await api.conversations.toggleActionItem(
                convId,
                itemId,
                !actionItem.completed
            );

            // Update local state
            setConversations(prev => prev.map(c =>
                c.id === convId ? updated : c
            ));
        } catch (err) {
            console.error('Failed to toggle action item:', err);
            alert('Failed to update action item');
        }
    };

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-slate-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">Connection Error</h2>
                    <p className="text-slate-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 text-slate-800 font-sans selection:bg-indigo-100">
            <div className="max-w-md mx-auto bg-stone-50 min-h-screen relative shadow-2xl overflow-hidden">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<ConversationsScreen conversations={conversations} />} />
                        <Route path="conversations" element={<ConversationsScreen conversations={conversations} />} />
                        <Route
                            path="conversations/:id"
                            element={<ConversationDetail conversations={conversations} onToggleItem={toggleActionItem} />}
                        />
                        <Route path="people" element={<PeopleScreen />} />
                        <Route
                            path="people/:id"
                            element={<PersonDetail conversations={conversations} />}
                        />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default App;
