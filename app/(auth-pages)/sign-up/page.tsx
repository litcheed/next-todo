"use client"

import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function Signup() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">新規登録</h1>
            <p className="text-sm text text-foreground">
              アカウントを所持していますか?{" "}
              <Link className="text-primary font-medium underline" href="/sign-in">
                サインイン
              </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
              <Label htmlFor="email">メールアドレス</Label>
              <Input name="email" placeholder="you@example.com" required />
              <Label htmlFor="password">パスワード</Label>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
              />
              <SubmitButton formAction={signUpAction} pendingText="Signing up...">
                新規登録
              </SubmitButton>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
