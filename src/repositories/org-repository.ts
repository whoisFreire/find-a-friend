import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findManyByCity(city: string): Promise<Org[] | null>
}
