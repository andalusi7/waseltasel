"use client";
import { useLocale } from "next-intl";
import { useStrapiData } from "@/hooks/useStrapiData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BannerProps {
  bannerId: string;
  align?: "left" | "center" | "right";
}

interface Banner {
  id: number;
  documentId: string;
  text: string;
  buttonText: string;
  url: string;
  image: {
    url: string;
  };
}

export default function Banner({ bannerId, align = "right" }: BannerProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const router = useRouter();

  const {
    data: banner,
    loading,
    error,
  } = useStrapiData<Banner>(
    "banners",
    locale,
    `filters[documentId][$eq]=${bannerId}&populate=*`
  );

  if (loading) return null;
  if (error) return null;
  if (!banner || banner.length === 0) return <p className="py-10 px-2 container mx-auto flex justify-center text-muted-foreground">No banner found</p>;

  const alignmentClasses = {
    left: isRtl ? "justify-end" : "justify-start",
    center: "justify-center",
    right: isRtl ? "justify-start" : "justify-end",
  };

  return (
    <div className="py-10 px-2 container mx-auto">
      <div
        className="relative bg-no-repeat bg-cover rounded-xl h-96"
        style={{ backgroundImage: `url('${banner[0].image?.url}')` }}
      >
        <div
          className={`flex h-full items-center mx-6 ${alignmentClasses[align]}`}
        >
          <div
            className={`rounded-xl bg-[#D8D8D899] backdrop-blur-xl w-11/12 sm:w-8/12 lg:w-5/12`}
          >
            <div
              className={cn(
                "flex flex-col space-y-10 py-6",
                isRtl ? "pr-8" : "pl-8"
              )}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white w-11/12 sm:w-10/12">
                {banner[0].text}
              </h2>

              <Button
                onClick={() => router.push(banner[0].url)}
                variant="filled"
                className="text-xs py-4 px-12 rounded-lg font-bold w-fit"
              >
                {banner[0].buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
