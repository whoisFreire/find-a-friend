import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCityUseCase } from './create'

let repository: InMemoryCityRepository
let sut: CreateCityUseCase
describe('Create City Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryCityRepository()
    sut = new CreateCityUseCase(repository)
  })

  it('should be able to create a city', async () => {
    const { city } = await sut.execute({
      name: 'test',
      state: 'test',
    })

    expect(city.id).toEqual(expect.any(String))
  })
})
