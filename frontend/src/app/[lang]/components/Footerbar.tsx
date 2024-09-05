import React from "react"
import Image from "next/image"
//ANCHOR -
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarItem,
} from "@/app/[lang]/components/shared/ui/menubar"
import { getStrapiMedia } from "../utils/api-helpers"

interface Url {
  url: string
  text: string
}

interface FooterbarProps {
  links: Url[]
  logoUrl: string | null
  logoText: string
  socialLinks: Url[]
  copyright: string
}

export default function Footerbar({
  links,
  logoUrl,
  logoText,
  socialLinks,
  copyright,
}: FooterbarProps) {
  console.log(socialLinks)
  return (
    <div className="container mx-auto ">
      <div className="px-28 py-8">
        <div className="border-b-2 border-gray-200 pb-8 pt-0">
          <Menubar className="flex justify-between items-center h-full p-0 shadow-none border-0 bg-transparent">
            <Image
              src={logoUrl || ""}
              width={50}
              height={50}
              alt={logoText || ""}
            />
            <div className="flex flex-col lg:flex-row items-center text-base">
              {links.map((val: any, index: number) => (
                <div key={index} className="py-2 px-5">
                  <MenubarMenu>
                    <MenubarTrigger>{val.text.toUpperCase()}</MenubarTrigger>
                  </MenubarMenu>
                </div>
              ))}
            </div>
            <div className="lg:ms-24 flex space-x-4">
              {socialLinks.map((val: any, index: number) => {
                const icon = getStrapiMedia(val.icon.data.attributes.url)
                return (
                  <div key={index}>
                    <Image
                      src={icon || ""}
                      alt="icon"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                )
              })}
            </div>
          </Menubar>
        </div>
        <div className="pt-4">
          <p className="text-center text-sm text-gray-500 font-bold">
            {copyright}
          </p>
        </div>
      </div>
    </div>
  )
}
