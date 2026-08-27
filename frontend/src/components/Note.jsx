import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import { useNavigate } from "react-router";

const Note = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const openNote = () => {
    navigate(`/notes/${note._id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openNote();
    }
  };

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openNote}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${note.title} to update or delete`}
      className="group flex min-h-56 cursor-pointer flex-col rounded-box border border-base-content/10 bg-base-200 p-5 shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="line-clamp-2 text-xl font-semibold leading-tight text-base-content">
          {note.title}
        </h2>
      </div>

      <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-base-content/70">
        {note.content}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-base-content/10 pt-4">
        <div className="flex items-center gap-2 text-xs text-base-content/50">
          <CalendarDays className="size-4" aria-hidden="true" />
          <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
        </div>
        <div className="flex shrink-0 gap-1">
          <span className="tooltip tooltip-top" data-tip="Update note">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openNote();
              }}
              aria-label={`Update ${note.title}`}
              className="btn btn-circle btn-ghost btn-sm text-primary hover:bg-primary/10"
            >
              <Pencil className="size-4" aria-hidden="true" />
            </button>
          </span>
          <span className="tooltip tooltip-top" data-tip="Delete note">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(note);
              }}
              aria-label={`Delete ${note.title}`}
              className="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/10"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </article>
  );
};

export default Note;
