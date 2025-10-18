"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { SignInFormData } from "@/interfaces/auth.interface";
import { SubmitHandler, useForm } from "react-hook-form";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <>
      <h1 id="signin-title" className="form-title">
        Log In Your Account
      </h1>
      <form
        className="space-y-5"
        aria-labelledby="signin-title"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          name="email"
          label="Email"
          placeholder="contacts@example.com"
          register={register}
          error={errors.email}
          required
          validation={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Create a strong password"
          register={register}
          error={errors.password}
          type="password"
          required
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Password must contain letters and numbers",
            },
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5 capitalize"
        >
          {isSubmitting ? "Logging you in..." : "Log in"}
        </Button>

        <FooterLink
          href="/sign-up"
          text="Don`t have an account?"
          linkText="Sign up"
        />
      </form>
    </>
  );
};

export default SignInPage;
