import axios from "axios";
import { baseUrl } from "../env/env.environment";

export async function changePasswordData(formData) {
    
  let { data } = await axios.patch(
    `${baseUrl}/users/change-password`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  return data.data;
}
