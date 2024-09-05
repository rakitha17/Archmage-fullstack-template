import Image from "next/image"
import Link from "next/link"
import React from "react"
//ANCHOR -
import { getStrapiMedia } from "../utils/api-helpers"

interface URL {
  url: string
  text: string
  newTab: boolean
}

interface Picture {
  data: {
    id: string
    attributes: {
      url: string
      name: string
      alternativeText: string
    }
  }
}

interface HeroBannerProps {
  data: {
    id: string
    title: string
    description: string
    link: URL
    picture: Picture
  }
}

export default function HeroBanner({ data }: HeroBannerProps) {
  const heroImage = getStrapiMedia(data.picture.data.attributes.url)
  console.log(data)
  return (
    <div>
      <div className="relative w-full h-[650px]">
        <div className="container mx-auto">
          <Image
            src={heroImage || ""}
            alt={''}
            layout="fill"
            objectFit="cover"
            className="z-10"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex flex-col justify-end px-28 py-16">
            <div className="mb-32">
              <h1 className="text-8xl text-white font-bold capitalize">
                {data.title.split(" ").map((word, index) =>
                  word.toLowerCase() === "template" ? (
                    <span key={index} className="block mt-4">
                      {word}
                    </span>
                  ) : (
                    <span key={index}>{word} </span>
                  )
                )}
              </h1>
            </div>
            <div className="w-2/4 mb-4">
              <p className="text-white">{data.description}</p>
            </div>
            <Link href={data.link.url} className="text-white">
              {data.link.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
