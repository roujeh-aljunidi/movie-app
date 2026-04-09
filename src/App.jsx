import { useState } from "react";
import MovieList from "./MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  // REVIEW: Using Date.now() as an id can produce duplicates if two movies are
  // added in the same millisecond. Use a counter with useRef or crypto.randomUUID() instead.
  const addMovie = () => {
    if (title === "") return;

    // REVIEW: addMovie doesn't check whether we are currently editing (editingId !== null).
    // If the user is editing a movie and presses "Add Movie", a duplicate entry is created
    // with the edited text instead of updating the existing movie. Guard with:
    //   if (editingId !== null) return;
    setMovies([...movies, { id: Date.now(), title }]);
    setTitle("");
  };
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };
  const startEdit = (movie) => {
    setTitle(movie.title);
    setEditingId(movie.id);
  };
  const updateMovie = (id) => {
    setMovies(
      movies.map((movie) => (movie.id === id ? { ...movie, title } : movie)),
    );
    setEditingId(null);
    setTitle("");
  };
  // REVIEW: There is no "cancel edit" function. Once a user clicks edit,
  // the only way out is to save. Add a cancelEdit that resets editingId and title.

  // REVIEW: Inconsistent indentation throughout the return block below.
  // The outer <div> is indented 4 spaces, but the <MovieList> block (lines 58-66)
  // has zero indentation. Use consistent 2-space or 4-space indentation everywhere.
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      {/* REVIEW: All styling is done via inline styles instead of using the imported
          App.css file (which currently contains only unused Vite boilerplate).
          Move these styles to App.css for better maintainability. */}
      <h1>My Movie App</h1>
      <input
        type="text"
        placeholder="Enter movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "6px", marginRight: "10px" }}
      />
      {/* REVIEW: The button always says "Add Movie" even when the user is editing.
          It should switch to "Update Movie" when editingId is not null, and call
          updateMovie(editingId) instead of addMovie. */}
      <button
        onClick={addMovie}
        style={{ padding: "6px 12px", cursor: "pointer" }}
      >
        Add Movie
      </button>

      <p>Number of movies: {movies.length}</p>
      {movies.length === 0 && <p>No movies yet </p>}

      {/* REVIEW: The <MovieList> component receives 7 props (prop drilling).
    Consider using a context or combining related props into an object
    to reduce coupling between App and MovieList. */}
      <MovieList
        movies={movies}
        deleteMovie={deleteMovie}
        startEdit={startEdit}
        editingId={editingId}
        title={title}
        setTitle={setTitle}
        updateMovie={updateMovie}
      />
    </div>
  );
}

export default App;
