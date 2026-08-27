import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import RateLimitedUi from "../components/RateLimitedUi";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import Note from "../components/Note";
import CreateNoteDialog from "../components/CreateNoteDialog";
import DeleteNoteDialog from "../components/DeleteNoteDialog";

const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/");
        setNotes(res.data);
        console.log("EFFECT");
        setRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes", error);

        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load notes!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  console.log(notes);

  return (
    <main className="home-wallpaper min-h-screen">
      <Navbar onCreateNote={() => setCreateDialogOpen(true)} />
      <CreateNoteDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreated={(createdNote) =>
          setNotes((current) => [createdNote, ...current])
        }
      />
      <DeleteNoteDialog
        note={noteToDelete}
        open={Boolean(noteToDelete)}
        onClose={() => setNoteToDelete(null)}
        onDeleted={(deletedId) =>
          setNotes((current) =>
            current.filter((note) => note._id !== deletedId)
          )
        }
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {loading ? (
          <Skeleton />
        ) : rateLimited ? (
          <RateLimitedUi />
        ) : notes.length > 0 ? (
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                  Your collection
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-base-content">
                  Recent notes
                </h2>
              </div>
              <span className="badge badge-outline badge-lg shrink-0">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Note key={note._id} note={note} onDelete={setNoteToDelete} />
              ))}
            </div>
          </div>
        ) : (
          <p className="py-16 text-center text-base-content/60">
            No notes found. Create one!
          </p>
        )}
      </div>
    </main>
  );
};

export default HomePage;
