import { LoaderCircle, Plus, X } from "lucide-react";
import api from "../lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateNoteDialog = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    try {
      setSaving(true);
      const response = await api.post("/", {
        title: form.title.trim(),
        content: form.content.trim()
      });
      toast.success("Note created successfully.");
      setForm({ title: "", content: "" });
      onCreated(response.data);
      onClose();
    } catch {
      toast.error("Could not create the note.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box premium-surface border border-base-content/10 bg-base-200 p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
              NoteNest
            </p>
            <h2 className="text-2xl font-bold">Create a new note</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Close create note dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="form-control w-full block mb-2 ">
            <span className="label-text block mb-0.5  font-semibold">
              Title
            </span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={120}
              className="input input-bordered w-full bg-base-100"
              placeholder="What is this note about?"
              required
              autoFocus
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text block mb-0.5 font-semibold">
              Content
            </span>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="textarea textarea-bordered min-h-40 w-full resize-y bg-base-100 leading-6"
              placeholder="Capture the thought while it is fresh..."
              required
            />
          </label>
          <div className="modal-action mt-7">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary min-w-32"
              disabled={saving}
            >
              {saving ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              {saving ? "Creating..." : "Create note"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default CreateNoteDialog;
