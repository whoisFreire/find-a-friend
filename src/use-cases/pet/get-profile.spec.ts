import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { GetPetProfileUseCase } from './get-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let repository: InMemoryPetRepository
let sut: GetPetProfileUseCase
describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    sut = new GetPetProfileUseCase(repository)
  })

  it('should be able to get a pet profile', async () => {
    await repository.create({
      id: 'pet-01',
      species: 'dog',
      org_id: 'org-id',
      size: 'MINI',
    })

    const { pet } = await sut.execute({ petId: 'pet-01' })

    expect(pet.id).toEqual('pet-01')
  })

  it('should not be able to get a pet profile with wrong id', async () => {
    await expect(() => sut.execute({ petId: 'pet-01' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
