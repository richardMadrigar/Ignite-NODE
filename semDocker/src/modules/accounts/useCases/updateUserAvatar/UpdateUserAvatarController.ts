import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateuserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateuserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_file = request.file.filename;

    const updateuserAvatarUseCase = container.resolve(UpdateuserAvatarUseCase);

    await updateuserAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateuserAvatarController };
