import { LogoutOutlined, MenuOutlined, MoonOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Menu, Select, Switch } from "antd";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/navbar.css"
import { menuItems } from "../pages/dashboard/MenuItems";
import { handleLogout } from "../shared/shared-functions";
import { Logout } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import Flag from "react-world-flags";
import { Avatar } from "@mui/material";



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
          <Select
            className="languageSelect"
            defaultValue="en"
            size="small"
            style={{ width: 100 }}
            options={[
                {
                    label: (
                        <span className="langOption">
                            <Flag code="GB" height="12" /> English
                        </span>
                    ),
                    value: "en",
                },
                {
                    label: (
                        <span className="langOption">
                            <Flag code="IND" height="12" /> বাংলা
                        </span>
                    ),
                    value: "bn",
                },
                {
                    label: (
                        <span className="langOption">
                            <Flag code="DE" height="12" /> Deutsch
                        </span>
                    ),
                    value: "de",
                },
            ]}
          />
          <Switch
            defaultChecked
            checkedChildren={
              <Flex gap={4} justify="flex-start" align="center">
                <SunOutlined />
                Light
              </Flex>
            }
            unCheckedChildren={
              <Flex gap={4} justify="flex-start" align="center">
                <MoonOutlined />
                Dark
              </Flex>
            }
          />
          <Button
            className="hamburger-btn"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />

          {/* <Avatar size={40} icon={<UserOutlined />} src="../../public/profile_pic.jpg"/> */}
        </div>
      </header>

      <Drawer
        title="Menu"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="profileSection">
          <Avatar alt="Cindy Baker" src="../../public/profile_pic.jpg" sx={{ width: { lg: 80 }, height: { lg: 80 }}}/>
          <div className="profileName"> Pranabesh Pratihar </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split("/")[2]]}
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