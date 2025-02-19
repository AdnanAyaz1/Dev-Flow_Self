"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/lib/zod-validation-schemas";
import { z } from "zod";
import { Input } from "../ui/input";
import { Path, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";
import { UserType } from "@/types/types";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { UploadCloudIcon } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const EditUser = ({ user }: { user: UserType }) => {
  const router = useRouter();

  const defaultValues = {
    image: user.image || "",
    name: user.name || "",
    portfolio: user.portfolio || "",
    location: user.location || "",
    bio: user.bio || "",
    // New field for image URL
  };

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image || null
  );

  const handleEdit = async (data: z.infer<typeof editUserSchema>) => {
    setLoading(true);
    try {
      const res = await api.users.update_user({ ...data, _id: user._id });

      if (res.success) {
        toast({
          title: "User Updated",
          description: res.message,
          variant: "success",
        });
        router.push(`/user/${user._id}`);
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEdit)}>
        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              alt="Profile Preview"
              width={100}
              height={100}
              className="rounded-full object-cover w-[100px] h-[100px]"
            />
          </div>
        )}

        {Object.keys(defaultValues).map((val, i) => {
          return (
            <FormField
              key={i}
              control={form.control}
              name={val as Path<z.infer<typeof editUserSchema>>}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2.5 mt-6">
                  <FormLabel>
                    {val == "image" ? "Profile Image" : val.toUpperCase()}
                    <span className="text-primary-500"> *</span>
                  </FormLabel>
                  <FormControl>
                    {val == "bio" ? (
                      <Textarea
                        {...field}
                        className="paragraph-regular bg-light-800 dark:bg-dark-300 light-border-2 text-dark-300 dark:text-light-700 no-focus min-h-12 rounded-1.5 border"
                      />
                    ) : val == "image" ? (
                      <CldUploadWidget
                        uploadPreset="DevFlow"
                        onSuccessAction={(results) => {
                          if (results.event == "success") {
                            setImagePreview(results?.info?.secure_url);
                            form.setValue("image", results?.info?.secure_url);
                          }
                        }}
                      >
                        {({ open }) => {
                          return (
                            <div
                              onClick={() => open()}
                              className="bg-dark-400 cursor-pointer h-[50px] px-4 w-fit rounded-xl flex-center gap-2"
                            >
                              <UploadCloudIcon className="w-8 h-5 text-light-500" />
                              <span className="primary-text-gradient">
                                Upload Image
                              </span>
                            </div>
                          );
                        }}
                      </CldUploadWidget>
                    ) : (
                      <Input
                        required
                        type={val == "portfolio" ? "url" : "text"}
                        {...field}
                        className={`paragraph-regular bg-light-800 ${
                          val == "portfolio"
                            ? "text-blue-500 "
                            : "text-dark-300 dark:text-light-700"
                        } dark:bg-dark-300 light-border-2  no-focus min-h-12 rounded-1.5 border`}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {/* Image Upload Field */}

        {/* Submit Button */}
        <Button
          variant={"ghost"}
          className="primary-gradient h-[45px] paragraph-semibold text-white hover:text-white active:scale-95 duration-150 transition-all ease-in-out w-[150px] mt-6"
          disabled={loading}
        >
          {loading ? (
            <ReloadIcon className="mr-2 size-4 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditUser;
