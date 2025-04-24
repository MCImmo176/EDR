"use client";

import { SectionTitle } from "@/components/ui/section-title";

export default function TermsPage() {
  return (
    <div className="container py-24 md:py-32">
      <SectionTitle
        title="Conditions Générales d'Utilisation"
        centered
      />
      
      <div className="max-w-3xl mx-auto mt-16 space-y-8">
        <div>
          <h2 className="text-2xl mb-4">1. Acceptation des conditions</h2>
          <p className="text-muted-foreground">
            L'utilisation du site web Villa Azur implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">2. Informations</h2>
          <p className="text-muted-foreground">
            Les informations présentées sur ce site sont non contractuelles et sont sujettes à modification sans préavis. Malgré tous les soins apportés à la qualité de son contenu, Villa Azur ne pourra être tenue pour responsable des erreurs ou omissions, ni des conséquences de l'utilisation des informations contenues dans ce site.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">3. Services et disponibilité</h2>
          <p className="text-muted-foreground">
            Les services et équipements présentés sur le site sont sujets à disponibilité. Les tarifs indiqués peuvent varier en fonction de la saison et de la durée du séjour. La réservation est confirmée uniquement après validation par notre équipe et paiement de l'acompte.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">4. Propriété intellectuelle</h2>
          <p className="text-muted-foreground">
            L'ensemble des éléments figurant sur le site (textes, images, logos, etc.) sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction totale ou partielle de ces éléments est strictement interdite sans autorisation préalable.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">5. Protection des données personnelles</h2>
          <p className="text-muted-foreground">
            Conformément à la législation en vigueur, les informations collectées sur ce site sont destinées exclusivement à Villa Azur. Vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">6. Loi applicable</h2>
          <p className="text-muted-foreground">
            Les présentes conditions d'utilisation sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </div>
      </div>
    </div>
  );
}