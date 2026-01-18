import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ConversationsScreen from './pages/ConversationsScreen';
import ConversationDetail from './pages/ConversationDetail';
import PeopleScreen from './pages/PeopleScreen';
import PersonDetail from './pages/PersonDetail';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import { INITIAL_CONVERSATIONS } from './data/mockData';

const App = () => {
    const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
    const [showSplash, setShowSplash] = useState(true);

    const toggleActionItem = (convId: string, itemId: string) => {
        setConversations(prev => prev.map(conv => {
            if (conv.id !== convId) return conv;
            return {
                ...conv,
                actionItems: conv.actionItems.map(item =>
                    item.id === itemId ? { ...item, completed: !item.completed } : item
                )
            };
        }));
    };

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />;
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
