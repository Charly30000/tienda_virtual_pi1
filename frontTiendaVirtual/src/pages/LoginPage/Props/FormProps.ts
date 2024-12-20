export interface LoginForm {
  username: string;
  password: string;
}

// Hacer que todos los campos de LoginForm sean opcionales en ErrorsForm
export type ErrorsForm = Partial<Record<keyof LoginForm, string>>;
