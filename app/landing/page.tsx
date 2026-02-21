"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Landing() {
  const [submitted, setSubmitted] = useState(false);

  const cardVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-[#f4f8fb] text-[#0f172a]">

      {/* ================= HERO + FORM ================= */}
      <section className="py-16 bg-gradient-to-br from-[#e6f4f9] via-[#ffffff] to-[#dff3ec]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-6 text-center"
        >
          <p className="uppercase tracking-[6px] text-xs text-[#008891] mb-4">
            StoneLedger by AnkismaikT
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-[#0f3057]">
            StoneLedger
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Structured digital infrastructure for certified natural diamond deal flow.
            <br />
            Not a marketplace. Not a listing portal.
            <br />
            Controlled B2B coordination between serious buyers and certified suppliers.
          </p>

          {/* STRUCTURED FORM */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#e6f4f9] text-left max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6 text-[#0f3057]">
              Request Structured Access
            </h2>

            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const fields = Object.fromEntries(formData.entries());

                  const message =
`StoneLedger — Structured Requirement

Name: ${fields.name}
Phone: ${fields.phone}
Role: ${fields.role}
Location: ${fields.location}

Diamond Type: ${fields.type}
Carat Range: ${fields.carat}
Shape: ${fields.shape}
Color: ${fields.color}
Clarity: ${fields.clarity}
Cut: ${fields.cut}
Certification Preference: ${fields.cert}
Budget Range: ${fields.budget}
Timeline: ${fields.timeline}

Additional Notes:
${fields.notes}`;

                  window.open(
                    `https://wa.me/916375619742?text=${encodeURIComponent(message)}`,
                    "_blank"
                  );

                  setSubmitted(true);
                }}
                className="grid md:grid-cols-2 gap-4"
              >

                {/* Basic Info */}
                <input name="name" required placeholder="Full Name" className="p-3 border rounded-xl" />
                <input name="phone" required placeholder="WhatsApp Number" className="p-3 border rounded-xl" />
                <input name="location" placeholder="City / Country" className="p-3 border rounded-xl" />

                <select name="role" required className="p-3 border rounded-xl">
                  <option value="">Select Your Role</option>
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Broker</option>
                  <option>Investor</option>
                </select>

                {/* Diamond Specs */}
                <select name="type" className="p-3 border rounded-xl">
                  <option value="">Diamond Type</option>
                  <option>Natural</option>
                  <option>Lab-Grown</option>
                  <option>Open to Both</option>
                </select>

                <input name="carat" placeholder="Carat Range (0.90 – 1.20)" className="p-3 border rounded-xl" />
                <input name="shape" placeholder="Shape (Round, Oval, Emerald...)" className="p-3 border rounded-xl" />
                <input name="color" placeholder="Color (D–H)" className="p-3 border rounded-xl" />
                <input name="clarity" placeholder="Clarity (IF, VVS, VS, SI)" className="p-3 border rounded-xl" />
                <input name="cut" placeholder="Cut (Excellent, Very Good...)" className="p-3 border rounded-xl" />

                <select name="cert" className="p-3 border rounded-xl">
                  <option value="">Certification Preference</option>
                  <option>GIA</option>
                  <option>IGI</option>
                  <option>HRD</option>
                  <option>Certified Only</option>
                </select>

                <input name="budget" placeholder="Budget Range (USD / INR)" className="p-3 border rounded-xl" />

                <select name="timeline" className="p-3 border rounded-xl">
                  <option value="">Timeline</option>
                  <option>Immediate</option>
                  <option>Within 7 Days</option>
                  <option>Within 30 Days</option>
                  <option>Exploratory</option>
                </select>

                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Additional notes"
                  className="p-3 border rounded-xl md:col-span-2"
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="md:col-span-2 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#00b4db] via-[#00c9a7] to-[#00b4db]"
                >
                  Submit Structured Request
                </motion.button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-lg font-semibold text-[#0f3057]">
                  Please complete the WhatsApp message to proceed.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="py-14 px-6 max-w-5xl mx-auto">
        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow border border-[#e6f4f9]"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-[#0f3057]">
            The Structural Gap in Diamond Trade
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            Certified natural diamond transactions still rely heavily on fragmented WhatsApp threads and scattered broker networks.
            Price discussions get lost. Follow-ups disappear. There is no structured visibility into deal coordination.
            As volume increases, operational clarity decreases.
          </p>
        </motion.div>
      </section>

      {/* ================= PROVIDES ================= */}
      <section className="py-14 px-6 bg-[#f0f9ff]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#0f3057]">
            What This Infrastructure Enables
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              "Structured buyer & seller intake",
              "Controlled deal coordination",
              "Organized communication flow",
              "Requirement-based matching",
              "Focused B2B sourcing",
              "Centralized coordination layer"
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white p-5 rounded-xl shadow border border-[#e6f4f9]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POSITIONING ================= */}
      <section className="py-14 px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow border border-[#e6f4f9] text-sm">
          <h2 className="text-xl font-bold mb-4 text-center text-[#0f3057]">
            Operated by AnkismaikT
          </h2>

          <p className="text-slate-600 leading-relaxed">
            StoneLedger is a structured coordination layer connecting serious buyers with certified natural diamond suppliers.
            We do not issue certification and do not operate as a public listing platform.
            We coordinate structured B2B deal flow between verified participants.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 text-center text-slate-500 text-xs bg-white border-t">
        © 2026 AnkismaikT — StoneLedger Structured Diamond Trade Infrastructure
      </footer>

    </main>
  );
}
