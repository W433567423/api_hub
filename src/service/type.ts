interface IUser {
  id: number
  username: string
  avatar_url?: string
}

interface ILoginParams {
  username: string
  password: string
}

interface ILabelWMoment {
  id: number
  title: string
}

export type { IUser, ILoginParams, ILabelWMoment }
