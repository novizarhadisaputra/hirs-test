import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './common/jwt-auth.guard';

@Controller()
export class GatewayController {
    constructor(private http: HttpService) { }
    @Post('auth/login') login(@Body() b: any) { return firstValueFrom(this.http.post(`${process.env.AUTH_URL}/auth/login`, b)).then(r => r.data) }
    @Post('auth/refresh') refresh(@Body() b: any) { return firstValueFrom(this.http.post(`${process.env.AUTH_URL}/auth/refresh`, b)).then(r => r.data) }

    @UseGuards(JwtAuthGuard) @Get('me')
    me(@Req() req: any) { return firstValueFrom(this.http.get(`${process.env.EMPLOYEE_URL}/me`, { headers: { authorization: req.headers['authorization'] } })).then(r => r.data) }
    @UseGuards(JwtAuthGuard) @Patch('me')
    updateMe(@Req() req: any, @Body() b: any) { return firstValueFrom(this.http.patch(`${process.env.EMPLOYEE_URL}/me`, b, { headers: { authorization: req.headers['authorization'] } })).then(r => r.data) }

    @UseGuards(JwtAuthGuard) @Get('admin/users')
    listUsers(@Req() req: any) { this.ensureAdmin(req); return firstValueFrom(this.http.get(`${process.env.AUTH_URL}/admin/users`, { headers: { authorization: req.headers['authorization'] } })).then(r => r.data) }
    @UseGuards(JwtAuthGuard) @Post('admin/users')
    createUser(@Req() req: any, @Body() b: any) { this.ensureAdmin(req); return firstValueFrom(this.http.post(`${process.env.AUTH_URL}/admin/users`, b, { headers: { authorization: req.headers['authorization'] } })).then(r => r.data) }
    @UseGuards(JwtAuthGuard) @Patch('admin/users/:id')
    updateUser(@Req() req: any, @Param('id') id: string, @Body() b: any) { this.ensureAdmin(req); return firstValueFrom(this.http.patch(`${process.env.AUTH_URL}/admin/users/${id}`, b, { headers: { authorization: req.headers['authorization'] } })).then(r => r.data) }

    @UseGuards(JwtAuthGuard) @Post('attendance/check')
    check(@Req() req: any, @Body() b: any) { return firstValueFrom(this.http.post(`${process.env.ATTENDANCE_URL}/attendance/check`, b, { headers: { authorization: req.headers['authorization'] } })).then(r => r.data) }
    @UseGuards(JwtAuthGuard) @Get('attendance/summary')
    summary(@Req() req: any, @Query('from') f?: string, @Query('to') t?: string) {
        return firstValueFrom(this.http.get(`${process.env.ATTENDANCE_URL}/attendance/summary`, { headers: { authorization: req.headers['authorization'] }, params: { from: f, to: t } })).then(r => r.data)
    }

    @UseGuards(JwtAuthGuard) @Get('admin/attendance')
    adminAttendance(@Req() req: any, @Query() q: any) {
        this.ensureAdmin(req);
        return firstValueFrom(this.http.get(`${process.env.ATTENDANCE_URL}/admin/attendance`, { headers: { authorization: req.headers['authorization'] }, params: q })).then(r => r.data)
    }
    private ensureAdmin(req: any) { if ((req.user as any).role !== 'ADMIN') throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); }
}
