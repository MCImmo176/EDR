"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=UBBkPrnRtcE"
              playing
              loop
              muted
              width="100%"
              height="100%"
              className="react-player"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              config={{
                youtube: {
                  playerVars: {
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    playsinline: 1,
                    origin: window.location.origin,
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="w-full h-full flex items-center">
            <SnakeRectangleAnimation 
              textLine1="Votre villa"
              textLine2="vous attend"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-4xl font-display mb-6">Échangeons ensemble</h2>
              <div className="prose prose-lg">
                <p className="text-xl text-muted-foreground mb-4">
                  Merci d'avoir visité notre site web !
                </p>
                <p className="text-lg text-muted-foreground">
                  Nous serions ravis d'échanger avec vous. Que vous ayez des questions, 
                  des retours à partager ou que vous souhaitiez en savoir plus sur nos villas, 
                  n'hésitez pas à nous contacter.
                </p>
                <p className="text-lg text-muted-foreground mt-4">
                  Nos conseillers vous répondront dans les plus brefs délais.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-muted/30 p-8 rounded-xl shadow-sm"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display mb-4">{t('form.success')}</h3>
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
                          <FormLabel>Nom & Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom complet" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre adresse email" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-4 items-end">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="flex-[0_0_180px]">
                            <FormLabel>Indicatif</FormLabel>
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
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre numéro de téléphone" className="bg-background" {...field} />
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Votre message" 
                              className="resize-none min-h-[150px] bg-background"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="relative bg-transparent border-2 border-black text-black overflow-hidden group hover:text-white transition-all duration-500 text-lg px-12 py-6 rounded-none w-full">
                      Envoyer le message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .react-player {
          aspect-ratio: 16/9;
          transform: translate(-50%, -50%) scale(1.5) !important;
        }
      `}</style>
    </>
  );
}