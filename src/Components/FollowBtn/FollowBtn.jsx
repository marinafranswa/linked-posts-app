import React, { useContext, useState } from 'react'
import { tokenContext } from '../../Context/tokenContext';
import axios from 'axios';
import { baseUrl } from '../../env/env.environment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@heroui/react';

export default function FollowBtn({ userId }) {
    console.log(userId);
    
     let { userToken } = useContext(tokenContext);
     let [isFollowed, setFollow] = useState(null);
     async function toggleFollow() {
       let { data } = await axios.put(
         `${baseUrl}/users/${userId}/follow`,
         {},
         {
           headers: {
             Authorization: `Bearer ${userToken}`,
           },
         },
       );
       return data.data;
    }
      let queryClient = useQueryClient();
      let { mutate, isPending, reset } = useMutation({
        mutationFn: toggleFollow,
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["followPeople"] });
          queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
     
          setFollow(data?.following);
          reset();
        },
      });
    
  return (
    <>
      {isFollowed ? (
        <Button
          color="default"
          variant="solid"
          type="button"
          isDisabled={isPending}
          onClick={() => {
            mutate();
          }}
        >
         Following
        </Button>
      ) : (
        <Button
          color="primary"
          variant="solid"
          type="button"
          isDisabled={isPending}
          onClick={() => {
            mutate();
          }}
        >
       Follow
        </Button>
      )}
      {/* <Button
        color="primary"
        variant="solid"
        type="button"
        isDisabled={isPending}
        onClick={() => {
          mutate();
        }}
      >
          {isFollowed ? "Following" : "Follow"}
          </Button> */}
    </>
  );
}
