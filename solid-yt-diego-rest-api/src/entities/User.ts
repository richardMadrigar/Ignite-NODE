import { idUniqueV2 } from "id-unique-protocol";

export class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, "id">, id?: string) { //omitir apenas o id
    Object.assign(this, props); // pegar todas as props e passar uma por uma

    if (!id) {
      this.id = idUniqueV2();
    }
  }
}