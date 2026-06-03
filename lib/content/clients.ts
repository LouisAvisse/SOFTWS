/* Client / trust logos — single source of truth for the customer set.
   Files live in public/logo/clients/ (transparent SVG-wrapped PNGs).
   `heightClass` optically balances each logo (square marks need more height
   than wide wordmarks) so the row reads evenly. `ratio` is the asset's
   intrinsic width/height, used to size the masked monotone render (see
   TrustLogos) since a mask box can't infer width from the image. */

export interface ClientLogo {
  name: string;
  src: string;
  heightClass: string;
  ratio: number;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'EDF', src: '/logo/clients/edf.svg', heightClass: 'h-8', ratio: 98 / 42 },
  { name: 'LG', src: '/logo/clients/lg.svg', heightClass: 'h-11', ratio: 71 / 71 },
  { name: 'Sage', src: '/logo/clients/sage.svg', heightClass: 'h-8', ratio: 85 / 51 },
  { name: 'Groupama', src: '/logo/clients/groupama.svg', heightClass: 'h-6', ratio: 137 / 33 },
  { name: 'Thermor', src: '/logo/clients/thermor.svg', heightClass: 'h-6', ratio: 108 / 33 },
];
