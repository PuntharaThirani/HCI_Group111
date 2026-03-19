import React from 'react';

const AnalyticsPage = () => {
  const stats = {
    totalProjects: 45,
    activeCustomers: 28,
    popularCategories: [
      { name: 'Living Room', count: 25 },
      { name: 'Bedroom', count: 15 },
      { name: 'Office', count: 5 },
    ],
    monthlyProjects: [
      { month: 'Jan', count: 8 },
      { month: 'Feb', count: 12 },
      { month: 'Mar', count: 15 },
    ],
  };

  const maxCategoryCount = Math.max(...stats.popularCategories.map((cat) => cat.count));

  return (
    <div className="min-h-full bg-[#EEF1F4] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of project activity, customer engagement, and room trends.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            trend="↑ 12% from last month"
            trendType="positive"
          />
          <StatCard
            title="Active Customers"
            value={stats.activeCustomers}
            trend="↑ 5 new this week"
            trendType="positive"
          />
          <StatCard
            title="Completion Rate"
            value="78%"
            trend="Average performance"
            trendType="neutral"
          />
          <StatCard
            title="Avg. Project Time"
            value="2.5h"
            trend="↓ 0.5h slower"
            trendType="negative"
          />
        </div>

        {/* Main Sections */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Popular Categories */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Popular Room Categories
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Most frequently created room types across recent projects.
              </p>
            </div>

            <div className="space-y-4">
              {stats.popularCategories.map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {cat.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {cat.count} projects
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#C96A2B]"
                      style={{ width: `${(cat.count / maxCategoryCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Monthly Activity */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Monthly Projects
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Simple month-by-month project activity snapshot.
              </p>
            </div>

            <div className="space-y-4">
              {stats.monthlyProjects.map((item) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {item.month}
                  </span>
                  <span className="text-sm font-semibold text-[#C96A2B]">
                    {item.count} projects
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, trendType = 'neutral' }) => {
  const trendStyles = {
    positive: 'text-emerald-600 bg-emerald-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-slate-500 bg-slate-100',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold text-slate-800">{value}</p>
      <div
        className={`mt-4 inline-flex rounded-lg px-2.5 py-1 text-xs font-medium ${trendStyles[trendType]}`}
      >
        {trend}
      </div>
    </div>
  );
};

export default AnalyticsPage;