export interface MapData {
  metadata: {
    side: number;
    sokeStreng: string;
    totaltAntallTreff: number;
    treffPerSide: number;
    viserFra: number;
    viserTil: number;
  };
  navn: {
    fylker: {
      fylkesnavn: string;
      fylkesnummer: string;
    }[];
    geojson: {
      geometry: {
        coordinates: [number, number]; // [longitude, latitude]
        type: string;
      };
    };
    kommuner: {
      kommunenavn: string;
      kommunenummer: string;
    }[];
    navneobjekttype: string;
    oppdateringsdato: string; // ISO date string
    representasjonspunkt: {
      nord: number;
      øst: number;
    };
    stedsnavn: {
      navnestatus: string;
      skrivemåte: string;
      skrivemåtestatus: string;
      språk: string;
      stedsnavnnummer: number;
    }[];
    stedsnummer: number;
    stedstatus: string;
  }[];
}
