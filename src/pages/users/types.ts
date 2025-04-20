export type UserRole = 'admins' | 'users' | 'superadmin'

export type User = {
  id: string
  email: string
  username: string
  role: UserRole
  avatar: string
  status: boolean
  active: boolean
}
