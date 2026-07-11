import React from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

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
    <>
      <Navbar/>
      <Sidebar/>
    </>
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