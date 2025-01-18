import { Inter } from "next/font/google";
import localFont from 'next/font/local'

const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
  subsets: ["latin"],
  variable: '--font-inter',
});

const hennyPenny = localFont({
  src: '../public/assets/Henny_Penny/HennyPenny-Regular.ttf',
  display: 'swap',
  variable: '--henny-penny',
})

export { hennyPenny, inter }
