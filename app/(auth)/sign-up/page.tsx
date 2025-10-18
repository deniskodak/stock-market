"use client";

import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { SignUpFormData } from "@/interfaces/auth.interface";
import {
  DEFAULT_GOAL,
  DEFAULT_INDUSTRY,
  DEFAULT_TOLERANCE,
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants/auth";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "PL",
      investmentGoals: DEFAULT_GOAL,
      riskTolerance: DEFAULT_TOLERANCE,
      preferredIndustry: DEFAULT_INDUSTRY,
    },
    mode: "onBlur",
  });
  const onMockSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <>
      <h1 id="signup-title" className="form-title">
        Sign up & Personalize
      </h1>
      <form
        className="space-y-5"
        aria-labelledby="signup-title"
        noValidate
        onSubmit={handleSubmit(onMockSubmit)}
      >
        <InputField
          name="fullName"
          label="Full name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          required
          validation={{ required: "Full name is required" }}
        />

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

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Create a strong password"
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
            }
          }}
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk tolerance"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5 capitalize"
        >
          {isSubmitting
            ? "creating account..."
            : "start your investment journey"}
        </Button>

        <FooterLink href="/sign-in" text="Already have an account?" linkText="Log in" />
      </form>
    </>
  );
};

export default SignUpPage;
