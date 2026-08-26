from pathlib import Path
import re

path = Path("components/admin/AdminDashboard.tsx")

if not path.exists():
    raise SystemExit("AdminDashboard.tsx not found")

text = path.read_text(encoding="utf-8")

backup = Path(
    "components/admin/AdminDashboard.tsx.backup-before-account-update"
)
backup.write_text(text, encoding="utf-8")

print("BACKUP CREATED:", backup)


# 1. Add account state
if "const [accountForm" not in text:
    text = text.replace(
        '''const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
    name: "",
  })''',
        '''const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
    name: "",
  })

  const [accountForm, setAccountForm] = useState({
    username: username,
    password: "",
  })'''
    )
    print("Added account state.")
else:
    print("Account state already exists.")


# 2. Add update function
if "async function updateMyAccount" not in text:

    marker = "  async function createAdmin(event: React.FormEvent) {"

    update_function = r'''
  async function updateMyAccount(event: React.FormEvent) {
    event.preventDefault()
    clearNotice()

    try {
      setLoading(true)

      const response = await fetch("/api/admin/admins", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: accountForm.username,
          password: accountForm.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Unable to update account.")
      }

      setSuccess(
        "Account updated successfully. Please login again with your new details."
      )

      setAccountForm({
        username: accountForm.username,
        password: "",
      })

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update account."
      )
    } finally {
      setLoading(false)
    }
  }

'''

    if marker in text:
        text = text.replace(marker, update_function + marker)
        print("Added update function.")
    else:
        print("Could not find createAdmin marker.")


# 3. Add account tab
if '["account", "My Account"]' not in text:

    text = text.replace(
        '["admins", "Administrators", Shield],',
        '["admins", "Administrators", Shield],\n            ["account", "My Account"],'
    )

    print("Added account tab.")
else:
    print("Account tab already exists.")


# 4. Add account section
if "{activeTab === \"account\"" not in text:

    marker = '{activeTab === "admins" && ('

    section = r'''
{activeTab === "account" && (
  <section>
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        My Account
      </h2>

      <p className="text-sm text-white/50">
        Update only your own username and password.
      </p>
    </div>

    <form
      onSubmit={updateMyAccount}
      className="max-w-xl space-y-5 rounded-3xl border border-white/10 bg-white/[0.06] p-6"
    >

      <div>
        <label className="mb-2 block text-sm text-white/70">
          Username
        </label>

        <input
          value={accountForm.username}
          onChange={(e)=>
            setAccountForm({
              ...accountForm,
              username:e.target.value
            })
          }
          className="w-full rounded-xl bg-white/10 px-4 py-3"
        />
      </div>


      <div>
        <label className="mb-2 block text-sm text-white/70">
          New Password
        </label>

        <input
          type="password"
          placeholder="Leave empty to keep current password"
          value={accountForm.password}
          onChange={(e)=>
            setAccountForm({
              ...accountForm,
              password:e.target.value
            })
          }
          className="w-full rounded-xl bg-white/10 px-4 py-3"
        />
      </div>


      <button
        disabled={loading}
        className="rounded-xl bg-[#F4C542] px-5 py-3 font-bold text-[#07111F]"
      >
        {loading ? "Updating..." : "Update Account"}
      </button>

    </form>
  </section>
)}

'''

    if marker in text:
        text = text.replace(marker, section + marker)
        print("Added account page.")
    else:
        print("Could not find admins section marker.")


path.write_text(text, encoding="utf-8")

print("\nSUCCESS: Admin self account update added.")
