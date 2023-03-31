'use strict';
import process from 'node:process';
import { createNote } from './src/commands/create.js';
import { editNote } from './src/commands/edit.js';
import { loadNotes } from './src/utils/note_utils.js';
import { readNote } from './src/commands/read.js';
import { showAll } from './src/commands/showAll.js';
import { showHelp } from './src/commands/showHelp.js';

export const notes = loadNotes();

// remove first two arguments (node and script name)
const args = process.argv.slice(2);
// first argument is the command (create, edit, etc.)
const command = args.shift();

// Call appropriate function based on command
try {
    switch (command) {
        case 'create':
            createNote(args);
            break;
        case 'edit':
            editNote(args);
            break;
        case 'read':
            readNote(args);
            break;
        case 'showAll':
            showAll();
            break;
        case 'help':
            showHelp();
            break;
        default:
            console.error(`Unknown command: ${command}`);
            process.exit(1);
    }
} catch (e) {
    console.error(e.message);
    process.exit(1);
}
