
export function showHelp() {
    console.log('Usage: node notes.js <command> -- [options]');
    console.log('Commands:');
    console.log('  create: Create a new note');
    console.log('  edit: Edit an existing note');
    console.log('  read: Read an existing note');
    console.log('  showAll: Show all notes');
    console.log('  help: Show help');
    console.log('Options:');
    console.log('  --title: Title of the note');
    console.log('  --text: Text of the note');
    console.log('  --id: Id of the note');
    console.log('  --secret: Secret to encrypt/decrypt note');

    process.exit(0);
}
