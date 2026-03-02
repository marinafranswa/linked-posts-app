import { Card } from '@heroui/react';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaGear, FaLock } from "react-icons/fa6";
import { tokenContext } from '../../Context/tokenContext';
import { PiUserCircleCheckFill, PiUserListFill } from 'react-icons/pi';



export default function SideMenu() {
    const { userData } = useContext(tokenContext);
    
  return (
    <>
      <Card className="p-4">
        <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
            <FaUser />
          </div>
          <div className="flex-auto">
            <Link
              to={`/profile/` + userData?._id}
              className="block font-semibold text-gray-900"
            >
              Profile
              <span className="absolute inset-0" />
            </Link>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
            <FaGear />
          </div>
          <div className="flex-auto">
            <Link
              to={"/settings/changePassword"}
              className="block font-semibold text-gray-900"
            >
              Settings
              <span className="absolute inset-0" />
            </Link>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
            <FaLock />
          </div>
          <div className="flex-auto">
            <Link
              to={"/settings/changePassword"}
              className="block font-semibold text-gray-900"
            >
              Change Password
              <span className="absolute inset-0" />
            </Link>
          </div>
        </div>
        <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
            <PiUserCircleCheckFill />
          </div>
          <div className="flex-auto">
            <Link
              to={"/settings/changeProfile"}
              className="block font-semibold text-gray-900"
            >
              Change Profile
              <span className="absolute inset-0" />
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
}
