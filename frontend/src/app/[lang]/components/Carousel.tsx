"use client"

import * as React from "react"
import { Card, CardContent } from "@/app/[lang]/components/shared/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/[lang]/components/shared/ui/carousel"
import { getStrapiMedia } from "../utils/api-helpers"
import Image from "next/image"

interface PictureAttributes {
  url: string
  name: string
  alternativeText: string
}

interface Picture {
  data: {
    id: string
    attributes: PictureAttributes
  }[]
}

interface CarouselProps {
  data: {
    id: string
    title: string
    description: string
    images: Picture
  }
}

export default function CustomCarousel({ data }: CarouselProps) {
  const imgsArray = data?.images?.data || []
  console.log(data?.images)

  return (
    <div className="container mx-auto">
      <div className="px-28 py-16">
        <div className="px-4 lg:px-32 text-center">
          <div className="mb-12">
            <h2 className="text-2xl font-bold">{data?.title}</h2>
          </div>
          <div className="mb-12 h-[200px] flex justify-center items-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {imgsArray.map((img, index) => {
                  const convertedImg = getStrapiMedia(img?.attributes?.url)
                  return (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3 flex-shrink-0"
                    >
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-0">
                            <div className="relative w-full h-full">
                              <Image
                                src={convertedImg || ""}
                                alt={img?.attributes?.alternativeText || ""}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <p className="px-5 font-semibold mx-5 pt-2">{data?.description}</p>
        </div>
      </div>
    </div>
  )
}
