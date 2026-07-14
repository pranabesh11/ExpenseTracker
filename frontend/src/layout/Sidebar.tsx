import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import "./style/sidebar.css"
import { menuItems } from "../pages/dashboard/MenuItems";
import { handleLogout } from "../shared/shared-functions";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
      const { fetchUser } = useContext(AuthContext);
    const logout = async () => {
        const success = await handleLogout();
        if(success){
          await fetchUser()
            navigate("/login");
        }
    }
  return (
    <div className="sidebar">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={[
            ...menuItems,
            {
                key: "logout",
                icon: <Logout/>,
                label: "Logout",
                onClick: logout
            }
        ]}
      />
    </div>
  );
};

export default Sidebar;