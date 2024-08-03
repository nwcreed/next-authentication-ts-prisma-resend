"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas/index"; // Assurez-vous que le chemin est correct
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { FormError } from "./form-error";
import { reset } from "@/actions/reset"; // Assurez-vous que le chemin est correct
import { z } from "zod";

const ResetForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetSchema>) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await reset(data); // Appel de la fonction reset

      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        setSuccessMessage(response.success);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="choose your new password"
      title="Reset Password"
      backButtonHref="/sign-in"
      backButtonLabel="Back to login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button type="submit" className="w-full">
            {loading ? "Loading..." : "Reset Password"}
          </Button>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
