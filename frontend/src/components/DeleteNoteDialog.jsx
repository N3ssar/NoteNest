import { AlertTriangle, LoaderCircle, Trash2, X } from "lucide-react";
import api from "../lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteNoteDialog = ({ note, open, onClose, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/${note._id}`);
      toast.success("Note deleted.");
      onDeleted(note._id);
      onClose();
    } catch {
      toast.error("Could not delete the note.");
    } finally {
      setDeleting(false);
    }
  };

  if (!open || !note) return null;

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box premium-surface border border-base-content/10 bg-base-200 p-6 shadow-xl sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
            <AlertTriangle className="size-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Delete this note?</h2>
            <p className="mt-2 text-sm leading-6 text-base-content/65">
              “{note.title}” will be permanently removed. This action cannot be
              undone.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Close delete confirmation"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="modal-action mt-8">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="btn btn-ghost"
          >
            Keep note
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="btn btn-error"
          >
            {deleting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            {deleting ? "Deleting..." : "Delete note"}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default DeleteNoteDialog;
