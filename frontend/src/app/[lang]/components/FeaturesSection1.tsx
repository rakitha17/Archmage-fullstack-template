"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
//ANCHOR -
import { getStrapiMedia } from "../utils/api-helpers"
//ANCHOR -
import {
  Card,
  CardContent,
} from "@/app/[lang]/components/shared/ui/card"

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

interface FeatureArray {
  id: string
  title: string
  description: string
  media: Picture
  url: string
  newTab: boolean
  text: string
}

interface Feature {
  id: string
  features: FeatureArray[]
}

interface FeaturesSection1Props {
  data: Feature
}

export default function FeaturesSection1({ data }: FeaturesSection1Props) {
  return (
    <div className="container mx-auto">
      <div className="px-28 py-16 flex flex-col lg:flex-row lg:justify-between">
        {Array.isArray(data.features) &&
          data.features.map((val: any, index: number) => (
            <React.Fragment key={index}>
              <Card className="flex items-center w-full lg:max-w-full p-6 rounded-none shadow-none border-0 bg-transparent">
                <CardContent className="flex flex-col lg:flex-row lg:space-y-0 space-y-4 w-full">
                  <div className="w-2/12 flex items-start justify-center mr-6 lg:mr-8">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Image
                        src={
                          getStrapiMedia(val.media.data?.attributes?.url) || ""
                        }
                        alt={val.media.data?.attributes?.alternativeText}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="w-10/12">
                    <h2 className="text-2xl font-bold mb-3">{val.title}</h2>
                    <div className="mb-5">
                      <p className="text-sm">{val.description}</p>
                    </div>
                    <Link href={val.url}>{val.text}</Link>
                  </div>
                </CardContent>
              </Card>
              {index < data.features.length - 1 && (
                <div className="hidden lg:flex lg:w-2 lg:h-auto bg-gray-300 mx-16" />
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}
