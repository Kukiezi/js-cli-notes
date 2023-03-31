'use strict';
import { encrypt, getSecretToEncryptNote } from '../encryption.js';
import { Note } from '../models/Note.js';
import { notes } from '../../notes.js';
import { parseArguments } from '../utils/args_utils.js';
import { addNote } from '../utils/note_utils.js';
import { validateEmail, validateInput } from '../utils/validation_utils.js';

// Define required arguments
// Define arguments and their properties
const argsConfig = [
    {
        name: '--creator',
        type: 'string',
        required: true,
        validate: (creator) =>
            validateInput(creator, validateEmail, 'creator must be a valid email address.')
    },
    {
        name: '--text',
        type: 'string',
        required: true,
        validate: (text) =>
            validateInput(
                text,
                (text) => text.length > 0 && text.length <= 1000,
                'note must be at least 1 characters long and at most 1000 characters long.'
            )
    },
    {
        name: '--title',
        type: 'string',
        required: true,
        validate: (title) =>
            validateInput(
                title,
                (title) => title.length > 0 && title.length <= 45,
                'Title must be at least 1 characters long and at most 45 characters long.'
            )
    },
    { name: '--encrypt', type: 'boolean', store_true: true, required: false }
];

// Define note functions
export function createNote(args) {
    const parsedArgs = parseArguments(args, argsConfig);

    const newNote = new Note({
        id: notes.length + 1,
        creator: parsedArgs['creator'],
        text: parsedArgs['text'],
        title: parsedArgs['title'],
        encrypt: parsedArgs['encrypt'] || false
    });
    console.log(
        `Creating note: owner=${newNote.creator}, title=${newNote.title}, text=${newNote.text}`
    );

    // if encryption is true, let user input secret to encrypt note and then encrypt note
    if (newNote.encrypt) {
        getSecretToEncryptNote().then((secret) => {
            // encrypt note with secret
            newNote.text = encrypt(newNote.text, secret);
            addNote(newNote);
            console.log('Note created successfully.');
            process.exit(1);
        });
    } else {
        // save note to json file
        addNote(newNote);
        console.log('Note created successfully.');
        process.exit(1);
    }
}
