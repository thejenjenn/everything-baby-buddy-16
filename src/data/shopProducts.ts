import pregnancyPillow from "@/assets/shop/pregnancy-pillow.jpg";
import compressionSocks from "@/assets/shop/compression-socks.jpg";
import nursingWear from "@/assets/shop/nursing-wear.jpg";
import bumpOils from "@/assets/shop/bump-oils.jpg";
import bumpSupport from "@/assets/shop/bump-support.jpg";
import prenatalVitamins from "@/assets/shop/prenatal-vitamins.jpg";
import postpartumRecovery from "@/assets/shop/postpartum-recovery.jpg";
import hospitalEssential from "@/assets/shop/hospital-essential.jpg";
import hospitalComplete from "@/assets/shop/hospital-complete.jpg";
import hospitalPremium from "@/assets/shop/hospital-premium.jpg";
import newbornFirstWeeks from "@/assets/shop/newborn-first-weeks.jpg";
import breastfeedingEssentials from "@/assets/shop/breastfeeding-essentials.jpg";
import weaningSet from "@/assets/shop/weaning-set.jpg";
import merchApparel from "@/assets/shop/merch-apparel.jpg";
import personalisedOnesies from "@/assets/shop/personalised-onesies.jpg";
import freeChecklist from "@/assets/shop/free-checklist.jpg";

export interface ShopProduct {
  id: string;
  name: string;
  forWho: string;
  price: string;
  image: string;
  contents: string[];
  badge?: string;
  ctaLabel?: string;
}

export interface ShopSection {
  id: string;
  title: string;
  description: string;
  products: ShopProduct[];
}

