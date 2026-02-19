"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SellerPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    company_name: "",
    city: "",
    business_type: "",
    certification: "",
    inventory: "",
    min_order: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("leads").insert([
      {
        type: "seller",
        name: form.name,
        phone: form.phone,
        company_name: form.company_name,
        city: form.city,
        business_type: form.business_type,
        certification: form.certification,
        inventory: form.inventory,
        min_order: form.min_order,
      },
    ]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error(error);
      alert("Error submitting seller application");
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
          <Link href="/buyer" className="hover:text-emerald-600 transition">
            Buyer
          </Link>
          <Link href="/seller" className="text-emerald-600">
            Seller
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-blue-700 text-center">
          Become a Verified Seller
        </h1>

        <p className="mt-4 text-center text-gray-600">
          Join India’s structured diamond trade infrastructure and receive verified buyer leads.
        </p>

        {submitted ? (
          <div className="mt-10 p-6 bg-emerald-100 text-emerald-700 rounded-xl text-center font-semibold">
            Seller application submitted successfully.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
          >

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="company_name"
              placeholder="Company Name"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="phone"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <select name="city" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">City</option>
              <option>Surat</option>
              <option>Mumbai</option>
              <option>Ahmedabad</option>
              <option>Jaipur</option>
              <option>Other</option>
            </select>

            <select name="business_type" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Business Type</option>
              <option>Wholesaler</option>
              <option>Retailer</option>
              <option>Manufacturer</option>
              <option>Trader</option>
            </select>

            <select name="certification" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Certification</option>
              <option>IGI</option>
              <option>GIA</option>
              <option>Both</option>
            </select>

            <select name="inventory" onChange={handleChange} className="w-full border p-3 rounded-lg">
              <option value="">Average Monthly Inventory</option>
              <option>Below 50 stones</option>
              <option>50–200 stones</option>
              <option>200–500 stones</option>
              <option>500+ stones</option>
            </select>

            <input
              name="min_order"
              placeholder="Minimum Order Value (₹)"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Submit Seller Application
            </button>

          </form>
        )}

      </div>
    </main>
  );
}

