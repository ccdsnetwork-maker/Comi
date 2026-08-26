from pathlib import Path

path = Path("components/admin/AdminDashboard.tsx")

if not path.exists():
    raise SystemExit("AdminDashboard.tsx not found")

text = path.read_text(encoding="utf-8")

backup = Path("components/admin/AdminDashboard.tsx.backup-before-icon-fix")
backup.write_text(text, encoding="utf-8")

print("BACKUP CREATED:", backup)

old = '["account", "My Account"],'
new = '["account", "My Account", Shield],'

if old in text:
    text = text.replace(old, new)
    path.write_text(text, encoding="utf-8")
    print("SUCCESS: Account tab icon fixed.")
elif new in text:
    print("NO CHANGE: Account tab already has icon.")
else:
    print("WARNING: Account tab entry not found.")

