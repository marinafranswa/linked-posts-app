import { Input, RadioGroup, Radio, Button, Alert } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "../../../Schema/register.schema";
import { sendRegisterData } from "../../../Services/register.service";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCalendar } from "react-icons/fa";


export default function Register() {

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onBlur",
  });
  async function onSubmitForm(data) {
   
    try {
      let response = await sendRegisterData(data);
      if (response.ok) {
        
        toast.success("Success! please sign in");
        navigate("/auth/login");
      } else {
        throw new Error("can't fetch");
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Enter valid data");
    }
  }

  return (
    <div
      className="min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex lg:items-center"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
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
        <section className="order-1 w-full max-w-[430px] lg:order-2">
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
                className="rounded-lg py-2 text-sm font-extrabold transition bg-transparent text-slate-600 hover:text-slate-800"
              >
                <Link to={"/auth/login"}> Login</Link>
              </Button>
              <Button
                type="button"
                className="rounded-lg py-2 text-sm font-extrabold transition bg-white text-[#00298d] shadow-sm"
              >
                <Link to={"/auth/register"}> Register</Link>{" "}
              </Button>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Create a new account
            </h2>
            <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="mt-5 space-y-3.5"
            >
              <Input
                {...register("name", { required: "Name is required" })}
                label="name"
                type="text"
                variant="faded"
                startContent={<FaUser className="text-slate-400" />}
              />
              {errors.name && (
                <p className="text-red-600 text-small">{errors.name.message}</p>
              )}

              <Input
                {...register("email")}
                label="email"
                type="email"
                variant="faded"
                startContent={<FaEnvelope className="text-slate-400" />}
              />
              {errors.email && (
                <p className="text-red-600 text-small">
                  {errors.email.message}
                </p>
              )}

              <Input
                {...register("password")}
                label="password"
                type="password"
                variant="faded"
                startContent={<FaLock className="text-slate-400" />}
              />
              {errors.password && (
                <p className="text-red-600 text-small">
                  {errors.password.message}
                </p>
              )}

              <Input
                {...register("rePassword")}
                label="confirmPassword"
                type="password"
                variant="faded"
                startContent={<FaLock className="text-slate-400" />}
              />
              {errors.rePassword && (
                <p className="text-red-600 text-small">
                  {errors.rePassword.message}
                </p>
              )}

              <Input
                {...register("dateOfBirth")}
                label="dateOfBirth"
                type="date"
                variant="faded"
                startContent={<FaCalendar className="text-slate-400" />}
              />
              {errors.dateOfBirth && (
                <p className="text-red-600 text-small">
                  {errors.dateOfBirth.message}
                </p>
              )}

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} label="gender">
                    <Radio value="male">male</Radio>
                    <Radio value="female">female</Radio>
                  </RadioGroup>
                )}
              />
              {errors.gender && (
                <p className="text-red-600 text-small">
                  {errors.gender.message}
                </p>
              )}
              <Button
                className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
