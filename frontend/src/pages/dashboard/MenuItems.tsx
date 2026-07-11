import {
  DashboardOutlined,
  WalletOutlined,
  BarChartOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";



export const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/app/dashboard">Dashboard</Link>,
    element: <Dashboard />,
  },
  {
    key: "expenses",
    icon: <WalletOutlined />,
    label: <Link to="/app/expenses">Expenses</Link>,
    element: <></>,
  },
  {
    key: "reports",
    icon: <BarChartOutlined />,
    label: <Link to="/app/reports">Reports</Link>,
    element: <></>
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: <Link to="/app/settings">Settings</Link>,
    element: <></>
  },
];