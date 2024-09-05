"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
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

interface GalleryComponent1Props {
  data: {
    id: string
    title: string
    description: string
    images: Picture
  }
}

export default function GalleryComponent1({ data }: GalleryComponent1Props) {
  const [imgArr, setImgArr] = useState<string[]>([])
  const [mainImg, setMainImg] = useState<string>("")

  const handleChangeImage = (img: string) => {
    setMainImg(img)
  }

  useEffect(() => {
    if (data) {
      const fetchedImgList = data.images?.data || []
      const convertedImages = fetchedImgList.map((img) =>
        getStrapiMedia(img?.attributes?.url)
      )

      setImgArr(convertedImages)
      if (convertedImages.length > 0) {
        setMainImg(convertedImages[0])
      }
    }
  }, [data])

  return (
    <div className="container mx-auto bg-white">
      <div className="px-28 py-16">
        <div className="flex items-center flex-col lg:flex-row lg:space-x-5 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-5">
              <h2 className="text-2xl lg:text-3xl font-bold">{data.title}</h2>
            </div>
            <div className="mb-5 lg:pr-5">
              <p>{data.description}</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-end">
            <div className="space-y-4 w-[400px]">
              <div className="flex justify-center h-[350px] lg:justify-end">
                <div className="w-full h-full relative">
                  <Image
                    src={mainImg || "/placeholder.jpg"}
                    alt="Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                {imgArr.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-[70px] h-[70px] relative border-2 border-black cursor-pointer"
                    onClick={() => handleChangeImage(img)}
                  >
                    <Image src={img} alt="Image" layout="fill" objectFit="cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
