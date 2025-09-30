import { MapData } from "@/types/mapData";
import { Dialog, IconButton } from "@mui/material";
import React from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";

interface Props {
  results: MapData[];
}

const MapResults = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div className="absolute bottom-5 right-5">
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <LocationPinIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Kartresultater</h2>
          {props.results.map((result, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">
                {result.stedsnavn[0]?.skrivemåte || "Ukjent navn"}
              </h3>
              <p>
                <strong>Stedsnummer:</strong> {result.stedsnummer}
              </p>
              <p>
                <strong>Navneobjekttype:</strong> {result.navneobjekttype}
              </p>
              <p>
                <strong>Oppdateringsdato:</strong>{" "}
                {new Date(result.oppdateringsdato).toLocaleDateString()}
              </p>
              <p>
                <strong>Fylker:</strong>{" "}
                {result.fylker.map((f) => f.fylkesnavn).join(", ")}
              </p>
              <p>
                <strong>Kommuner:</strong>{" "}
                {result.kommuner.map((k) => k.kommunenavn).join(", ")}
              </p>

              <p>
                <strong>Representasjonspunkt:</strong> Nord:{" "}
                {result.representasjonspunkt.nord}, Øst:{" "}
                {result.representasjonspunkt.øst}
              </p>
              <div className="mt-2">
                <strong>Stedsnavn:</strong>
                <ul className="list-disc list-inside">
                  {result.stedsnavn.map((sn) => (
                    <li key={sn.stedsnavnnummer}>
                      {sn.skrivemåte} ({sn.språk}, {sn.navnestatus})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default MapResults;
