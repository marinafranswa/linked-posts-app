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
      console.log(response);
      toast.success("Success! please sign in");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error("Enter valid data");
    }
  }

  return (
    <section className="py-10">
      <div className="max-w-100 md:max-w-1/2 lg:max-w-1/2 mx-auto">
        <h1 className="text-4xl text-center py-8 font-bold">Register</h1>
        {/* {isLoading ? (
          <Alert color="success" title="Success! please sign in" />
        ) : null}
        {isError?<Alert color="danger" title="Enter valid data" />:null} */}
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="bg-white rounded-xl p-12 shadow-sm flex flex-col gap-8"
        >
          <Input
            {...register("name", {
              required: {
                value: true,
              },
            })}
            label="name"
            type="text"
            variant="faded"
            startContent={<FaUser className="text-slate-400" />}
          />
          {errors.name ? (
            <p className="text-red-600 text-small">{errors.name.message}</p>
          ) : null}
          {}
          <Input
            {...register("email")}
            label="email"
            type="email"
            variant="faded"
            startContent={<FaEnvelope className="mr-1 text-slate-400" />}
          />
          {errors.email ? (
            <p className="text-red-600 text-small">{errors.email.message}</p>
          ) : null}

          <Input
            {...register("password")}
            label="password"
            type="password"
            variant="faded"
            startContent={<FaLock className="text-slate-400" />}
          />
          {errors.password ? (
            <p className="text-red-600 text-small">{errors.password.message}</p>
          ) : null}

          <Input
            {...register("rePassword")}
            label="confirmPassword"
            type="password"
            variant="faded"
            startContent={<FaLock className="text-slate-400" />}
          />
          {errors.rePassword ? (
            <p className="text-red-600 text-small">
              {errors.rePassword.message}
            </p>
          ) : null}

          <Input
            {...register("dateOfBirth")}
            label="dateOfBirth"
            type="date"
            variant="faded"
            startContent={
<FaCalendar className="text-slate-400" />            }
          />
          {errors.dateOfBirth ? (
            <p className="text-red-600 text-small">
              {errors.dateOfBirth.message}
            </p>
          ) : null}

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
          {errors.gender ? (
            <p className="text-red-600 text-small">{errors.gender.message}</p>
          ) : null}

          <Button
            className="font-medium"
            isLoading={isSubmitting}
            type="submit"
            color="primary"
          >
            Register{" "}
          </Button>
          <p className="text-medium text-center">
            Already have an account?
            <Link to={"/auth/login"} className="text-sky-500">
              {" "}
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
