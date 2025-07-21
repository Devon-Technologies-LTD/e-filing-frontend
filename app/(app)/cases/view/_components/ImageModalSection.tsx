"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Props {
  data: {
    seal_path?: string
    qrcode_path?: string
  }
}

export default function ImageModalSection({ data }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="flex gap-2">
      {/* Seal Image */}
      {data?.seal_path && (
        <Dialog>
          <DialogTrigger asChild>
            <img
              src={data.seal_path}
              className="h-10 w-10 cursor-pointer rounded"
              alt="Seal"
              onClick={() => {
                if (data.seal_path) {
                  setSelectedImage(data.seal_path)
                }
              }}
            />
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <img
              src={selectedImage ?? ""}
              alt="Seal Full"
              className="w-full h-auto rounded"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* QR Code Image */}
      {data?.qrcode_path && (
        <Dialog>
          <DialogTrigger asChild>
            <img
              src={data.qrcode_path}
              className="h-10 w-10 cursor-pointer rounded"
              alt="QR Code"
              onClick={() => {
                if (data.qrcode_path) {
                  setSelectedImage(data.qrcode_path)
                }
              }}
            />
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <img
              src={selectedImage ?? ""}
              alt="QR Code Full"
              className="w-full h-auto rounded"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
