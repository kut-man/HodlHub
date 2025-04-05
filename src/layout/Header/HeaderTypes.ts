export type RegisterFields = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  recaptchaToken: string;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type VerifyEmailFields = LoginFields & { code: string };

export type LoginResponse = {
  status: string;
  message: string;
};

export type ErrorResponse = {
  errors?: FieldError[];
  timestamp: string;
  path: string;
  status: number;
  code: string;
  message?: string;
};

export type FieldError = {
  field: string;
  message: string;
};

export enum AuthAction {
  LOGIN = "login",
  SIGNUP = "signup",
}

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
