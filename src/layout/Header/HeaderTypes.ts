export type FormFields = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type ErrorResponse = {
  errors: FieldError[];
  date: string;
};

export type FieldError = {
  field: string;
  value: string;
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
