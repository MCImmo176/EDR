"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Send, Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { ComboboxCountry } from '@/components/ui/combobox-country';
import { countryCodes } from '@/data/country-codes';
import ReactPlayer from 'react-player';
import SnakeRectangleAnimation from '../../../src/components/SnakeRectangleAnimation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide" }),
  countryCode: z.string().min(2, { message: "Veuillez sélectionner un indicatif" }),
  phone: z.string().min(5, { message: "Veuillez entrer un numéro de téléphone valide" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  
  const handleResize = () => {
    if (videoRef.current instanceof HTMLDivElement) {
      const videoContainer = videoRef.current;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      const videoRatio = 16 / 9;
  
      if (windowRatio < videoRatio) {
        const newWidth = windowHeight * videoRatio;
        videoContainer.style.width = `${newWidth}px`;
        videoContainer.style.height = '100%';
        videoContainer.style.left = `${(windowWidth - newWidth) / 2}px`;
        videoContainer.style.top = '0';
      } else {
        const newHeight = windowWidth / videoRatio;
        videoContainer.style.width = '100%';
        videoContainer.style.height = `${newHeight}px`;
        videoContainer.style.left = '0';
        videoContainer.style.top = `${(windowHeight - newHeight) / 2}px`;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: countryCodes.find(c => c.code === 'FR')?.dial_code || '',
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  }

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden p-0 m-0">
        <div 
          ref={videoRef}
          className="absolute inset-0 w-full h-full"
          style={{
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/hoGfA3DP2PQ?autoplay=1&mute=1&loop=1&playlist=hoGfA3DP2PQ&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
            title="Vidéo contact villa"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'none',
            }}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center bg-transparent">
          <div className="w-full h-full flex items-center">
            <SnakeRectangleAnimation 
              textKey="contact"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32 px-4 md:px-8"
            >
              <h2 className="text-3xl sm:text-4xl font-display mb-4 sm:mb-6">{t('yourVilla.subtitle')}</h2>
              <div className="prose prose-lg">
                <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                  {t('yourVilla.description')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-muted/30 p-6 sm:p-8 rounded-xl shadow-sm"
            >
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#b7a66b] mb-4 sm:mb-6">
                    <Check className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display mb-3 sm:mb-4">{t('form.success')}</h3>
                  <p className="text-muted-foreground">
                    {t('form.successDetail')}
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-3 sm:space-y-4">
                          <FormLabel>{t('yourVilla.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('yourVilla.form.namePlaceholder')} className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-3 sm:space-y-4">
                          <FormLabel>{t('yourVilla.form.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('yourVilla.form.emailPlaceholder')} className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="w-full sm:w-[180px]">
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormControl>
                                <ComboboxCountry
                                  value={field.value}
                                  onChange={field.onChange}
                                  countryCodes={countryCodes}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <div className="h-[20px] flex items-center mb-1">
                                <FormLabel className="text-sm font-medium leading-none">{t('yourVilla.form.phone')}</FormLabel>
                              </div>
                              <FormControl>
                                <Input 
                                  placeholder={t('yourVilla.form.phonePlaceholder')}
                                  className="bg-background h-[40px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-3 sm:space-y-4">
                          <FormLabel>{t('yourVilla.form.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('yourVilla.form.messagePlaceholder')}
                              className="resize-none min-h-[150px] bg-background"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="relative bg-[#b7a66b] text-white overflow-hidden group hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-none w-full"
                    >
                      <span className="relative z-10">{t('yourVilla.form.submit')}</span>
                      <Send className="ml-2 h-4 w-4 relative z-10" />
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}