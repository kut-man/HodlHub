export type RegisterFields = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type AuthenticationMethodsProps = (
  data: LoginFields | RegisterFields,
  onSuccess?: () => void,
  onError?: React.Dispatch<React.SetStateAction<string>>
) => Promise<void>;

export type LoginResponse = {
  status: string;
  message: string;
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
