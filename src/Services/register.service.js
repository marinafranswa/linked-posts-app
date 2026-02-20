import axios from "axios";
import { baseUrl } from "../env/env.environment";

export async function sendRegisterData(formData) {
    let { data } = await axios.post(
      `${baseUrl}/users/signup`,
      formData,
    );
  return data.data;
}