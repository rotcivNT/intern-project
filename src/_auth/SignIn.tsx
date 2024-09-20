import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { EmailIcon } from "@/icons/EmailIcon";
import { LockIcon } from "@/icons/LockIcon";
import { AuthCarousel } from "./AuthCarousel";

export default function SignIn() {
  return (
    <div className="flex bg-[#1c2636] h-screen">
      <div className="basis-5/12 flex justify-center items-center">
        {/* Form */}
        <div className="p-10 bg-[#232f43] rounded-[32px] shadow-[0px_4px_8px_0px_#00000026]">
          <div>
            <img src="./assets/logo.png" className="mx-auto" />
          </div>

          <div className="mt-[56px]">
            <h3 className="text-[24px] text-[#216CE3] font-[600] mb-6">
              Log In
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[#ddd] text-xs">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <EmailIcon />
                  </span>
                  <Input
                    className="text-[#DDD] rounded-[8px] border border-[#455E87] w-[358px] pl-12"
                    placeholder="Your email"
                    id="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-[#ddd] text-xs">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <LockIcon />
                  </span>
                  <Input
                    className="text-[#DDD] rounded-[8px] border border-[#455E87] w-[358px] pl-12 tracking-[8px] placeholder:tracking-normal"
                    placeholder="Your password"
                    type="password"
                    id="password"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember-me" className="size-6" />
                  <label htmlFor="remember-me" className="text-[#efefef]">
                    Remember me
                  </label>
                </div>
                <Button variant="secondary">Forgot Password?</Button>
              </div>
            </div>

            <Button variant="default" className="w-full h-10 my-6">
              Log In
            </Button>

            <div>
              <span className="text-[#efefef] mr-2">
                Don’t have an account yet?
              </span>
              <Button variant="secondary">Sign up</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-7/12 overflow-hidden text-white bg-[#216CE3] rounded-tl-[120px] rounded-bl-[120px] flex justify-center items-center">
        <AuthCarousel />
      </div>
    </div>
  );
}
