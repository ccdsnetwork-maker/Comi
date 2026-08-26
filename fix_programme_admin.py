from pathlib import Path
import re
import shutil
from datetime import datetime

path = Path("components/admin/AdminDashboard.tsx")

if not path.exists():
    raise SystemExit("ERROR: components/admin/AdminDashboard.tsx was not found.")

text = path.read_text(encoding="utf-8")

# ---------------------------------------------------------
# BACKUP
# ---------------------------------------------------------
backup = path.with_name(
    f"AdminDashboard.tsx.backup-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
)
shutil.copy2(path, backup)
print(f"BACKUP CREATED: {backup}")

original = text

# ---------------------------------------------------------
# 1. Make the Edit button open the programme editor AND
#    expand the selected programme so media is visible.
# ---------------------------------------------------------
old_edit_handler = '''onEdit={() => {
                      setEditingProgramme(programme)
                      setProgrammeForm({
                        title: programme.title || "",
                        description: programme.description || "",
                        date: programme.date || "",
                        time: programme.time || "",
                        venue: programme.venue || "",
                        category: programme.category || "",
                      })
                      setShowProgrammeForm(true)
                    }}'''

new_edit_handler = '''onEdit={() => {
                      setEditingProgramme(programme)
                      setSelectedProgramme(programme)
                      setProgrammeForm({
                        title: programme.title || "",
                        description: programme.description || "",
                        date: programme.date || "",
                        time: programme.time || "",
                        venue: programme.venue || "",
                        category: programme.category || "",
                      })
                      setShowProgrammeForm(true)
                    }}'''

if old_edit_handler in text:
    text = text.replace(old_edit_handler, new_edit_handler, 1)
    print("OK: Edit button now opens the selected programme and its media.")
else:
    # Try a more flexible replacement if formatting differs.
    pattern = re.compile(
        r'onEdit=\{\(\) => \{\s*'
        r'setEditingProgramme\(programme\)\s*'
        r'setProgrammeForm\(\{\s*'
        r'title: programme\.title \|\| "",\s*'
        r'description: programme\.description \|\| "",\s*'
        r'date: programme\.date \|\| "",\s*'
        r'time: programme\.time \|\| "",\s*'
        r'venue: programme\.venue \|\| "",\s*'
        r'category: programme\.category \|\| "",\s*'
        r'\}\)\s*'
        r'setShowProgrammeForm\(true\)\s*'
        r'\}\}',
        re.MULTILINE
    )

    replacement = '''onEdit={() => {
                      setEditingProgramme(programme)
                      setSelectedProgramme(programme)
                      setProgrammeForm({
                        title: programme.title || "",
                        description: programme.description || "",
                        date: programme.date || "",
                        time: programme.time || "",
                        venue: programme.venue || "",
                        category: programme.category || "",
                      })
                      setShowProgrammeForm(true)
                    }}'''

    text, count = pattern.subn(replacement, text, count=1)

    if count:
        print("OK: Edit button now opens the selected programme and its media.")
    else:
        print("WARNING: Existing Edit handler was not changed.")

# ---------------------------------------------------------
# 2. Pass setUploadingType and setError into ProgrammeItem.
# ---------------------------------------------------------
programme_item_call_pattern = re.compile(
    r'(<ProgrammeItem\s+'
    r'key=\{programme\.id\}\s+'
    r'programme=\{programme\}\s+'
    r'expanded=\{selectedProgramme\?\.id === programme\.id\}\s+'
    r'onOpen=\{\(\) =>\s*'
    r'setSelectedProgramme\(\s*'
    r'selectedProgramme\?\.id === programme\.id\s*\?\s*null\s*:\s*programme\s*'
    r'\)\}\s+'
    r'onPublish=\{\(\) => togglePublished\(programme\)\}\s+'
    r'onDelete=\{\(\) => deleteProgramme\(programme\)\}\s+'
    r'(?:onEdit=\{.*?\}\s+)?'
    r'uploadingType=\{uploadingType\}\s+'
    r'addMedia=\{addMedia\}\s*/>)',
    re.DOTALL
)

match = programme_item_call_pattern.search(text)

if match:
    block = match.group(1)

    if "setUploadingType={setUploadingType}" not in block:
        block = block.replace(
            "uploadingType={uploadingType}",
            "uploadingType={uploadingType}\n                    setUploadingType={setUploadingType}"
        )

    if "setError={setError}" not in block:
        block = block.replace(
            "setUploadingType={setUploadingType}",
            "setUploadingType={setUploadingType}\n                    setError={setError}"
        )

    text = text[:match.start(1)] + block + text[match.end(1):]
    print("OK: Upload state/error setters passed to ProgrammeItem.")
