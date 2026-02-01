import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    user?: {id:string};
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "Unauthorized"});

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET!) as any;
        next();
    } catch {
        res.status(401).json({message: "Invalid token"});
    }
}