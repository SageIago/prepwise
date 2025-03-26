"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import FormField from "./shared/Form-Field";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const authFormSchema = (type: AuthFormProps["type"]) => {
  return z.object({
    name: type === "sign-in" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = (props: AuthFormProps) => {
  const router = useRouter();
  const formSchema = authFormSchema(props.type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      // SUBMIT THE DATA TO THE DATABASE HERE
      if (props.type === "sign-up") {
        console.log("SIGN-UP", values);

        toast.success("Account Created Successfully, Please Sign In");

        router.push("/sign-in");
      } else {
        toast.success("Signed In Successfully");

        router.push("/");
        console.log("SIGN-IN", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`An error occured. Please Try Again ${error}`);
    }
  }

  const isSignIn = props.type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card items-center py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Prepwise-Logo" height={32} width={38} />
          <h2 className="text-light-100">PrepWise</h2>
        </div>

        <h3 className="font-semibold font-mona-sans text-[28px] leading-[32px]">
          Practice Interviews with AI
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter Your Email"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              type="password"
            />

            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create An Account"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
