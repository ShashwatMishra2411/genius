"use client";
import Heading from "@/components/heading";
import { ImageIcon } from "lucide-react";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { formSchema2 } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ImageChat } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
export default function ImageGeneration() {
  const router = useRouter();
  const [images, setImages] = useState<ImageChat[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
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
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema2>) => {
    try {
      const response = await axios.post("/api/image", data);
      console.log(response.data);
      setImages((prev) => {
        return [...prev, response.data];
      });
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Heading
        title="Image Generation"
        description="Our most advanced image generation model."
        icon={ImageIcon}
        iconColor="text-red-700"
        bgColor="bg-red-700/10"
      />
      <div className="space-y-4 px-4 m-4 flex-1 overflow-x-scroll">
        <div className="flex flex-col gap-y-4">
          {images.map((image, index) => {
            return (
              <Image
                src={image?.imageUrl}
                alt={"Generated Image"}
                key={index}
                width={512}
                height={512}
              />
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
                  <FormItem className="col-span-6 lg:col-span-7">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                        p-1
                        border-0 
                        outline-none
                        focus-visible:ring-0
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Generate an image for me"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {/* <FormField
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="number"
                        className="
                        p-1
                        border-0 
                        outline-none
                        focus-visible:ring-0
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How many images do you want to generate?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            /> */}
            <FormField
              name="resolution"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4 lg:col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="256x256">256x256</SelectItem>
                        <SelectItem value="512x512">512x512</SelectItem>
                        <SelectItem value="1024x1024">1024x1024</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />
            <Button
              className="col-span-12 justify-center self-center lg:col-span-2 w-full"
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
