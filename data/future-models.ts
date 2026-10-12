/** Contratos sin persistencia remota: reservados para Fase 2/3, no activos en Fase 1. */
export type FutureProfile = { id:string; locale:"es-419"; createdAt:number };
export type FutureActivityRecord = { id:string; activityId:string; completedAt:number; resultId?:string };
export type FutureCheckIn = { id:string; profileId:string; need?:string; energy?:string; minutes?:number; createdAt:number };
export type FutureJournal = { id:string; profileId:string; encryptedPayload:string; updatedAt:number };
export type FutureChallenge = { id:string; title:string; durationDays:7|21; activityIds:string[] };
export type FuturePreference = { profileId:string; lowEnergy:boolean; remindersEnabled:boolean };
