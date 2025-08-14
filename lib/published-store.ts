import { promises as fs } from 'fs'
import path from 'path'

export interface StoredPublishSettings {
  siteTitle?: string
  siteDescription?: string
  allowComments?: boolean
  showLastUpdated?: boolean
  customCSS?: string
}

export interface StoredPublishedNote {
  id: string
  title: string
  content: string
  icon?: string
  iconColor?: string
  publishSettings?: StoredPublishSettings
  updatedAt: string
  publishedUrl: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'published.json')

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {}
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({}), 'utf-8')
  }
}

async function readAll(): Promise<Record<string, StoredPublishedNote>> {
  await ensureDataFile()
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  try {
    return JSON.parse(raw) as Record<string, StoredPublishedNote>
  } catch {
    return {}
  }
}

async function writeAll(data: Record<string, StoredPublishedNote>) {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function savePublishedNote(slug: string, note: StoredPublishedNote) {
  const all = await readAll()
  all[slug] = note
  await writeAll(all)
}

export async function getPublishedNote(slug: string): Promise<StoredPublishedNote | undefined> {
  const all = await readAll()
  return all[slug]
}


