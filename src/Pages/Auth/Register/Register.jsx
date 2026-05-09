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
      // console.log(response);
      
   
        toast.success("Success! please sign in");
        navigate("/auth/login");
     
    } catch (error) {
      console.log(error);
      toast.error("Enter valid data");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5 space-y-3.5">
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
        <p className="text-red-600 text-small">{errors.email.message}</p>
      )}

      <Input
        {...register("password")}
        label="password"
        type="password"
        variant="faded"
        startContent={<FaLock className="text-slate-400" />}
      />
      {errors.password && (
        <p className="text-red-600 text-small">{errors.password.message}</p>
      )}

      <Input
        {...register("rePassword")}
        label="confirmPassword"
        type="password"
        variant="faded"
        startContent={<FaLock className="text-slate-400" />}
      />
      {errors.rePassword && (
        <p className="text-red-600 text-small">{errors.rePassword.message}</p>
      )}

      <Input
        {...register("dateOfBirth")}
        label="dateOfBirth"
        type="date"
        variant="faded"
        startContent={<FaCalendar className="text-slate-400" />}
      />
      {errors.dateOfBirth && (
        <p className="text-red-600 text-small">{errors.dateOfBirth.message}</p>
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
        <p className="text-red-600 text-small">{errors.gender.message}</p>
      )}
      <Button
        type="submit"
        className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
        isLoading={isSubmitting}
      >
        Register
      </Button>
    </form>
  );
}
