import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetPetProfileUseCaseRequest {
  petId: string
}

interface GetPetProfileUseCaseResponse {
  pet: Pet
}

export class GetPetProfileUseCase {
  constructor(private repository: PetRepository) {}

  async execute({
    petId,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.repository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
