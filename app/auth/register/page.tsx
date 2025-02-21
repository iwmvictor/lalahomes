"use client";
import { LoginForm } from "@/components/Login/loginForm";
import Typography from "@/components/typography/Typography";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
const RegistePage = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/welcome");
  }
  return (
    <div className="bg-blue-100 flex items-center justify-center h-screen">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="h-screen lg:w-1/2 bg-blue-900 p-8 text-white flex flex-col justify-center items-center">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Welcome to Lala Home Listing
            </h2>
            <p className="text-lg mb-8">
              Rent or List your home with Lala Rentals
            </p>
            {/* <p className="text-lg">
              Doesn't have an account?{" "}
              <Link href="/auth/register">Create Account</Link>
            </p> */}
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default RegistePage;
