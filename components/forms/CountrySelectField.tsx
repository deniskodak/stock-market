"use client";

import { Controller, FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import countryList from "react-select-country-list";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const countries = countryList().getData();
let countrySelectCounter = 0;

const CountrySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const selectedCountry = countries.find((c) => c.value === value) || null;

  useEffect(() => {
    countrySelectCounter += 1;
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-controls={"country-select-popover-" + countrySelectCounter}
          role="combobox"
          aria-expanded={open}
          className="country-select-trigger"
        >
          {selectedCountry ? (
            <span className="flex items-center gap-2">
              <Image
                className="w-4 h-3 object-cover"
                width={16}
                height={12}
                alt={selectedCountry.label}
                aria-hidden="true"
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.value}.svg`}
              />
              <span>{selectedCountry.label}</span>
            </span>
          ) : (
            "Select your country..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={"country-select-popover-" + countrySelectCounter}
        className="w-full p-0 bg-gray-800 border-gray-600"
        align="start"
      >
        <Command className="bg-gray-800 border-gray-600">
          <CommandInput
            placeholder="Search countries..."
            className="country-select-input"
          />
          <CommandEmpty className="country-select-empty">
            No country found.
          </CommandEmpty>
          <CommandList className="max-h-60 bg-gray-800 scrollbar-hide-default">
            <CommandGroup className="bg-gray-800">
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={`${country.label} ${country.value}`}
                  onSelect={() => {
                    onChange(country.value);
                    setOpen(false);
                  }}
                  className="country-select-item"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-yellow-500",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex items-center gap-2">
                    <Image
                      className="w-4 h-3 object-cover"
                      width={16}
                      height={12}
                      alt={country.label}
                      aria-hidden="true"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.value}.svg`}
                    />
                    <span>{country.label}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CountrySelectField = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  required = false,
}: CountrySelectProps<T>) => {
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
          <CountrySelect value={field.value} onChange={field.onChange} />
        )}
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
      <p className="text-xs text-gray-500">
        Helps us show market data and news relevant to you.
      </p>
    </div>
  );
};

export default CountrySelectField;
