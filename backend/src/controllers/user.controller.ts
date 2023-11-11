import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

class UserController {
  public userService = new UserService();

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });

      const options = { abortEarly: false };

      const { error } = schema.validate(req.body, options);

      if (error) {
        return res.status(422).json({
          message: `Invalid data`,
          data: error.details.map((messages: any) => messages.message),
        });
      }

      const user = await prisma.user.findUnique({
        select: { email: true, password: true, id: true },
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          message: `Account not found, please register.`,
        });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Invalid credentials',
        });
      }

      const accessToken = jwt.sign({ userId: user.id }, config.secret, {
        expiresIn: config.tokenLife,
      });
      const refreshToken = jwt.sign({ userId: user.id }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenLife,
      });

      return res.status(200).json({
        message: 'LoggedIn Sucessful',
        data: {
          user:{
            email:email
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error while logging :  ${error.message}`,
      });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(422).json({
          message: `Invalid data`,
          data: error.message,
        });
      }
      const userExists = await prisma.user.count({
        where: {
          email,
        },
      });
      if (userExists > 0) {
        return res.status(500).json({ message: `Email is already registered, Try login` });
      }

      const user = await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 10),
        },
      });

      return res.json({ user, message:"Account created successfully!" });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error occurred while creating partner manager and partners - ${error.message}`,
      });
    }
  };
}

export default new UserController();
