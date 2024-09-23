import { AuthTranslation } from "./auth";

declare global {
  interface I18nNamespaces {
    auth: AuthTranslation;
  }
}
