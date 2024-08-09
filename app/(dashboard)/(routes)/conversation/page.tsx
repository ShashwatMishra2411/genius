"use client";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { formSchema } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessageParam } from "@/types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useProModal } from "@/hooks/use-pro-modal";

export default function Conversation() {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        parts: [{ text: data.prompt }],
      };
      setMessages((prev) => {
        return [...prev, userMessage];
      });
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      console.log("response  = ", response.data);
      setMessages((prev) => {
        return [...prev, response.data];
      });
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="space-y-4 px-4 m-4 flex-1 overflow-y-scroll">
        <div className="flex flex-col gap-y-4">
          {messages.map((message, index) => {
            if (!message.parts) return null;
            return (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-violet-500/10 text-violet-500"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.parts.map((part, partIndex) => {
                    return (
                      <p key={partIndex} className="m-0">
                        {part.text}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="m-4 w-full bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-6"
          >
            <FormField
              name="prompt"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-10 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                        p-2
                        border-0 
                        outline-none
                        focus-visible:ring-0
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <Button
              className="col-span-2 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
