import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import {
  DemoRequestFormValues,
  initialDemoRequestFormValues,
} from "@/components/demo-request-form";

export function useDemoRequestForm() {
  const [formValues, setFormValues] = useState<DemoRequestFormValues>(initialDemoRequestFormValues);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  }, []);

  const resetForm = useCallback(() => {
    setFormValues(initialDemoRequestFormValues);
    setSubmitted(false);
  }, []);

  return { formValues, submitted, handleChange, handleSubmit, resetForm };
}
