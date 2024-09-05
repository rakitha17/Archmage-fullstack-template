import React from "react"
import Image from "next/image"
//ANCHOR -
import { getStrapiMedia } from "../utils/api-helpers"

interface Picture {
  data: {
    id: string
    attributes: {
      alternativeText: string
      url: string
      name: string
    }
  }
}

interface TextMediaProps {
  data: {
    id: string
    title: string
    description: string
    image: Picture
  }
}

export default function TextMedia({ data }: TextMediaProps) {
  const image = getStrapiMedia(data?.image?.data?.attributes?.url)
  return (
    <div className="container mx-auto bg-white">
      <div className="px-28 py-16">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 lg:gap-y-0 lg:gap-x-5">
            <div className="flex items-center">
              <div className="relative w-full h-[400px]">
                <Image
                  src={image || ""}
                  alt={"Image"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="mt-5 lg:mt-0 lg:pl-5 flex items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold">{data.title}</h2>
                <p className="text-sm">
                  <small>{data.description}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
