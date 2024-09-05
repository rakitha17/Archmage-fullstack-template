import React from "react"
import { Button } from "./shared/ui/button"

export default function Navbar2({
  buttonLinks,
}: {
  buttonLinks: {
    url: string
    text: string
  }[]
}) {
  return (
    <div className="container mx-auto py-3 px-5 border-b-2">
      <div className="flex justify-end space-x-4">
        {buttonLinks.map((val: any, index: number) => (
          <Button
            key={index}
            className="bg-transparent hover:bg-transparent text-customBlue-light hover:text-customBlue-light shadow-none"
          >
            {val.text.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  )
}
