import type { Metadata } from "next";
import "./globals.css";
//ANCHOR - 
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";
import { i18n } from "../../../i18n-config";
//ANCHOR - 
import Navbar1 from "./components/Navbar1";
import Navbar2 from "./components/Navbar2";
import Footerbar from "./components/Footerbar";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      /* "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories", */
      "navigationbar_1.links",
      "navigationbar_1.navbar_logo.logoImg",
      "navigationbar_1.button",
      "navigationbar_2.button_links",
      "footerbar.links",
      "footerbar.social_links",
      "footerbar.footerbar_logo.logoImg",
      "footerbar.social_links.icon",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({ params } : { params: {lang: string}}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;
  
  const { navigationbar_1, navigationbar_2, footerbar } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navigationbar_1.navbar_logo.logoImg.data?.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footerbar.footerbar_logo.logoImg.data?.attributes.url
  );

  return (
    <html lang={params.lang}>
      <body className="bg-customGray min-h-screen">
        <Navbar2 buttonLinks={navigationbar_2.button_links} />
        <Navbar1
          links={navigationbar_1.links}
          logoUrl={navbarLogoUrl}
          logoText={navigationbar_1.navbar_logo.logoText}
          button={navigationbar_1.button}
        />

        <main >
          {children}
        </main>

        <Footerbar
          logoUrl={footerLogoUrl}
          logoText={footerbar.footerbar_logo.logoText}
          links={footerbar.links}
          socialLinks={footerbar.social_links}
          copyright={footerbar.copyright}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
