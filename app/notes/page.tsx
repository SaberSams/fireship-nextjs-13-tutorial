import Link from "next/link"
import styles from "./notes.module.css"
import CreateNote from "./CreateNote"

async function getNotes(
  page: number = 1,
  perPage: number = 30
) {

  const res = await fetch("http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30", {cache: "no-cache"})
  const json = await res.json()
  return json?.items as any[]
}

export default async function NotesPage() {
  const notes = await getNotes()

  return (
    <div>
      <h1>Notes Page</h1>
      <div className={styles.grid}>
      {notes.map((note) => {
        return <Note key={note.id} note={note} />
      })}
    </div>
      <CreateNote />
    </div>
  )
}

function Note({ note }: { note: any }) {
  const { id, title, content, created } = note || {}

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  )
}