import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import "./style/sidebar.css"
import { menuItems } from "../pages/dashboard/MenuItems";
import { handleLogout } from "../shared/shared-functions";
import { Height, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Avatar, Button } from "@mui/material";

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
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", margin:"5px"}}>
        <Avatar alt="Cindy Baker" src="../../public/profile_pic.jpg" sx={{ width: { lg: 80 }, height: { lg: 80 }}}/>
      </div>
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