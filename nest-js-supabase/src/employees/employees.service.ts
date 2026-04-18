import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {}

    async create(employeeData : Partial<Employee>): Promise<Employee>{
        const employee = this.employeesRepository.create(employeeData);
        return this.employeesRepository.save(employee);
    }

    async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
        // way 1
        // await this.employeesRepository.update(id, employeeData);
        // const employee = await this.employeesRepository.findOneBy({ id });
        // if (!employee) {
        //     throw new Error(`Employee with id ${id} not found`);
        // }
        // return employee;

        //way 2
        const employee = await this.employeesRepository.findOneBy({ id });
        if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        Object.assign(employee, employeeData);
        return this.employeesRepository.save(employee);
    }

    async delete(id: number): Promise<{message:string}> {
        // way 1
        // await this.employeesRepository.delete(id);

        // way 2
        const result = await this.employeesRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Employee with id ${id} not found`);
        }
        return {message: `Employee with id ${id} deleted successfully`};
    }

    async findAll(): Promise<Employee[]> {
        return this.employeesRepository.find();
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeesRepository.findOneBy({ id });
        if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        return employee;
    }

}
