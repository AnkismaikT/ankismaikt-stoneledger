"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function BuyerPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    buying_as: "",
    carat: "",
    cut: "",
    color: "",
    clarity: "",
    shape: "",
    budget: "",
    timeline: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("leads").insert([
      {
        type: "buyer",
        name: form.name,
        phone: form.phone,
        buying_as: form.buying_as,
        carat: form.carat,
        cut: form.cut,
        color: form.color,
        clarity: form.clarity,
        shape: form.shape,
        budget: form.budget,
        timeline: form.timeline,
      },
    ]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error(error);
      alert("Error submitting requirement");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 text-gray-900">

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center px-8 py-6">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"
        >
          StoneLedger by AnkismaikT
        </Link>

        <div className="flex gap-6 text-sm font-semibold">
          <Link href="/buyer" className="text-emerald-600">
            Buyer
          </Link>
          <Link href="/seller" className="hover:text-emerald-600 transition">
            Seller
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Submit Your Certified Diamond Requirement
        </h1>

        <p className="mt-4 text-center text-gray-600">
          Looking for IGI or GIA certified diamonds?
          Submit your exact requirement and get matched with verified sellers.
        </p>

        {submitted ? (
          <div className="mt-10 p-6 bg-emerald-100 text-emerald-700 rounded-xl text-center font-semibold">
            Requirement submitted successfully.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
          >

            <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full border p-3 rounded-lg" />

            <input name="phone" placeholder="Mobile Number" onChange={handleChange} required className="w-full border p-3 rounded-lg" />

            <select name="buying_as" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Buying As</option>
              <option>Individual</option>
              <option>Retail Jeweler</option>
              <option>Wholesaler</option>
              <option>Jewelry Brand</option>
            </select>

            <input name="carat" placeholder="Carat Range" onChange={handleChange} className="w-full border p-3 rounded-lg" />

            <select name="cut" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Cut</option>
              <option>Excellent</option>
              <option>Very Good</option>
              <option>Good</option>
            </select>

            <select name="color" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Color</option>
              <option>D</option>
              <option>E</option>
              <option>F</option>
              <option>G</option>
              <option>H</option>
              <option>I</option>
              <option>J</option>
            </select>

            <select name="clarity" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Clarity</option>
              <option>IF</option>
              <option>VVS1</option>
              <option>VVS2</option>
              <option>VS1</option>
              <option>VS2</option>
              <option>SI1</option>
              <option>SI2</option>
            </select>

            <select name="shape" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Shape</option>
              <option>Round</option>
              <option>Oval</option>
              <option>Emerald</option>
              <option>Cushion</option>
              <option>Princess</option>
              <option>Pear</option>
            </select>

            <input name="budget" placeholder="Budget Range" onChange={handleChange} className="w-full border p-3 rounded-lg" />

            <select name="timeline" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Purchase Timeline</option>
              <option>Immediate (Within 7 days)</option>
              <option>2–4 Weeks</option>
              <option>Just Exploring</option>
            </select>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Submit Requirement
            </button>

          </form>
        )}

      </div>
    </main>
  );
}

