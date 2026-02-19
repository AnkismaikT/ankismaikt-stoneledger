import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-10 text-red-600">
        Error loading leads: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-10">
        StoneLedger Admin Dashboard
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-700">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 border border-slate-700">Type</th>
              <th className="p-3 border border-slate-700">Name</th>
              <th className="p-3 border border-slate-700">Phone</th>
              <th className="p-3 border border-slate-700">City</th>
              <th className="p-3 border border-slate-700">Budget</th>
              <th className="p-3 border border-slate-700">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-800 transition">
                <td className="p-3 border border-slate-700">
                  {lead.type}
                </td>
                <td className="p-3 border border-slate-700">
                  {lead.name}
                </td>
                <td className="p-3 border border-slate-700">
                  {lead.phone}
                </td>
                <td className="p-3 border border-slate-700">
                  {lead.city || "-"}
                </td>
                <td className="p-3 border border-slate-700">
                  {lead.budget || "-"}
                </td>
                <td className="p-3 border border-slate-700">
                  {new Date(lead.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

