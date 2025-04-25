"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DecouvrirPage() {
  const t = useTranslations("discover");

  const activities = [
    {
      title: t("activities.monaco.title"),
      description: t("activities.monaco.description"),
      image: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg",
      distance: t("activities.monaco.distance"),
      link: "https://www.visitmonaco.com"
    },
    {
      title: t("activities.nice.title"),
      description: t("activities.nice.description"),
      image: "https://images.pexels.com/photos/4179480/pexels-photo-4179480.jpeg",
      distance: t("activities.nice.distance"),
      link: "https://www.nicetourisme.com"
    },
    {
      title: t("activities.eze.title"),
      description: t("activities.eze.description"),
      image: "https://images.pexels.com/photos/5759959/pexels-photo-5759959.jpeg",
      distance: t("activities.eze.distance"),
      link: "https://www.eze-tourisme.com"
    },
    {
      title: t("activities.saintPaul.title"),
      description: t("activities.saintPaul.description"),
      image: "https://images.pexels.com/photos/5759949/pexels-photo-5759949.jpeg",
      distance: t("activities.saintPaul.distance"),
      link: "https://www.saint-pauldevence.com"
    },
    {
      title: t("activities.menton.title"),
      description: t("activities.menton.description"),
      image: "https://images.pexels.com/photos/5490356/pexels-photo-5490356.jpeg",
      distance: t("activities.menton.distance"),
      link: "https://www.menton-riviera-merveilles.fr"
    },
    {
      title: t("activities.antibes.title"),
      description: t("activities.antibes.description"),
      image: "https://images.pexels.com/photos/4179489/pexels-photo-4179489.jpeg",
      distance: t("activities.antibes.distance"),
      link: "https://www.antibes-juanlespins.com"
    }
  ];

  const experiences = [
    {
      title: t("experiences.categories.nautical.title"),
      items: t.raw("experiences.categories.nautical.items")
    },
    {
      title: t("experiences.categories.culture.title"),
      items: t.raw("experiences.categories.culture.items")
    },
    {
      title: t("experiences.categories.gastronomy.title"),
      items: t.raw("experiences.categories.gastronomy.items")
    },
    {
      title: t("experiences.categories.nature.title"),
      items: t.raw("experiences.categories.nature.items")
    }
  ];

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title={t("title")}
              subtitle={t("subtitle")}
              centered
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activities.map((activity, index) => (
              <div 
                key={index}
                className="group bg-background border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {activity.distance}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground mb-4">{activity.description}</p>
                  <Button asChild variant="minimal" className="group/button">
                    <Link href={activity.link} target="_blank">
                      {t("readMore")}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionTitle
              title={t("experiences.title")}
              subtitle={t("experiences.subtitle")}
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {experiences.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-6 rounded-lg"
                >
                  <h3 className="text-xl mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="flex items-center text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}