import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create'

let repository: InMemoryOrgRepository
let sut: CreateOrgUseCase
describe('Create Org Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryOrgRepository()
    sut = new CreateOrgUseCase(repository)
  })

  it('should be able to create a org', async () => {
    const { org } = await sut.execute({
      address: 'test',
      phone: '11999999999',
      city: 'test city',
      email: 'org@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
