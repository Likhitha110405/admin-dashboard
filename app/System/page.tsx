import { supabase } from "@/lib/supabase";

export default async function SystemPage() {
  const { data: config } = await supabase
    .from("config")
    .select("*")
    .eq("id", 1)
    .single();

  async function updateSystemPrompt(formData: FormData) {
    "use server";

    const system_prompt = formData.get("system_prompt") as string;

    await supabase
      .from("config")
      .update({
        system_prompt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
  }

  async function resetMemory() {
    "use server";

    await supabase
      .from("config")
      .update({
        memory_summary: "",
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold">System Control</h1>

      <form action={updateSystemPrompt} className="space-y-3">
        <label className="text-sm text-neutral-400">
          System Instructions
        </label>

        <textarea
          name="system_prompt"
          defaultValue={config?.system_prompt || ""}
          rows={8}
          className="w-full rounded bg-neutral-900 border border-neutral-700 p-3"
        />

        <button className="px-4 py-2 bg-blue-600 rounded text-sm">
          Save Instructions
        </button>
      </form>

      <div className="border-t border-neutral-800 pt-6">
        <h2 className="text-sm font-medium mb-2">Conversation Memory</h2>

        <pre className="bg-neutral-900 p-3 rounded text-xs whitespace-pre-wrap">
          {config?.memory_summary || "No memory yet"}
        </pre>

        <form action={resetMemory} className="mt-3">
          <button className="px-3 py-1 text-sm bg-red-600 rounded">
            Reset Memory
          </button>
        </form>
      </div>
    </div>
  );
}
