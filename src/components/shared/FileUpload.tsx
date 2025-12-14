import { useState } from 'react'
import Button from './Button'

interface FileUploadProps {
  label?: string
  accept?: string
  onChange: (file: File | null) => void
  preview?: string
}

export default function FileUpload({ label, accept = 'image/*', onChange, preview }: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(preview)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      onChange(null)
      setPreviewUrl(undefined)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="flex items-center gap-4">
        {previewUrl && (
          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="flex-1">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button as="span" variant="outline" size="sm" className="cursor-pointer">
              Choose File
            </Button>
          </label>
        </div>
      </div>
    </div>
  )
}

