from pathlib import Path

path = Path("components/admin/AdminDashboard.tsx")
text = path.read_text(encoding="utf-8")

# Add clearNotice prop when calling ProgrammeItem
old = """setUploadingType={setUploadingType}
                    setError={setError}
                    addMedia={addMedia}"""

new = """setUploadingType={setUploadingType}
                    setError={setError}
                    clearNotice={clearNotice}
                    addMedia={addMedia}"""

if old in text:
    text = text.replace(old, new)
    print("Added clearNotice to ProgrammeItem call.")
else:
    print("ProgrammeItem call pattern not found.")


# Add destructuring
old2 = """  uploadingType,
  setUploadingType,
  setError,
  addMedia,"""

new2 = """  uploadingType,
  setUploadingType,
  setError,
  clearNotice,
  addMedia,"""

if old2 in text:
    text = text.replace(old2, new2)
    print("Added clearNotice destructuring.")
else:
    print("Destructuring pattern not found.")


# Add type
old3 = """  setUploadingType: React.Dispatch<
    React.SetStateAction<"photo" | "video" | null>
  >
  setError: React.Dispatch<React.SetStateAction<string>>
  addMedia:"""

new3 = """  setUploadingType: React.Dispatch<
    React.SetStateAction<"photo" | "video" | null>
  >
  setError: React.Dispatch<React.SetStateAction<string>>
  clearNotice: () => void
  addMedia:"""

if old3 in text:
    text = text.replace(old3, new3)
    print("Added clearNotice type.")
else:
    print("Type pattern not found.")


path.write_text(text, encoding="utf-8")
print("DONE")
