import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'
import { env } from '@/env'
import { AuthenticateOrgUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'

let repository: InMemoryOrgRepository
let sut: AuthenticateOrgUseCase
describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryOrgRepository()
    sut = new AuthenticateOrgUseCase(repository)
  })

  it('should be able to authenticate', async () => {
    await repository.create({
      address: 'test',
      city: 'test',
      phone: '11999999999',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', env.ENCRYPT_SALT),
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate wrong password', async () => {
    await repository.create({
      address: 'test',
      city: 'test',
      phone: '11999999999',
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
