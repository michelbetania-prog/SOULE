import { describe, expect, it } from "vitest";
import { activities, validateActivities } from "./activities";
describe("biblioteca editorial", () => {
  it("valida el esquema, las palabras no permitidas y las 35 actividades", () => { expect(validateActivities()).toBe(true); expect(activities).toHaveLength(35); });
  it("tiene 15 actividades funcionales con la distribución solicitada", () => {
    const functional=activities.filter(a=>a.functional); const count=(seconds:number)=>functional.filter(a=>a.durationSeconds===seconds).length;
    expect(functional).toHaveLength(15); expect(count(30)).toBe(3); expect(count(120)).toBe(4); expect(count(300)).toBe(4); expect(count(600)).toBe(2); expect(count(900)).toBe(2);
  });
});
