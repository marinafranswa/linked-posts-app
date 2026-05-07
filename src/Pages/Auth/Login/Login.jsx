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
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex lg:items-center">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
        <section className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">
          <h1 className="hidden text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">
            Route Posts
          </h1>
          <p className="hidden mt-4 text-2xl font-medium leading-snug text-slate-800 lg:block">
            Connect with friends and the world around you on Route Posts.
          </p>
          <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
              About Route Academy
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              Egypt's Leading IT Training Center Since 2012
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Route Academy is the premier IT training center in Egypt,
              established in 2012. We specialize in delivering high-quality
              training courses in programming, web development, and application
              development. We've identified the unique challenges people may
              face when learning new technology and made efforts to provide
              strategies to overcome them.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">2012</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Founded
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">40K+</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Graduates
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">50+</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Partner Companies
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">5</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Branches
                </p>
              </div>
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">20</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Diplomas Available
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="order-1 w-full max-w-107.5 lg:order-2">
          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <div className="mb-4 text-center lg:hidden">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                Route Posts
              </h1>
              <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                Connect with friends and the world around you on Route Posts.
              </p>
            </div>
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              <Button
                type="button"
                className="rounded-lg py-2 text-sm font-extrabold transition bg-white text-[#00298d] shadow-sm"
              >
                <Link to={"/auth/login"}> Login</Link>
              </Button>
              <Button
                type="button"
                className="rounded-lg py-2 text-sm font-extrabold transition bg-transparent text-slate-600 hover:text-slate-800"
              >
                <Link to={"/auth/register"}> Register</Link>{" "}
              </Button>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Log in to Route Posts
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Log in and continue your social journey.
            </p>
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="mt-5 space-y-3.5"
            >
              <Input
                {...register("email")}
                label="email"
                type="email"
                variant="faded"
                startContent={<FaRegUser className="text-slate-400" />}
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
                startContent={
                  <IoKeyOutline className="text-slate-400 size-5" />
                }
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
                className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
              >
                Login
              </Button>

              {/* <button
                type="button"
                className="mx-auto block text-sm font-semibold text-[#00298d] transition hover:underline"
              >
                Forgot password?
              </button> */}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

       