// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Types
export interface Person {
    id: string;
    name: string;
    role: string;
    avatarColor: string;
    lastMet: string | null;
    metCount: number;
    interests: string[];
    context: string;
    openFollowUps: string[];
}

export interface ActionItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface Conversation {
    id: string;
    personId: string;
    participants: string[];
    title: string;
    date: string;
    location: string;
    summary: string;
    keyPoints: string[];
    actionItems: ActionItem[];
    fullTranscript?: string;
}

export interface ConversationListItem {
    id: string;
    personId: string;
    participants: string[];
    title: string;
    date: string;
    location: string;
    summary: string;
    activeActionItemsCount: number;
}

// Helper function to convert snake_case to camelCase
function toCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCase);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((result: any, key: string) => {
            const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            result[camelKey] = toCamelCase(obj[key]);
            return result;
        }, {});
    }
    return obj;
}

// Helper function to convert camelCase to snake_case
function toSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(toSnakeCase);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((result: any, key: string) => {
            const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            result[snakeKey] = toSnakeCase(obj[key]);
            return result;
        }, {});
    }
    return obj;
}

// API Functions

// People endpoints
export const api = {
    people: {
        getAll: async (): Promise<Person[]> => {
            const response = await fetch(`${API_BASE_URL}/people/`);
            if (!response.ok) throw new Error('Failed to fetch people');
            const data = await response.json();
            return toCamelCase(data);
        },

        getById: async (id: string): Promise<Person> => {
            const response = await fetch(`${API_BASE_URL}/people/${id}`);
            if (!response.ok) throw new Error(`Failed to fetch person ${id}`);
            const data = await response.json();
            return toCamelCase(data);
        },

        create: async (person: Omit<Person, 'id' | 'lastMet' | 'metCount'>): Promise<Person> => {
            const response = await fetch(`${API_BASE_URL}/people/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toSnakeCase(person))
            });
            if (!response.ok) throw new Error('Failed to create person');
            const data = await response.json();
            return toCamelCase(data);
        },

        update: async (id: string, updates: Partial<Person>): Promise<Person> => {
            const response = await fetch(`${API_BASE_URL}/people/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toSnakeCase(updates))
            });
            if (!response.ok) throw new Error(`Failed to update person ${id}`);
            const data = await response.json();
            return toCamelCase(data);
        },

        delete: async (id: string): Promise<void> => {
            const response = await fetch(`${API_BASE_URL}/people/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`Failed to delete person ${id}`);
        }
    },

    conversations: {
        getAll: async (personId?: string): Promise<ConversationListItem[]> => {
            const url = personId
                ? `${API_BASE_URL}/conversations/?person_id=${personId}`
                : `${API_BASE_URL}/conversations/`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch conversations');
            const data = await response.json();
            return toCamelCase(data);
        },

        getById: async (id: string): Promise<Conversation> => {
            const response = await fetch(`${API_BASE_URL}/conversations/${id}`);
            if (!response.ok) throw new Error(`Failed to fetch conversation ${id}`);
            const data = await response.json();
            return toCamelCase(data);
        },

        create: async (conversation: Omit<Conversation, 'id'>): Promise<Conversation> => {
            const response = await fetch(`${API_BASE_URL}/conversations/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toSnakeCase(conversation))
            });
            if (!response.ok) throw new Error('Failed to create conversation');
            const data = await response.json();
            return toCamelCase(data);
        },

        update: async (id: string, updates: Partial<Conversation>): Promise<Conversation> => {
            const response = await fetch(`${API_BASE_URL}/conversations/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toSnakeCase(updates))
            });
            if (!response.ok) throw new Error(`Failed to update conversation ${id}`);
            const data = await response.json();
            return toCamelCase(data);
        },

        delete: async (id: string): Promise<void> => {
            const response = await fetch(`${API_BASE_URL}/conversations/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`Failed to delete conversation ${id}`);
        },

        toggleActionItem: async (conversationId: string, itemId: string, completed: boolean): Promise<Conversation> => {
            const response = await fetch(
                `${API_BASE_URL}/conversations/${conversationId}/action-items/${itemId}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed })
                }
            );
            if (!response.ok) throw new Error('Failed to toggle action item');
            const data = await response.json();
            return toCamelCase(data);
        }
    }
};
