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

// Création d'un schéma sans messages qui seront ajoutés dynamiquement
const createFormSchema = (t: any) => z.object({
  firstName: z.string().min(2, { message: t('form.errors.firstName') }),
  name: z.string().min(2, { message: t('form.errors.name') }),
  email: z.string().email({ message: t('form.errors.email') }),
  countryCode: z.string().min(2, { message: t('form.errors.countryCode') }),
  phone: z.string().min(5, { message: t('form.errors.phone') }),
  message: z.string().min(10, { message: t('form.errors.message') }),
});

// Identifiants EmailJS fournis
const EMAILJS_SERVICE_ID = "service_mv5ctkt";
const EMAILJS_TEMPLATE_ID = "template_yd3mmom";
const EMAILJS_PUBLIC_KEY = "iXQm2-_WREMX8F2dO";

export default function ContactPage() {
  const t = useTranslations('contact');
  
  // Utilisation du schéma avec la fonction t
  const formSchema = createFormSchema(t);
  
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

  // Forcer l'affichage de l'interface même si la vidéo ne se charge pas
  useEffect(() => {
    // Après 2 secondes, on force l'affichage de l'interface
    const timer = setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
        console.log("Affichage forcé de l'interface après délai");
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isVideoLoaded]);

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
      <div className="absolute inset-0 w-full h-full">
        <div className="relative h-full w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/hoGfA3DP2PQ?autoplay=1&mute=1&loop=1&playlist=hoGfA3DP2PQ&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
            title={t('discover.videoTitle')}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              transform: 'scale(1.2)',
              transformOrigin: 'center center'
            }}
            onLoad={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(true)}
          />
        </div>
      </div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full h-full flex flex-col justify-center items-start">
          <div className="pl-[15%] md:pl-[10%] w-full max-w-[80%] md:max-w-[60%]">
            <div className="mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-white text-6xl md:text-7xl font-light tracking-wider"
              >
                {t('title')}<br />
                <span className="font-extralight tracking-wide">{t('subtitle')}</span>
              </motion.h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-[1px] bg-gradient-to-r from-[#BC9A6B] to-[#BC9A6B]/30 mt-8"
              ></motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-6 max-w-xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-start gap-6 md:gap-8 lg:gap-16">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-[#b7a66b]" />
                  <span className="text-base text-white">{t('phone')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#b7a66b]" />
                  <span className="text-base text-white">{t('email')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#b7a66b]" />
                  <span className="text-base text-white">{t('address')}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mt-12"
            >
              {!showForm ? (
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setShowForm(true)}
                    className="bg-[#b7a66b] text-white hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500 px-8 py-5 rounded-lg text-base"
                  >
                    {t('buttons.bookStay')}
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowForm(true)}
                    className="bg-transparent text-white hover:bg-white hover:text-[#b7a66b] border-2 border-white transition-all duration-500 px-8 py-5 rounded-lg text-base"
                  >
                    {t('buttons.infoRequest')}
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-md p-6 lg:p-8 rounded-lg w-full max-w-2xl"
                >
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b7a66b] mb-6">
                        <Check className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-display mb-4 text-white">{t('form.success')}</h3>
                      <p className="text-white/80">
                        {t('form.successDetail')}
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white text-left block">{t('form.firstName')}</FormLabel>
                                  <FormControl>
                                    <Input placeholder={t('form.firstNamePlaceholder')} className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-lg" {...field} />
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
                                    <Input placeholder={t('form.lastNamePlaceholder')} className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-lg" {...field} />
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
                                <Input placeholder={t('form.emailPlaceholder')} className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-lg" {...field} />
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
                                      className="rounded-lg"
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
                                      className="bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-lg" 
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
                                  className="resize-none min-h-[120px] bg-white/20 border-white/20 text-white placeholder:text-white/50 rounded-lg"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        
                        {errorSubmit && (
                          <div className="bg-red-50 border border-red-200 text-red-600 p-3 text-sm rounded-lg">
                            {errorSubmit}
                          </div>
                        )}
                        
                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 bg-transparent text-white hover:bg-white/20 border-2 border-white transition-all duration-500 text-base rounded-lg"
                            disabled={isSubmitting}
                          >
                            {t('buttons.back')}
                          </Button>
                          <Button 
                            type="submit" 
                            className="flex-1 bg-[#b7a66b] text-white hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500 text-base rounded-lg"
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
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2 font-light">{t('scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-1"
          >
            <motion.div className="w-1 h-1 bg-white/80 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  </>
);
}