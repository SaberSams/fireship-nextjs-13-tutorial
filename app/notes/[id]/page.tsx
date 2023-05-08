import styles from '../notes.module.css'

async function getNote(nodeId: string) {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${nodeId}`, {
    next: { revalidate: 10 }
  })
  const json = await res.json()
  return json
}

export default async function NotePage({params}: {params: {id: string}}) {
  const note = await getNote(params.id)
  return (
    <div>
      <div className={styles.note}>
        <h2>{note.title}</h2>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
        </div>
    </div>
  )
}
