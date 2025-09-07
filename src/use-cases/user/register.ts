import { env } from '@/env'
import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { hash } from 'bcrypt'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  city?: string
  state?: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    city,
    state,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const user = await this.repository.create({
      name,
      email,
      password_hash: await hash(password, env.ENCRYPT_SALT),
      city,
      state,
    })

    return {
      user,
    }
  }
}
