# Geppo Dev

Portfolio di Geppo Dev: giochi fatti per passione, progetti in sviluppo e feedback dei giocatori.

Sito: https://geppo4.github.io/WebSiteGeppo/

## Sviluppo locale

Il sito è statico e non richiede dipendenze o build. Dalla cartella del repository:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Aprire http://127.0.0.1:4173.

## Struttura

- `index.html`: contenuti, progetti e modulo feedback.
- `styles.css`: grafica responsive e preferenze di movimento ridotto.
- `app.js`: filtri progetti, schede di dettaglio, menu mobile e feedback.
- `assets/`: immagine originale di Farkle Villains, dadi realistici generati con ImageGen e favicon.
- `.nojekyll`: pubblicazione diretta dei file statici su GitHub Pages.

## Pubblicazione

GitHub Pages pubblica dal branch `main`, cartella principale. Il sito usa percorsi relativi compatibili con `/WebSiteGeppo/` e metadati riferiti a questo indirizzo.

## Feedback

Il modulo mantiene l’endpoint FormSubmit originale: `https://formsubmit.co/ajax/privacygamegeppo@gmail.com`.
La consegna dipende dalla configurazione dell’indirizzo su FormSubmit. L’email del visitatore è facoltativa; il modulo gestisce validazione, timeout, errori e un collegamento email alternativo che conserva il messaggio. Non raccoglie lo user agent e non salva dati localmente.

## Contenuti

I collegamenti a Google Play e Ko-fi e le informazioni sui progetti derivano dal sito originale. I progetti non ancora disponibili sono indicati come in sviluppo o in arrivo, senza date di uscita. La hero usa una nuova immagine con dadi realistici e sfondo trasparente.
