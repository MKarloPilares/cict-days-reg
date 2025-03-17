"use client";

import Image from "next/image";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
export default function Done() {
  const router = useRouter();

  return (
    <div className="min-h-svh w-full bg-gray-50">
      <div className="mx-auto flex justify-center px-4 py-3 md:justify-center">
        <Image
          src="/logo.png"
          alt="Ub Logo"
          width={200}
          height={100}
          className="mt-3"
        />
      </div>

      <div className="mt-5 flex h-full flex-col items-center justify-center p-3">
        <div className="mb-10 h-full w-full md:h-70 md:w-150">
          <DotLottieReact
            src="https://lottie.host/8f03b858-63f5-4071-9eb8-29f6f9ecea80/bVcejK9ZOT.lottie"
            autoplay
          />
        </div>
        <div className="flex flex-col items-center justify-center p-3">
          <p className="text-center text-3xl font-semibold text-green-500">
            Registration Successful!
          </p>
          <p className="mt-4 text-center font-semibold text-gray-600">
            Congratulations! You have successfully registered to the event.
          </p>
        </div>
        <div className="mt-10 flex h-full justify-center">
          <Button className="rounded-lg bg-[#8B1A1A] px-18 py-6 text-lg font-bold text-white hover:bg-[#6B1414]" onClick={() => router.push("/")}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
