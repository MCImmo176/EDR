"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Phone, Mail, MapPin, Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ComboboxCountry } from "@/components/ui/combobox-country";
import { countryCodes } from "@/data/country-codes";
import SnakeRectangleAnimation from "@/src/components/SnakeRectangleAnimation";
import emailjs from '@emailjs/browser';

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

// Identifiants EmailJS fournis
const EMAILJS_SERVICE_ID = "service_mv5ctkt";
const EMAILJS_TEMPLATE_ID = "template_yd3mmom";
const EMAILJS_PUBLIC_KEY = "iXQm2-_WREMX8F2dO";

export default function ContactPage() {
  const t = useTranslations('contact');
  
  // Déplacement du schéma de validation à l'intérieur du composant
  const formSchema = z.object({
    firstName: z.string().min(2, { message: t('form.errors.firstName') }),
    name: z.string().min(2, { message: t('form.errors.name') }),
    email: z.string().email({ message: t('form.errors.email') }),
    countryCode: z.string().min(2, { message: t('form.errors.countryCode') }),
    phone: z.string().min(5, { message: t('form.errors.phone') }),
    message: z.string().min(10, { message: t('form.errors.message') }),
  });
  
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialiser EmailJS
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log("EmailJS initialisé avec succès");
    } catch (error) {
      console.error("Erreur lors de l'initialisation d'EmailJS:", error);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      name: "",
      email: "",
      countryCode: countryCodes.find(c => c.code === 'FR')?.dial_code || '',
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setErrorSubmit(null);

    // Préparation des données pour EmailJS selon les variables attendues dans le template
    const templateParams = {
      nom: values.name,
      prenom: values.firstName,
      email: values.email,
      indicatif: values.countryCode,
      telephone: values.phone,
      message: values.message,
      source: "formulaire_contact"
    };

    console.log("Envoi de l'email avec les paramètres:", templateParams);
    console.log("Service ID:", EMAILJS_SERVICE_ID);
    console.log("Template ID:", EMAILJS_TEMPLATE_ID);

    // Envoyer l'email avec la méthode send
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )
    .then((response) => {
      console.log("Email envoyé avec succès:", response);
      console.log("Status:", response.status);
      console.log("Text:", response.text);
      setIsSubmitted(true);
      setIsSubmitting(false);
      form.reset();
    })
    .catch((error) => {
      console.error("Erreur détaillée lors de l'envoi de l'email:", error);
      
      // Log détaillé de l'erreur
      if (error.text) console.error("Message d'erreur:", error.text);
      if (error.status) console.error("Status de l'erreur:", error.status);
      
      setErrorSubmit("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      setIsSubmitting(false);
    });
  }

 return (
  <>
    <section className="relative h-screen w-full overflow-hidden p-0 m-0">
      {/* ... (iframe inchangé) */}
      
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="container max-w-6xl mx-auto px-2 sm:px-4 py-10 sm:py-0 h-full flex items-center overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-white space-y-8 sm:space-y-12 w-full"
          >
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display">{t('title')}</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 lg:gap-16">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#b7a66b]" />
                  <span className="text-xs sm:text-sm md:text-base text-white">{t('phone')}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#b7a66b]" />
                  <span className="text-xs sm:text-sm md:text-base text-white">{t('email')}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#b7a66b]" />
                  <span className="text-xs sm:text-sm md:text-base text-white">{t('address')}</span>
                </div>
              </div>
            </div>

            {!showForm ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <Button
                  size="lg"
                  onClick={() => setShowForm(true)}
                  className="bg-[#b7a66b] text-white hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-none text-sm sm:text-base min-w-[180px] sm:min-w-[220px] w-full sm:w-auto"
                >
                  {t('buttons.bookStay')}
                </Button>
                <Button
                  size="lg"
                  onClick={() => setShowForm(true)}
                  className="bg-transparent text-white hover:bg-white hover:text-[#b7a66b] border-2 border-white transition-all duration-500 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-none text-sm sm:text-base min-w-[180px] sm:min-w-[220px] w-full sm:w-auto"
                >
                  {t('buttons.infoRequest')}
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg max-w-2xl mx-auto mb-12 sm:mb-4"
              >
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b7a66b] mb-6">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-display mb-4">{t('form.success')}</h3>
                    <p className="text-white/80">
                      {t('form.successDetail')}
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 pb-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-left block">{t('form.firstName')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('form.firstNamePlaceholder')} className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-none" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-left block">{t('form.lastName')}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t('form.lastNamePlaceholder')} className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-none" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-left block">{t('form.email')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('form.emailPlaceholder')} className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-none" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-4 items-end">
                        <div className="w-[140px] sm:w-[180px] flex items-end">
                          <FormField
                            control={form.control}
                            name="countryCode"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="text-white text-left block">{t('form.countryCode')}</FormLabel>
                                <FormControl>
                                  <ComboboxCountry
                                    value={field.value}
                                    onChange={field.onChange}
                                    countryCodes={countryCodes}
                                    label=""
                                    className="rounded-none"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-left block">{t('form.phone')}</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder={t('form.phonePlaceholder')}
                                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-none" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-left block">{t('form.message')}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t('form.messagePlaceholder')}
                                className="resize-none min-h-[120px] bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />
                      
                      {errorSubmit && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 text-sm rounded">
                          {errorSubmit}
                        </div>
                      )}
                      
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 bg-transparent text-white hover:bg-white/20 border-2 border-white transition-all duration-500 text-sm sm:text-base rounded-none"
                          disabled={isSubmitting}
                        >
                          {t('buttons.back')}
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1 bg-[#b7a66b] text-white hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500 text-sm sm:text-base rounded-none"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              <span>{t('buttons.sending')}</span>
                            </>
                          ) : (
                            <>
                              <span className="relative z-10">{t('buttons.submit')}</span>
                              <Send className="ml-2 h-4 w-4 relative z-10" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  </>
);
}