+++
title =  "Footer"
type = "footer"
draft = false
+++


{{< contact-section
    sectionId="contatti"
    title="Contattaci" 
    contact_form_name="Nome"
    contact_form_email="Cognome"
    contact_form_message="Messaggio"
    contact_button="Invia messaggio"
    contact_email_title="Mi correo"
    contact_email_email="bacarotech@gmail.com"
    contact_address_title="La nostra location"
    contact_address_address="🇮🇹 Italia"
    form_action="https://formspree.io/f/mail@example.com"
    form_method="POST"
>}}

{{< newsletter-section 
    newsletter_title="Subscríbete"
    newsletter_placeholder="Tu correo"
    newsletter_button="Subscríbete"
    newsletter_success_message="Gracias por suscribirte!"
    newsletter_error_message="Algo ha fallado, por favor inténtalo de nuevo."
    newsletter_note="Respetamos tu privacidad."
    form_action="/"
    form_method="POST"
>}}


{{< text-section
title="Contenido extra"
centered="true"
>}}

Puedes añadir contenido adicional después de los bloques de `section`.

Aquí puedes ser creativo, utilizar otros shortcodes, ... O dejarlo vacío.

Para añadir texto que quede bien en el pie, puedes utilizar el shortcode `text-section`.

{{< /text-section >}}
