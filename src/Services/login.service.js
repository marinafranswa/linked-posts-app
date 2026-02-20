import axios from "axios";
import { baseUrl } from "../env/env.environment";

export async function sendLoginData(formData) {
  let { data } = await axios.post(
    `${baseUrl}/users/signin`,
    formData,
  );
  return data.data;
}
