import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        Lead not found.
      </div>
    );
  }

  let matchedLead = null;

  if (lead.matched_with) {
    const { data } = await supabase
      .from("leads")
      .select("id, name, type")
      .eq("id", lead.matched_with)
      .single();

    matchedLead = data;
  }

  async function updateNotes(formData: FormData) {
    "use server";

    const notes = formData.get("notes") as string;

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase
      .from("leads")
      .update({ notes })
      .eq("id", id);
  }

  async function updateStatus(formData: FormData) {
    "use server";

    const status = formData.get("status") as string;

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <Link href="/admin" className="text-blue-400 hover:underline">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mt-6 mb-10">
        Lead Detail
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Lead Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">

          <h2 className="text-xl font-semibold mb-4">
            Lead Information
          </h2>

          <InfoRow label="Type" value={lead.type} />
          <InfoRow label="Name" value={lead.name} />
          <InfoRow label="Phone" value={lead.phone} />
          <InfoRow label="City" value={lead.city || "-"} />
          <InfoRow label="Status" value={lead.status} />

          {matchedLead && (
            <InfoRow
              label="Matched With"
              value={`${matchedLead.name} (${matchedLead.type})`}
            />
          )}

          <form action={updateStatus} className="mt-6 flex gap-3">
            <select
              name="status"
              defaultValue={lead.status}
              className="bg-slate-800 border border-slate-700 px-3 py-2 rounded"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="matched">Matched</option>
              <option value="closed">Closed</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded"
            >
              Update Status
            </button>
          </form>
        </div>

        {/* Notes */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">

          <h2 className="text-xl font-semibold mb-4">
            Trade Notes
          </h2>

          <form action={updateNotes}>
            <textarea
              name="notes"
              defaultValue={lead.notes || ""}
              rows={10}
              className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white"
              placeholder="Write negotiation notes..."
            />

            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Save Notes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-slate-800 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}

