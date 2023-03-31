'use strict';
import { notes } from '../../notes.js';

export function showAll() {
    notes.forEach((note) => {
        console.log(note.toString())
    });

    process.exit(1);
}
