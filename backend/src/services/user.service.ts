/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import config from '../../config';

export default class UserService {

  verifyJwt(token: string, secretOrPublicKey: string, options?: jwt.VerifyOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  getUserId = async (accessToken: string): Promise<number> => {
    const decodedToken =
      accessToken &&
      (await this.verifyJwt(accessToken.split(' ')[1], config.secret).then(
        (decoded: any) => decoded
      ));
    if (!decodedToken.userId) {
      throw new Error('Unauthorized access');
    }
    return decodedToken.userId;
  };

}
