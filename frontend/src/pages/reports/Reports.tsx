import React from "react";
import "./reports.css";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ReactECharts from "echarts-for-react";


const columns: GridColDef[] = [
    {
        field: "user",
        headerName: "User",
        flex: 1,
        minWidth: 120,
    },
    {
        field: "description",
        headerName: "Description",
        flex: 2,
        minWidth: 200,
    },
    {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        minWidth: 120,
    },
    {
        field: "date",
        headerName: "Date",
        flex: 1,
        minWidth: 130,
    },
    {
        field: "type",
        headerName: "Type",
        flex: 1,
        minWidth: 120,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 120,
    },
];
const rows = [
  {
    id: 1,
    user: "Pranab",
    description: "Restaurant dinner with friends",
    amount: "₹1200",
    date: "2026-07-19",
    type: "Expense",
    status: "Borrow",
  },
  {
    id: 2,
    user: "Rahul",
    description: "Monthly salary",
    amount: "₹50000",
    date: "2026-07-01",
    type: "Income",
    status: "Received",
  },
  {
    id: 3,
    user: "Amit",
    description: "Travel expenses",
    amount: "₹3500",
    date: "2026-07-10",
    type: "Expense",
    status: "Owe",
  },
  {
    id: 4,
    user: "Sourav",
    description: "Loan repayment",
    amount: "₹8000",
    date: "2026-07-12",
    type: "Expense",
    status: "Borrower",
  },
];
const Reports: React.FC = () => {
    function getVirtualData() {
        const data = [];

        const start = new Date(2026, 0, 1);   // Jan 1
        const end = new Date(2026, 11, 31);   // Dec 31

        while (start <= end) {
            const month = start.getMonth();

            data.push([
                start.toISOString().slice(0, 10),

                // Fill only July with values
                month === 6 ? Math.floor(Math.random() * 100) : 0,
            ]);

            start.setDate(start.getDate() + 1);
        }
        return data;
    }

    const option = {
        tooltip: {},

        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: "horizontal",
            left: "center",
            itemWidth: 20,
            itemHeight: 100,
            bottom: 10,
        },

        calendar: {
            top: 30,
            left: 30,
            right: 30,

            range: "2026",

            cellSize: ["auto", 14],

            splitLine: {
                show: false,
            },

            itemStyle: {
                borderWidth: 0.5,
                borderColor: "#eee",
            },

            yearLabel: {
                show: false,
            },
        },

        series: {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: getVirtualData(),
        },
    };

    return (
        <div className="reports">

            <div className="reportCard">

                <h2>Monthly Activity</h2>

                <ReactECharts
                    option={option}
                    style={{ height: 250 }}
                />

            </div>

            <div className="reportCard gridCard">

                <h2>Transactions</h2>

                <div
                    style={{
                        height: 500,
                        width: "100%",
                    }}
                    >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pagination
                        showToolbar
                        pageSizeOptions={[5, 10, 25]}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            page: 0,
                            },
                        },
                        }}
                        disableRowSelectionOnClick
                    />
                </div>

            </div>

        </div>
    );
};

export default Reports;