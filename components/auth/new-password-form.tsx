"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResetPasswordSchema } from "@/schemas";
import CardWrapper from "./card-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const NewPasswordForm = ({ token }: { token: string }) => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    const response = await fetch("/api/new-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword: data.password }),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage("Password reset successful!");
    } else {
      setMessage(result.error || "An unexpected error occurred.");
    }
  };

  return (
    <CardWrapper
      headerLabel="Choose Your New Password"
      title="New Password"
      backButtonHref="/sign-in"
      backButtonLabel="Back to login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="New password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">Reset Password</Button>
        </form>
        {message && <p>{message}</p>}
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
