export interface AuthTranslation {
  login: {
    title: string;
    email: {
      label: string;
      placeholder: string;
      errEmptyMessage: string;
      errInvalidMessage: string;
    };
    password: {
      label: string;
      placeholder: string;
      errEmptyMessage: string;
      errInvalidMessage: string;
    };
    rememberMe: string;
    forgotPassword: string;
    loginButton: string;
    noAccount: string;
    signUp: string;
  };
  carousels: {
    title: string;
    description: string;
  }[];
}
