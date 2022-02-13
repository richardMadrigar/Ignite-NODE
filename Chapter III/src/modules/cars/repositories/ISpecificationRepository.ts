import { Specification } from "../model/Sprecification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface SpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
