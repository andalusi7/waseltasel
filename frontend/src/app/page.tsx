"use client";
import Intro from "@/components/(Home-page)/intro";
import Metrics from "@/components/(Home-page)/metrics";
import Partners from "@/components/partners";
import Priorities from "@/components/priorities";
import Projects from "@/components/(Home-page)/projects";
import Publications from "@/components/(Home-page)/publications";
import Banner from "@/components/banner";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <Intro />
      <Priorities more />
      <Separator />
      <Metrics />
      <Separator />
      <Banner bannerId="i39817wmi3vutg1kuefd19e9" />
      <Separator />
      <Publications />
      <Separator />
      <Banner bannerId="ns6m91jr1g9291mqpd442oro" align="left" />
      <Separator />
      <Projects />
      <Separator />
      <Partners />
      <Banner bannerId="fgkabbn19fbnaz9ohtp1qxzw" />
    </>
  );
}
