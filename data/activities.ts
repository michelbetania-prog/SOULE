import { z } from "zod";

export const forbiddenWords = ["cura", "trata", "diagnostica", "terapia", "sana tu ansiedad"];
export const activitySchema = z.object({
  id: z.string().min(2), title: z.string().min(3), category: z.enum(["autoestima", "descanso", "estrés cotidiano", "claridad mental", "autocuidado físico", "límites personales", "organización amable", "gratitud"]),
  objective: z.string().min(8), durationSeconds: z.union([z.literal(30), z.literal(120), z.literal(300), z.literal(600), z.literal(900)]),
  format: z.enum(["leer", "escribir", "escuchar", "acción"]), energy: z.enum(["baja", "media", "alta"]),
  steps: z.array(z.string().min(2)).min(1).max(5), resultType: z.enum(["reflection", "confirmation", "list", "affirmation"]),
  closure: z.string().min(5), why: z.string().min(5), safetyFlags: z.array(z.string()), functional: z.boolean()
});
export type Activity = z.infer<typeof activitySchema>;

const a = (id:string,title:string,category:Activity["category"],durationSeconds:Activity["durationSeconds"],format:Activity["format"],energy:Activity["energy"],steps:string[],resultType:Activity["resultType"], functional=true):Activity => ({ id,title,category,durationSeconds,format,energy,steps,resultType,functional, objective:"Abrir un espacio breve y concreto para ti.", closure:"Guarda lo que te llevas de este ratito.", why:"Una propuesta breve, amable y sin presión.", safetyFlags:["No sustituye apoyo profesional"] });

