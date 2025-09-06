import { Prisma, City } from '@prisma/client'
import { CityRepository } from '../city-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCityRepository implements CityRepository {
  public items: City[] = []
  async create(data: Prisma.CityCreateInput) {
    const city = {
      id: randomUUID(),
      name: data.name,
      state: data.state,
    }

    this.items.push(city)
    return city
  }
}
