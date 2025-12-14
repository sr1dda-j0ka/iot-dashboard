"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles } from "lucide-react";

export default function AIInsightsPage() {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getInsights = async () => {
    setLoading(true);
    setError("");
    setInsights("");

    try {
      const res = await fetch("/api/insights");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setInsights(data.insights);
    } catch (err) {
      setError("Failed to generate insights.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">
      <div className="max-w-4xl mx-auto">

        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <Sparkles className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900">
            AI Insights
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          Generate intelligent summaries and health alerts from recent sensor data
          using <span className="font-semibold">Gemini AI</span>.
        </p>

        
        <button
          onClick={getInsights}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Insights"}
        </button>

        
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
            {error}
          </div>
        )}

        
        {loading && (
          <div className="mt-6 p-6 animate-pulse bg-white shadow rounded-lg border">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        )}

        
        {!loading && !insights && !error && (
          <div className="mt-6 bg-white border rounded-lg shadow-sm p-6 text-gray-700">
            <h2 className="font-semibold mb-2">
              What does this do?
            </h2>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Analyzes the most recent sensor readings</li>
              <li>Detects unhealthy temperature, humidity, or AQI levels</li>
              <li>Generates human-readable summaries and alerts</li>
            </ul>

            <p className="text-sm text-gray-500 mt-4">
              Insights are generated on demand to reduce noise and unnecessary AI calls.
            </p>
          </div>
        )}

        
        {insights && (
          <div className="mt-6 p-6 bg-white text-black shadow rounded-lg border">
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
