import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'

let repository: InMemoryPetRepository
let sut: RegisterPetUseCase
describe('Register Pet Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    sut = new RegisterPetUseCase(repository)
  })

  it('should be able to Register a pet', async () => {
    const { pet } = await sut.execute({
      species: 'dog',
      orgId: 'org-id',
      size: 'MINI',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
