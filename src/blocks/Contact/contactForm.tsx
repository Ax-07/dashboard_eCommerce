"use client"

import React from "react";
import { Button } from "@/src/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "subject must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "message must be at least 2 characters.",
  }),
})

const ContactForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-(--breakpoint-md) space-y-4 rounded-md border-2 p-10">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField 
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem className="w-full">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="subject"
          render={({field}) => (
            <FormItem className="w-full">
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <Input placeholder="Subject" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="message"
          render={({field}) => (
            <FormItem className="w-full">
            <FormLabel>Message</FormLabel>
            <FormControl>
              {/* <Input placeholder="Message" {...field} /> */}
              <Textarea placeholder="Message" {...field} rows={5} className="bg-primary-foreground"/>
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  )
}

export default ContactForm;