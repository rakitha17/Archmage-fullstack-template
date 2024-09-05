import Image from "next/image"
import Link from "next/link"
import React from "react"
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

interface Url {
  id: string
  url: string
  text: string
}

interface TextMedia1Props {
  data: {
    id: string
    heading: string
    title: string
    link: Url
    description: string
    image: Picture
  }
}

export default function TextMedia1({ data }: TextMedia1Props) {
  const image = getStrapiMedia(data.image.data.attributes.url)
  const alt = data.image.data.attributes.alternativeText
  return (
    <div className="container mx-auto bg-white">
      <div className="px-28 py-16">
        <div className="space-y-4">
          <div className="w-3/4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">{data.heading}</h2>
          </div>
          <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:space-x-5 items-center">
              <div className="w-full h-[500px] lg:w-1/2 lg:pr-5">
                <div className="h-full relative lg:pr-5">
                  <Image
                    src={image || ""}
                    alt={alt || ""}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-5">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  {data.title}
                </h2>
                <p className="font-semibold mb-4 text-sm">{data.description}</p>
                <Link href={data.link.url}>{data.link.text}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
