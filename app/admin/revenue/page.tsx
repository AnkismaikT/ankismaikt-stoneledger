import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function RevenuePage() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: false });

  /* =====================================================
     CORE REVENUE CALCULATIONS
  ===================================================== */

  const totalVolume =
    deals?.reduce((sum, deal) => {
      return sum + Number(deal.deal_amount || 0);
    }, 0) || 0;

  const projectedRevenue =
    deals?.reduce((sum, deal) => {
      return (
        sum +
        (Number(deal.deal_amount || 0) *
          Number(deal.commission_percent || 0)) /
          100
      );
    }, 0) || 0;

  const closedRevenue =
    deals
      ?.filter((deal) => deal.status === "closed")
      .reduce((sum, deal) => {
        return (
          sum +
          (Number(deal.deal_amount || 0) *
            Number(deal.commission_percent || 0)) /
            100
        );
      }, 0) || 0;

  const openPipeline =
    deals
      ?.filter((deal) => deal.status !== "closed")
      .reduce((sum, deal) => {
        return sum + Number(deal.deal_amount || 0);
      }, 0) || 0;

  /* =====================================================
     REGIONAL BREAKDOWN
  ===================================================== */

  const regionStats: Record<
    string,
    { volume: number; revenue: number; deals: number }
  > = {};

  deals?.forEach((deal) => {
    const region = deal.region || "Unknown";
    const amount = Number(deal.deal_amount || 0);
    const revenue =
      (amount * Number(deal.commission_percent || 0)) / 100;

    if (!regionStats[region]) {
      regionStats[region] = {
        volume: 0,
        revenue: 0,
        deals: 0,
      };
    }

    regionStats[region].volume += amount;
    regionStats[region].revenue += revenue;
    regionStats[region].deals += 1;
  });

  /* =====================================================
     STATUS BREAKDOWN
  ===================================================== */

  const statusStats: Record<
    string,
    { volume: number; revenue: number; deals: number }
  > = {};

  deals?.forEach((deal) => {
    const status = deal.status || "unknown";
    const amount = Number(deal.deal_amount || 0);
    const revenue =
      (amount * Number(deal.commission_percent || 0)) / 100;

    if (!statusStats[status]) {
      statusStats[status] = {
        volume: 0,
        revenue: 0,
        deals: 0,
      };
    }

    statusStats[status].volume += amount;
    statusStats[status].revenue += revenue;
    statusStats[status].deals += 1;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-10">
        Revenue Intelligence Dashboard
      </h1>

      {/* =====================================================
         SUMMARY CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">

        <Card
          title="Total Deal Volume"
          value={`$${totalVolume.toLocaleString()}`}
          color="text-white"
        />

        <Card
          title="Projected Commission"
          value={`$${projectedRevenue.toLocaleString()}`}
          color="text-emerald-400"
        />

        <Card
          title="Closed Revenue"
          value={`$${closedRevenue.toLocaleString()}`}
          color="text-blue-400"
        />

        <Card
          title="Open Pipeline Value"
          value={`$${openPipeline.toLocaleString()}`}
          color="text-yellow-400"
        />

      </div>

      {/* =====================================================
         DEAL BREAKDOWN TABLE
      ===================================================== */}

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto mb-16">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-4 text-left">Deal ID</th>
              <th className="p-4 text-left">Region</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Commission %</th>
              <th className="p-4 text-left">Revenue</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {deals?.map((deal) => {
              const revenue =
                (Number(deal.deal_amount || 0) *
                  Number(deal.commission_percent || 0)) /
                100;

              return (
                <tr
                  key={deal.id}
                  className="border-t border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="p-4 font-semibold">
                    {deal.deal_id}
                  </td>
                  <td className="p-4">{deal.region}</td>
                  <td className="p-4">
                    ${Number(deal.deal_amount || 0).toLocaleString()}
                  </td>
                  <td className="p-4">
                    {deal.commission_percent}%
                  </td>
                  <td className="p-4 text-emerald-400">
                    ${revenue.toLocaleString()}
                  </td>
                  <td className="p-4 capitalize">
                    {deal.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =====================================================
         REGIONAL BREAKDOWN
      ===================================================== */}

      <SectionTable
        title="Revenue by Region"
        data={regionStats}
      />

      {/* =====================================================
         STATUS BREAKDOWN
      ===================================================== */}

      <SectionTable
        title="Revenue by Status"
        data={statusStats}
        className="mt-16"
      />

    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
        {title}
      </p>
      <p className={`text-2xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}

function SectionTable({
  title,
  data,
  className = "",
}: {
  title: string;
  data: Record<string, { volume: number; revenue: number; deals: number }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Total Volume</th>
              <th className="p-4 text-left">Projected Revenue</th>
              <th className="p-4 text-left">Deal Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr
                key={key}
                className="border-t border-slate-800 hover:bg-slate-800"
              >
                <td className="p-4 font-semibold capitalize">
                  {key}
                </td>
                <td className="p-4">
                  ${value.volume.toLocaleString()}
                </td>
                <td className="p-4 text-emerald-400">
                  ${value.revenue.toLocaleString()}
                </td>
                <td className="p-4">
                  {value.deals}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