export const shopSections: ShopSection[] = [
  {
    id: "for-mum",
    title: "For Mum",
    description:
      "Bump care through pregnancy and gentle recovery support after birth.",
    products: [
      {
        id: "pregnancy-pillow",
        name: "Pregnancy Pillow",
        forWho: "For mums struggling to sleep from the second trimester",
        price: "₦45,000",
        image: pregnancyPillow,
        contents: [
          "Full-length U-shaped support pillow",
          "Removable cotton cover",
          "Storage bag",
          "Care and positioning guide",
        ],
      },
      {
        id: "compression-socks",
        name: "Compression Socks",
        forWho: "For mums with swollen feet, long days or travel plans",
        price: "₦12,000",
        image: compressionSocks,
        contents: [
          "2 pairs graduated compression socks",
          "Breathable cotton blend",
          "Sizing guide",
          "Wash bag",
        ],
      },
      {
        id: "maternity-nursing-wear",
        name: "Maternity & Nursing Wear Set",
        forWho: "For mums who want comfort from bump to breastfeeding",
        price: "₦38,000",
        image: nursingWear,
        contents: [
          "Nursing-friendly top",
          "Maternity leggings",
          "2 seamless nursing bras",
          "Nursing-access sleep set",
        ],
      },
      {
        id: "bump-oils",
        name: "Bump Care Oils & Butter",
        forWho: "For mums caring for stretching, itchy bump skin",
        price: "₦22,000",
        image: bumpOils,
        contents: [
          "Nourishing bump oil",
          "Rich stretch mark butter",
          "Soothing body balm",
          "Daily application guide",
        ],
      },
      {
        id: "bump-support",
        name: "Bump Support Band",
        forWho: "For mums with back or pelvic pain in later pregnancy",
        price: "₦18,000",
        image: bumpSupport,
        contents: [
          "Adjustable bump support belt",
          "Lower back support panel",
          "Breathable fabric lining",
          "Fitting instructions",
        ],
      },
      {
        id: "prenatal-vitamins",
        name: "Prenatal Vitamins Pack",
        forWho: "For mums-to-be from first trimester onwards",
        price: "₦25,000",
        image: prenatalVitamins,
        contents: [
          "Prenatal multivitamin (1 month supply)",
          "Folic acid supplement",
          "Iron support tablets",
          "Omega-3 capsules",
        ],
      },
      {
        id: "postpartum-recovery",
        name: "Postpartum Recovery Box",
        forWho: "For new mums healing in the first six weeks",
        price: "₦42,000",
        image: postpartumRecovery,
        contents: [
          "Maternity pads",
          "Peri bottle",
          "Nipple cream",
          "Disposable breast pads",
          "Sitz bath soak",
        ],
      },
    ],
  },
  {
    id: "hospital-bag",
    title: "Hospital Bag",
    description:
      "Delivery-day bags packed and ready, in three tiers to suit every budget.",
    products: [
      {
        id: "hospital-essential",
        name: "Essential Hospital Bag",
        forWho: "For mums who want the must-haves, nothing more",
        price: "₦55,000",
        image: hospitalEssential,
        contents: [
          "Maternity pads and disposable pants",
          "Toiletries travel set",
          "2 newborn bodysuits and a hat",
          "Baby wipes and cotton wool",
          "Printed hospital checklist",
        ],
      },
      {
        id: "hospital-complete",
        name: "Complete Hospital Bag",
        forWho: "For mums who want mum and baby fully covered",
        price: "₦95,000",
        image: hospitalComplete,
        badge: "Most Popular",
        contents: [
          "Everything in the Essential bag",
          "Nursing bras and breast pads",
          "Bath towel and baby blanket",
          "4 newborn outfits, mittens and socks",
          "Nappies for the first days",
          "Snack and hydration kit",
        ],
      },
      {
        id: "hospital-premium",
        name: "Premium Hospital Bag",
        forWho: "For mums who want a little luxury on delivery day",
        price: "₦150,000",
        image: hospitalPremium,
        contents: [
          "Everything in the Complete bag",
          "Soft robe and slippers",
          "Premium skincare and haircare set",
          "Going-home outfit for mum and baby",
          "Keepsake swaddle and knitted blanket",
          "Personalised gift box",
        ],
      },
    ],
  },
  {
    id: "newborn",
    title: "Newborn",
    description: "Everything your little one needs from day one to first foods.",
    products: [
      {
        id: "first-weeks-box",
        name: "First Weeks Box",
        forWho: "For babies 0-3 months settling in at home",
        price: "₦75,000",
        image: newbornFirstWeeks,
        contents: [
          "6 cotton bodysuits and sleepsuits",
          "Muslin cloths",
          "Mittens, hat and socks",
          "Baby wash, lotion and nappy cream",
          "Swaddle blanket",
        ],
      },
      {
        id: "breastfeeding-essentials",
        name: "Breastfeeding Essentials",
        forWho: "For mums feeding at home or on the go",
        price: "₦68,000",
        image: breastfeedingEssentials,
        contents: [
          "Nursing pillow",
          "Manual breast pump",
          "Milk storage bags",
          "Washable nursing pads",
          "Nipple cream and water bottle",
        ],
      },
      {
        id: "weaning-set",
        name: "Weaning Set",
        forWho: "For babies 6 months and up starting solids",
        price: "₦35,000",
        image: weaningSet,
        contents: [
          "Silicone bib",
          "2 suction bowls and plate",
          "Soft-tip weaning spoons",
          "Sippy cup",
          "Food storage containers",
        ],
      },
    ],
  },
  {
    id: "merch",
    title: "Merch & Free Checklist",
    description: "Wear it, gift it, and grab our free newborn checklist.",
    products: [
      {
        id: "branded-apparel",
        name: "Branded Sweatshirts & Tees",
        forWho: "For mums and mums-to-be who love easy, comfy staples",
        price: "From ₦20,000",
        image: merchApparel,
        contents: [
          "Everything Baby sweatshirt",
          "Everything Baby tee",
          "Sizes S-XXL",
          "Choice of cream, blush or black",
        ],
      },
      {
        id: "personalised-onesies",
        name: "Personalised Onesies",
        forWho: "For new arrivals and baby shower gifting",
        price: "₦15,000",
        image: personalisedOnesies,
        contents: [
          "2 cotton onesies",
          "Custom name or message",
          "Choice of thread colour",
          "Gift-ready wrapping",
        ],
      },
      {
        id: "free-checklist",
        name: "Free Newborn Checklist",
        forWho: "For every mum planning ahead — completely free",
        price: "Free",
        image: freeChecklist,
        ctaLabel: "Get Free Checklist",
        contents: [
          "Room-by-room newborn essentials list",
          "Hospital bag packing guide",
          "Month-by-month buying timeline",
          "Budget planning tips",
        ],
      },
    ],
  },
];

export const WHATSAPP_NUMBER = "2349036791181";

export const whatsappLink = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Everything Baby! I'd like to order the ${productName}.`
  )}`;
