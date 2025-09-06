import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name ?? null,
      age: data.age ?? null,
      color: data.color ?? null,
      size: data.size,
      species: data.species,
      org_id: data.org_id,
      image_url: data.image_url ?? null,
      created_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    }

    this.items.push(pet)
    return pet
  }

  async findById(petId: string) {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }
}
