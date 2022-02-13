import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUsersRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) { }

  async execute(data: ICreateUsersRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data) //mandando os dados e retornando uma classe instanciada 

    await this.usersRepository.save(user) //usando a classe instanciada

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: "equipe do meu app",
        email: "equipe@gmail.com"
      },
      subject: "seja bem vindo",
      body: "<p>voce já pode fazer login</p>"
    })
  }
}