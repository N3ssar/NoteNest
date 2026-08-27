import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <main className="premium-page min-h-screen bg-base-100 px-4 py-8 text-base-content">
      <header className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
        >
          NoteNest
        </Link>
      </header>

      <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:py-36">
        <p className="mb-4 text-6xl font-black tracking-tight text-primary/80 sm:text-8xl">
          404
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Note not found
        </h1>
        <p className="mt-3 text-base text-base-content/60">
          This note may have been deleted.
        </p>
        <Link to="/" className="btn btn-primary mt-8 gap-2">
          <ArrowLeft className="size-4" aria-hidden="true" />
          View my notes
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
