import rules from "@/data/recommendation-rules.json";
import { activities, type Activity } from "@/data/activities";

export type CheckIn = { need?: string; energy?: "baja"|"media"|"alta"; minutes?: number; format?: Activity["format"] };
export type ActivityHistory = { id: string; helpful?: "sí"|"un poco"|"no" }[];
export type Recommendation = { primary: Activity; alternatives: Activity[]; why: string; rule: string };
const duration = (seconds:number) => seconds / 60;

export function recommend(checkin: CheckIn, history: ActivityHistory = []): Recommendation {
  const recent = history.slice(-5).map(x => x.id);
  const score = (a: Activity) => {
    let points = 0;
    if (checkin.energy && a.energy === checkin.energy) points += 4;
    if (checkin.format && a.format === checkin.format) points += 2;
    if (checkin.minutes) points += Math.max(0, 3 - Math.abs(duration(a.durationSeconds) - checkin.minutes));
    if (checkin.need === "autoestima" && a.category === "autoestima") points += 8;
    if (checkin.need === "saturación" && ["descanso", "claridad mental"].includes(a.category)) points += 7;
    if (checkin.energy === "baja" && (a.format === "leer" || a.format === "escuchar")) points += 5;
    if ((checkin.minutes ?? 99) <= 1 && a.steps.length === 1) points += 8;
    if (recent.includes(a.id)) points -= 100;
    if (history.find(x => x.id === a.id)?.helpful === "no") points -= 25;
    return points;
  };
  let candidates = activities.filter(a => a.functional);
  if (checkin.need === "autoestima") candidates = candidates.filter(a => a.category === "autoestima");
  if (checkin.energy === "baja" && (checkin.minutes ?? 3) <= 2) candidates = candidates.filter(a => ["leer", "escuchar"].includes(a.format));
  if ((checkin.minutes ?? 99) <= 1) candidates = candidates.filter(a => a.steps.length === 1);
  if (candidates.length === 0) candidates = activities.filter(a => a.functional);
  const ranked = [...candidates].sort((x,y) => score(y) - score(x));
  const primary = ranked[0];
  const why = checkin.need === "no sé" ? "Te ofrezco dos caminos distintos para que elijas el que se sienta más posible." :
    `Te sugiero esto porque dijiste que tienes ${checkin.minutes ?? 2} minuto${(checkin.minutes ?? 2) === 1 ? "" : "s"}${checkin.energy ? ` y energía ${checkin.energy}` : ""}.`;
  const rule = checkin.need === "no sé" ? "unsure" : checkin.need === "autoestima" ? "self-esteem" : checkin.need === "saturación" && (checkin.minutes ?? 0) >= 5 ? "overwhelm" : (checkin.minutes ?? 99) <= 1 ? "short" : checkin.energy === "baja" && (checkin.minutes ?? 3) <= 2 ? "low-energy" : "balanced";
  return { primary, alternatives: ranked.slice(1, checkin.need === "no sé" ? 3 : 2), why, rule };
}
export { rules };
