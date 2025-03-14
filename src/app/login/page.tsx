import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function Login() {
    return(
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex items-center self-center font-medium">
              <Image src="/logo.png" alt="logo" width={300} height={100} />
          </div>
          <LoginForm />
        </div>
      </div>
    )
}