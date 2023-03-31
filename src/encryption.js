import crypto from 'crypto';
import { askQuestion } from './utils/cli_utils.js';

export async function getSecretToEncryptNote() {
    // prompt user to input secret to encrypt note
    const secret = await askQuestion('Please input secret to encrypt note: ');
    console.log(`Secret to encrypt note: ${secret}. Make sure to save it somewhere safe.`);
    return secret;
}

export function encrypt(text, secret) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(secret).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(text, secret) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(secret).digest();
    const [ivString, encrypted] = text.split(':');
    const iv = Buffer.from(ivString, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
