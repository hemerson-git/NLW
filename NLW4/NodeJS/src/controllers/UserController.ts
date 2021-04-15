import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

export class UserController {
  async index(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return response.json(users);
  }
  
  async show (request: Request, response: Response) {
    const usersRepository = getRepository(User);
    const { id } = request.params
    
    const user = await usersRepository.findOneOrFail(id);
    const {name, email} = user;

    return response.json({name, email});
  }
  
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getRepository(User);
    const userAlreadyExits = await usersRepository.findOne({
      email
    });

    if(userAlreadyExits) {
      return response.status(400).json({ message: "User Already Exists" })
    }
    
    const user = usersRepository.create({
      name,
      email
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}
