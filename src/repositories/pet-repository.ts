import { Pet, Prisma } from '@prisma/client'
import { ValidPetFilterField } from './schemas/pet-schema'

export type RequiredPetQueryFields = {
  city: { value: string; filter: 'equals' }
}

export type OptionalPetQueryFields = {
  [key in Exclude<ValidPetFilterField, 'city'>]?: {
    value: string | number
    filter: 'contains' | 'equals'
  }
}

export type PetQuery = RequiredPetQueryFields & OptionalPetQueryFields

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  findManyByQuery(query: PetQuery): Promise<Pet[] | null>
}
