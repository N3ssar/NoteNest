import Note from "../models/Note.js";
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 means the newest notes first
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in "getAllNotes" controller =>', error);
    res.status(500).json({ message: "Internal server Error" });
  }
}
export async function getNote(req, res) {
  try {
    const noteId = req.params.id;
    const noteToGet = await Note.findById(noteId);
    if (!noteToGet) {
      return res
        .status(404)
        .json({ message: `Note "${noteId}" is not found!` });
    }

    res.status(200).json(noteToGet);
  } catch (error) {
    console.error('Error in "getNote" controller =>', error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error in "createNote" controller =>', error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;
    const noteToUpdate = await Note.findByIdAndUpdate(noteId, {
      title,
      content
    });
    if (!noteToUpdate) {
      return res.status(404).json({ message: `Note ${noteId} is not found!` });
    }
    res.status(200).json({ message: `Note "${noteId} updated successfully"` });
  } catch (error) {
    console.error('Error in "updateNote" controller =>', error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    const noteToDelete = await Note.findByIdAndDelete(noteId);
    if (!noteToDelete) {
      return res.status(404).json({ message: `Note ${noteId} is not found!` });
    }
    res.status(200).json({ message: `Note "${noteId} deleted successfully"` });
  } catch (error) {
    console.error('Error in "deleteNote" controller =>', error);
    res.status(500).json({ message: "Internal server Error" });
  }
}
