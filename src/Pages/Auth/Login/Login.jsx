import { Input, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../Schema/login.schema";
import { sendLoginData } from "../../../Services/login.service";
import { useContext } from "react";
import { tokenContext } from "../../../Context/tokenContext";
import {  FaEnvelope, FaLock  } from "react-icons/fa";
import image from "./../../../assets/images/login-image.webp"


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
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <div className="w-full max-w-md mx-auto p-6 lg:p-10">
              <h1 className="text-slate-900 text-3xl font-bold text-center my-4">
             Login
              </h1>

              <form
                onSubmit={handleSubmit(onSubmitForm)}
                className="bg-white  flex flex-col gap-8 h-100 justify-center"
              >
                <Input
                  {...register("email")}
                  label="email"
                  type="email"
                  variant="faded"
                  startContent={<FaEnvelope className="text-slate-400" />}
                />
                {errors.email ? (
                  <p className="text-red-600 text-small">
                    {errors.email.message}
                  </p>
                ) : null}

                <Input
                  {...register("password")}
                  label="password"
                  type="password"
                  variant="faded"
                  startContent={<FaLock className="text-slate-400" />}
                />
                {errors.password ? (
                  <p className="text-red-600 text-small">
                    {errors.password.message}
                  </p>
                ) : null}

                <Button
                  className="font-medium"
                  isLoading={isSubmitting}
                  type="submit"
                  color="primary"
                >
                  Login
                </Button>
                <p className="text-medium text-center">
                  Don't have an account?
                  <Link to={"/auth/register"} className="text-sky-500">
                    {" "}
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={image}
              alt="signup img"
              className="w-full max-w-sm lg:max-w-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

       