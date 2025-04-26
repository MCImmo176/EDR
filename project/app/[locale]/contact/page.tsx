"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { countryCodes } from '@/data/country-codes';
import { ComboboxCountry } from '@/components/ui/combobox-country';

import { SectionTitle } from "@/components/ui/section-title";
import { Map } from "@/components/ui/map";
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

// Fonction utilitaire pour générer l'emoji drapeau à partir du code ISO (2 lettres uniquement)
function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return '';
  return String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0))
  );
}

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: t('info.email'),
      details: "contact@villa-azur.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('info.phone'),
      details: "+33 4 93 XX XX XX",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('info.address'),
      details: "Roquebrune Cap Martin, France",
    },
  ];
  
  const mapCenter = {
    lat: 43.756,
    lng: 7.452,
  };

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
              title={t('title')}
              subtitle={t('subtitle')}
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
          >
            <div className="content-grid">
              <div className="col-span-1 md:col-span-5">
                <h2 className="text-2xl mb-8">{t('form.title')}</h2>
                
                {isSubmitted ? (
                  <div className="bg-muted p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-4">{t('form.success')}</h3>
                    <p className="text-muted-foreground">
                      {t('form.successDetail')}
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.name')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('form.name')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('form.email')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('form.email')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem className="w-32">
                              <ComboboxCountry
                                value={field.value}
                                onChange={field.onChange}
                                label="Indicatif"
                                countryCodes={countryCodes}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>{t('form.phone')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('form.phone')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.message')}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t('form.message')} 
                                className="resize-none min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full md:w-auto">
                        {t('form.submit')}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
              
              <div className="col-span-1 md:col-span-6 md:col-start-7">
                <h2 className="text-2xl mb-8">{t('info.title')}</h2>
                
                <div className="space-y-8 mb-10">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mr-6">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Map center={mapCenter} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}