else:
    # Fallback: locate the simple addMedia line near ProgrammeItem.
    idx = text.find("addMedia={addMedia}")

    if idx != -1:
        before = text[:idx]
        after = text[idx:]

        if "setUploadingType={setUploadingType}" not in before[-1200:]:
            after = after.replace(
                "addMedia={addMedia}",
                "setUploadingType={setUploadingType}\n"
                "                    setError={setError}\n"
                "                    addMedia={addMedia}",
                1
            )
            text = before + after
            print("OK: Upload state/error setters passed using fallback.")
        else:
            print("OK: Upload state/error setters already appear to be passed.")
    else:
        print("ERROR: Could not locate ProgrammeItem call.")
        raise SystemExit(1)

# ---------------------------------------------------------
# 3. Add setError to ProgrammeItem props if missing.
# ---------------------------------------------------------
if "setError: React.Dispatch<React.SetStateAction<string>>" not in text:
    marker = '''  setUploadingType: React.Dispatch<
    React.SetStateAction<"photo" | "video" | null>
  >'''

    replacement = '''  setUploadingType: React.Dispatch<
    React.SetStateAction<"photo" | "video" | null>
  >
  setError: React.Dispatch<React.SetStateAction<string>>'''

    if marker in text:
        text = text.replace(marker, replacement, 1)
        print("OK: setError added to ProgrammeItem props.")
    else:
        print("ERROR: Could not locate ProgrammeItem uploadingType prop.")
        raise SystemExit(1)
else:
    print("OK: setError prop already exists.")

# ---------------------------------------------------------
# 4. Make sure ProgrammeItem actually receives setUploadingType.
# ---------------------------------------------------------
if "setUploadingType: React.Dispatch" not in text:
    raise SystemExit("ERROR: ProgrammeItem setUploadingType prop is missing.")

# ---------------------------------------------------------
# 5. Ensure upload controls remain inside expanded programme.
# ---------------------------------------------------------
required_media_markers = [
    'Upload Picture',
    'Upload Video',
    'programme.photos',
    'programme.videos',
]

for marker in required_media_markers:
    if marker not in text:
        raise SystemExit(
            f"ERROR: Expected programme media code missing: {marker}"
        )

print("OK: Programme picture/video controls are still present.")

# ---------------------------------------------------------
# 6. Prevent accidental duplicate setter props.
# ---------------------------------------------------------
text = re.sub(
    r'(setUploadingType=\{setUploadingType\}\s*)+',
    'setUploadingType={setUploadingType}\n                    ',
    text
)

text = re.sub(
    r'(setError=\{setError\}\s*)+',
    'setError={setError}\n                    ',
    text
)

# ---------------------------------------------------------
# 7. Final validation
# ---------------------------------------------------------
checks = {
    "parent uploading state":
        'const [uploadingType, setUploadingType]' in text,

    "ProgrammeItem uploading prop":
        'setUploadingType: React.Dispatch' in text,

    "ProgrammeItem error prop":
        'setError: React.Dispatch<React.SetStateAction<string>>' in text,

    "setter passed to ProgrammeItem":
        'setUploadingType={setUploadingType}' in text,

    "error setter passed to ProgrammeItem":
        'setError={setError}' in text,

    "media upload picture":
        'Upload Picture' in text,

    "media upload video":
        'Upload Video' in text,

    "edit programme state":
        'setEditingProgramme(programme)' in text,

    "edit expands selected programme":
        'setSelectedProgramme(programme)' in text,

    "updateProgramme":
        'async function updateProgramme' in text,
}

failed = [name for name, ok in checks.items() if not ok]

if failed:
    print("\nVALIDATION FAILED:")
    for item in failed:
        print(" -", item)

    print("\nRESTORING BACKUP...")
    shutil.copy2(backup, path)
    raise SystemExit(1)

# ---------------------------------------------------------
# Write only if changes were made.
# ---------------------------------------------------------
if text == original:
    print("NO CHANGES WERE NECESSARY.")
else:
    path.write_text(text, encoding="utf-8")
    print("\nSUCCESS: Admin programme fixes applied safely.")

print(f"Backup remains at: {backup}")
