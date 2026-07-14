import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Menu } from "antd";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/navbar.css"
import { menuItems } from "../pages/dashboard/MenuItems";
import { handleLogout } from "../shared/shared-functions";
import { Logout } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const [open, setOpen] = useState(false);
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
    <>
      <header className="navbar">
        <div className="navbar-left">
          <h2>Bilbot</h2>
        </div>

        <div className="navbar-right">
          <Button
            className="hamburger-btn"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />

          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      </header>

      <Drawer
        title="Menu"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
      >
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
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </>
  );
};

export default Navbar;