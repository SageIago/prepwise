import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}

const FormField = (props: FormFieldProps<T>) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <FormLabel className="label">{props.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              type={props.type}
              className="input"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
