import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardValue}>{value}</p>
      {subtitle && <small style={styles.cardSubtitle}>{subtitle}</small>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>MyApp</h2>
        <nav>
          <ul style={styles.navList}>
            <li>Dashboard</li>
            <li>Analytics</li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Topbar */}
        <header style={styles.topbar}>
          <h2>Dashboard</h2>
          <button style={styles.button}>Logout</button>
        </header>

        {/* Stats */}
        <section style={styles.statsGrid}>
          <StatCard title="Users" value={1240} subtitle="Active this month" />
          <StatCard title="Revenue" value="$8,450" subtitle="This month" />
          <StatCard title="Orders" value={320} subtitle="Completed" />
          <StatCard title="Feedback" value={87} subtitle="New reviews" />
        </section>

        {/* Table */}
        <section style={styles.tableSection}>
          <h3>Recent Activity</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>Signed up</td>
                <td>Success</td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>Purchased plan</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>Charlie</td>
                <td>Requested refund</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1e293b",
    color: "white",
    padding: "20px",
  },
  logo: {
    marginBottom: "20px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2",
  },
  main: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: "20px",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "5px 0",
  },
  cardSubtitle: {
    color: "#94a3b8",
  },
  tableSection: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
  },
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  },
};

export default Dashboard;