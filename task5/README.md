# Task 5 — React + TypeScript Applications

> Advanced Programming 2 · Abdulmoin Hablas

This folder contains three independent React + TypeScript + Vite applications:

## 1. Course Info App (`course-info-app/`)

Displays an array of courses with their parts and exercise counts using typed
component composition: `Header`, `Content`, `Part`, `Total`, and `Course`.

```bash
cd course-info-app
npm install
npm run dev
```

## 2. Phonebook App (`phonebook-app/`)

A full CRUD phone directory that fetches data from **json-server**, supports
search filtering, adding new contacts, updating existing numbers, and deleting
entries — all via an Axios service module.

```bash
cd phonebook-app
npm install
# Start json-server in one terminal:
npm run server
# Start the dev server in another terminal:
npm run dev
```

## 3. Countries App (`countries-app/`) *(Optional)*

An explorer that queries the [REST Countries API](https://restcountries.com/)
with debounced search, auto-selects on a single match, and renders detailed
country information including flag, languages, and currencies.

```bash
cd countries-app
npm install
npm run dev
```

---

All three apps share the same visual language (dark glassmorphism theme) and
follow senior-level TypeScript conventions with strict mode enabled.