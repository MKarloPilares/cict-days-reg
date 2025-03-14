"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-svh w-full flex flex-col">
      <div className="flex items-center justify-center gap-2 p-3 w-full">
        <div className="flex justify-center items-center w-full max-w-sm">
          <Image src="/UB Logo.png" alt="Ub Logo" width={150} height={100} />
        </div>
      </div>
    </div>
  );
}
