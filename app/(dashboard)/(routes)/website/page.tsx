"use client";
import Heading from "@/components/heading";
import { CodeIcon, MessageSquare } from "lucide-react";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { formSchema } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Chat } from "@/types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Code() {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [code, setCode] = useState<string>("");
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
    if (iframeRef.current) {
      console.log(code);
      iframeRef.current.srcdoc = code;
    }
  }, [code]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Chat = {
        role: "user",
        parts: [{ text: data.prompt }],
      };
      setMessages((prev) => {
        return [...prev, userMessage];
      });
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/chat", {
        messages: newMessages,
      });
      console.log("response  = ", response.data);
      setMessages((prev) => {
        return [...prev, response.data];
      });
      setCode(response.data.parts[0].text.replace(/^```html\n|```$/g, ""));
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="flex h-full border-t-2 border-black basis-11/12">
      <iframe
        title="code"
        ref={iframeRef}
        src=""
        className="w-full h-full overflow-scroll basis-7/12"
      ></iframe>
      <div className="flex border-l-2 border-black flex-col overflow-hidden h-full basis-5/12">
        <div className="space-y-4 px-4 h-full m-4 flex overflow-x-scroll">
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
                        <ReactMarkdown
                          className={"w-full m-0 flex flex-col flex-wrap"}
                          key={partIndex}
                          components={{
                            pre: ({ node, ...props }) => (
                              <pre
                                {...props}
                                className="bg-black/10 text-black p-4 rounded-lg overflow-auto max-w-full"
                                style={{
                                  overflowWrap: "break-word",
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                }}
                              />
                            ),
                            code: ({ node, ...props }) => {
                              return (
                                <code
                                  {...props}
                                  className="font-mono bg-black/10 text-black p-1 rounded-lg overflow-auto max-w-full"
                                  style={{
                                    overflowWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                  }}
                                />
                              );
                            },
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="m-0 w-full bg-white">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-6"
            >
              <FormField
                name="prompt"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-12 lg:col-span-8">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="
                        p-1
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
                className="col-span-12 lg:col-span-4 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
