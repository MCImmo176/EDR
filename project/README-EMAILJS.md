# Configuration d'EmailJS pour le formulaire de contact

Ce document explique la configuration d'EmailJS pour le formulaire de contact du site Les Étoiles du Rocher.

## Configuration actuelle

Le formulaire de contact est déjà configuré avec les identifiants suivants :

- Service ID : `service_mv5ctkt` (Service Gmail)
- Template ID : `template_yd3mmom`
- Public Key : `iXQm2-_WREMX8F2dO`

## Noms des champs dans le template

Pour que le formulaire fonctionne correctement, assurez-vous que votre template EmailJS contient les variables suivantes :

- `{{nom}}` : Nom de l'expéditeur
- `{{prenom}}` : Prénom de l'expéditeur
- `{{email}}` : Email de l'expéditeur
- `{{indicatif}}` : Indicatif téléphonique du pays
- `{{telephone}}` : Numéro de téléphone
- `{{message}}` : Contenu du message

## Modifications futures

Si vous souhaitez modifier la configuration EmailJS :

1. Connectez-vous à votre compte sur [EmailJS](https://www.emailjs.com/)
2. Accédez à vos services et templates pour effectuer des modifications
3. Mettez à jour les constantes suivantes dans le fichier `components/contact-form.tsx` :
   ```javascript
   const EMAILJS_SERVICE_ID = "votre_nouveau_service_id";
   const EMAILJS_TEMPLATE_ID = "votre_nouveau_template_id";
   const EMAILJS_PUBLIC_KEY = "votre_nouvelle_public_key";
   ```

## Personnalisation du modèle d'email

Voici un exemple de modèle d'email que vous pouvez utiliser :

```html
<h2>Nouveau message de contact des Étoiles du Rocher</h2>
<p><strong>De:</strong> {{prenom}} {{nom}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Téléphone:</strong> {{indicatif}} {{telephone}}</p>
<h3>Message:</h3>
<p>{{message}}</p>
```

## Limitations du plan gratuit d'EmailJS

Le plan gratuit d'EmailJS permet:
- 200 emails par mois
- Support par email
- Jusqu'à 2 services email

Si vous avez besoin de plus de fonctionnalités, consultez les [plans tarifaires d'EmailJS](https://www.emailjs.com/pricing/). 