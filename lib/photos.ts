/**
 * Photo library. All photographs are INJ's own work, migrated from the
 * existing injmakeup.com website (originals kept in /_legacy-assets).
 * To replace a photo, drop a new file into /assets/photos and update the import.
 */
import type { StaticImageData } from "next/image";

import heroBridal from "@/assets/photos/bridal-red-lehenga-hero.jpg";
import maangTikka from "@/assets/photos/bridal-portrait-maang-tikka.jpg";
import artistAtWork from "@/assets/photos/artist-at-work.jpg";
import academyClass from "@/assets/photos/academy-class.jpg";
import hairPearls from "@/assets/photos/hair-bridal-bun-pearls.jpg";
import hairSleekBun from "@/assets/photos/hair-sleek-bun-profile.jpg";
import redJewellery from "@/assets/photos/bridal-red-jewellery.jpg";
import redDupatta from "@/assets/photos/bridal-red-dupatta.jpg";
import receptionSoftGlam from "@/assets/photos/reception-soft-glam.jpg";
import redLehengaPortrait from "@/assets/photos/bridal-red-lehenga-portrait.jpg";
import glitterEye from "@/assets/photos/bridal-glitter-eye-closeup.jpg";
import pinkSareeBlossoms from "@/assets/photos/bridal-pink-saree-blossoms.jpg";
import nathCloseup from "@/assets/photos/bridal-nath-closeup.jpg";
import pinkRuffles from "@/assets/photos/editorial-pink-ruffles.jpg";
import glamGreen from "@/assets/photos/glam-portrait-green.jpg";
import whiteVeil from "@/assets/photos/bridal-white-veil.jpg";
import whiteVeilRinglight from "@/assets/photos/bridal-white-veil-ringlight.jpg";
import whiteGownGarden from "@/assets/photos/bridal-white-gown-garden.jpg";
import redSaree from "@/assets/photos/look-red-saree.jpg";
import goldSaree from "@/assets/photos/look-gold-saree.jpg";
import floralCrown from "@/assets/photos/editorial-floral-crown.jpg";
import pinkLehenga from "@/assets/photos/bridal-pink-lehenga.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const photos = {
  heroBridal: {
    src: heroBridal,
    alt: "Bride in a red embroidered lehenga with diamond jewellery and a nath, styled by INJ Makeup Studio",
  },
  maangTikka: {
    src: maangTikka,
    alt: "Close-up bridal portrait with a gold maang tikka, kundan jewellery and soft rose-toned eye makeup",
  },
  artistAtWork: {
    src: artistAtWork,
    alt: "INJ makeup artist applying eye makeup to a bride, reflected in a ring-light mirror",
  },
  academyClass: {
    src: academyClass,
    alt: "Makeup class in progress at the INJ studio, with students watching a live demonstration",
  },
  hairPearls: {
    src: hairPearls,
    alt: "Back view of a sculpted bridal bun finished with pearl hair pins",
  },
  hairSleekBun: {
    src: hairSleekBun,
    alt: "Profile of a sleek low bun with a jewelled hair accessory and statement earrings",
  },
  redJewellery: {
    src: redJewellery,
    alt: "Bride in red with a gold maang tikka, jhumkas and a bold red lip",
  },
  redDupatta: {
    src: redDupatta,
    alt: "Bride seated in a red lehenga and dupatta in warm, candlelit surroundings",
  },
  receptionSoftGlam: {
    src: receptionSoftGlam,
    alt: "Reception look with soft bronze eyes, peach lips and a gold matha patti",
  },
  redLehengaPortrait: {
    src: redLehengaPortrait,
    alt: "Bride in a red lehenga with a passa, choker and stacked bangles",
  },
  glitterEye: {
    src: glitterEye,
    alt: "Close-up of glittering gold bridal eye makeup with a pearl nath and emerald jewellery",
  },
  pinkSareeBlossoms: {
    src: pinkSareeBlossoms,
    alt: "Bride in a blush silk saree with diamond jewellery, framed by pink blossoms",
  },
  nathCloseup: {
    src: nathCloseup,
    alt: "Bridal close-up with downcast eyes, a large gold nath and a soft rose lip",
  },
  pinkRuffles: {
    src: pinkRuffles,
    alt: "Editorial portrait with lilac eye makeup and a voluminous pink organza ruffle",
  },
  glamGreen: {
    src: glamGreen,
    alt: "Glam portrait with defined brows, smoky lashes and a nude lip against green drapes",
  },
  whiteVeil: {
    src: whiteVeil,
    alt: "Bride in a white lace gown and sheer veil with a diamond necklace",
  },
  whiteVeilRinglight: {
    src: whiteVeilRinglight,
    alt: "Bride in a white veil and tiara photographed inside a ring light",
  },
  whiteGownGarden: {
    src: whiteGownGarden,
    alt: "Bride in a white embellished gown and long veil in a garden setting",
  },
  redSaree: {
    src: redSaree,
    alt: "Bride in a red silk saree with temple jewellery and a gold matha patti",
  },
  goldSaree: {
    src: goldSaree,
    alt: "Look in a gold tissue saree with a diamond choker and fresh jasmine in the hair",
  },
  floralCrown: {
    src: floralCrown,
    alt: "Creative editorial makeup with pink tones framed by a crown of roses",
  },
  pinkLehenga: {
    src: pinkLehenga,
    alt: "Bride in a magenta lehenga with a jasmine-adorned bun and turquoise jewellery",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
