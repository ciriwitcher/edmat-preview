import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { BusinessAreas } from "@/components/sections/BusinessAreas";
import { FurnitureCategories } from "@/components/sections/FurnitureCategories";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { WhyEdmat } from "@/components/sections/WhyEdmat";
import { Process } from "@/components/sections/Process";
import { DesignFeature } from "@/components/sections/DesignFeature";
import { WindowCoveringsFeature } from "@/components/sections/WindowCoveringsFeature";
import { Materials } from "@/components/sections/Materials";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { CtaBand } from "@/components/sections/CtaBand";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Meble na wymiar i osłony okienne w Krośnie",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BusinessAreas />
      <FurnitureCategories />
      <FeaturedProjects />
      <WhyEdmat />
      <Process />
      <DesignFeature />
      <WindowCoveringsFeature />
      <Materials />
      <Testimonials />
      <FaqTeaser />
      <CtaBand />
    </>
  );
}
