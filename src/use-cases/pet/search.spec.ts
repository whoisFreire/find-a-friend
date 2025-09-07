import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { SearchPetsUseCase } from './search'
import { petModelSchema } from '@/repositories/schemas/pet-schema'
import { InvalidFilterFieldError } from '../errors/invalid-filtered-field-error'

let repository: InMemoryPetRepository
let sut: SearchPetsUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository()
    sut = new SearchPetsUseCase(repository, petModelSchema)
  })

  it('should be able to search pets', async () => {
    await repository.create({
      id: 'pet-01',
      species: 'dog',
      org_id: 'org-id1',
      size: 'MINI',
      color: 'black',
    })

    await repository.create({
      id: 'pet-02',
      species: 'cat',
      org_id: 'org-id1',
      size: 'SMALL',
      color: 'black',
    })

    const { pets } = await sut.execute({ query: { species: 'cat' } })
    expect(pets?.length).toEqual(1)
  })

  it('should not be able to search pets with wrong field', async () => {
    await repository.create({
      id: 'pet-02',
      species: 'cat',
      org_id: 'org-id1',
      size: 'SMALL',
      color: 'black',
    })
    await expect(() =>
      sut.execute({ query: { foo: 'bar' } }),
    ).rejects.toBeInstanceOf(InvalidFilterFieldError)
  })
})
