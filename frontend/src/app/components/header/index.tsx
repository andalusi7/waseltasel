"use client";
import { useState } from "react";
import { NavMain } from "@/components/header/nav-main";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LocaleSwitcher from "@/components/locale-switcher";
import Link from "next/link";
import NavSubmenu from "@/components/header/nav-submenu";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/utils/consts";
import { useRouter } from "next/navigation";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();

  const isRtl = locale === Locale.AR;

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      onMouseLeave={() => {
        return setHoveredItem(null), setMobileMenuOpen(false);
      }}
      className="absolute top-3 left-0 right-0 z-50 w-full mb-10 container mx-auto px-2"
    >
      {/* Main header */}
      <div
        className={cn(
          "flex items-center justify-between bg-background h-20 px-4 xl:px-14",
          hoveredItem ? "rounded-t-xl" : "rounded-xl",
          isMobileMenuOpen && "rounded-b-none"
        )}
      >
        <Link
          href={"/"}
          onMouseEnter={() => {
            return setHoveredItem(null), setMobileMenuOpen(false);
          }}
        >
          <Image
            src={
              isRtl ? "/logo_text_orange_ar.svg" : "/logo_text_orange_en.svg"
            }
            alt="Logo"
            width={244}
            height={51}
          />
        </Link>

        {/* Mobile Hamburger Menu (Visible on lg and larger) */}
        <div className="flex lg:hidden order-3">
          <button
            onClick={() => {
              return (
                setMobileMenuOpen(!isMobileMenuOpen),
                setHoveredItem(!isMobileMenuOpen ? "1" : null)
              );
            }}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Main navigation for larger screens */}
        <div className="hidden lg:flex h-full">
          <NavMain hoveredItem={hoveredItem} onHover={setHoveredItem} />
        </div>

        {/* Buttons (Always Visible) */}
        <div
          className="items-center gap-3 hidden md:flex"
          onMouseEnter={() => {
            return setHoveredItem(null), setMobileMenuOpen(false);
          }}
        >
          <Button
            onClick={() => router.push("/contact")}
            variant={"filled"}
            className="text-xs py-2 px-8 xl:px-12 rounded-lg font-bold"
          >
            {t("DonateNow")}
          </Button>
          <Button
            onClick={() => router.push("/contact")}
            variant="outline"
            className="text-xs py-2 px-4 xl:px-8 rounded-lg font-bold"
          >
            {t("ContactUs")}
          </Button>
          <LocaleSwitcher />
        </div>
      </div>

      {/* Mobile Menu (Only NavMain, Visible on lg and smaller screens) */}
      {isMobileMenuOpen ? (
        <>
          <div className="flex flex-col space-y-5 lg:hidden bg-white p-4">
            <div className="flex flex-row gap-3 mt-4">
              <Button
                onClick={() => router.push("/contact")}
                variant={"filled"}
                className="text-xs py-2 px-4 rounded-lg font-bold"
              >
                {t("DonateNow")}
              </Button>
              <Button
                onClick={() => router.push("/contact")}
                variant="outline"
                className="text-xs py-2 px-4 rounded-lg font-bold"
              >
                {t("ContactUs")}
              </Button>
              <LocaleSwitcher />
            </div>
          </div>

          <NavSubmenu
            hoveredItem={hoveredItem}
            onHover={setHoveredItem}
            className={cn("visible opacity-1 duration-200")}
          />
        </>
      ) : (
        <div
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <NavSubmenu
            hoveredItem={hoveredItem}
            onHover={setHoveredItem}
            className={cn(
              hoveredItem
                ? "visible opacity-1 duration-200"
                : "invisible opacity-0"
            )}
          />
        </div>
      )}
    </header>
  );
}