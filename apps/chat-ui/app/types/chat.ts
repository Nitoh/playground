export interface Chat {
    id: number;
    name: string;
    description: string;
    lastMessage: string;
    timestamp: Date;
}

// export const sampleChats: Chat[] = [
//     {
//         id: 1,
//         name: 'Alice',
//         description: '',
//         lastMessage: 'Hey, wie geht es dir?',
//         timestamp: new Date('2026-03-20T09:15:00')
//     },
//     {
//         id: 2,
//         name: 'Bob',
//         description: '',
//         lastMessage: 'Lass uns morgen treffen.',
//         timestamp: new Date('2026-03-20T09:45:00')
//     },
//     {
//         id: 3,
//         name: 'Charlie',
//         description: '',
//         lastMessage: 'Hast du das Dokument gesehen?',
//         timestamp: new Date('2026-03-20T10:05:00')
//     }
// ];