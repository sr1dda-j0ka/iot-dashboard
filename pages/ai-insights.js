import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        AI Insights
      </h1>

      <button
        onClick={getInsights}
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Insights"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="mt-4 p-4 animate-pulse bg-white shadow rounded border">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
        </div>
      )}

      {/* Insights output */}
      {insights && (
        <div className="mt-4 p-4 bg-white text-black shadow rounded border whitespace-pre-line">
          <ReactMarkdown>{insights}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
