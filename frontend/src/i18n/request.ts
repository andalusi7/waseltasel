import { Locale } from "@/utils/consts";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = (await cookieStore).get("NEXT_LOCALE")?.value || Locale.AR;

  return {
    locale,
    messages: (await import(`./content/${locale}.json`)).default,
  };
});
