import { useContext } from "react";
import { tokenContext } from "../../Context/tokenContext";
import Loading from "../../Components/shared/Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../env/env.environment";
import PostCard from "../../Components/shared/PostCard/PostCard";
import CreatePosts from "../../Components/shared/CreatePosts/CreatePosts";
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
        <div className="h-full bg-gray-200 p-8">
          <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="w-full h-62.5">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <img
                src={userData?.photo}
                className="w-40 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl">{userData?.name}</p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">Software Engineer at Tailwind CSS</p>
              <p className="text-sm text-gray-500">New York, USA</p>
            </div>
          </div>
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col 2xl:w-1/3">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700">{userData?.name}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Birthday:</span>
                    <span className="text-gray-700">
                      {userData?.dateOfBirth.split("T")[0]}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Joined:</span>
                    <span className="text-gray-700">
                      {userData?.createdAt.split("T")[0]}
                    </span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700">{userData?.email}</span>
                  </li>
                  <li className="flex py-2">
                    <span className="font-bold w-24">Gender:</span>
                    <span className="text-gray-700">{userData?.gender}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col w-full 2xl:w-2/3">
              {/* profile posts */}
<CreatePosts/>
              {data.map((post) => {
                return <PostCard post={post} key={post._id} />;
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
