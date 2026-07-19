import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Groups from "../groups/Groups";
import Reports from "../reports/Reports";
import Settings from "../settings/Settings";



export const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/app/dashboard">Dashboard</Link>,
    element: <Dashboard />,
  },
  {
    key: "groups",
    icon: <UsergroupAddOutlined />,
    label: <Link to="/app/groups">Groups</Link>,
    element: <Groups/>,
  },
  {
    key: "reports",
    icon: <BarChartOutlined />,
    label: <Link to="/app/reports">Reports</Link>,
    element: <Reports/>
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: <Link to="/app/settings">Settings</Link>,
    element: <Settings/>
  },
];