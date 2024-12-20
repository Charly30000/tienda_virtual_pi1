export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export type ErrorsForm = Partial<Record<keyof RegisterForm, string>>;
