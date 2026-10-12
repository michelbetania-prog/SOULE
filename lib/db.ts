"use client";
import Dexie, { type EntityTable } from "dexie";
import { createDeviceKey, decrypt, encrypt, type Cipher } from "./crypto";

export type Result = { id?:number; activityId:string; activityTitle:string; text:string; type:string; createdAt:number; helpful?:"sí"|"un poco"|"no"; highlighted?:boolean };
export type Draft = { id:"current"; activityId:string; step:number; startedAt:number; input:string };
export type JournalRow = { id?:number; createdAt:number; updatedAt:number; cipher:Cipher; mood?:string };
export type Meta = { key:string; value: unknown };
export type EventRow = { id?:number; event:"onboarding_started"|"onboarding_completed"|"onboarding_skipped"|"activity_started"|"activity_completed"|"activity_abandoned"|"activity_feedback"|"activity_repeated"|"reminders_disabled"; activityId?:string; step?:number; helpful?:string; createdAt:number };
export class CompincheDB extends Dexie {
  results!: EntityTable<Result,"id">; drafts!: EntityTable<Draft,"id">; journal!: EntityTable<JournalRow,"id">; meta!: EntityTable<Meta,"key">; events!: EntityTable<EventRow,"id">;
  constructor(){ super("compinche-space"); this.version(1).stores({results:"++id,activityId,createdAt,highlighted",drafts:"id",journal:"++id,createdAt,updatedAt",meta:"key",events:"++id,event,createdAt"}); }
}
export const db = new CompincheDB();
async function journalKey():Promise<CryptoKey> { const found=await db.meta.get("device-key"); if (found?.value) return found.value as CryptoKey; const key=await createDeviceKey(); await db.meta.put({key:"device-key",value:key}); return key; }
export async function saveJournal(body:string,mood?:string){ const cipher=await encrypt({body},await journalKey()); return db.journal.add({cipher, mood, createdAt:Date.now(),updatedAt:Date.now()}); }
export async function updateJournal(id:number, body:string, mood?:string){ const cipher=await encrypt({body},await journalKey()); return db.journal.update(id,{cipher,mood,updatedAt:Date.now()}); }
export async function readJournal(){ const key=await journalKey(); return Promise.all((await db.journal.orderBy("createdAt").reverse().toArray()).map(async r=>({...r,...await decrypt<{body:string}>(r.cipher,key)}))); }
export async function exportJournal(){ return JSON.stringify(await readJournal(),null,2); }
export async function exportJournalText(){ return (await readJournal()).map(row=>`${new Date(row.createdAt).toLocaleDateString("es-DO")}\n${row.body || "Momento registrado sin texto."}`).join("\n\n---\n\n"); }
export async function clearAllLocalData(){ await db.transaction("rw",db.results,db.drafts,db.journal,db.meta,db.events,async()=>{ await Promise.all([db.results.clear(),db.drafts.clear(),db.journal.clear(),db.meta.clear(),db.events.clear()]); }); }
export async function track(event:EventRow["event"], extra:Omit<EventRow,"id"|"event"|"createdAt">={}) { await db.events.add({event,createdAt:Date.now(),...extra}); }
