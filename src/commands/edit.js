'use strict';
import { parseArguments } from '../utils/args_utils.js';
import { decrypt, encrypt } from '../encryption.js';
import { getNoteById, saveNotes } from '../utils/note_utils.js';
import { validateInput } from '../utils/validation_utils.js';

// Define required arguments
// Define arguments and their properties
const argsConfig = [
    {
        name: '--text',
        type: 'string',
        required: false,
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
        required: false,
        validate: (title) =>
            validateInput(
                title,
                (title) => title.length > 0 && title.length <= 45,
                'Title must be at least 1 characters long and at most 45 characters long.'
            )
    },
    {
        name: '--id',
        type: 'number',
        required: true
    },
    {
        name: '--secret',
        type: 'string',
        required: false
    }
];

// Define note functions
export function editNote(args) {
    const parsedArgs = parseArguments(args, argsConfig);

    const note = getNoteById(parsedArgs['id']);
    if (!note) {
        console.log('Note not found.');
        process.exit(1);
    }

    // if note is encrypted, check if user can decrypt it to perform edit
    if (note.encrypt && !parsedArgs['secret']) {
        console.log('Note is encrypted. Please provide secret to decrypt note and edit it.');
        process.exit(1);
    } else if (note.encrypt && parsedArgs['secret']) {
        try {
            note.text = decrypt(note.text, parsedArgs['secret']);
        } catch (e) {
            throw new Error('Invalid secret. Encryption failed.');
        }
    }

    // update note
    note.title = parsedArgs['title'] || note.title;
    note.text = parsedArgs['text'] || note.text;

    // encrypt note if it was encrypted before
    if (note.encrypt) {
        note.text = encrypt(note.text, parsedArgs['secret']);
    }

    saveNotes();
    process.exit(1);
}
