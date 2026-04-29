# Task 3 — React Fundamentals

This folder contains four small React applications that demonstrate the
core React concepts requested by the assignment:

| App              | Concepts Demonstrated                                      |
|------------------|------------------------------------------------------------|
| `counter-app`    | `useState`, `useEffect`, controlled inputs, conditional UI |
| `Todolist-app`   | Immutable array updates (spread / `map` / `filter`)        |
| `anecdotes-app`  | Voting with immutable array copies (`[...votes]`)          |
| `uniface-app`    | Multiple independent `useState` hooks, derived values      |

See [`questions.md`](./questions.md) for the written discussion answers
(in Arabic) about `push` vs `concat`, `[...votes]`, event handler binding,
and state structure.

## Running any app

```bash
cd <app-folder>
npm install
npm run dev
```

Then open the URL printed by Vite (typically http://localhost:5173).