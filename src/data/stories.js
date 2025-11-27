export const storiesData = {
    'u1-story': {
        id: 'u1-story',
        title: 'The Passport',
        characters: {
            'Vikram': { name: 'Vikram', color: '#e8b00d' },
            'Priti': { name: 'Priti', color: '#ce82ff' }
        },
        lines: [
            { type: 'dialogue', character: 'Vikram', text: 'Priti, where is my passport?', audio: null },
            { type: 'dialogue', character: 'Priti', text: 'It is not here, Vikram.', audio: null },
            { type: 'question', prompt: 'What is Vikram looking for?', options: ['His passport', 'His dog', 'His car'], correctAnswer: 'His passport' },
            { type: 'dialogue', character: 'Vikram', text: 'I need my passport to go to the airport!', audio: null },
            { type: 'dialogue', character: 'Priti', text: 'But Vikram... you are holding your passport.', audio: null },
            { type: 'dialogue', character: 'Vikram', text: 'Oh. Thank you, Priti.', audio: null },
        ]
    }
};
