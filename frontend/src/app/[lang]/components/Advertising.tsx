"use client"

import React from "react"
//ANCHOR - 
import { Card, CardContent } from "@/app/[lang]/components/shared/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/[lang]/components/shared/ui/carousel"
import Image from "next/image"
import { getStrapiMedia } from "../utils/api-helpers"

interface ImageAttributes {
  name: string
  alternativeText: string
  url: string
}

interface ImageData {
  id: number
  attributes: ImageAttributes
}

interface Image {
  data: ImageData
}

interface AdvertisingItem {
  id: number
  title: string
  description: string
  image: Image
}

interface AdvertisingProps {
  data: { id: number; items: AdvertisingItem[] }
}

export default function Advertising({ data }: AdvertisingProps) {
  const dataSet = data.items

  return (
    <div className="bg-customGray-dark">
      <div className="container mx-auto">
        <div className="px-28 py-16">
          <div>
            <Carousel
              opts={{ align: "start" }}
              className="w-full max-w-full"
            >
              <CarouselContent className="space-x-4">
                {dataSet.map((val, index) => {
                  const convertedImage = getStrapiMedia(
                    val.image.data.attributes.url
                  )
                  const alt = val.image.data.attributes.alternativeText

                  return (
                    <CarouselItem key={index} className="w-full">
                      <Card className="flex flex-col lg:flex-row items-center justify-between h-[300px] px-20 rounded-none bg-customGray-medium">
                        <CardContent className="w-full lg:w-1/3 text-center lg:text-left overflow-hidden">
                          <h2 className="text-2xl lg:text-3xl font-bold mb-4 truncate">
                            {val.title}
                          </h2>
                          <p className="truncate">
                            {val.description}
                          </p>
                        </CardContent>
                        <div className="w-full lg:w-1/3 h-[200px] text-center relative flex justify-center lg:justify-end">
                          <Image
                            src={convertedImage || ""}
                            alt={alt || ""}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      </Card>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}
