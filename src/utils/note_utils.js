import * as fs from "fs";
import { Note } from "../models/Note.js";
import { notes } from "../../notes.js";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'data', 'notes.json');


export function loadNotes() {
    try {
        const notesJSON = fs.readFileSync(filePath);
        const notes = JSON.parse(notesJSON);
        return notes.map(note => new Note({...note}));
    } catch (err) {
        return [];
    }
}

export function addNote(note) {
    notes.push(note);
    saveNotes();
}

export function saveNotes() {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync(filePath, notesJSON);
    console.log("Notes saved to file");
}

export function getNoteById(id) {
    return notes.find((note) => note.id === id);
}