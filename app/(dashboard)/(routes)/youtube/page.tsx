"use client";
import Heading from "@/components/heading";
import { ImageIcon, Play } from "lucide-react";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { formSchema3 } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { VideoDetails } from "@/types";
import Image from "next/image";
import Link from "next/link";
export default function Youtube() {
  const router = useRouter();
  const [images, setImages] = useState<VideoDetails>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema3>>({
    resolver: zodResolver(formSchema3),
    defaultValues: {
      link: "",
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

  const onSubmit = async (data: z.infer<typeof formSchema3>) => {
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        const response = await axios.post("/api/youtube", data);
        console.log(response.data);
        setImages(response.data);
        form.reset();
        success = true;
      } catch (error) {
        attempt++;
        console.log(`Attempt ${attempt} failed: ${error}`);
        if (attempt >= maxRetries) {
          console.log(
            "Max retries reached. Please check your network connection and try again."
          );
        }
      } finally {
        router.refresh();
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Heading
        title="Youtube"
        description="A model used to summarise youtube videos"
        icon={Play}
        iconColor="text-red-600"
        bgColor="bg-red-700/10"
      />
      <div className="space-y-4 px-4 m-4 flex-1 overflow-x-scroll">
        <div className="flex flex-col items-center gap-y-4">
          {images && (
            <>
              <h1 className="font-bold text-4xl">{images.title}</h1>
              <Link
                target="_blank"
                className="flex justify-center items-center hover:shadow-lg hover:scale-105 relative hover:shadow-red-500 transition-all duration-200"
                href={images?.videoURL}
              >
                <Play
                  width={100}
                  height={100}
                  color="white"
                  className="absolute border-white fill-red-500 "
                />
                <Image
                  width={700}
                  height={700}
                  src={images.thumbnailUrl}
                  objectFit="contain"
                  alt="Thumbnail"
                />
              </Link>
              <div className="flex flex-col gap-4 justify-center m-10 items-center">
                <h1 className="font-bold text-6xl">Summary</h1>
                <ReactMarkdown className="bg-gray-300 text-lg p-4">
                  {images.summary}
                </ReactMarkdown>
              </div>
              <div className="flex flex-col gap-4 justify-center m-10 items-center">
                <h1 className="font-bold text-6xl">Analysis</h1>
                <ReactMarkdown className="text-lg bg-gray-300 p-4">
                  {images.clickbait}
                </ReactMarkdown>
              </div>
            </>
          )}
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
              name="link"
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
                        placeholder="Enter the Youtube Video Link"
                        {...field}
                      />
                    </FormControl>
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