export const activities: Activity[] = [
  a("respiro-ventana","Mira por la ventana","descanso",30,"leer","baja",["Mira un punto lejano.","Nombra una cosa tranquila.","Vuelve cuando quieras."],"reflection"),
  a("logro-mini","Un logro de hoy","autoestima",30,"escribir","baja",["Escribe algo que sí hiciste hoy."],"affirmation"),
  a("soltar-hombros","Suelta los hombros","autocuidado físico",30,"acción","baja",["Baja los hombros.","Exhala despacio una vez."],"confirmation"),
  a("te-escucho","Una frase para ti","autoestima",120,"leer","baja",["Lee: estoy haciendo lo que puedo.","Elige si la quieres guardar."],"affirmation"),
  a("agua-presente","Un sorbo presente","autocuidado físico",120,"acción","baja",["Toma un sorbo de agua.","Nota la temperatura.","Confirma cómo te sentiste."],"confirmation"),
  a("mesa-clara","Una cosa en su lugar","organización amable",120,"acción","media",["Elige un objeto cercano.","Ponlo donde te ayude verlo."],"confirmation"),
  a("gracias-concreto","Algo que agradezco","gratitud",120,"escribir","baja",["Completa: agradezco ____ porque ____."],"reflection"),
  a("vaciado-suave","Vaciado de pensamientos","claridad mental",300,"escribir","media",["Escribe lo que ocupa tu mente.","No ordenes todavía.","Elige una cosa para hoy."],"list"),
  a("pausa-sentada","Pausa sentada","descanso",300,"escuchar","baja",["Siéntate cómoda.","Sigue tres respiraciones suaves.","Vuelve a tu ritmo."],"confirmation"),
  a("limite-pequeno","Un límite pequeño","límites personales",300,"escribir","media",["Piensa en una petición.","Escribe: hoy puedo decir ____."],"reflection"),
  a("hechos-amables","Dos hechos amables","autoestima",300,"escribir","media",["Nombra dos cosas que resolviste.","Guárdalas para releerlas."],"affirmation"),
  a("orden-tres","Mi lista de tres","organización amable",600,"escribir","media",["Escribe hasta tres cosas.","Marca una que sí harás.","Suelta lo demás por ahora."],"list"),
  a("cuerpo-escucha","Escucha tu cuerpo","autocuidado físico",600,"acción","baja",["Nota dónde apoyas los pies.","Haz una pausa.","Elige un ajuste cómodo."],"confirmation"),
  a("mapa-apoyo","Mi mapa de apoyo","claridad mental",900,"escribir","media",["Anota qué necesitas.","Anota a quién podrías pedir algo.","Elige un paso amable."],"list"),
  a("carta-compinche","Carta de compinche","autoestima",900,"escribir","media",["Escríbete como a una amiga.","Incluye una fortaleza concreta.","Pausa si lo necesitas."],"affirmation"),
  a("nombre-estado","Ponle nombre al momento","estrés cotidiano",120,"escribir","baja",["Completa: ahora mismo necesito ____."],"reflection",false),
  a("aire-lento","Aire lento","descanso",120,"acción","baja",["Inhala sin esfuerzo.","Exhala un poco más lento."],"confirmation",false),
  a("cajon-uno","Un cajón, no toda la casa","organización amable",300,"acción","media",["Elige un cajón.","Haz espacio para una cosa."],"confirmation",false),
  a("permiso","Permiso para bajar el ritmo","límites personales",30,"leer","baja",["Lee: puedo ir más despacio."],"affirmation",false),
  a("nota-buena","Una nota buena","gratitud",30,"escribir","baja",["Escribe algo pequeño que estuvo bien."],"reflection",false),
  a("estirar-cuello","Estira el cuello","autocuidado físico",120,"acción","baja",["Mueve el cuello con suavidad.","Detente si incomoda."],"confirmation",false),
  a("tarea-amable","Hazlo más pequeño","organización amable",300,"escribir","media",["Escribe la versión de dos minutos de tu tarea."],"list",false),
  a("dos-opciones","Dos opciones posibles","claridad mental",300,"escribir","media",["Escribe dos opciones.","Elige la más ligera."],"reflection",false),
  a("gracias-cuerpo","Gracias, cuerpo","gratitud",120,"escribir","baja",["Agradece una cosa que tu cuerpo hizo."],"affirmation",false),
  a("silencio-corto","Un silencio corto","descanso",30,"escuchar","baja",["Baja el sonido.","Quédate treinta segundos."],"confirmation",false),
  a("no-ahora","No para ahora","límites personales",300,"escribir","media",["Completa: esto puede esperar hasta ____."],"reflection",false),
  a("luz-suave","Busca luz suave","autocuidado físico",30,"acción","baja",["Acércate a una luz cómoda."],"confirmation",false),
  a("mis-recursos","Recuerda un recurso","autoestima",600,"escribir","media",["Anota algo que te ha ayudado antes."],"reflection",false),
  a("lista-suelto","Lo que suelto","organización amable",600,"escribir","media",["Escribe lo que no harás hoy.","Guárdalo sin culpa."],"list",false),
  a("ritmo-propio","Mi ritmo propio","estrés cotidiano",120,"leer","baja",["Lee: no tengo que correr para valer."],"affirmation",false),
  a("detalle-bonito","Un detalle bonito","gratitud",300,"acción","baja",["Busca un detalle agradable.","Descríbelo en una frase."],"reflection",false),
  a("descanso-planeado","Plan de descanso","descanso",600,"escribir","media",["Elige un descanso posible.","Escribe cuándo podrías tomarlo."],"list",false),
  a("valor-propio","Una cualidad que practiqué","autoestima",300,"escribir","media",["Completa: hoy practiqué ____."],"affirmation",false),
  a("margen","Deja un margen","límites personales",120,"acción","media",["Deja cinco minutos libres en tu plan."],"confirmation",false),
  a("cierre-dia","Cierre del día","claridad mental",900,"escribir","media",["Nombra lo hecho.","Decide lo siguiente.","Deja el resto para después."],"list",false)
];

export function validateActivities() {
  for (const activity of activities) {
    activitySchema.parse(activity);
    if (activity.steps.some(step => step.trim().split(/\s+/).length > 25)) throw new Error(`Paso demasiado largo en ${activity.id}`);
    const text = JSON.stringify(activity).toLowerCase();
    if (forbiddenWords.some(word => text.includes(word))) throw new Error(`Contenido no permitido en ${activity.id}`);
  }
  return true;
}
// Al importarse, cualquier contenido editorial inválido detiene compilación/pruebas.
validateActivities();
