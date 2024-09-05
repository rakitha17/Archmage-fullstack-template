// "use client"

import React from "react"
import Image from "next/image"
//ANCHOR -
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/app/[lang]/components/shared/ui/menubar"
import { Button } from "@/app/[lang]/components/shared/ui/button"

interface Url {
  url: string
  text: string
}

interface Navbar1Props {
  links: Url[]
  logoUrl: string | null
  logoText: string
  button: {
    text: string
  }
}

export default function Navbar1({
  links,
  logoUrl,
  logoText,
  button,
}: Navbar1Props) {
  return (
    <div className="py-5">
      <div className="container mx-auto px-5">
        <Menubar className="flex justify-between items-center h-full p-0 shadow-none border-0 bg-transparent">
          <Image
            src={logoUrl || ""}
            width={50}
            height={50}
            alt={logoText || ""}
          />
          <div className="flex flex-col lg:flex-row items-center lg:space-x-8 text-base lg:me-24">
            {links.map((val: any, index: number) => (
              <div key={index} className="py-2 px-5">
                <MenubarMenu>
                  <MenubarTrigger>{val.text.toUpperCase()}</MenubarTrigger>
                </MenubarMenu>
              </div>
            ))}
            <div className="lg:ms-24">
              <Button
                variant="outline"
                className="mt-4 lg:mt-0 bg-customBlue-light hover:bg-customBlue-light text-white hover:text-white py-2 px-8 rounded-none"
              >
                {button.text.toUpperCase()}
              </Button>
            </div>
          </div>
        </Menubar>
      </div>
    </div>
  )
}
