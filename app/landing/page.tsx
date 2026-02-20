"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Landing() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#f4f8fb] text-[#0f172a]">

      {/* HERO WITH FORM */}
      <section className="py-24 bg-gradient-to-br from-[#e6f4f9] via-[#ffffff] to-[#dff3ec]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <p className="uppercase tracking-[6px] text-xs text-[#008891] mb-6">
            by AnkismaikT
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[#0f3057]">
            StoneLedger
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Structured Infrastructure for Certified Natural Diamond Deal Flow
          </p>

          {/* FORM MOVED HERE */}
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-[#e6f4f9] text-left">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#0f3057]">
              Request Access
            </h2>

            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);

                  const name = formData.get("name") as string;
                  const phone = formData.get("phone") as string;
                  const role = formData.get("role") as string;
                  const note = formData.get("note") as string;

                  const message =
`StoneLedger — Structured Access Request

Name: ${name}
Phone: ${phone}
Role: ${role}

Requirement:
${note}

Requesting private infrastructure access.`;

                  const encoded = encodeURIComponent(message);

                  window.open(
                    `https://wa.me/916375619742?text=${encoded}`,
                    "_blank"
                  );

                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <input
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full p-4 border rounded-xl"
                />

                <input
                  name="phone"
                  required
                  placeholder="WhatsApp / Phone Number"
                  className="w-full p-4 border rounded-xl"
                />

                <select
                  name="role"
                  required
                  className="w-full p-4 border rounded-xl"
                >
                  <option value="">Select Your Role</option>
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Broker</option>
                  <option>Investor</option>
                  <option>Other</option>
                </select>

                <textarea
                  name="note"
                  rows={4}
                  placeholder="Briefly describe your requirement or interest"
                  className="w-full p-4 border rounded-xl"
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#00b4db] via-[#00c9a7] to-[#00b4db]"
                >
                  Submit Structured Request
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-xl font-semibold text-[#0f3057]">
                  Request initiated. Please complete the WhatsApp message.
                </p>
              </div>
            )}
          </div>

        </motion.div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-[#e6f4f9]">
          <h2 className="text-3xl font-bold mb-6 text-[#0f3057] text-center">
            The Problem
          </h2>

          <div className="space-y-5 text-slate-600 leading-relaxed text-base">
            <p>
              Certified natural diamond trade still operates through fragmented WhatsApp conversations and scattered broker communication.
            </p>

            <p>
              Negotiation history is lost. Buyer follow-ups are missed. Commission clarity disappears. There is no structured record of who spoke to whom, at what price, and at what stage.
            </p>

            <p>
              As deal volume grows, operational chaos increases — resulting in missed opportunities and silent revenue leakage.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT PROVIDES */}
      <section className="py-20 px-6 bg-[#f0f9ff]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0f3057]">
            What StoneLedger Provides
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Structured buyer & seller intake",
              "Controlled matching workflow",
              "Deal lifecycle tracking",
              "Negotiation memory preservation",
              "Commission & revenue visibility",
              "Centralized deal control room"
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow border border-[#e6f4f9]"
              >
                <p className="text-slate-700 font-medium text-lg">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-slate-500 text-xs bg-white border-t">
        © 2026 AnkismaikT — StoneLedger  
        Structured Diamond Trade Infrastructure
      </footer>

    </main>
  );
}
