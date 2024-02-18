import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { request } from 'http';
import { Request } from 'express';

@ApiBearerAuth("jwt")
@ApiTags("Projet")
@Controller('dashboard')
export class DashboardController {

     constructor(private readonly dashboardService: DashboardService) { }

     @UseGuards(AuthGuard("jwt"))
     @Get("")
     getDashboard(@Req() request: Request) {
          const ID_RESPONSABLE = parseInt(request.user["idResponsable"])
          return this.dashboardService.findDataDashboard(ID_RESPONSABLE)
     }
}
