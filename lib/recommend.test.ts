import { describe, expect, it } from "vitest";
import { recommend } from "./recommend";
describe("motor de recomendación", () => {
  it("ofrece lectura o escucha con poca energía y 2 minutos", () => expect(["leer","escuchar"]).toContain(recommend({energy:"baja",minutes:2}).primary.format));
  it("prioriza pausa o claridad ante saturación y 5 minutos", () => expect(["descanso","claridad mental"]).toContain(recommend({need:"saturación",minutes:5}).primary.category));
  it("propone autoestima cuando se solicita", () => expect(recommend({need:"autoestima",minutes:5}).primary.category).toBe("autoestima"));
  it("reduce a una sola acción cuando hay un minuto", () => expect(recommend({minutes:1}).primary.steps).toHaveLength(1));
  it("da dos alternativas distintas ante no sé", () => expect(recommend({need:"no sé"}).alternatives).toHaveLength(2));
  it("no repite las últimas cinco sesiones", () => { const r = recommend({minutes:5}, [{id:"vaciado-suave"},{id:"pausa-sentada"},{id:"limite-pequeno"},{id:"hechos-amables"},{id:"orden-tres"}]); expect(["vaciado-suave","pausa-sentada","limite-pequeno","hechos-amables","orden-tres"]).not.toContain(r.primary.id); });
  it("baja una actividad marcada como no útil", () => expect(recommend({need:"autoestima",minutes:5},[{id:"hechos-amables",helpful:"no"}]).primary.id).not.toBe("hechos-amables"));
});
