import {
  OptionalPetQueryFields,
  PetQuery,
  PetRepository,
} from '@/repositories/pet-repository'
import {
  PetModelSchema,
  ValidPetFilterField,
} from '@/repositories/schemas/pet-schema'
import { Pet } from '@prisma/client'
import { InvalidFilterFieldError } from '../errors/invalid-filtered-field-error'
import { RequiredFieldError } from '../errors/required-field-error'

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
    if (!query.city || query.city.trim() === '') {
      throw new RequiredFieldError('city')
    }
    const cityFilter = { value: query.city, filter: 'equals' as const }

    const optionalFilters: OptionalPetQueryFields = {}

    for (const key in query) {
      if (key === 'city') {
        continue
      }

      if (!Object.prototype.hasOwnProperty.call(this.petSchema, key)) {
        throw new InvalidFilterFieldError(key)
      }

      const validKey = key as Exclude<ValidPetFilterField, 'city'>
      const schemaField = this.petSchema[validKey]
      const value = query[key]

      if (value === undefined || value === '') continue

      switch (schemaField.type) {
        case 'number': {
          const numberValue = parseInt(value, 10)
          if (!isNaN(numberValue)) {
            optionalFilters[validKey] = {
              value: numberValue,
              filter: schemaField.filter,
            }
          }
          break
        }
        case 'string':
        case 'enum':
          optionalFilters[validKey] = { value, filter: schemaField.filter }
          break
      }
    }

    const finalQuery: PetQuery = {
      city: cityFilter,
      ...optionalFilters,
    }

    const pets = await this.repository.findManyByQuery(finalQuery)

    if (!pets) {
      return { pets: [] }
    }

    return { pets }
  }
}
