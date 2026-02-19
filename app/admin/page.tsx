import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { type?: string; status?: string };
}) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams?.type) {
    query = query.eq("type", searchParams.type);
  }

  if (searchParams?.status) {
    query = query.eq("status", searchParams.status);
  }

  const { data: leads, error } = await query;

  // 🔥 FETCH ALL FOR METRICS
  const { data: allLeads } = await supabase.from("leads").select("*");

  const totalLeads = allLeads?.length || 0;
  const buyerCount = allLeads?.filter(l => l.type === "buyer").length || 0;
  const sellerCount = allLeads?.filter(l => l.type === "seller").length || 0;
  const newCount = allLeads?.filter(l => l.status === "new").length || 0;
  const matchedCount = allLeads?.filter(l => l.status === "matched").length || 0;

  async function updateLeadStatus(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const status = formData.get("status") as string;

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from("leads").update({ status }).eq("id", id);
  }

  if (error) {
    return (
      <div className="p-10 text-red-600">
        Error loading leads: {error.message}
      </div>
    );
  }

  const activeType = searchParams?.type || "all";
  const activeStatus = searchParams?.status || "all";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h2 className="text-xl font-bold mb-8">
          StoneLedger CRM
        </h2>

        <div className="space-y-8">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">
              Lead Type
            </p>

            <SidebarLink href="/admin" active={activeType === "all"}>
              All Leads
            </SidebarLink>

            <SidebarLink href="/admin?type=buyer" active={activeType === "buyer"}>
              Buyers
            </SidebarLink>

            <SidebarLink href="/admin?type=seller" active={activeType === "seller"}>
              Sellers
            </SidebarLink>
          </div>

          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">
              Status
            </p>

            {["new", "contacted", "matched", "closed", "rejected"].map(
              (status) => (
                <SidebarLink
                  key={status}
                  href={`/admin?status=${status}`}
                  active={activeStatus === status}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SidebarLink>
              )
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 bg-slate-950">

        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* 🔥 METRIC CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">

          <MetricCard title="Total Leads" value={totalLeads} />

          <MetricCard title="Buyers" value={buyerCount} />

          <MetricCard title="Sellers" value={sellerCount} />

          <MetricCard title="New" value={newCount} />

          <MetricCard title="Matched" value={matchedCount} />

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">City</th>
                <th className="p-4 text-left">Budget</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {leads?.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-800 hover:bg-slate-800 transition">
                  <td className="p-4 capitalize">{lead.type}</td>
                  <td className="p-4">{lead.name}</td>
                  <td className="p-4">{lead.phone}</td>
                  <td className="p-4">{lead.city || "-"}</td>
                  <td className="p-4">{lead.budget || "-"}</td>

                  <td className="p-4">
                    <form action={updateLeadStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status || "new"}
                        className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600 text-sm"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="matched">Matched</option>
                        <option value="closed">Closed</option>
                        <option value="rejected">Rejected</option>
                      </select>

                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                    </form>
                  </td>

                  <td className="p-4">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* SIDEBAR LINK */
function SidebarLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-2 mb-2 rounded-md cursor-pointer transition text-sm ${
          active
            ? "bg-emerald-600 text-white"
            : "text-slate-300 hover:bg-slate-800"
        }`}
      >
        {children}
      </div>
    </Link>
  );
}

/* METRIC CARD */
function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
      <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
        {title}
      </p>
      <p className="text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

