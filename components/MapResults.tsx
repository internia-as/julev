import { MapData } from "@/types/mapData";
import {
  Alert,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useEffect } from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface Props {
  results: MapData[];
}

const DEFAULT_LAT = 66.4934499155346;
const DEFAULT_LONG = 19.159664546414138;

const MapResults = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [mobileMapOpen, setMobileMapOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<MapData | null>(null);
  const [map, setMap] = React.useState<any>(null);
  const [mobileMap, setMobileMap] = React.useState<any>(null);
  const [isClient, setIsClient] = React.useState(false);
  const t = useTranslations("map");

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);

    // Fix leaflet default markers on client side
    if (typeof window !== "undefined") {
      // Dynamically import and setup leaflet icons
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!map) return;
    map.flyTo(
      {
        lat: selected?.representasjonspunkt.nord ?? DEFAULT_LAT,
        lng: selected?.representasjonspunkt.øst ?? DEFAULT_LONG,
      },
      11
    );
  }, [selected, map]);

  useEffect(() => {
    if (!mobileMap) return;
    mobileMap.flyTo(
      {
        lat: selected?.representasjonspunkt.nord ?? DEFAULT_LAT,
        lng: selected?.representasjonspunkt.øst ?? DEFAULT_LONG,
      },
      11
    );
  }, [selected, mobileMap]);

  useEffect(() => {
    setSelected(props.results[0] || null);
  }, [props.results]);

  const MapIcon = () => (
    <IconButton color="primary" onClick={() => setOpen(true)}>
      <LocationPinIcon />
    </IconButton>
  );

  const handleClick = (result: MapData) => {
    setSelected(result);
    // On mobile, open the map dialog when a list item is clicked
    if (isClient && window.innerWidth < 768) {
      // md breakpoint
      setMobileMapOpen(true);
    }
  };

  const defaultCenter = {
    lat: props.results[0]?.representasjonspunkt.nord ?? 60.47, // Fallback Norway lat
    lng: props.results[0]?.representasjonspunkt.øst ?? 8.47, // Fallback Norway lng
  };

  return (
    <div>
      <div className="fixed z-50 bottom-5 right-5">
        <div className="hidden md:flex items-center justify-center">
          <Alert className="items-center" severity="info" action={<MapIcon />}>
            {t("alert")}
          </Alert>
        </div>

        <div className="md:hidden">
          <MapIcon />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xl"
      >
        <div className="p-4 flex justify-between h-[550px] overflow-auto">
          <List
            sx={{
              bgcolor: "background.paper",
            }}
            className="flex-1 overflow-scroll"
          >
            {props.results.map((result, index) => (
              <ListItem
                key={`${result.stedsnummer}-${index}`}
                className={
                  selected?.stedsnummer === result.stedsnummer
                    ? "hover:bg-gray-200 cursor-pointer border border-gray-300 rounded-sm shadow-md bg-gray-200"
                    : "hover:bg-gray-200 cursor-pointer border border-gray-300 rounded-sm shadow-md"
                }
                onClick={() => handleClick(result)}
              >
                <ListItemText>
                  <h5>{result.skrivemåte}</h5>
                  <div className="text-xs md:text-sm text-gray-600">
                    <div className="flex justify-between">
                      <div>{result.navneobjekttype}</div>
                      <div>
                        {result.kommuner
                          ? result.kommuner[0]?.kommunenavn
                          : null}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>{result.språk}</div>
                      <div>
                        {result.fylker ? result.fylker[0]?.fylkesnavn : null}
                      </div>
                    </div>
                    <div>
                      <div>{result.skrivemåtestatus}</div>
                    </div>
                  </div>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <div className="hidden p-2 md:flex md:w-[480px] h-[320px] flex-1">
            {isClient && (
              <MapContainer
                zoom={4}
                center={[
                  selected?.representasjonspunkt.nord
                    ? selected.representasjonspunkt.nord
                    : DEFAULT_LAT,
                  selected?.representasjonspunkt.øst
                    ? selected.representasjonspunkt.øst
                    : DEFAULT_LONG,
                ]}
                scrollWheelZoom={false}
                ref={setMap}
                style={{ height: "500px", width: "800px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {selected?.representasjonspunkt && (
                  <Marker
                    position={[
                      selected.representasjonspunkt.nord,
                      selected.representasjonspunkt.øst,
                    ]}
                  >
                    <Popup>
                      {selected.skrivemåte} -{" "}
                      {selected.kommuner
                        ? selected.kommuner[0]?.kommunenavn
                        : null}
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            )}
          </div>
        </div>
      </Dialog>

      {/* Mobile Map Dialog */}
      <Dialog
        open={mobileMapOpen}
        onClose={() => setMobileMapOpen(false)}
        fullScreen
        className="md:hidden"
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <span>{selected?.skrivemåte}</span>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setMobileMapOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          {isClient && (
            <MapContainer
              zoom={11}
              center={[
                selected?.representasjonspunkt.nord ?? DEFAULT_LAT,
                selected?.representasjonspunkt.øst ?? DEFAULT_LONG,
              ]}
              scrollWheelZoom={true}
              ref={setMobileMap}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {selected?.representasjonspunkt && (
                <Marker
                  position={[
                    selected.representasjonspunkt.nord,
                    selected.representasjonspunkt.øst,
                  ]}
                >
                  <Popup>
                    {selected.skrivemåte} -{" "}
                    {selected.kommuner
                      ? selected.kommuner[0]?.kommunenavn
                      : null}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapResults;
