import React from 'react';

const AnalyticsPage = () => {
  // Mock data for charts
  const stats = {
    totalProjects: 45,
    activeCustomers: 28,
    popularCategories: [
      { name: 'Living Room', count: 25 },
      { name: 'Bedroom', count: 15 },
      { name: 'Office', count: 5 }
    ],
    monthlyProjects: [
      { month: 'Jan', count: 8 },
      { month: 'Feb', count: 12 },
      { month: 'Mar', count: 15 }
    ]
  };

  return (
    <div className="analytics-page">
      <h1>Analytics Dashboard</h1>
      
      <div className="analytics-grid">
        {/* Summary Cards */}
        <div className="analytics-card">
          <h3>Total Projects</h3>
          <p className="big-number">{stats.totalProjects}</p>
          <span className="trend positive">↑ 12% from last month</span>
        </div>

        <div className="analytics-card">
          <h3>Active Customers</h3>
          <p className="big-number">{stats.activeCustomers}</p>
          <span className="trend positive">↑ 5 new this week</span>
        </div>

        <div className="analytics-card">
          <h3>Completion Rate</h3>
          <p className="big-number">78%</p>
          <span className="trend">Average</span>
        </div>

        <div className="analytics-card">
          <h3>Avg. Project Time</h3>
          <p className="big-number">2.5h</p>
          <span className="trend negative">↓ 0.5h slower</span>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="analytics-section">
        <h2>Popular Room Categories</h2>
        <div className="category-bars">
          {stats.popularCategories.map(cat => (
            <div key={cat.name} className="category-bar-item">
              <span>{cat.name}</span>
              <div className="bar-container">
                <div 
                  className="bar" 
                  style={{width: `${(cat.count/25)*100}%`}}
                ></div>
                <span className="bar-count">{cat.count} projects</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;