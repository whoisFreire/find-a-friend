import { CityRepository } from '@/repositories/city-repository'
import { City } from '@prisma/client'

interface CreateCityUseCaseRequest {
  name: string
  state: string
}

interface CreateCityUseCaseResponse {
  city: City
}

export class CreateCityUseCase {
  constructor(private cityRepository: CityRepository) {}

  async execute({
    name,
    state,
  }: CreateCityUseCaseRequest): Promise<CreateCityUseCaseResponse> {
    const city = await this.cityRepository.create({ name, state })

    return {
      city,
    }
  }
}
