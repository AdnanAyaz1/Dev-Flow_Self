"use client";

import AuthFormsWrapper from "@/components/forms/auth-forms/AuthFormsWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { SignUpSchema } from "@/lib/zod-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";

const SignUp = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const defaultValues = { name: "", email: "", password: "" };

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const handleSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsLoading(true);
    const res = await api.users.create(data);
    console.log("res", res);
    if (res.success == true) {
      toast({
        title: "Success",
        description: res.message,
        variant: "success",
      });

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      setTimeout(() => {
        router.push(routes.home);
      }, 500);
    } else {
      toast({
        title: "Error ",
        description: res.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-auth-bg bg-no-repeat bg-center bg-cover dark:bg-auth-bg-dark flex-center ">
      <AuthFormsWrapper type="Sign Up">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-10 space-y-6"
          >
            {Object.keys(defaultValues).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name as Path<z.infer<typeof SignUpSchema>>} // Correct type
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2.5">
                    <FormLabel className="paragraph-medium dark:text-light-700 text-dark-300">
                      {name === "email"
                        ? "Email Address"
                        : name.charAt(0).toUpperCase() + name.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type={name === "password" ? "password" : "text"} // Use `name`, not `field.name`
                        {...field} // Correct way to spread field props
                        className="paragraph-regular bg-light-900 dark:bg-dark-300 text-dark-300 dark:text-light-700 no-focus border-light-700 dark:border-dark-400 min-h-12 rounded-1.5 border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              variant={"ghost"}
              className="primary-gradient w-full h-[45px] paragraph-semibold    text-white hover:text-white active:scale-95 duration-150 transition-all ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <ReloadIcon className="mr-2 size-4 animate-spin" />
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </form>
        </Form>
      </AuthFormsWrapper>
    </div>
  );
};

export default SignUp;
