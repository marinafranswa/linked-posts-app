import { useContext } from "react";
import { tokenContext } from "../../Context/tokenContext";
import Loading from "../../Components/shared/Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../env/env.environment";
import PostCard from "../../Components/shared/PostCard/PostCard";
import CreatePosts from "../../Components/shared/CreatePosts/CreatePosts";
import { Card } from "@heroui/react";
import { FaAt, FaUser } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import FollowersSuggestions from "../../Components/FollowersSuggestions/FollowersSuggestions";

export default function Profile() {
  let { userData, userToken } = useContext(tokenContext);
  
  let { userId } = useParams();
  async function getUserPosts() {
    let { data } = await axios.get(
      `${baseUrl}/users/${userId}/posts`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return data;
  }

  let { data, isLoading } = useQuery({
    queryFn: getUserPosts,
    queryKey: ["profilePosts"],
    select: (data) => data?.data.posts,
  });


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {userData ? (
        <div className="h-full bg-gray-200">
          <div className="bg-white pb-8">
            <div className="w-full h-40"></div>
            <div className="flex flex-col items-center -mt-20">
              <img
                src={userData?.photo}
                className="w-40 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl">{userData?.name}</p>
              </div>
              <p className="text-gray-700">{userData?.email}</p>
              <div className="flex gap-5">
                <p className="text-sm text-gray-500">
                  {userData?.followersCount} Followers
                </p>
                <p className="text-sm text-gray-500">
                  {userData?.followingCount} Followings
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 flex flex-col px-4 md:px-8 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full h-1/3 2xl:w-1/3 flex flex-col xl:flex-col md:flex-row gap-6">
              <Card className="flex-1 p-8 mb-12">
                <h4 className="text-xl text-gray-900 font-bold mb-5">
                  Personal Info
                </h4>
                <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                    <FaUser />
                  </div>
                  <div className="flex-auto">
                    <div className="block font-semibold text-gray-900">
                      <span className="font-bold w-24 me-2">Full name:</span>
                      <span className="text-gray-700">{userData?.name}</span>

                      <span className="absolute inset-0" />
                    </div>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                    <FaBirthdayCake />
                  </div>
                  <div className="flex-auto">
                    <div className="block font-semibold text-gray-900">
                      <span className="font-bold w-24 me-2">Birthday:</span>
                      <span className="text-gray-700">
                        {userData?.dateOfBirth.split("T")[0]}
                      </span>
                      <span className="absolute inset-0" />
                    </div>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                    <FaAt />
                  </div>
                  <div className="flex-auto">
                    <div className="block font-semibold text-gray-900">
                      <span className="font-bold w-24 me-2">Joined:</span>
                      <span className="text-gray-700">
                        {userData?.createdAt.split("T")[0]}
                      </span>
                      <span className="absolute inset-0" />
                    </div>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                    <MdEmail />
                  </div>
                  <div className="flex-auto">
                    <div className="block font-semibold text-gray-900">
                      <span className="font-bold w-24 me-2">Email:</span>
                      <span className="text-gray-700">{userData?.email}</span>
                      <span className="absolute inset-0" />
                    </div>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-4 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-indigo-50">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gray-50 group-hover:bg-white">
                    <PiUserListFill />
                  </div>
                  <div className="flex-auto">
                    <div className="block font-semibold text-gray-900">
                      <span className="font-bold w-24 me-2">Gender:</span>
                      <span className="text-gray-700">{userData?.gender}</span>
                      <span className="absolute inset-0" />
                    </div>
                  </div>
                </div>
              </Card>
              <div className="hidden md:block">
                <FollowersSuggestions />
              </div>
            </div>
            <div className="flex flex-col w-full 2xl:w-2/3">
              <CreatePosts />

              {data && data.length > 0 ? (
                data.map((post) => <PostCard post={post} key={post?._id} />)
              ) : (
                <p className="text-center my-5 ">no posts yet</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
