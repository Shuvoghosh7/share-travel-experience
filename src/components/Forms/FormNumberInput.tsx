"use client";

import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: number | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  
}

const FormNumberInput = ({
    name,
    type,
    size,
    value,
    id,
    placeholder,
    validation,
    label,
  }: IInput) => {
    const { control } = useFormContext();
  
    return (
      <>
        {label ? label : null}
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={typeof field.value === 'number' ? field.value : value || ''}
              onChange={(e) => {
                const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
                field.onChange(newValue);
              }}
            />
          )}
        />
      </>
    );
  };
  
  export default FormNumberInput;
  