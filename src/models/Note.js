export function Note({id, creator, text, title, encrypt}) {
    this.id = id;
    this.creator = creator;
    this.text = text;
    this.title = title;
    this.encrypt = encrypt;
}

Note.prototype.toString = function () {
    return `Note ${this.id}: Creator: ${this.creator}, Title: ${this.title}`;
};

Note.prototype.printNote = function () {
    console.log(`Note ${this.id}`);
    console.log(`Creator: ${this.creator}`)
    console.log(`Title: ${this.title}`)
    console.log('------------------')
    console.log(this.text)
};