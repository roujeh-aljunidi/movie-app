// REVIEW: This component receives 7 props — a sign of excessive prop drilling.
// title, setTitle, editingId, and updateMovie are only used for the inline
// edit form. Extract an EditableMovieItem sub-component that owns its own
// local editing state to simplify this interface.

function MovieList({
  movies,
  deleteMovie,
  startEdit,
  editingId,
  title,
  setTitle,
  updateMovie,
}) {
  return (
    // REVIEW: The <ul> has no styling and renders default browser bullet points.
    // Consider adding className or style to remove bullets and improve layout.
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          {editingId === movie.id ? (
            <>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
              {/* REVIEW: No way to cancel editing. Add a "Cancel" button
                                that resets editingId to null and restores the original title. */}
              <button onClick={() => updateMovie(movie.id)}>save</button>
            </>
          ) : (
            <>
              {movie.title}

              <button onClick={() => startEdit(movie)}>edit</button>

              {/* REVIEW: No confirmation before deleting. A misclick permanently
                                removes the movie. Consider adding a confirm dialog or undo. */}
              <button onClick={() => deleteMovie(movie.id)}>delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
