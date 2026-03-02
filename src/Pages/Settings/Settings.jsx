import { Outlet } from 'react-router-dom';
import ChangePassword from '../../Components/ChangePassword/ChangePassword';
import SideMenu from '../../Components/SideMenu/SideMenu';

export default function Settings() {
  return (
    <>
      <section className="py-10">
        <div className="w-10/12 mx-auto max-w-8xl">
          <div className="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 mx-auto">
            <div className="p-4 col-span-6 md:col-span-2 ">
              <SideMenu />
            </div>
            <div className="p-4 col-span-6 md:col-span-4">
             <Outlet/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
