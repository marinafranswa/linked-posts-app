import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../../Context/tokenContext";


export default function NavbarComponent() {

  let { setToken, userData } = useContext(tokenContext);


  let navigate=useNavigate()
function logoutSystem() {
  localStorage.removeItem("token")
  setToken(null)
navigate("auth/login")
}
  
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-2xl text-sky-600">LinkedPosts</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="font-semibold text-lg">
          <Link color="foreground" to={"/"}>
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profileData" className="h-14 gap-2">
              <p className="font-semibold">Signed in as: {userData?.name}</p>
              <p className="font-semibold">{userData?.email}</p>
            </DropdownItem>
            <DropdownItem key="profilePage">
              <Link to={`/profile/` + userData?._id}>Profile</Link>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link to={`/settings`}>Change Password</Link>
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => {
                logoutSystem();
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
