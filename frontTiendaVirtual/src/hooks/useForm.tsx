import { useState } from "react";

interface FormValues {
  [key: string]: any;
}

type ValidationFunction<T> = (values: T) => { [key in keyof T]?: string };

/**
 * Hook para manejo de formularios
 * @param initialValues Objeto con los valores iniciales
 * @param validate Callback para validar el formulario
 * @returns estado del formulario
 */
export const useForm = <T extends FormValues>(
  initialValues: T,
  validate?: ValidationFunction<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

  const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = (onSubmit: () => void) => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        onSubmit();
      }
    } else {
      onSubmit();
    }
  };

  const isInvalid = Object.keys(errors).length > 0;

  return {
    values,
    errors,
    handleChange,
    setValues,
    handleSubmit,
    isInvalid,
  };
};
