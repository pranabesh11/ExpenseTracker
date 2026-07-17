import React from "react";


const Dashboard: React.FC = () => {
  console.log("Dashboard mounted");

  return (
    <div
      style={{
        border: "20px solid red",
        height: "300px",
        width: "100%",
        background: "yellow",
      }}
    >
      <h1>Hello Dashboard</h1>
    </div>
  );
};

export default Dashboard;