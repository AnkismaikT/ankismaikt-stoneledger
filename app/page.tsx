import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 text-gray-900">

      {/* Top Navigation */}
      <nav className="w-full flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          StoneLedger by AnkismaikT
        </div>

        <div className="flex gap-6 text-sm font-semibold">
          <Link href="/buyer" className="hover:text-emerald-600 transition">
            Buyer
          </Link>

          <Link href="/seller" className="hover:text-emerald-600 transition">
            Seller
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          India’s First{" "}
          <span className="text-blue-600">
            Diamond Trade Infrastructure
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl">
          Built for verified IGI & GIA certified diamond trade.
          Structured. Transparent. Conversion-focused.
          Not a marketplace — a trade system.
        </p>

        <div className="mt-10 flex gap-6">
          <Link
            href="/seller"
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition font-semibold"
          >
            Register as Seller
          </Link>

          <Link
            href="/buyer"
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition font-semibold"
          >
            Submit Requirement
          </Link>
        </div>
      </section>

      {/* Why Section */}
      <section className="px-6 py-20 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-700">
          Why StoneLedger?
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-8 bg-blue-50 rounded-2xl shadow-md border border-blue-100">
            <h3 className="text-xl font-semibold text-emerald-600">
              Verified Trade Only
            </h3>
            <p className="mt-4 text-gray-600">
              Only serious buyers and authenticated sellers dealing in certified stones.
              No unfiltered inquiry chaos.
            </p>
          </div>

          <div className="p-8 bg-blue-50 rounded-2xl shadow-md border border-blue-100">
            <h3 className="text-xl font-semibold text-emerald-600">
              Structured Lead Matching
            </h3>
            <p className="mt-4 text-gray-600">
              Filtered buyer matching increases seller conversion and reduces negotiation friction.
            </p>
          </div>

          <div className="p-8 bg-blue-50 rounded-2xl shadow-md border border-blue-100">
            <h3 className="text-xl font-semibold text-emerald-600">
              India to Global
            </h3>
            <p className="mt-4 text-gray-600">
              Designed from India’s diamond ecosystem to serve wholesalers,
              jewelers, and international buyers.
            </p>
          </div>

        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-r from-blue-600 to-emerald-500 text-white">
        <h2 className="text-3xl font-bold">
          Infrastructure. Not Listing.
        </h2>

        <p className="mt-6 text-lg max-w-4xl mx-auto">
          StoneLedger is building the structured backbone of the diamond trade —
          bringing transparency, control, and efficiency into a traditionally
          unstructured market.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        © {new Date().getFullYear()} StoneLedger by AnkismaikT.  
        India’s Diamond Trade Infrastructure.
      </footer>

    </main>
  );
}
