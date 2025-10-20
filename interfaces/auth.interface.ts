import { FieldValues, Path, UseFormRegister, FieldError, RegisterOptions, Control } from "react-hook-form";

export type SignInFormData = {
  email: string;
  password: string;
};

export type SignUpFormData = SignInFormData & {
  fullName: string;
  country: string;
  investmentGoals: string;
  riskTolerance: string;
  preferredIndustry: string;
};

export interface InputFieldProps<T extends FieldValues>
  extends React.ComponentProps<"input"> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  validation?: RegisterOptions<T, Path<T>>;
}

type Option = {
  value: string;
  label: string;
};

export type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  options: readonly Option[];
  control: Control<T>;
  error?: FieldError;
  required?: boolean;
};

export type CountrySelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: FieldError;
  required?: boolean;
};

export type FooterLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type HeaderUser = Pick<User, 'name' | 'email'>;