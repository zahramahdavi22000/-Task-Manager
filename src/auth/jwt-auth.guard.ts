import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        request.user = request.user || {};
        request.user.id = request.user.sub;
        return super.canActivate(context);
    }
}

