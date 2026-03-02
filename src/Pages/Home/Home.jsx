import FollowersSuggestions from "../../Components/FollowersSuggestions/FollowersSuggestions";
import Posts from "../../Components/Posts/Posts";
import CreatePosts from "../../Components/shared/CreatePosts/CreatePosts";
import SideMenu from "../../Components/SideMenu/SideMenu";

export default function Home() {
  return (
    <div className="flex justify-center items-center mt-8 lg:px-4">
      <div className="flex flex-col 2xl:flex-row gap-x-2 w-full max-w-screen-2xl items-start space-y-5 2xl:space-y-0">
        <div className=" hidden lg:block lg:sticky lg:top-20 w-full 2xl:w-1/4">
          <SideMenu />
        </div>

        {/* Main Feed */}
        <div className="w-full 2xl:w-2/4 flex flex-col gap-5">
          <CreatePosts />
          <Posts />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:sticky lg:top-20 w-full 2xl:w-1/4">
          <FollowersSuggestions />
        </div>
      </div>
    </div>
  );
}
