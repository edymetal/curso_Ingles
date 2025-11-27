export const exercisesData = {
    'u1-l1': [
        // 1. Select Image (Boy)
        {
            id: 'q1',
            type: 'select-image',
            prompt: 'Selecione a palavra para "Menino"',
            options: [
                { id: 'opt1', image: '/images/boy.png', text: 'Boy', isCorrect: true },
                { id: 'opt2', image: '/images/girl.png', text: 'Girl', isCorrect: false },
                { id: 'opt3', image: '/images/cat.png', text: 'Cat', isCorrect: false },
                { id: 'opt4', image: '/images/dog.png', text: 'Dog', isCorrect: false },
            ]
        },
        // 2. Select Image (Girl)
        {
            id: 'q2',
            type: 'select-image',
            prompt: 'Selecione a palavra para "Menina"',
            options: [
                { id: 'opt1', image: '/images/boy.png', text: 'Boy', isCorrect: false },
                { id: 'opt2', image: '/images/girl.png', text: 'Girl', isCorrect: true },
                { id: 'opt3', image: '/images/cat.png', text: 'Cat', isCorrect: false },
                { id: 'opt4', image: '/images/dog.png', text: 'Dog', isCorrect: false },
            ]
        },
        // 3. Match Pairs (Basic Vocab)
        {
            id: 'q3',
            type: 'match-pairs',
            prompt: 'Combine os pares',
            pairs: [
                { from: 'Water', to: 'Água' },
                { from: 'Bread', to: 'Pão' },
                { from: 'Milk', to: 'Leite' },
                { from: 'Coffee', to: 'Café' }
            ]
        },
        // 4. Word Bank (I am a boy)
        {
            id: 'q4',
            type: 'word-bank',
            prompt: 'Traduza esta frase',
            originalText: 'Eu sou um menino',
            correctOrder: ['I', 'am', 'a', 'boy'],
            correctAnswer: 'I am a boy',
            words: ['boy', 'I', 'am', 'a', 'girl', 'cat']
        },
        // 5. Select Image (Apple)
        {
            id: 'q5',
            type: 'select-image',
            prompt: 'Selecione a palavra para "Maçã"',
            options: [
                { id: 'opt1', image: '/images/apple.png', text: 'Apple', isCorrect: true },
                { id: 'opt2', image: '/images/banana.png', text: 'Banana', isCorrect: false },
                { id: 'opt3', image: '/images/orange.png', text: 'Orange', isCorrect: false },
                { id: 'opt4', image: '/images/grape.png', text: 'Grape', isCorrect: false },
            ]
        },
        // 6. Word Bank (I eat apples)
        {
            id: 'q6',
            type: 'word-bank',
            prompt: 'Traduza esta frase',
            originalText: 'Eu como maçãs',
            correctOrder: ['I', 'eat', 'apples'],
            correctAnswer: 'I eat apples',
            words: ['eat', 'I', 'apples', 'drink', 'bread']
        },
        // 7. Translate (Hello)
        {
            id: 'q7',
            type: 'translate',
            prompt: 'Traduza "Olá" para Inglês',
            textToRead: 'Olá',
            mode: 'text',
            correctAnswer: 'Hello'
        },
        // 8. Match Pairs (Verbs)
        {
            id: 'q8',
            type: 'match-pairs',
            prompt: 'Combine os pares',
            pairs: [
                { from: 'To eat', to: 'Comer' },
                { from: 'To drink', to: 'Beber' },
                { from: 'To be', to: 'Ser/Estar' },
                { from: 'To have', to: 'Ter' }
            ]
        },
        // 9. Word Bank (She drinks water)
        {
            id: 'q9',
            type: 'word-bank',
            prompt: 'Traduza esta frase',
            originalText: 'Ela bebe água',
            correctOrder: ['She', 'drinks', 'water'],
            correctAnswer: 'She drinks water',
            words: ['She', 'drinks', 'water', 'eat', 'bread', 'I']
        },
        // 10. Translate (Good morning)
        {
            id: 'q10',
            type: 'translate',
            prompt: 'Traduza "Bom dia" para Inglês',
            textToRead: 'Bom dia',
            mode: 'text',
            correctAnswer: 'Good morning'
        }
    ],
    'u1-chest': [
        {
            id: 'c1',
            type: 'chest-reward',
            prompt: 'Você encontrou um baú!',
            reward: '50 Gems'
        }
    ],
    'u1-trophy': [
        // Final Test - 10 Questions
        // 1. Translate (Need water)
        {
            id: 't1',
            type: 'translate',
            prompt: 'Traduza "Eu preciso de água"',
            textToRead: 'Eu preciso de água',
            mode: 'text',
            correctAnswer: 'I need water'
        },
        // 2. Match Pairs (Greetings)
        {
            id: 't2',
            type: 'match-pairs',
            prompt: 'Combine os pares',
            pairs: [
                { from: 'Hello', to: 'Olá' },
                { from: 'Goodbye', to: 'Adeus' },
                { from: 'Please', to: 'Por favor' },
                { from: 'Thanks', to: 'Obrigado' }
            ]
        },
        // 3. Word Bank (I have a passport)
        {
            id: 't3',
            type: 'word-bank',
            prompt: 'Traduza: Eu tenho um passaporte',
            originalText: 'Eu tenho um passaporte',
            correctOrder: ['I', 'have', 'a', 'passport'],
            correctAnswer: 'I have a passport',
            words: ['I', 'have', 'a', 'passport', 'ticket', 'need']
        },
        // 4. Select Image (Dog)
        {
            id: 't4',
            type: 'select-image',
            prompt: 'Selecione a palavra para "Cachorro"',
            options: [
                { id: 'opt1', image: '/images/cat.png', text: 'Cat', isCorrect: false },
                { id: 'opt2', image: '/images/dog.png', text: 'Dog', isCorrect: true },
                { id: 'opt3', image: '/images/boy.png', text: 'Boy', isCorrect: false },
                { id: 'opt4', image: '/images/girl.png', text: 'Girl', isCorrect: false },
            ]
        },
        // 5. Translate (I eat bread)
        {
            id: 't5',
            type: 'translate',
            prompt: 'Traduza "Eu como pão"',
            textToRead: 'Eu como pão',
            mode: 'text',
            correctAnswer: 'I eat bread'
        },
        // 6. Match Pairs (Family)
        {
            id: 't6',
            type: 'match-pairs',
            prompt: 'Combine os pares',
            pairs: [
                { from: 'Mother', to: 'Mãe' },
                { from: 'Father', to: 'Pai' },
                { from: 'Sister', to: 'Irmã' },
                { from: 'Brother', to: 'Irmão' }
            ]
        },
        // 7. Word Bank (She is a girl)
        {
            id: 't7',
            type: 'word-bank',
            prompt: 'Traduza: Ela é uma menina',
            originalText: 'Ela é uma menina',
            correctOrder: ['She', 'is', 'a', 'girl'],
            correctAnswer: 'She is a girl',
            words: ['She', 'is', 'a', 'girl', 'boy', 'am']
        },
        // 8. Select Image (Orange)
        {
            id: 't8',
            type: 'select-image',
            prompt: 'Selecione a palavra para "Laranja"',
            options: [
                { id: 'opt1', image: '/images/apple.png', text: 'Apple', isCorrect: false },
                { id: 'opt2', image: '/images/orange.png', text: 'Orange', isCorrect: true },
                { id: 'opt3', image: '/images/banana.png', text: 'Banana', isCorrect: false },
                { id: 'opt4', image: '/images/grape.png', text: 'Grape', isCorrect: false },
            ]
        },
        // 9. Translate (Excuse me)
        {
            id: 't9',
            type: 'translate',
            prompt: 'Traduza "Com licença"',
            textToRead: 'Com licença',
            mode: 'text',
            correctAnswer: 'Excuse me'
        },
        // 10. Word Bank (I drink coffee)
        {
            id: 't10',
            type: 'word-bank',
            prompt: 'Traduza: Eu bebo café',
            originalText: 'Eu bebo café',
            correctOrder: ['I', 'drink', 'coffee'],
            correctAnswer: 'I drink coffee',
            words: ['I', 'drink', 'coffee', 'water', 'tea', 'eat']
        }
    ]
};
