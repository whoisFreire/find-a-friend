import { Prisma, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = []
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: randomUUID(),
      address: data.address,
      phone: data.phone,
      created_at: new Date(),
      city_id: data.city_id ?? null,
    }

    this.items.push(org)
    return org
  }
}
