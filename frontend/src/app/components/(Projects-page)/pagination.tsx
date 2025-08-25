import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Locale } from "@/utils/consts";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useLocale } from "next-intl";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const locale = useLocale();
  const isRtl = locale === Locale.AR;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 mt-12",
        isRtl && "flex-row-reverse"
      )}
    >
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        variant="link"
        className="p-2 hover:bg-gray-100 rounded-full text-[#FF6600] disabled:text-[#FF6600]/70"
      >
        <ArrowLeftIcon className="w-5 h-5 " />
      </Button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={cn(
            "w-10 h-14 rounded-xl border flex items-center justify-center text-gray-400",
            currentPage === i + 1
              ? "text-[#FF6600] border-[#FF6600]"
              : "hover:bg-gray-100"
          )}
        >
          {i + 1}
        </button>
      ))}

      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        variant="link"
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ArrowRightIcon className="w-5 h-5 text-[#FF6600]" />
      </Button>
    </div>
  );
}
