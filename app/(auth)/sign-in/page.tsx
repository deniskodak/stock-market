"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { SignInFormData } from "@/interfaces/auth.interface";
import { signInWithEmailAndPassword } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInPage = () => {
  const router = useRouter();

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
      const result = await signInWithEmailAndPassword({
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        router.push("/");
        router.refresh();
        const displayName =
          result.data?.user?.name ?? result.data?.user?.email ?? "there";
        toast.success(`Welcome ${displayName}!`);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(`Log in failed. Please try again.`, {
        description:
          error instanceof Error
            ? error.message
            : "Failed to log in into account",
      });
    }
  };

  return (
    <>
      <h1 id="signin-title" className="form-title">
        Log in to your account
      </h1>
      <form
        className="space-y-5"
        aria-labelledby="signin-title"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          name="email"
          label="Email"
          placeholder="contacts@example.com"
          register={register}
          error={errors.email}
          autoComplete="email"
          type="email"
          required
          validation={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
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
