import { PlusIcon } from "lucide-react";

const Navbar = ({ onCreateNote }) => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <nav className="mx-auto max-w-6xl p-4 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            NoteNest
          </h1>

          <button
            type="button"
            onClick={onCreateNote}
            className="btn btn-primary"
          >
            <PlusIcon className="size-6" />
            <span>New Note</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
