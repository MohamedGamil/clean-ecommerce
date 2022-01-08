import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    const host = this.configService.get<string>('HOST');
    const port = this.configService.get<string>('PORT');
    const urlApi = `http://${host}:${port}`;

    return this.health.check([
      async () => this.db.pingCheck('database', { timeout: 300 }),
      () => this.http.pingCheck('api', urlApi),
    ]);
  }
}
