import Image from "next/image"
import React from "react"
//ANCHOR -
import { getStrapiMedia } from "../utils/api-helpers"
//ANCHOR -
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/[lang]/components/shared/ui/card"

interface PictureAttributes {
  url: string
  name: string
  alternativeText: string
}

interface Picture {
  data: {
    id: string
    attributes: PictureAttributes
  }
}

interface Card {
  id: string
  title: string
  image: Picture
}

interface ServicesProps {
  data: {
    id: string
    heading: string
    cards: Card[]
  }
}

export default function Services({ data }: ServicesProps) {
  return (
    <div className="container mx-auto bg-white">
      <div className="px-28 py-16">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            {data.heading}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
            {data.cards.map((val, index) => {
              const convertedImg = getStrapiMedia(val.image.data.attributes.url)

              return (
                <Card key={index} className="rounded-none border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="w-full h-[400px] rounded-none relative">
                      <Image
                        src={convertedImg || ""}
                        alt={"image"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="px-0 py-4">
                    <p className="font-bold">{val.title}</p>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
