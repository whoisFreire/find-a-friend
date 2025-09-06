import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'

let repository: InMemoryPetRepository
let sut: CreatePetUseCase
describe('Create Org Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    sut = new CreatePetUseCase(repository)
  })

  it('should be able to create a org', async () => {
    const { pet } = await sut.execute({
      species: 'dog',
      orgId: 'org-id',
      size: 'MINI',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
