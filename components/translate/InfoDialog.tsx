import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  Tooltip,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";

const InfoDialog = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Tooltip title="Information">
        <IconButton onClick={() => setOpen(true)} color="primary">
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          Maskinoversetting fra Giellatekno
        </DialogTitle>
        <DialogContent className="my-4 flex flex-col space-y-4 text-sm">
          <p>
            Giellatekno ved UiT Norges arktiske universitet arbeider med
            maskinoversetting basert på deres grammatiske analysatorer for
            samiske språk, kombinert med tospråklige ordbøker, overføringsregler
            for grammatikk, og en generator for målspråket. Giellatekno
            samarbeider med Apertium, som har en maskinoversettingsplattform med
            åpen kildekode.
          </p>
          <b>Om oversetteren</b>
          <p>
            Samisk–norsk-oversettelsessystemet er i stadig utvikling. I den
            fasen det er i nå kan det brukes til å forstå nordsamisk bedre, men
            den klarer ikke å produsere feilfri norsk. Hvis den norske
            oversettelsen inneholder noe du slett ikke hadde ventet deg er det
            grunn til å se kritisk på resultatet. Vær spesielt oppmerksom på
            følgende mulige feiltyper:
          </p>
          <p>
            Samisk skiller ikke mellom «han» og «hun». For å unngå forvirring på
            grunn av feil oversetting, bruker vi «h_n» i de tilfellene
            programmet ikke er i stand til å bestemme rett kjønn. Samisk skiller
            heller ikke mellom bestemt og ubestemt form, f.eks. 'skole' vs.
            'skolen', så programmet gir ikke alltid riktig bestemthet på norsk.
            Når man oversetter sammensatte ord som ikke finnes i programmets
            ordbok, oversettes delene hver for seg, og man kan få oversettinger
            som 'fjellordfører' istedenfor 'varaordfører' ('várri' betyr både
            vara og fjell). I alle språk er det mange ord som har flere enn en
            betydning. Programmet klarer ikke alltid å finne korrekt betydning
            ut i fra sammenhengen. Brukeren kan, når hun er i tvil om
            betydninga, slå opp slike ord i ei ordbok, f.eks. i{" "}
            <a
              className="text-blue-500 underline"
              href="http://sanit.oahpa.no/"
              target="_blank"
            >
              Neahttadigisánit.
            </a>
          </p>
          <p>
            Mer info finner dere på{" "}
            <a
              className="text-blue-500 underline"
              href="https://giellatekno.uit.no/smilang.nob.html#:~:text=fra%20nordsamisk%20til%20norsk"
              target="_blank"
            >
              Giellatekno
            </a>{" "}
            sine sider.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InfoDialog;
