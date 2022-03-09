export interface User {
  id?: number
  username?: string
  name?: string
  email?: string
  password?: string
  passwordConfirm?: string
  created_at?: Date
  updated_at?: Date
  role?: number
  language?: string
}
