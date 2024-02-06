import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/createDepartment.dto';

@Injectable()
export class DepartementService {

     constructor(private readonly prismaService: PrismaService){}

     async createDepartment(createDepartmentDto: CreateDepartmentDto) {
          const {nom, codeDepartement } = createDepartmentDto
          // Verifier si le departement existe
          const DEPARTEMENT = await this.prismaService.departement.findUnique({ 
               where: { codeDepartement } 
          }).catch(error => {throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !")})
          if (DEPARTEMENT) throw new ConflictException("Le departement existe !")
          // Enregister le departement
          await this.prismaService.departement.create({
               data: {codeDepartement, nom}
          }).catch(error => {throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !")})
          return { data: 'Departement creer avec sucess !' }
     }

     async findAllDepartment() {
          const DEPARTEMENTS = await this.prismaService.departement.findMany()
          .catch(error => {throw new ForbiddenException("Oups une erreur c'est produite, veuillez réessayer plustard !")})
          if(DEPARTEMENTS.length <= 0) throw new NotFoundException("Aucune departement trouvé !")
          return {data: DEPARTEMENTS, message: "La liste a bien été récupéré !"}
     }

}
