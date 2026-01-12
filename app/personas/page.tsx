import { supabase } from "@/lib/supabase";

export default async function PersonasPage() {
  const { data: personas } = await supabase
    .from("personas")
    .select("*")
    .order("created_at");

  const { data: config } = await supabase
    .from("config")
    .select("active_persona_id")
    .eq("id", 1)
    .single();

  async function activatePersona(personaId: string) {
    "use server";

    const { data: persona } = await supabase
      .from("personas")
      .select("base_prompt")
      .eq("id", personaId)
      .single();

    await supabase
      .from("config")
      .update({
        active_persona_id: personaId,
        system_prompt: persona?.base_prompt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Personas</h1>

      <div className="space-y-4">
        {personas?.map((p) => {
          const active = p.id === config?.active_persona_id;

          return (
            <div
              key={p.id}
              className={`border rounded p-4 ${
                active ? "border-green-500" : "border-neutral-700"
              }`}
            >
              <h2 className="font-medium">{p.name}</h2>
              <p className="text-sm text-neutral-400 mb-3">
                {p.description}
              </p>

              <form action={activatePersona.bind(null, p.id)}>
                <button
                  className={`px-3 py-1 rounded text-sm ${
                    active
                      ? "bg-green-600 text-white"
                      : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                >
                  {active ? "Active" : "Activate"}
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
