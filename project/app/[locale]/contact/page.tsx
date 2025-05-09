"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ComboboxCountry } from "@/components/ui/combobox-country";
import { countryCodes } from "@/data/country-codes";
import SnakeRectangleAnimation from "@/src/components/SnakeRectangleAnimation";

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
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide" }),
  countryCode: z.string().min(2, { message: "Veuillez sélectionner un indicatif" }),
  phone: z.string().min(5, { message: "Veuillez entrer un numéro de téléphone valide" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    console.log(values);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  }

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden p-0 m-0">
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/hoGfA3DP2PQ?autoplay=1&mute=1&loop=1&playlist=hoGfA3DP2PQ&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0"
            title="Vidéo contact villa"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute w-full h-full object-cover"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%) scale(1.5)',
              transformOrigin: 'center center'
            }}
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
        
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center text-white space-y-12"
            >
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-display">Les Étoiles du Rocher</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-[#b7a66b]" />
                    <span>+33 6 XX XX XX XX</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-[#b7a66b]" />
                    <span>contact@lesetoilesdurocher.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#b7a66b]" />
                    <span>Roquebrune-Cap-Martin, France</span>
                  </div>
                </div>
              </div>

              {!showForm ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <Button
                    size="lg"
                    onClick={() => setShowForm(true)}
                    className="bg-[#b7a66b] text-white hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500 px-8 py-6 rounded-none min-w-[250px]"
                  >
                    Réservez votre séjour
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowForm(true)}
                    className="bg-transparent text-white hover:bg-white hover:text-[#b7a66b] border-2 border-white transition-all duration-500 px-8 py-6 rounded-none min-w-[250px]"
                  >
                    Demande d'informations
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-lg max-w-2xl mx-auto"
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
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white text-left block">Nom</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Votre nom" className="bg-white/20 border-white/20 text-white placeholder:text-white/50" {...field} />
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
                                  <FormLabel className="text-white text-left block">Prénom</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Votre prénom" className="bg-white/20 border-white/20 text-white placeholder:text-white/50" {...field} />
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
                              <FormLabel className="text-white text-left block">{t('yourVilla.form.email')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('yourVilla.form.emailPlaceholder')} className="bg-white/20 border-white/20 text-white placeholder:text-white/50" {...field} />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4 items-end">
                          <div className="w-[180px] flex items-end">
                            <FormField
                              control={form.control}
                              name="countryCode"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormControl>
                                    <ComboboxCountry
                                      value={field.value}
                                      onChange={field.onChange}
                                      countryCodes={countryCodes}
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
                                  <FormLabel className="text-white text-left block">Téléphone</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Votre numéro de téléphone"
                                      className="bg-white/20 border-white/20 text-white placeholder:text-white/50" 
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
                              <FormLabel className="text-white text-left block">{t('yourVilla.form.message')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={t('yourVilla.form.messagePlaceholder')}
                                  className="resize-none min-h-[150px] bg-white/20 border-white/20 text-white placeholder:text-white/50"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 bg-transparent text-white hover:bg-white/20 border-2 border-white transition-all duration-500"
                          >
                            Retour
                          </Button>
                          <Button 
                            type="submit" 
                            className="flex-1 bg-[#b7a66b] text-white hover:bg-white hover:text-[#b7a66b] border-2 border-[#b7a66b] transition-all duration-500"
                          >
                            <span className="relative z-10">{t('yourVilla.form.submit')}</span>
                            <Send className="ml-2 h-4 w-4 relative z-10" />
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