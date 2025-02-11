"use client";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import Image from "next/image";

const Votes = ({
  src,
  val,
  alt,
  type,
  session,
  answerId,
}: {
  src: string;
  alt: string;
  val: number;
  type: "upVote" | "downVote";
  session: string;
  answerId: string;
}) => {
  const router = useRouter(); // ✅ Initialize router

  const handleVote = async () => {
    if (!session) {
      toast({
        title: "Action Denied",
        description: "You need to be logged in to perform this action",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await api.answers.update_vote({
        id: answerId,
        type,
        user: session,
      });

      if (res.success) {
        toast({
          title: "Success",
          description: res.message,
          variant: "success",
        });
        router.refresh(); // ✅ Revalidate the page
      } else {
        toast({
          title: "Failure",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failure",
        description: `${error instanceof Error ? error.message : ""}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-center gap-[6px] cursor-pointer" onClick={handleVote}>
      <Image src={src} alt={alt} height={15} width={15} />
      <p className="subtle-medium text-light-900 flex-center rounded-sm bg-dark-400 size-[16px]">
        {val}
      </p>
    </div>
  );
};

export default Votes;
