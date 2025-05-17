"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Send, X, Loader2 } from "lucide-react";
import { ComboboxCountry } from "@/components/ui/combobox-country";
import { countryCodes } from "@/data/country-codes";
import { useContactForm } from "./providers/contact-form-provider";
import emailjs from '@emailjs/browser';

// Identifiants EmailJS fournis
const EMAILJS_SERVICE_ID = "service_mv5ctkt";
const EMAILJS_TEMPLATE_ID = "template_yd3mmom";
const EMAILJS_PUBLIC_KEY = "iXQm2-_WREMX8F2dO";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide" }),
  countryCode: z.string().min(2, { message: "Veuillez sélectionner un indicatif" }),
  phone: z.string().min(5, { message: "Veuillez entrer un numéro de téléphone valide" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

export function ContactForm() {
  const t = useTranslations('contact');
  const { isOpen, closeForm } = useContactForm();
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
      source: "formulaire_visite"
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-xl bg-white rounded-none shadow-xl overflow-hidden my-4"
          >
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b7a66b] mb-6">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display mb-4">{t('form.success')}</h3>
                  <p className="text-gray-600">
                    {t('form.successDetail')}
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('form.firstName')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('form.firstName')} className="rounded-none" {...field} />
                              </FormControl>
                              <FormMessage />
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
                              <FormLabel>{t('form.lastName')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('form.lastName')} className="rounded-none" {...field} />
                              </FormControl>
                              <FormMessage />
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
                          <FormLabel>{t('form.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.emailPlaceholder')} className="rounded-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="w-full sm:w-[180px]">
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Indicatif</FormLabel>
                              <FormControl>
                                <ComboboxCountry
                                  value={field.value}
                                  onChange={field.onChange}
                                  countryCodes={countryCodes}
                                  label=""
                                  className="rounded-none"
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
                            <FormItem>
                              <FormLabel>{t('form.phone')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t('form.phonePlaceholder')}
                                  className="rounded-none"
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
                        <FormItem>
                          <FormLabel>{t('form.message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('form.messagePlaceholder')}
                              className="resize-none min-h-[120px] rounded-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <input type="hidden" name="source" value="formulaire_visite" />
                    
                    {errorSubmit && (
                      <div className="bg-red-50 border border-red-200 text-red-600 p-3 text-sm rounded">
                        {errorSubmit}
                      </div>
                    )}
                    
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={closeForm}
                        className="flex-1 bg-transparent text-gray-700 hover:bg-gray-100 border-2 border-gray-200 transition-all duration-500 rounded-none"
                        disabled={isSubmitting}
                      >
                        {t('buttons.back')}
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-[#b7a66b] text-white hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500 rounded-none"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">{t('form.submit')}</span>
                            <Send className="ml-2 h-4 w-4 relative z-10" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 