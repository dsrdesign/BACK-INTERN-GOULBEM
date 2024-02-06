import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PrismaService } from "src/db/prisma/prisma.service";

type Payload = {
     sub: number,
     nomUtilisateur: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

     constructor(
          configService: ConfigService,
          private readonly prismaService: PrismaService
     ) {
          super({
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
               secretOrKey: configService.get('SECRET_KEY'),
               ignoreExpriration: false
          })
     }

     async validate(payload: Payload) {
          const RESPONSABLE = await this.prismaService.responsable.findUnique({ where: { nomUtilisateur: payload.nomUtilisateur } });
          if (!RESPONSABLE) throw new UnauthorizedException("Non authorisé !");
          await Reflect.deleteProperty(RESPONSABLE, "motDePasse")
          console.log(RESPONSABLE);
          return RESPONSABLE;
     }

}