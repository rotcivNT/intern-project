import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailIcon } from "@/icons/EmailIcon";
import { LockIcon } from "@/icons/LockIcon";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum LANGUAGES {
  VIE = "VIE",
  ENG = "ENG",
}

const langs = [
  { name: LANGUAGES.VIE, flagImage: "./assets/vn-flag.png" },
  { name: LANGUAGES.ENG, flagImage: "./assets/us-flag.png" },
];

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignIn() {
  const [selectedLang, setSelectedLang] = useState<LANGUAGES>(LANGUAGES.VIE);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-[100%] sm:w-[438px] flex flex-col items-center p-2 sm:p-10 md:bg-[#232f43] rounded-[32px] md:shadow-[0px_4px_8px_0px_#00000026]">
        <div>
          <img src="./assets/logo.png" className="mx-auto" alt="Logo" />
        </div>

        <div className="mt-[56px] max-w-[358px] w-full">
          <h3 className="text-[24px] text-[#216CE3] font-[600] mb-6">Log In</h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-[#ddd] text-xs">
                    Email
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <EmailIcon />
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[100%] text-[#DDD] placeholder:text-[#DDD] rounded-[8px] border border-[#455E87] pl-12"
                        placeholder="Your email"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-[#ddd] text-xs">
                    Password
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <LockIcon />
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[100%] text-[#DDD] placeholder:text-[#DDD] rounded-[8px] border border-[#455E87] pl-12 tracking-[8px] placeholder:tracking-normal"
                        placeholder="Your password"
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
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center !mb-2">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" className="size-6" />
                <label htmlFor="remember-me" className="text-[#efefef]">
                  Remember me
                </label>
              </div>
              <Button type="button" variant="secondary">
                Forgot Password?
              </Button>
            </div>
            <Button type="submit" variant="default" className="w-full h-10">
              Log In
            </Button>
          </form>

          <div className="my-6">
            <span className="text-[#efefef] mr-2">
              Don't have an account yet?
            </span>
            <Button variant="secondary">Sign Up</Button>
          </div>

          <div className="bg-[#ADC9F5] rounded-[8px] p-1 flex w-fit mx-auto">
            {langs.map((lang) => (
              <Button
                key={lang.name}
                onClick={() => setSelectedLang(lang.name)}
                className={cn(
                  "bg-transparent gap-2 py-1 px-2 leading-[19px] text-[#808080] font-[500] transition-all duration-200 ease-linear",
                  {
                    "bg-[#77A5EE] text-white": selectedLang === lang.name,
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
