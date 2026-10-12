const encoder = new TextEncoder(); const decoder = new TextDecoder();
export type Cipher = { iv: string; ciphertext: string; version: 1 };
const bytesToBase64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));
const base64ToBytes = (s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const arrayBuffer = (value: Uint8Array): ArrayBuffer => value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) as ArrayBuffer;
export async function createDeviceKey() { return crypto.subtle.generateKey({name:"AES-GCM",length:256}, false, ["encrypt","decrypt"]); }
export async function derivePassphraseKey(passphrase:string, salt:Uint8Array) { const source = await crypto.subtle.importKey("raw", arrayBuffer(encoder.encode(passphrase)), "PBKDF2", false, ["deriveKey"]); return crypto.subtle.deriveKey({name:"PBKDF2",salt:arrayBuffer(salt),iterations:310000,hash:"SHA-256"},source,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]); }
export async function encrypt(value: unknown, key: CryptoKey): Promise<Cipher> { const iv = crypto.getRandomValues(new Uint8Array(12)); const ciphertext = await crypto.subtle.encrypt({name:"AES-GCM",iv:arrayBuffer(iv)},key,arrayBuffer(encoder.encode(JSON.stringify(value)))); return {iv:bytesToBase64(iv),ciphertext:bytesToBase64(new Uint8Array(ciphertext)),version:1}; }
export async function decrypt<T>(cipher: Cipher,key: CryptoKey): Promise<T> { const clear=await crypto.subtle.decrypt({name:"AES-GCM",iv:arrayBuffer(base64ToBytes(cipher.iv))},key,arrayBuffer(base64ToBytes(cipher.ciphertext))); return JSON.parse(decoder.decode(clear)); }
