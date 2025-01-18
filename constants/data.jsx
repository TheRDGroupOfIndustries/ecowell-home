import {
  Facebook,
  Instagram,
  PinIcon as Pinterest,
  Twitter,
  Youtube,
} from "lucide-react";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const DEFAULT_AVATAR = "/pfp.png";

export const contactNumber = "7065937377";

export const links = [
  { id: 1, head: "Home", herf: "/" },
  { id: 1, head: "Products", herf: "/products" },
  { id: 1, head: "About Us", herf: "/about-us" },
  { id: 1, head: "Contact", herf: "/#contact-us" },
];

export const footerData = {
  newsletter: {
    title: "Join our tribe",
    description: "Be the first to hear about fresh news and new products",
    placeholder: "Enter your email here",
    buttonText: "Join",
  },
  links: {
    sections: [
      {
        title: "ABOUT",
        items: [
          {
            type: "link",
            content: "Shop All",
            href: "/products",
          },
          {
            type: "link",
            content: "About Us",
            href: "/about-us",
          },
          {
            type: "link",
            content: "Category",
            href: "/#shop-categories",
          },
        ],
      },
      {
        title: "HELP",
        items: [
          {
            type: "link",
            content: "Shipping & Return",
            href: "/about-us",
          },
          {
            type: "link",
            content: "Term's & Condition's",
            href: "/terms",
          },
          {
            type: "link",
            content: "Privacy Policies",
            href: "/policies",
          },
        ],
      },
      {
        title: "CONTACT",
        items: [
          {
            type: "phone",
            content: `+91 ${contactNumber}`,
            href: `tel:${contactNumber}`,
            icon: <CiPhone size={20} className="w-6 h-6 text-primary-clr" />,
          },
          {
            type: "email",
            content: "contact@ecowellonline.com",
            href: "mailto:contact@ecowellonline.com",
            icon: <CiMail size={20} className="w-6 h-6 text-primary-clr" />,
          },
          {
            type: "address",
            content:
              "19, Park Lane, Church road, Vasant Kunj, New Delhi-110070",
            icon: (
              <CiLocationOn
                size={30}
                className=" min-w-8 w-8 min-h-8 text-primary-clr"
              />
            ),
          },
        ],
      },
    ],
  },
  companyInfo: {
    name: "Ecowell",
    logo: "/logo.png",
    description:
      "At Ecowell, we blend science with the finest natural ingredients to craft premium wellness products. From muscle support to radiant skin, our range is designed to fuel your body, mind, and soul.",
  },
  socialMedia: [
    { icon: Facebook, href: "https://www.facebook.com" },
    { icon: Instagram, href: "https://www.instagram.com" },
    { icon: Twitter, href: "https://www.twitter.com" },
    { icon: Youtube, href: "https://www.youtube.com" },
    { icon: Pinterest, href: "https://www.pinterest.com" },
  ],
  copyright: {
    year: new Date().getFullYear(),
    company: "Ecowell, Inc.",
    links: [
      { label: "Privacy Policy", href: "/policies" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};

// bento grid section data
export const features = [
  {
    title: "Science Meets Nature",
    description:
      "Every product is a perfect fusion of cutting-edge research and nature's finest ingredients. No compromises, just pure, effective goodness.",
    image: "/p1.png",
  },
  {
    title: "Thoughtfully Curated for You",
    description:
      "From energy-boosting blends to beauty-enhancing supplements, our offerings are designed with one goal in mind – your well-being.",
    image: "/p2.png",
  },
  {
    title: "Empowering Your Journey",
    description:
      "With Ecowell, you're not just buying a product; you're joining a community committed to helping you thrive.",
    image: "/p3.png",
  },
  {
    title: "Premium You Can Trust",
    description:
      "Every formula is crafted with care, ensuring exceptional quality, safety, and results. It's wellness you can rely on.",
    image: "/p4.png",
  },
  {
    title: "Less is More",
    description:
      "We believe in keeping it minimal yet impactful – both in our products and our philosophy. Simple, effective solutions for your busy life.",
    image: "/p1.png",
  },
];

export const categoriesData = [
  { name: "PROTEIN", image: "/p1.png", href: "/#shop?category=protein" },
  { name: "COLLAGEN", image: "/p2.png", href: "/#shop?category=collagen" },
  { name: "SHILAJIT", image: "/p3.png", href: "/#shop?category=shilajit" },
  {
    name: "DAILY ESSENTIALS",
    image: "/p4.png",
    href: "/#shop?category=daily-essentials",
  },
];

export const certificationsData = [
  { id: 1, alt: "FDA", img: "/c01.png" },
  { id: 2, alt: "HACCP", img: "/c02.png" },
  { id: 3, alt: "GMP", img: "/c03.png" },
  { id: 4, alt: "ISO", img: "/c04.png" },
  { id: 5, alt: "FSSAI", img: "/c05.png" },
  { id: 6, alt: "NOW GMO", img: "/c06.png" },
];

export const partnerLogoData = [
  { src: "/l1.png", alt: "Logo 1" },
  { src: "/l2.png", alt: "Logo 2" },
  { src: "/l3.png", alt: "Logo 3" },
  { src: "/l1.png", alt: "Logo 1" },
  { src: "/l2.png", alt: "Logo 2" },
  { src: "/l3.png", alt: "Logo 3" },
];
