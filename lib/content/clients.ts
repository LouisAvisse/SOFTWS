/* Client / trust logos — single source of truth for the customer set.
   Files live in public/logo/clients/ (transparent SVG-wrapped PNGs).
   `heightClass` optically balances each logo (square marks need more height
   than wide wordmarks) so the row reads evenly. */

export interface ClientLogo {
  name: string;
  src: string;
  heightClass: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'EDF', src: '/logo/clients/edf.svg', heightClass: 'h-11' },
  { name: 'LG', src: '/logo/clients/lg.svg', heightClass: 'h-16' },
  { name: 'Sage', src: '/logo/clients/sage.svg', heightClass: 'h-11' },
  { name: 'Groupama', src: '/logo/clients/groupama.svg', heightClass: 'h-8' },
  { name: 'Thermor', src: '/logo/clients/thermor.svg', heightClass: 'h-8' },
];
