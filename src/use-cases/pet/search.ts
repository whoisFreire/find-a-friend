import { PetQuery, PetRepository } from '@/repositories/pet-repository'
import {
  PetModelSchema,
  ValidPetFilterField,
} from '@/repositories/schemas/pet-schema'
import { Pet } from '@prisma/client'
import { InvalidFilterFieldError } from '../errors/invalid-filtered-field-error'

type SearchPetsUseCaseRequestQuery = {
  [key: string]: string
}

interface SearchPetsUseCaseRequest {
  query: SearchPetsUseCaseRequestQuery
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(
    private repository: PetRepository,
    private petSchema: PetModelSchema,
  ) {}

  async execute({
    query,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const processedQuery: PetQuery = {}

    for (const key in query) {
      if (!Object.prototype.hasOwnProperty.call(this.petSchema, key)) {
        throw new InvalidFilterFieldError(key)
      }

      const validKey = key as ValidPetFilterField
      const schemaField = this.petSchema[validKey]
      const value = query[key]

      if (value === undefined || value === '') continue

      switch (schemaField.type) {
        case 'number': {
          const numberValue = parseInt(value, 10)
          if (!isNaN(numberValue)) {
            processedQuery[validKey] = {
              value: numberValue,
              filter: schemaField.filter,
            }
          }
          break
        }
        case 'string':
        case 'enum':
          processedQuery[validKey] = { value, filter: schemaField.filter }
          break
      }
    }

    const pets = await this.repository.findManyByQuery(processedQuery)

    if (!pets) {
      return {
        pets: [],
      }
    }
    return {
      pets,
    }
  }
}
