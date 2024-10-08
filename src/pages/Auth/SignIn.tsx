import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/features/auth/api";
import { EmailIcon } from "@/icons/EmailIcon";
import { LockIcon } from "@/icons/LockIcon";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const SECRET_KEY = "MY_SCRET_KEY";

const encode = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decode = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

enum LANGUAGES {
  VIE = "VIE",
  ENG = "ENG",
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "login.email.errEmptyMessage" })
    .email({ message: "login.email.errInvalidMessage" }),
  password: z
    .string()
    .min(1, { message: "login.password.errEmptyMessage" })
    .min(6, {
      message: "login.password.errInvalidMessage",
    }),
});

const langs = [
  { name: LANGUAGES.VIE, flagImage: "./assets/vn-flag.png", code: "vi" },
  { name: LANGUAGES.ENG, flagImage: "./assets/us-flag.png", code: "en" },
];

export default function SignIn() {
  const { t, i18n } = useTranslation("auth");

  const [isLoading, setIsLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(!!Cookies.get("email"));
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: Cookies.get("email") || "",
      password: Cookies.get("password")
        ? decode(Cookies.get("password") as string)
        : "",
    },
    mode: "onTouched",
  });

  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await login({
        username: values.email,
        password: values.password,
      }).unwrap();

      if (isRememberMe) {
        const encodePassword = encode(values.password);
        Cookies.set("email", values.email);
        Cookies.set("password", encodePassword);
      } else if (Cookies.get("email") || Cookies.get("password")) {
        Cookies.remove("email");
        Cookies.remove("password");
      }
      navigate("/dashboard");
    } catch {
      setIsLoading(false);
      toast.error(t("login.loginFailMessage"));
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-[100%] sm:w-[438px] flex flex-col items-center p-2 sm:p-10 md:bg-[#232f43] rounded-[32px] md:shadow-[0px_4px_8px_0px_#00000026]">
        <div>
          <img src="./assets/logo.png" className="mx-auto" alt="Logo" />
        </div>

        <div className="mt-[56px] max-w-[358px] w-full">
          <h3 className="text-[24px] text-[#216CE3] font-[600] mb-6">
            {t("login.title")}
          </h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-[#ddd] text-xs">
                    {t("login.email.label")}
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <EmailIcon />
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[100%] text-[#DDD] placeholder:text-[#DDD] rounded-[8px] border border-[#455E87] pl-12"
                        placeholder={t("login.email.placeholder")}
                      />
                    </FormControl>
                  </div>
                  {fieldState.invalid && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error?.message &&
                        t(fieldState.error?.message, { defaultValue: "" })}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-[#ddd] text-xs">
                    {t("login.password.label")}
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <LockIcon />
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        className={`${
                          showPassword ? "" : "tracking-[8px]"
                        } w-[100%] text-[#DDD] placeholder:text-[#DDD] rounded-[8px] border border-[#455E87] pl-12 placeholder:tracking-normal`}
                        placeholder={t("login.password.placeholder")}
                        type={showPassword ? "text" : "password"}
                        id="password"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => setShowPassword((pre) => !pre)}
                      className="absolute top-1/2 -translate-y-1/2 right-4 bg-transparent hover:opacity-70"
                    >
                      {showPassword ? (
                        <EyeIcon size={18} color="#DDD" />
                      ) : (
                        <EyeOffIcon size={18} color="#DDD" />
                      )}
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error?.message &&
                        t(fieldState.error?.message, { defaultValue: "" })}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center !mb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  className="size-6"
                  checked={isRememberMe}
                  onCheckedChange={(e) => setIsRememberMe(!!e.valueOf())}
                />
                <label htmlFor="remember-me" className="text-[#efefef]">
                  {t("login.rememberMe")}
                </label>
              </div>
              <Button type="button" variant="secondary">
                {t("login.forgotPassword")}
              </Button>
            </div>
            <Button type="submit" variant="default" className="w-full h-10">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                t("login.loginButton")
              )}
            </Button>
          </form>

          <div className="my-6">
            <span className="text-[#efefef] mr-2">{t("login.noAccount")}</span>
            <Button variant="secondary">{t("login.signUp")}</Button>
          </div>

          <div className="bg-[#ADC9F5] rounded-[8px] p-1 flex w-fit mx-auto">
            {langs.map((lang) => (
              <Button
                key={lang.name}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={cn(
                  "bg-transparent gap-2 py-1 px-2 leading-[19px] text-[#808080] font-[500] transition-all duration-200 ease-linear",
                  {
                    "bg-[#77A5EE] text-white": lang.code === i18n.language,
                  }
                )}
              >
                <img
                  src={lang.flagImage}
                  className="size-6"
                  alt={`${lang.name} flag`}
                />
                {lang.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Form>
  );
}
