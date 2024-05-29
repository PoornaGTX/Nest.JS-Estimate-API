import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { createReportDto } from './dtos/create-report-dto';
import { ReportsService } from './reports.service';
import { AuthGurd } from 'src/gurds/auth.gurd';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGurd)
  @Serialize(ReportDto)
  createReports(@Body() body: createReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
