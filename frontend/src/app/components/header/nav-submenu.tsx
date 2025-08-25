import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export const menuData = [
  {
    id: "1",
    title: "NavMain.AboutUs",
    links: [
      { label: "NavMain.AboutFoundation", href: "/about" },
      { label: "NavMain.OurVision", href: "/about#vision" },
      { label: "NavMain.ContactUs", href: "/contact" },
    ],
  },
  {
    id: "2",
    title: "NavMain.Activities",
    links: [
      { label: "NavMain.Empowerment", href: "/projects" },
      { label: "NavMain.HumanitarianRelief", href: "/projects" },
      { label: "NavMain.CounteringExtremism", href: "/projects" },
      { label: "NavMain.EnvironmentalProtection", href: "/projects" },
    ],
  },
  {
    id: "3",
    title: "NavMain.Publications",
    links: [
      { label: "NavMain.Reports", href: "/publications" },
      { label: "NavMain.ResearchStudies", href: "/publications" },
      { label: "NavMain.Publications", href: "/publications" },
      { label: "NavMain.Books", href: "/publications" },
    ],
  },
  {
    id: "4",
    title: "NavMain.Jobs",
    links: [
      { label: "NavMain.JobsTraining", href: "/jobs" },
      { label: "NavMain.AdvertiseWithUs", href: "/contact" },
    ],
  },
];

export default function NavSubmenu({
  className,
  hoveredItem,
  onHover,
}: {
  className?: string;
  hoveredItem: string | null;
  onHover: (item: string | null) => void;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const submenuData = menuData.find((item) => item.id === hoveredItem);

  if (!submenuData) return null;

  return (
    <div
      className={cn(
        "text-white bg-white/70 backdrop-blur-xl rounded-xl rounded-t-none pt-10 pb-10 px-4 md:pb-14 md:px-14",
        className
      )}
    >
      <ul
        className={cn("flex flex-col space-y-6 md:space-y-0 md:flex-row")}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {menuData.map((item, index) => (
          <li
            onMouseEnter={() => onHover(item.id)}
            key={item.id}
            className={cn(
              "group relative flex flex-col",
              locale === "ar"
                ? index === 0
                  ? "md:pl-10"
                  : "md:px-10 md:border-r md:border-[#9D9D9D]"
                : index === 0
                ? "md:pr-10"
                : "md:px-10 md:border-l md:border-[#9D9D9D]",
              item.id === hoveredItem ? "text-gray-600" : "text-[#9D9D9D]"
            )}
          >
            <p className="text-xs font-normal transition">{t(item.title)}</p>
            <ul className="space-y-1 font-bold transition mt-2">
              {item.links.map((link, linkIndex) => (
                <li onClick={() => onHover(null)} key={linkIndex}>
                  <Link href={link.href} className="lg:text-2xl transition">
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
