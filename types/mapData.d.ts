export interface MapData {
  fylker:
    | {
        fylkesnavn: string;
        fylkesnummer: string;
      }[]
    | null;
  kommuner: {
    kommunenavn: string;
    kommunenummer: string;
  }[];
  navneobjekttype: string;
  navnestatus: string;
  representasjonspunkt: {
    nord: number;
    øst: number;
  };
  skrivemåte: string;
  skrivemåtestatus: string;
  språk: string;
  stedsnummer: number;
  stedstatus: string;
}
[];
