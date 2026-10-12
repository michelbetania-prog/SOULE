import { describe, expect, it } from "vitest";
import { createDeviceKey, decrypt, encrypt } from "./crypto";
describe("cifrado del diario", () => it("AES-GCM no conserva texto legible en el registro", async () => { const key=await createDeviceKey(); const encrypted=await encrypt({body:"texto íntimo de prueba"},key); expect(JSON.stringify(encrypted)).not.toContain("texto íntimo de prueba"); await expect(decrypt<{body:string}>(encrypted,key)).resolves.toEqual({body:"texto íntimo de prueba"}); }));
