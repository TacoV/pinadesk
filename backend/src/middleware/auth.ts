import { Request, Response, NextFunction } from 'express'

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // TODO: Implement Azure AD JWT validation via jwks-rsa
  next()
}