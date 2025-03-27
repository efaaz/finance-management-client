import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IconBrandGoogle, IconSquareRoundedX } from "@tabler/icons-react";
import { cn } from "../lib/utils/utils";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { registerUser } from "../features/auth/authSlice";
import useGoogleAuth from "../features/auth/useGoggleAuth";
import { MultiStepLoader } from "../components/ui/multi-step-loader";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function SignUp() {
  const loadingStates = [
    {
      text: "Establishing secure connection",
    },
    {
      text: "Configuring financial data architecture",
    },
    {
      text: "Initializing personalized analytics engine",
    },
    {
      text: "Deploying financial monitoring systems",
    },
    {
      text: "Activating real-time dashboard",
    },
  ];
  const navigate = useNavigate();
  const [load, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };
  const googleAuth = useGoogleAuth();
  // Add this effect to auto-close the loader after 3 seconds
  useEffect(() => {
    let timer;
    if (load) {
      timer = setTimeout(() => {
        setLoading(false);
        Navigate();
      }, 5000); // 3 seconds
    }
    // Cleanup the timer if component unmounts or load changes
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [load, user, navigate]);

  function Navigate() {
    navigate("/");
    toast("Account created successfully", "success");
  }

  return (
    <>
      <div className="pt-40 w-full flex items-center justify-center">
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={load}
          duration={1000}
        />
        <div className="max-w-md items-center w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Welcome to FinX
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm text-center mt-2 dark:text-neutral-300">
            Sign up to FinX if you don't have an account yet.
          </p>
          <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Efaz"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="efaz@gmail.com"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </LabelInputContainer>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              disabled={isLoading}
              onClick={() => setLoading(true)}
            >
              Sign Up →
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
                onClick={() => googleAuth()}
                disabled={isLoading}
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Sign in with Google
                </span>
                <BottomGradient />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignUp;
