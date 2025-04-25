"use client";

import { SectionTitle } from "@/components/ui/section-title";

export default function SalesTermsPage() {
  return (
    <div className="container py-24 md:py-32">
      <SectionTitle
        title="Conditions Générales de Vente"
        centered
      />
      
      <div className="max-w-3xl mx-auto mt-16 space-y-8">
        <div>
          <h2 className="text-2xl mb-4">1. Réservation</h2>
          <p className="text-muted-foreground">
            La réservation de Villa Azur est considérée comme confirmée après réception d'un acompte de 50% du montant total du séjour et la signature du contrat de location. Le solde devra être réglé au plus tard 60 jours avant la date d'arrivée.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">2. Caution</h2>
          <p className="text-muted-foreground">
            Une caution de 5000€ sera demandée à l'arrivée, restituée dans les 15 jours suivant le départ, déduction faite des éventuels dommages constatés ou frais supplémentaires.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">3. Annulation</h2>
          <p className="text-muted-foreground">
            En cas d'annulation par le client :
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
            <li>Plus de 90 jours avant l'arrivée : remboursement de 70% de l'acompte</li>
            <li>Entre 90 et 60 jours : remboursement de 50% de l'acompte</li>
            <li>Entre 60 et 30 jours : aucun remboursement de l'acompte</li>
            <li>Moins de 30 jours : aucun remboursement, la totalité du séjour est due</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">4. Arrivée et départ</h2>
          <p className="text-muted-foreground">
            L'arrivée est prévue à partir de 16h00 et le départ au plus tard à 10h00. Tout dépassement d'horaire pourra entraîner des frais supplémentaires.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">5. Règlement intérieur</h2>
          <p className="text-muted-foreground">
            Le client s'engage à respecter le règlement intérieur de la villa qui lui sera remis à son arrivée. Tout manquement grave pourra entraîner la résiliation immédiate du contrat aux torts exclusifs du client.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">6. Services complémentaires</h2>
          <p className="text-muted-foreground">
            Les services complémentaires (chef, majordome, etc.) doivent être réservés à l'avance et font l'objet d'une facturation séparée. Toute modification ou annulation de ces services doit être effectuée au moins 7 jours avant la date prévue.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">7. Responsabilité</h2>
          <p className="text-muted-foreground">
            Le client est responsable de tous les dommages survenant de son fait. Il est invité à vérifier s'il bénéficie d'une assurance villégiature dans le cadre de son contrat d'habitation.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl mb-4">8. Litiges</h2>
          <p className="text-muted-foreground">
            En cas de litige, les parties s'efforceront de régler leur différend à l'amiable. À défaut, les tribunaux du lieu de situation de la villa seront seuls compétents.
          </p>
        </div>
      </div>
    </div>
  );
}