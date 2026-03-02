import { Input, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaLock } from "react-icons/fa";
import { changePasswordSchema } from "../../Schema/changePassword.schema";
import { changePasswordData } from "../../Services/changePassword.service";
import { tokenContext } from "../../Context/tokenContext";


export default function ChangePassword() {
  let { setToken } = useContext(tokenContext);

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
    mode: "onBlur",
  });
  async function onSubmitForm(formData) {
    try {
      let { data } = await changePasswordData(formData);
      setToken(null);
      toast.success(data?.message);
      navigate("auth/login");
      return data;
    } catch (error) {
      console.log(error);
      toast.error("Enter valid data");
    }
  }
  return (
    <>
      <h1 className="font-semibold text-slate-900 text-2xl pb-5">
        Change Password:
      </h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="bg-white flex flex-col gap-8 h-100 lg:px-38"
      >
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
          {...register("newPassword")}
          label="newPassword"
          type="Password"
          variant="faded"
          startContent={<FaLock className="text-slate-400" />}
        />
        {errors.newPassword ? (
          <p className="text-red-600 text-small">
            {errors.newPassword.message}
          </p>
        ) : null}

        <div className="flex gap-2 justify-between">
          <Button
            type="button"
            color="default"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            className="font-medium"
            isLoading={isSubmitting}
            type="submit"
            color="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

