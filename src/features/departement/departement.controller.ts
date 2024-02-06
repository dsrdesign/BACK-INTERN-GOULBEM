import { Body, Controller, Get, Logger, Post} from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartmentDto } from './dto/createDepartment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Departement")
@Controller('departement')
export class DepartementController {

     private readonly logger = new Logger(DepartementController.name);

     constructor(private readonly departementServices  : DepartementService){}

     @Post("create")
     createDepartment(@Body() createDepartmentDto : CreateDepartmentDto){
          this.logger.log("Creation d'un departement !")
          return this.departementServices.createDepartment(createDepartmentDto)
     }

     @Get("all")
     findAllDepartment(){
          this.logger.log("Liste de tous les departements !")
          return this.departementServices.findAllDepartment()
     }
}
