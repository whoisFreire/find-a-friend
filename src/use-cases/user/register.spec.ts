import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './register'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'

let repository: InMemoryUserRepository
let sut: RegisterUserUseCase
describe('Register Pet Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(repository)
  })

  it('should be able to Register a pet', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
