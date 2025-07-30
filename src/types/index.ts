export interface Phase {
  id: number
  title: string
  category: string
  description?: string
}

export interface FormData {
  [key: string]: string
}


export type ViewMode = 'timeline' | 'detail'