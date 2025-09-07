import { Pet, Prisma } from '@prisma/client'
// Precisamos importar o tipo dos campos válidos
import { ValidPetFilterField } from './schemas/pet-schema'

export type PetQuery = {
  [key in ValidPetFilterField]?: {
    value: string | number
    filter: 'contains' | 'equals'
  }
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  findManyByQuery(query: PetQuery): Promise<Pet[] | null>
}
