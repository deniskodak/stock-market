import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";

const InputField = <T extends FieldValues>({
  name,
  label,
  validation = {},
  register,
  error,
  ...props
}: InputFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label className="form-label" htmlFor={props.id ?? name}>
        {label}
      </Label>
      <Input
        className={cn("form-input", {
          "opacity cursor-not-allowed": props.disabled,
        })}
        id={props.id ?? name}
        {...props}
        {...register(name, validation)}
        required={false}
        aria-required={validation?.required ? true : false}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
