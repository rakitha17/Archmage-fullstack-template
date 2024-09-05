import Image from "next/image"
import React from "react"

import { getStrapiMedia } from "../utils/api-helpers"

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

interface GalleryComponent2Props {
  data: {
    id: string
    images: Picture
  }
}

export default function GalleryComponent2({ data }: GalleryComponent2Props) {
  const imgsArray = data?.images?.data || []

  return (
    <div className="container mx-auto">
      <div className="px-28 py-16">
        <div>
          <div className="grid grid-cols-12 gap-y-4 gap-x-4">
            {imgsArray.map((img, index) => {
              const imgUrl = getStrapiMedia(img.attributes.url)

              return (
                <div
                  className={
                    index % 4 === 0 || index % 4 === 3
                      ? "col-span-8"
                      : "col-span-4"
                  }
                  key={img.id}
                >
                  <span className="block h-80 w-full relative">
                    <Image
                      src={imgUrl || ""}
                      alt={img.attributes.alternativeText || ""}
                      layout="fill"
                      objectFit="cover"
                    />
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
