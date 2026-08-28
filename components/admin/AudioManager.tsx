"use client"

import { useEffect, useState } from "react"
import {
  FileAudio,
  Loader2,
  Trash2,
  Upload,
  Play,
} from "lucide-react"

type AudioItem = {
  id: string
  title: string
  description?: string
  url: string
  publicId?: string
  uploadedBy?: string
  uploadedAt?: any
}

export default function AudioManager() {
  const [audio, setAudio] = useState<AudioItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  async function loadAudio() {
    try {
      setLoading(true)

      const response = await fetch("/api/admin/audio", {
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Unable to load audio.")
      }

      setAudio(data.audio || [])
    } catch (error) {
      console.error("Load audio error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAudio()
  }, [])

  async function uploadAudio(event: React.FormEvent) {
    event.preventDefault()

    if (!form.title.trim()) {
      alert("Please enter an audio title.")
      return
    }

    if (!selectedFile) {
      alert("Please select an audio file.")
      return
    }

    try {
      setUploading(true)

      const cloudinaryName =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

      const uploadPreset =
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      if (!cloudinaryName || !uploadPreset) {
        throw new Error(
          "Cloudinary configuration is missing. Check your environment variables."
        )
      }

      const formData = new FormData()

      formData.append("file", selectedFile)
      formData.append("upload_preset", uploadPreset)
      formData.append("folder", "comi/audio")

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok || !uploadData.secure_url) {
        throw new Error(
          uploadData.error?.message ||
            "Unable to upload audio to Cloudinary."
        )
      }

      const saveResponse = await fetch("/api/admin/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          url: uploadData.secure_url,
          publicId: uploadData.public_id || "",
        }),
      })

      const saveData = await saveResponse.json()

      if (!saveResponse.ok) {
        throw new Error(
          saveData.error || "Unable to save audio."
        )
      }

      setForm({
        title: "",
        description: "",
      })

      setSelectedFile(null)

      const fileInput = document.getElementById(
        "comi-audio-file"
      ) as HTMLInputElement | null

      if (fileInput) {
        fileInput.value = ""
      }

      await loadAudio()

      alert("Audio uploaded successfully.")
    } catch (error) {
      console.error("Upload audio error:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Unable to upload audio."
      )
    } finally {
      setUploading(false)
    }
  }

  async function deleteAudio(id: string) {
    if (!confirm("Delete this audio? This cannot be undone.")) {
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/admin/audio", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to delete audio."
        )
      }

      await loadAudio()
    } catch (error) {
      console.error("Delete audio error:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete audio."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Audio</h2>

        <p className="mt-1 text-sm leading-6 text-white/50">
          Upload sermons, teachings, messages and other audio
          materials for visitors to listen to or download.
        </p>
      </div>

      <form
        onSubmit={uploadAudio}
        className="mb-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4C542] text-[#07111F]">
            <FileAudio size={21} />
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Upload Audio
            </h3>

            <p className="text-sm text-white/40">
              Add a new audio resource
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Audio Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                setForm({
                  ...form,
                  title: event.target.value,
                })
              }
              placeholder="e.g. Sunday Sermon - Walking by Faith"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#F4C542]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description: event.target.value,
                })
              }
              placeholder="Brief description of the audio..."
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#F4C542]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Audio File
            </label>

            <label
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-5 py-8 text-center transition hover:bg-white/[0.05] ${
                uploading
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <Upload size={25} className="mb-3 text-[#F4C542]" />

              {selectedFile ? (
                <>
                  <p className="font-semibold">
                    {selectedFile.name}
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {(
                      selectedFile.size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold">
                    Select an audio file
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    MP3, WAV, M4A and other supported audio formats
                  </p>
                </>
              )}

              <input
                id="comi-audio-file"
                type="file"
                accept="audio/*"
                className="hidden"
                disabled={uploading}
                onChange={(event) => {
                  setSelectedFile(
                    event.target.files?.[0] || null
                  )
                }}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 font-bold text-[#07111F] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {uploading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              Upload Audio
            </>
          )}
        </button>
      </form>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              Uploaded Audio
            </h3>

            <p className="text-sm text-white/40">
              {audio.length} audio{" "}
              {audio.length === 1 ? "file" : "files"}
            </p>
          </div>

          {loading && (
            <Loader2
              size={19}
              className="animate-spin text-[#F4C542]"
            />
          )}
        </div>

        {audio.length === 0 && !loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <FileAudio
              size={35}
              className="mx-auto mb-3 text-white/30"
            />

            <p className="font-semibold">
              No audio uploaded yet.
            </p>

            <p className="mt-1 text-sm text-white/40">
              Upload your first audio resource above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {audio.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4C542] text-[#07111F]">
                      <FileAudio size={21} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold">
                        {item.title}
                      </h4>

                      {item.description && (
                        <p className="mt-1 text-sm leading-6 text-white/50">
                          {item.description}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-white/30">
                        Uploaded by{" "}
                        {item.uploadedBy || "Admin"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      deleteAudio(item.id)
                    }
                    className="flex w-fit items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/50">
                    <Play size={14} />
                    Preview
                  </div>

                  <audio
                    controls
                    preload="metadata"
                    className="w-full"
                    src={item.url}
                  >
                    Your browser does not support audio playback.
                  </audio>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
