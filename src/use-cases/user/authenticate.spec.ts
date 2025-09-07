import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcrypt'
import { env } from '@/env'
import { AuthenticateUserUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let repository: InMemoryUserRepository
let sut: AuthenticateUserUseCase
describe('Register User Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUserRepository()
    sut = new AuthenticateUserUseCase(repository)
  })

  it('should be able to authenticate', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', env.ENCRYPT_SALT),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate wrong password', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', env.ENCRYPT_SALT),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
