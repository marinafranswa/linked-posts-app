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
    <section className="py-10">
      <div className="w-10/12 mx-auto max-w-6xl">
        <div className="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 mx-auto">
          <div className="p-4 col-span-6 md:col-span-2 ">
            <div className="grid grid-cols-5">
              <div className="md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-indigo-50 ">
                <div
                  style={{ textAlign: "center" }}
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0"
                >
                  <svg
                    className="mx-auto items-center justify-center h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                    />
                  </svg>
                </div>
                <div className="flex-auto hidden md:block">
                  <a href="#" className="block font-semibold text-gray-900">
                    Security
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600">
                    Make your data more secure
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 col-span-6 md:col-span-4">
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="bg-white p-12 flex flex-col gap-8 h-100"
            >
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
                  className="font-medium text-white bg-gray-500"
                  type="button"
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
          </div>
        </div>
      </div>
    </section>
  );
}
