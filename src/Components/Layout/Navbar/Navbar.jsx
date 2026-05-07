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
  Button,
} from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../../Context/tokenContext";
import { IoHomeOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { CiMenuBurger, CiUser } from "react-icons/ci";
import { MdMessage } from "react-icons/md";


export default function NavbarComponent() {

  let { setToken, userData } = useContext(tokenContext);


  let navigate=useNavigate()
function logoutSystem() {
  localStorage.removeItem("token")
  setToken(null)
navigate("auth/login")
}
  
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">
        <div className="flex items-center gap-3">
          <img
            alt="Route Posts"
            className="h-9 w-9 rounded-xl object-cover"
            src="/public/favicon.ico"
          />
          <p className="hidden text-xl font-extrabold text-slate-900 sm:block">
            Route Posts
          </p>
        </div>
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <Link
            aria-current="page"
            className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5] "
            to={"/"}
            data-discover="true"
          >
            <span className="relative">
              <IoHomeOutline size={16} />
            </span>
            <span className="hidden sm:inline">Feed</span>
            <span className="sr-only sm:hidden">Feed</span>
          </Link>
          <Link
            className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
            to={`/profile/` + userData?._id}
            data-discover="true"
          >
            <span className="relative">
              <CiUser size={20} />
            </span>
            <span className="hidden sm:inline">Profile</span>
            <span className="sr-only sm:hidden">Profile</span>
          </Link>
          <Link
            className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900"
            to={`/notification/` + userData?._id}
            data-discover="true"
          >
            <span className="relative">
              <FiMessageCircle size={20} />
              <span className="absolute -right-2 -top-2 inline-flex min-w-[16px] items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-black leading-4 text-white">
                10
              </span>
            </span>
            <span className="hidden sm:inline">Notifications</span>
            <span className="sr-only sm:hidden">Notifications</span>
          </Link>
        </nav>
        <div className="relative">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100">
                <img
                  alt="user"
                  className="h-8 w-8 rounded-full object-cover"
                  src={userData?.photo}
                />
                <span className="hidden max-w-35 truncate text-sm font-semibold text-slate-800 md:block">
                  marina
                </span>
                <CiMenuBurger />
              </Button>
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
                <Link to={`/settings/changePassword`}>Settings</Link>
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
        </div>
      </div>
    </header>
  );
}
