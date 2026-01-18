export const PEOPLE_DATA = [
    {
        id: 'p1',
        name: 'Sarah Chen',
        role: 'Product Lead at Orio',
        avatarColor: 'bg-indigo-200',
        lastMet: 'Jan 16',
        metCount: 5,
        interests: ['Ethical AI', 'Hiking', 'Ceramics'],
        context: 'Met at the Design Systems conference last year. Looking for a co-founder.',
        openFollowUps: ['Send the deck regarding the Q3 proposal', 'Intro her to Marcus'],
    },
    {
        id: 'p2',
        name: 'David Miller',
        role: 'Freelance Architect',
        avatarColor: 'bg-emerald-200',
        lastMet: 'Jan 14',
        metCount: 12,
        interests: ['Sustainable materials', 'Jazz', 'Coffee brewing'],
        context: 'Old college friend. Currently renovating a loft in Brooklyn.',
        openFollowUps: [],
    },
    {
        id: 'p3',
        name: 'Elena Rostova',
        role: 'Investor',
        avatarColor: 'bg-orange-200',
        lastMet: 'Jan 12',
        metCount: 1,
        interests: ['Fintech', 'Early stage B2B'],
        context: 'Briefly introduced by Sarah. Interested in the memory space.',
        openFollowUps: ['Schedule a proper 30-min coffee chat'],
    }
];

export const INITIAL_CONVERSATIONS = [
    {
        id: 'c1',
        personId: 'p1',
        participants: ['p1', 'p3'],
        title: 'Q3 Beta Roadmap Review',
        date: 'Jan 16 • 2:30 PM',
        location: 'Blue Bottle Coffee',
        summary: 'Discussed the roadmap for the Q3 beta launch. Sarah is concerned about the onboarding flow but loves the new visual direction.',
        keyPoints: [
            'Sarah thinks the sign-up process has too many steps.',
            'Suggests moving the "Personalization" screen to after account creation.',
            'She is available next Tuesday for a design review.'
        ],
        actionItems: [
            { id: 'a1', text: 'Mock up a shortened onboarding flow', completed: false },
            { id: 'a2', text: 'Send calendar invite for Tuesday Design Review', completed: false }
        ],
        fullTranscript: "Sarah: Thanks for meeting up. I've been looking over the Q3 mocks.\n\nMe: Of course. What are your initial thoughts?\n\nSarah: Visuals are stunning, but I really think we're losing people at step 3. It feels heavy. We should look at how Linear does their onboarding—it's much punchier.\n\nElena: I agree with Sarah on the friction. If we're targeting the prosumer market, every extra click is a drop-off point.\n\nMe: That makes sense. We could move the 'Personalization' screen to after the main dashboard setup.\n\nSarah: Exactly. Let's aim for a Tuesday design review to finalize that change."
    },
    {
        id: 'c2',
        personId: 'p2',
        participants: ['p2'],
        title: 'Brooklyn Project & Japan Trip',
        date: 'Jan 14 • 6:00 PM',
        location: 'The Jazz Corner',
        summary: 'Casual catch-up. David is finishing the Brooklyn project next month. Talked about his upcoming trip to Japan.',
        keyPoints: [
            'Brooklyn project wraps in Feb.',
            'He needs recommendation for hotels in Kyoto.',
            'Mentioned he is taking a break from contracting for 2 months.'
        ],
        actionItems: [
            { id: 'a3', text: 'Send list of Kyoto recommendations', completed: false }
        ],
        fullTranscript: "David: It's been a marathon, man. I'm taking two months off starting March.\n\nMe: Well deserved. You still heading to Japan?\n\nDavid: Yeah, Kyoto for ten days. I haven't booked a place yet though.\n\nMe: I have a list of spots from my last trip. I'll send them over."
    },
    {
        id: 'c3',
        personId: 'p3',
        participants: ['p3'],
        title: 'Intro to Invisible AI',
        date: 'Jan 12 • 10:00 AM',
        location: 'TechCrunch Disrupt',
        summary: 'Introductory chat. Elena is looking for AI native apps in the productivity space.',
        keyPoints: [
            'Elena invests in Pre-seed/Seed.',
            'Thesis is around "invisible AI" interfaces.'
        ],
        actionItems: [],
        fullTranscript: "Elena: I see so many chat bots. I'm looking for things that disappear. AI shouldn't feel like a second person you have to manage; it should feel like an extension of your own capability."
    },
    {
        id: 'c4',
        personId: 'p1',
        participants: ['p1'],
        title: 'Design System Migration Sync',
        date: 'Dec 10 • 11:00 AM',
        location: 'Virtual Call',
        summary: 'Initial sync regarding the design system migration. Agreed to use Figma variables.',
        keyPoints: [
            'Migrating to variables in Q1.',
            'Need to audit existing color tokens.'
        ],
        actionItems: [
            { id: 'a4', text: 'Run token audit', completed: true }
        ],
        fullTranscript: "Sarah: Variables are going to save us so much time. We need to start with the color tokens first though. It's a mess in the legacy file."
    },
    {
        id: 'c5',
        personId: 'p1',
        participants: ['p1'],
        title: 'Coffee & Ceramics',
        date: 'Nov 24 • 4:00 PM',
        location: 'Design Conf Mixer',
        summary: 'First meeting. Connected over shared interest in ceramics and ethical AI.',
        keyPoints: [
            'Sarah works at Orio.',
            'She runs a pottery studio on weekends.'
        ],
        actionItems: [
            { id: 'a5', text: 'Connect on LinkedIn', completed: true }
        ],
        fullTranscript: "Sarah: Oh no way, I just bought a wheel last month! I'm trying to master centering. It's so much harder than it looks."
    }
];
