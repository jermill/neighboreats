'use client'

import { useId, useState } from 'react'
import Button from './Button'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

interface FileUploadProps {
  label?: string
  accept?: string
  onChange?: (file: File | null) => void
  onUploaded?: (url: string) => void
  preview?: string
  buttonText?: string
  showPreview?: boolean
}

export default function FileUpload({
  label,
  accept = 'image/jpeg,image/png,image/webp',
  onChange,
  onUploaded,
  preview,
  buttonText = 'Choose File',
  showPreview = true,
}: FileUploadProps) {
  const inputId = useId()
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(preview)
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File) => {
    setUploading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Please log in to upload photos')
        return
      }

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const path = `${user.id}/${Date.now()}-${safeName}`
      const { error } = await supabase.storage.from('photos').upload(path, file)
      if (error) throw error

      const { data } = supabase.storage.from('photos').getPublicUrl(path)
      onUploaded?.(data.publicUrl)
    } catch (err: any) {
      console.error('Photo upload error:', err)
      toast.error(err.message || 'Photo upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      onChange?.(null)
      setPreviewUrl(undefined)
      return
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Please choose a JPEG, PNG, or WebP image')
      return
    }
    if (file.size > MAX_SIZE) {
      toast.error('Image must be under 5MB')
      return
    }

    onChange?.(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    if (onUploaded) {
      uploadFile(file)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <div className="flex items-center gap-4">
        {showPreview && previewUrl && (
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
            id={inputId}
            disabled={uploading}
          />
          <label htmlFor={inputId}>
            <Button as="span" variant="outline" size="sm" className="cursor-pointer" loading={uploading} disabled={uploading}>
              {uploading ? 'Uploading...' : buttonText}
            </Button>
          </label>
        </div>
      </div>
    </div>
  )
}
