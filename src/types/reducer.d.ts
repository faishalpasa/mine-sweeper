export interface CustomAction {
  type: string
  payload?: any
  meta?: string
  error?: Error
}
