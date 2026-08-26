from pathlib import Path
import shutil
from datetime import datetime

path = Path("components/admin/AdminDashboard.tsx")

if not path.exists():
    raise SystemExit("ERROR: AdminDashboard.tsx not found.")

text = path.read_text(encoding="utf-8")

# Backup
backup = path.with_name(
    f"AdminDashboard.tsx.backup-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
)
shutil.copy2(path, backup)
print(f"BACKUP CREATED: {backup}")

# ---------------------------------------------------------
# 1. Pass setError into ProgrammeItem
# ---------------------------------------------------------

old = '''                    uploadingType={uploadingType}
                    setUploadingType={setUploadingType}
                    addMedia={addMedia}'''

new = '''                    uploadingType={uploadingType}
                    setUploadingType={setUploadingType}
                    setError={setError}
                    addMedia={addMedia}'''

if old not in text:
    raise SystemExit(
        "ERROR: Expected ProgrammeItem props block was not found. "
        "Nothing was changed."
    )

text = text.replace(old, new, 1)
print("OK: setError is now passed to ProgrammeItem.")

# ---------------------------------------------------------
# 2. Add setError to ProgrammeItem destructuring
# ---------------------------------------------------------

old = '''  onEdit,
  uploadingType,
  setUploadingType,
  addMedia,
}: {'''

new = '''  onEdit,
  uploadingType,
  setUploadingType,
  setError,
  addMedia,
}: {'''

if old not in text:
    raise SystemExit(
        "ERROR: ProgrammeItem destructuring block was not found. "
        "Nothing was changed."
    )

text = text.replace(old, new, 1)
print("OK: setError added to ProgrammeItem destructuring.")

# ---------------------------------------------------------
# 3. Add setError to ProgrammeItem TypeScript props
# ---------------------------------------------------------

old = '''  setUploadingType: React.Dispatch<
    React.SetStateAction<"photo" | "video" | null>
  >
  addMedia: ('''

new = '''  setUploadingType: React.Dispatch<
    React.SetStateAction<"photo" | "video" | null>
  >
  setError: React.Dispatch<React.SetStateAction<string>>
  addMedia: ('''

if old not in text:
    raise SystemExit(
        "ERROR: ProgrammeItem TypeScript props block was not found. "
        "Nothing was changed."
    )

text = text.replace(old, new, 1)
print("OK: setError TypeScript prop added.")

# ---------------------------------------------------------
# 4. Make Edit select the programme as well.
# ---------------------------------------------------------

old = '''                    onEdit={() => {
                      setProgrammeForm({
                        title: programme.title || "",
                        description: programme.description || "",
                        date: programme.date || "",
                        time: programme.time || "",
                        venue: programme.venue || "",
                        category: programme.category || "",
                      })
                      setEditingProgramme(programme)
                      setShowProgrammeForm(true)
                    }}'''

new = '''                    onEdit={() => {
                      setProgrammeForm({
                        title: programme.title || "",
                        description: programme.description || "",
                        date: programme.date || "",
                        time: programme.time || "",
                        venue: programme.venue || "",
                        category: programme.category || "",
                      })
                      setEditingProgramme(programme)
                      setSelectedProgramme(programme)
                      setShowProgrammeForm(true)
                    }}'''

if old not in text:
    raise SystemExit(
        "ERROR: Existing Edit handler was not found. "
        "Nothing was changed."
    )

text = text.replace(old, new, 1)
print("OK: Edit now selects the programme and keeps its media visible.")

# ---------------------------------------------------------
# 5. Validate expected pieces
# ---------------------------------------------------------

required = [
    'setError={setError}',
    'setError,',
    'setError: React.Dispatch<React.SetStateAction<string>>',
    'setSelectedProgramme(programme)',
    'setUploadingType={setUploadingType}',
    'Upload Picture',
    'Upload Video',
    'async function updateProgramme',
]

missing = [item for item in required if item not in text]

if missing:
    print("\nVALIDATION FAILED:")
    for item in missing:
        print(" -", item)

    print("\nRESTORING BACKUP...")
    shutil.copy2(backup, path)
    raise SystemExit(1)

path.write_text(text, encoding="utf-8")

print()
print("==============================================")
print("SUCCESS: PROGRAMME ADMIN FIX APPLIED")
print("==============================================")
print("1. setUploadingType is passed correctly.")
print("2. setError is passed correctly.")
print("3. Picture upload handler can now use setError.")
print("4. Video upload handler can now use setError.")
print("5. Edit selects the programme.")
print("6. Existing pictures/videos remain available.")
print()
print(f"Backup: {backup}")
