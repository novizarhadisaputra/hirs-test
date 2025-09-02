import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(ctx: ExecutionContext) {
        const req = ctx.switchToHttp().getRequest();
        const hdr = req.headers['authorization'] || '';
        const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
        if (!token) return false;
        try { (req as any).user = jwt.verify(token, process.env.JWT_SECRET!); return true; }
        catch { return false; }
    }
}
