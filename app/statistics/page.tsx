"use client";
import React, { useEffect, useState } from "react";
import StatCard from "@/components/statistics/StatCard";
import SimpleBarChart from "@/components/statistics/SimpleBarChart";
import RecentSearches from "@/components/statistics/RecentSearches";
import PopularQueries from "@/components/statistics/PopularQueries";

interface StatisticsData {
  totalsByType: Array<{
    type: string;
    _count: { id: number };
  }>;
  totalCount: number;
  searchesByDate: Array<{
    type: string;
    _count: { id: number };
  }>;
  recentSearches: Array<{
    type: string;
    query: string;
    createdAt: string;
  }>;
  popularQueries: Array<{
    query: string;
    type: string;
    _count: { id: number };
  }>;
}

const StatisticsPage = () => {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/statistics");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const statisticsData = await response.json();
        setData(statisticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laster statistikk...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Feil ved lasting av statistikk: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Ingen data tilgjengelig</p>
        </div>
      </div>
    );
  }

  const getTypeCount = (type: string) => {
    const found = data.totalsByType.find((item) => item.type === type);
    return found ? found._count.id : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bruksstatistikk</h1>
          <p className="mt-2 text-gray-600">
            Oversikt over aktivitet på Julev-plattformen
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total aktivitet"
            value={data.totalCount}
            description="Alle handlinger siden oppstart"
            color="bg-blue-500"
          />
          <StatCard
            title="Lulesamisk søk"
            value={getTypeCount("LocalSearch")}
            description="Søk i lulesamisk database"
            color="bg-blue-500"
          />
          <StatCard
            title="Samisk søk"
            value={getTypeCount("DivvunSearch")}
            description="Søk i Divvun-ordbøker"
            color="bg-green-500"
          />
          <StatCard
            title="Grammatikksjekk"
            value={getTypeCount("GrammarCheck")}
            description="Grammatikksjekker kjørt"
            color="bg-purple-500"
          />
          <StatCard
            title="Oversettelser"
            value={getTypeCount("Translation")}
            description="Tekster oversatt"
            color="bg-orange-500"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SimpleBarChart
            data={data.totalsByType}
            title="Aktivitet etter type"
          />
          <RecentSearches searches={data.recentSearches} />
        </div>

        {/* Popular Queries */}
        <div className="grid grid-cols-1 gap-6">
          <PopularQueries queries={data.popularQueries} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
