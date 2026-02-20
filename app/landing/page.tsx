"use client";

import { motion } from "framer-motion";

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#f4f8fb] text-[#0f172a]">

      {/* HERO */}
      <section className="py-20 text-center bg-gradient-to-br from-[#e6f4f9] via-[#ffffff] to-[#dff3ec]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6"
        >
          <p className="uppercase tracking-[5px] text-xs text-[#008891] mb-4">
            by AnkismaikT
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#0f3057]">
            StoneLedger
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Structured Infrastructure for Certified Natural Diamond Deal Flow
          </p>

          <motion.a
            href="https://wa.me/916375619742"
            target="_blank"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-8 px-10 py-4 rounded-full text-white font-semibold text-base shadow-lg bg-gradient-to-r from-[#00b4db] via-[#00c9a7] to-[#00b4db] bg-[length:200%_200%] animate-gradient"
          >
            Connect Directly — Private Access
          </motion.a>
        </motion.div>
      </section>

      {/* PROBLEM */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8 text-[#0f3057]"
        >
          The Problem
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-[#e0f2f1]"
        >
          <p className="text-base text-slate-600 mb-4">
            Certified natural diamond trade still operates through fragmented WhatsApp conversations and scattered broker communication.
          </p>

          <p className="text-base text-slate-600 mb-4">
            Negotiation history is lost. Buyer follow-ups are missed. Commission clarity disappears. There is no structured record of who spoke to whom, at what price, and at what stage.
          </p>

          <p className="text-base text-slate-600">
            As deal volume grows, operational chaos increases — resulting in missed opportunities and silent revenue leakage.
          </p>
        </motion.div>
      </section>

      {/* PROVIDES */}
      <section className="py-16 px-6 bg-[#f0f9ff]">
        <div className="max-w-5xl mx-auto">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-10 text-[#0f3057]"
          >
            What StoneLedger Provides
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Structured buyer & seller intake",
              "Controlled matching workflow",
              "Deal lifecycle tracking",
              "Negotiation memory preservation",
              "Commission & revenue visibility",
              "Centralized deal control room"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-xl p-6 shadow border border-[#e6f4f9] hover:shadow-lg transition"
              >
                <p className="text-base text-slate-700 font-medium">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-slate-500 text-xs bg-white border-t">
        © 2026 AnkismaikT — StoneLedger | Structured Diamond Trade Infrastructure
      </footer>

      {/* Gradient Animation */}
      <style jsx global>{`
        @keyframes gradient {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>

    </main>
  );
}

