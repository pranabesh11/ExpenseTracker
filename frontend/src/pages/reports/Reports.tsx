import React from "react";
import "./reports.css";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import ReactECharts from "echarts-for-react";
import { DatePicker, Button } from "antd";
const { RangePicker } = DatePicker;


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
    const today = new Date().toISOString().slice(0, 10);
    function getVirtualData() {
        const data = [];

        const start = new Date(2026, 0, 1);
        const end = new Date(2026, 11, 31);

        while (start <= end) {
            const date = start.toISOString().slice(0, 10);
            const month = start.getMonth();

            let value;

            if (date > today) {
                value = -1; // future
            } else {
                value = month === 6 ? Math.floor(Math.random() * 100) : 0;
            }

            data.push([date, value]);

            start.setDate(start.getDate() + 1);
        }

        return data;
    }

    const option = {
        tooltip: {},

        visualMap: {
            show: false,
            min: -1,
            max: 100,
            calculable: true,

            orient: "horizontal",
            left: "center",
            bottom: 10,

            inRange: {
                color: [
                    "#ececec",   // future
                    "#f5f5f5",
                    "#d6e685",
                    "#8cc665",
                    "#44a340",
                    "#1e6823",
                ],
            },
        },

        calendar: {
            top: 30,
            left: 30,
            right: 30,
            range: "2026",

            cellSize: ["auto", 14],

            splitLine: {
                show: true,
                lineStyle: {
                    color: "#d9d9d9",
                    width: 1,
                },
            },

            itemStyle: {
                borderWidth: 0.5,
                borderColor: "#eee",
            },

            monthLabel: {
                nameMap: "en",
                margin: 12,
                color: "#555",
                fontWeight: 600,
            },

            dayLabel: {
                firstDay: 1,
            },

            yearLabel: {
                show: false,
            },
        },

        series: {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: getVirtualData(),

            itemStyle: {
                borderRadius: 2,
            },

            emphasis: {
                itemStyle: {
                    borderColor: "#333",
                    borderWidth: 1,
                },
            },
        },
    };

    return (
        <div className="reports">
            <div className="reportsTop">
                <h1>Reports</h1>

                <div className="reportsActions">
                    <RangePicker />

                    <Button type="primary">
                        Fetch Details
                    </Button>
                </div>
            </div>
            <div className="reportCard">

                <div className="reportHeader">
                    <h2>Monthly Activity</h2>
                    <p>Daily transaction activity for the selected period.</p>
                </div>

                <ReactECharts
                    option={option}
                    style={{ height: 150 }}
                />

            </div>

            <div className="reportCard gridCard">

                <div className="reportHeader">
                    <h2>Transactions</h2>
                    <p>Detailed transaction list.</p>
                </div>

                <div
                    style={{
                        flex: 1,
                        minHeight: 0,
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