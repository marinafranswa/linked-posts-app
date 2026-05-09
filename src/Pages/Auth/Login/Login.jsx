import { Input, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../Schema/login.schema";
import { sendLoginData } from "../../../Services/login.service";
import { useContext } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";




export default function Login() {

let {setToken}= useContext(tokenContext)

let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {

      email: "",
      password: ""

    },
    mode: "onBlur",
  });
  async function onSubmitForm(data) {

    try {
      let response = await sendLoginData(data);


      setToken(response.token);
      localStorage.setItem("token", response.token)
      
      toast.success("Welcome Back!");
      navigate("/")
   
      
    } catch (error) {
      console.log(error);
      toast.error("Enter valid data");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5 space-y-3.5">
      <Input
        {...register("email")}
        label="email"
        type="email"
        variant="faded"
        startContent={<FaRegUser className="text-slate-400" />}
      />
      {errors.email ? (
        <p className="text-red-600 text-small">{errors.email.message}</p>
      ) : null}
      <Input
        {...register("password")}
        label="password"
        type="password"
        variant="faded"
        startContent={<IoKeyOutline className="text-slate-400 size-5" />}
      />
      {errors.password ? (
        <p className="text-red-600 text-small">{errors.password.message}</p>
      ) : null}
      <Button
        className="font-medium"
        isLoading={isSubmitting}
        type="submit"
        className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
      >
        Login
      </Button>

      <button
        type="button"
        className="mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline"
      >
        Forgot password?
      </button>
    </form>
  );
}

       