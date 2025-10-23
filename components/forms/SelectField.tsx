import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, FieldValues } from "react-hook-form";
import { Label } from "../ui/label";

const SelectField = <T extends FieldValues>({
  label,
  placeholder,
  name,
  options,
  control,
  error,
  required = false,
}: SelectFieldProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        rules={{ required: required ? `${label} is required` : false }}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.map((option) => (
                  <SelectItem
                    className="focus:bg-gray-600 focus:text-white"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};

export default SelectField;
