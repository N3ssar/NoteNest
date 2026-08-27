import {
  ArrowLeft,
  CalendarDays,
  Check,
  LoaderCircle,
  Save,
  Trash2
} from "lucide-react";
import api from "../lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import DeleteNoteDialog from "../components/DeleteNoteDialog";

const EditNoteSkeleton = () => (
  <div className="premium-page min-h-screen px-4 py-8 text-base-content">
    <div className="mx-auto max-w-4xl animate-pulse sm:px-2">
      <div className="mb-10 h-5 w-28 rounded bg-base-content/10" />
      <div className="premium-surface rounded-box border border-base-content/10 bg-base-200 p-6 shadow-sm sm:p-10">
        <div className="mb-8 h-10 w-2/3 rounded bg-base-content/10" />
        <div className="mb-3 h-4 w-32 rounded bg-base-content/10" />
        <div className="h-52 rounded-box bg-base-content/10" />
      </div>
    </div>
  </div>
);

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/${id}`);
        setNote(response.data);
        setForm({ title: response.data.title, content: response.data.content });
      } catch (error) {
        if (error.response?.status === 404) setNotFound(true);
        else {
          setLoadError(true);
          toast.error("Failed to load note.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Add a title and some content first.");
      return;
    }

    try {
      setSaving(true);
      const updatedForm = {
        title: form.title.trim(),
        content: form.content.trim()
      };
      await api.put(`/${id}`, updatedForm);
      setNote((current) => ({ ...current, ...updatedForm }));
      toast.success("Note updated successfully.");
      navigate("/");
    } catch {
      toast.error("Could not update the note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <EditNoteSkeleton />;

  if (notFound || loadError || !note) {
    return (
      <main className="premium-page min-h-screen px-4 py-8 text-base-content">
        <header className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
          >
            NoteNest
          </Link>
        </header>
        <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:py-32">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {notFound ? "Note unavailable" : "Could not load note"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {notFound ? "Note not found" : "Something went wrong"}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-base-content/60">
            {notFound
              ? "This note may have been deleted or the link is no longer valid."
              : "The note could not be loaded. Check your connection and try again."}
          </p>
          <Link to="/" className="btn btn-primary mt-8 gap-2">
            <ArrowLeft className="size-4" /> Back to notes
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="home-wallpaper min-h-screen">
      <header className="border-b border-base-content/10 bg-base-300/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight text-primary"
          >
            NoteNest
          </Link>
          <span className="text-sm text-base-content/60">Edit workspace</span>
        </div>
      </header>
      <DeleteNoteDialog
        note={note}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDeleted={() => navigate("/")}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          to="/"
          className="btn btn-ghost btn-sm mb-8 gap-2 px-2 text-base-content/70"
        >
          <ArrowLeft className="size-4" /> Back to notes
        </Link>

        <form
          onSubmit={handleUpdate}
          className="premium-surface rounded-box border border-base-content/10 bg-base-200 p-6 shadow-sm sm:p-10"
        >
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-base-content/10 pb-6">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                Note workspace
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Update note
              </h1>
              <div className="mt-3 flex items-center gap-2 text-xs text-base-content/50">
                <CalendarDays className="size-4" />
                <time dateTime={note.createdAt}>
                  Created{" "}
                  {new Date(note.createdAt).toLocaleDateString("en-US", {
                    dateStyle: "medium"
                  })}
                </time>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={saving}
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
            >
              <Trash2 className="size-4" />
              Delete note
            </button>
          </div>

          <div className="space-y-6">
            <label className="form-control w-full">
              <span className="label-text mb-2 font-semibold">Title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={120}
                className="input input-bordered input-lg w-full bg-base-100"
                placeholder="Give your note a clear title"
                required
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text mb-2 font-semibold">Content</span>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="textarea textarea-bordered min-h-64 w-full resize-y bg-base-100 text-base leading-7"
                placeholder="Write your thoughts..."
                required
              />
            </label>
          </div>

          <div className="mt-8 flex justify-end border-t border-base-content/10 pt-6">
            <button
              type="submit"
              disabled={saving || deleteDialogOpen}
              className="btn btn-primary min-w-32"
            >
              {saving ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "Saving..." : "Save changes"}
              {!saving && <Check className="size-4 opacity-60" />}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditNotePage;
