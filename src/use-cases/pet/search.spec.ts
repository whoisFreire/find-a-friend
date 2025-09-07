import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { SearchPetsUseCase } from './search'
import { petModelSchema } from '@/repositories/schemas/pet-schema'
import { InvalidFilterFieldError } from '../errors/invalid-filtered-field-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'

let repository: InMemoryPetRepository
let sut: SearchPetsUseCase
let orgRepository: InMemoryOrgRepository
describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    repository = new InMemoryPetRepository(orgRepository)
    sut = new SearchPetsUseCase(repository, petModelSchema)
  })

  it('should be able to search pets', async () => {
    await orgRepository.create({
      address: 'test',
      city: 'city',
      email: 'test@test.com',
      password_hash: '123456',
      phone: '11999999999',
      id: 'org-id1',
    })

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

    const { pets } = await sut.execute({
      query: { species: 'cat', city: 'city' },
    })
    expect(pets?.length).toEqual(1)
  })

  it('should not be able to search pets with wrong field', async () => {
    await orgRepository.create({
      address: 'test',
      city: 'city',
      email: 'test@test.com',
      password_hash: '123456',
      phone: '11999999999',
      id: 'org-id1',
    })

    await repository.create({
      id: 'pet-02',
      species: 'cat',
      org_id: 'org-id1',
      size: 'SMALL',
      color: 'black',
    })
    await expect(() =>
      sut.execute({ query: { foo: 'bar', city: 'city' } }),
    ).rejects.toBeInstanceOf(InvalidFilterFieldError)
  })
})
