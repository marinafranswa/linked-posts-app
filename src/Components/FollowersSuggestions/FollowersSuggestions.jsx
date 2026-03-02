import axios from "axios";
import { useContext } from "react";
import { baseUrl } from "../../env/env.environment";
import { tokenContext } from "../../Context/tokenContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../shared/Loading/Loading";
import { Button, Card } from "@heroui/react";
import { Link } from "react-router-dom";
import FollowBtn from "../FollowBtn/FollowBtn";

export default function FollowersSuggestions() {
  const { userToken } = useContext(tokenContext);
  async function getSuggestsUsers() {
    const { data } = await axios.get(`${baseUrl}/users/suggestions?limit=5`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data.data;
  }

  let { isLoading, data } = useQuery({
    queryFn: getSuggestsUsers,
    queryKey: ["followPeople"],
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-start mb-12">
        <Card className="flex flex-col py-4">
          <h4 className="text-xl text-gray-900 font-bold mb-5 px-6 pt-2">
            Personal Info
          </h4>
          {data?.suggestions?.map((user) => (
            <div
              key={user?._id}
              className="user-row flex flex-col items-center justify-between cursor-pointer p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]"
            >
              <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                  <img
                    className="avatar w-10 h-10 rounded-full"
                    src={user?.photo}
                  />
                </div>
                <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                  <Link
                    to={`/profile/` + user?._id}
                    className="font-medium text-sm truncate"
                  >
                    {user?.name}
                  </Link>
                  <div className="skills flex flex-col">
                    <span className="subtitle text-xs text-slate-500">
                      Mutual:
                      {user?.mutualFollowersCount}
                    </span>
                  </div>
                </div>
              </div>
      
              <div className="user-option mx-auto sm:ml-auto sm:mr-0">
             <FollowBtn userId={user?._id}/>
              </div>
           
            </div>
          ))}
 
        </Card>
      </div>
    </>
  );
}
