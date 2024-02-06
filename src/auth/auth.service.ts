import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { LoginDto, SignupDto } from './dto/auth.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SupprimerResponsableDto } from './dto/supprimerResponsable.dto';

@Injectable()
export class AuthService {

     constructor(
          private readonly prismaService: PrismaService,
          private readonly JwtService: JwtService,
          private readonly configService: ConfigService
     ) { }

     async creerResponsable(signupDto: SignupDto) {
          const { codeDepartement, nom, prenom, poste, nomUtilisateur, motDePasse } = signupDto
          // Verifier si le responsable est inscrit
          const RESPONSABLE = await this.prismaService.responsable.findUnique({ where: { nomUtilisateur } })
               .catch(error => { throw new ForbiddenException("Une erreur c'est produite !") })

          if (RESPONSABLE) throw new ConflictException("Le responsable existe !")
          // Hashage du mot de passe
          const HASH = await bcrypt.hash(motDePasse, 10);
          // Enregister le responsables
          await this.prismaService.responsable.create({ data: { codeDepartement, nom, prenom, poste, nomUtilisateur, motDePasse: HASH } })
               .catch(error => { throw new ForbiddenException("Une erreur c'est produite lors de la creation du responsable") })

          return { data: 'Responsable creer avec sucess !' }
     }

     async seConnecter(loginDto: LoginDto) {
          const { nomUtilisateur, motDePasse } = loginDto;
          // Verifier si le responsable est inscrit
          const RESPONSABLE = await this.prismaService.responsable.findUnique({ where: { nomUtilisateur } })
               .catch(error => { throw new ForbiddenException("Une erreur c'est produite !") })

          if (!RESPONSABLE) throw new NotFoundException("Le responsable n'existe pas !");
          // Comparer le mot de passe
          const OKRESPONSABLE = await bcrypt.compare(motDePasse, RESPONSABLE.motDePasse)
          if (!OKRESPONSABLE) throw new UnauthorizedException("Le mot de passe est incorrecte !")
          // Retourner un token JWT
          const payload = { sub: RESPONSABLE.idResponsable, nomUtilisateur: RESPONSABLE.nomUtilisateur };
          const token = this.JwtService.sign(payload, { expiresIn: '2h', secret: this.configService.get("SECRET_KEY") });

          return { token, responsable: { nomUtilisateur: RESPONSABLE.nomUtilisateur, poste: RESPONSABLE.poste }, statusCode: 200 }
     }

     async supprimerResponsable(idResponsable: number, supprimerResponsableDto: SupprimerResponsableDto) {
          const { motDePasse } = supprimerResponsableDto;
          // Verifier si le responsable est inscrit
          const RESPONSABLE = await this.prismaService.responsable.findUnique({ where: { idResponsable } })
          if (!RESPONSABLE) throw new NotFoundException("Le responsable n'existe pas !");
          // Comparer le mot de passe
          const OKRESPONSABLE = await bcrypt.compare(motDePasse, RESPONSABLE.motDePasse)
          if (!OKRESPONSABLE) throw new UnauthorizedException("Le mot de passe est incorrecte !")
          await this.prismaService.responsable.delete({
               where: { idResponsable }
          }).catch(error => { throw new ForbiddenException("Une erreur c'est produite lors de la creation du stagiaire") })

          return { data: "Le responsable a été supprimé !" }


     }
}
