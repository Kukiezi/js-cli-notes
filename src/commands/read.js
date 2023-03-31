'use strict';
import { parseArguments } from '../utils/args_utils.js';
import { decrypt } from '../encryption.js';
import { getNoteById } from '../utils/note_utils.js';

// Define required arguments
// Define arguments and their properties
const argsConfig = [
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
export function readNote(args) {
    const parsedArgs = parseArguments(args, argsConfig);

    const note = getNoteById(parsedArgs['id']);
    if (!note) {
        console.log('Note not found.');
        process.exit(1);
    }

    // try to decrypt note if secret is provided
    if (note.encrypt && parsedArgs['secret']) {
        try {
            note.text = decrypt(note.text, parsedArgs['secret']);
        } catch (e) {
            throw new Error('Invalid secret. Encryption failed.');
        }
    } 

    note.printNote();
    process.exit(1);
}
