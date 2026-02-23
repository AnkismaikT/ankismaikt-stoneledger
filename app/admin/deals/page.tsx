import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function DealsPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: false });

  async function updateStatus(formData: FormData) {
    "use server";

    const dealId = formData.get("deal_id") as string;
    const status = formData.get("status") as string;

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase
      .from("deals")
      .update({ status })
      .eq("id", dealId);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        StoneLedger Deal Management
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-4 text-left">Deal ID</th>
              <th className="p-4 text-left">Region</th>
              <th className="p-4 text-left">Commission %</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Update</th>
            </tr>
          </thead>
          <tbody>
            {deals?.map((deal) => (
              <tr
                key={deal.id}
                className="border-t border-slate-800 hover:bg-slate-800"
              >
                <td className="p-4 font-semibold">{deal.deal_id}</td>
                <td className="p-4">{deal.region}</td>
                <td className="p-4">{deal.commission_percent}%</td>
                <td className="p-4 capitalize">{deal.status}</td>
                <td className="p-4">
                  <form action={updateStatus} className="flex gap-2">
                    <input type="hidden" name="deal_id" value={deal.id} />

                    <select
                      name="status"
                      className="bg-slate-700 px-2 py-1 rounded text-sm"
                      defaultValue={deal.status}
                    >
                      <option value="under_review">Under Review</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="payment_pending">Payment Pending</option>
                      <option value="closed">Closed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      type="submit"
                      className="bg-emerald-600 px-3 py-1 rounded text-xs"
                    >
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
