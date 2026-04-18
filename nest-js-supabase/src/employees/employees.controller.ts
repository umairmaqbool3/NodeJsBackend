import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Post()
    async createEmployee(@Body() employeeData: Partial<Employee>): Promise<Employee> {
        return this.employeesService.create(employeeData);
    }

    @Put(':id')
    async updateEmployee(@Body() employeeData: Partial<Employee>, @Param('id') id: number): Promise<Employee> {
        return this.employeesService.update(id, employeeData);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: number): Promise<{message:string}> {
        return this.employeesService.delete(id);
    }

    @Get()
    async getAllEmployees(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @Get(':id')
    async getEmployeeById(@Param('id') id: number): Promise<Employee> {
        const employee = await this.employeesService.findOne(id);
        if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        return employee;
    }
}
