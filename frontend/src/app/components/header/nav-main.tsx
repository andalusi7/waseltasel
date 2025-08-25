"use client";
import { menuData } from "@/components/header/nav-submenu";
import { cn } from "@/lib/utils";
import { MinusIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function NavMain({
  onHover,
  hoveredItem,
}: {
  onHover: (item: string | null) => void;
  hoveredItem: string | null;
}) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className="h-full">
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="flex flex-col lg:flex-row h-full cursor-pointer"
      >
        {menuData.map((item) => (
          <div
            key={item.title}
            onMouseEnter={() => onHover(item.id)}
            className="h-full relative"
          >
            <div
              className={cn(
                "h-full flex items-center font-bold text-xs px-3 gap-2 py-0 text-[#898989] hover:bg-transparent hover:opacity-55 focus:bg-transparent group",
                item.id === hoveredItem && "opacity-55"
              )}
            >
              <div className="flex relative top-[6px]">
                <div
                  className={cn(
                    "relative flex flex-col items-center",
                    locale === "ar" ? "ml-1" : "mr-1"
                  )}
                >
                  <MinusIcon
                    className="h-3 w-3 transition transform"
                    aria-hidden="true"
                  />
                  <MinusIcon
                    className={cn(
                      "h-3 w-3 relative -top-[12px] transition transform rotate-90 group-hover:rotate-180",
                      item.id === hoveredItem && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </div>
                {t(item.title)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
