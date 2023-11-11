import { Request, Response } from 'express';
import Joi from 'joi';
import prisma from '../../prisma/client';
import UserService from '../services/user.service';

class MovieController {
  public userService = new UserService();

  async validationCreate(data: any) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      rating: Joi.number().optional(),
      cast: Joi.optional(),
      genre: Joi.string().optional(),
      releaseDate: Joi.date().optional()
    });

    const { error } = schema.validate(data);

    if (error) {
      throw new Error(error.message)
    }

  }

  create = async (req: any, res: Response) => {
    const { userId } = req.user;

    try {
      const data = req.body;
      await this.validationCreate(data);
      const movie = await prisma.movie.create({
        data: { ...req.body, userId },
      });

      return res.status(201).json({ message: 'Movie created successfully!', movie });

    } catch (error: any) {
      console.log(`Error occurred while creating movie  - ${error}`);

      return res.status(500).json({
        message: `Error while creating movie -  ${error.message}`,
      });
    }
  };

  update = async (req: any, res: Response) => {
    try {
      const data = req.body;
      const { id } = req.query;
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        rating: Joi.number().optional(),
        cast: Joi.optional(),
        genre: Joi.string().optional(),
        releaseDate: Joi.date().optional()
      });

      const { error } = schema.validate(data);

      if (error) {
        return res.status(422).json({
          message: `Invalid data`,
          data: error.message,
        });
      }
      const { userId } = req.user;

      const movie = await prisma.movie.update({
        where: {
          id: parseInt(id as string),
          userId,
        },
        data,
      });

      return res.status(200).json({ message: 'Movie updated successfully!', movie });

    } catch (error: any) {

      return res.status(500).json({
        message: `${error.meta.cause}`,
      });

    }
  };

  delete = async (req: any, res: Response) => {
    try {

      const { id } = req.query;
      const { userId } = req.user;
      await prisma.movie.delete({
        where: { id: parseInt(id as string), userId },
      });

      return res.status(201).json({ message: 'Movie has been deleted' });

    } catch (error: any) {
      console.log(`Error occurred while deleting movie - ${error.message}`);

      return res.status(500).json({
        message: `${error.message}`,
      });
    }
  };

  get = async (req: any, res: Response) => {
    try {
      const { id } = req.query;
      const { userId } = req.user;
      const movie = await prisma.movie.findMany({
        where: {
          id: id ? parseInt(id as string) : undefined,
          userId,
        },
        orderBy: { 'id': 'desc' }
      });

      if (!movie) {
        return res.status(404).json({ message: 'No movie found!' });
      }

      return res.status(200).json({ message: 'Fetched movie!', movie });
    } catch (error: any) {
      console.log(`Error occurred while fetching movie  - ${error.message}`);

      return res.status(500).json({
        message: `Error while fetching movie -  ${error.message}`,
      });
    }
  };
}

export default new MovieController();
