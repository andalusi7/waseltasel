"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/utils/consts";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = async () => {
    const newLocale = locale === Locale.EN ? Locale.AR : Locale.EN;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    router.refresh();
  };

  return (
    <>
      <Button
        onClick={switchLocale}
        variant="outline"
        className="text-xs py-2 px-4 xl:px-8 rounded-lg font-bold"
      >
        {locale === "en" ? "العربية" : "English"}
      </Button>
    </>
  );
}
