import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    { id: 1, name: 'John Doe', department: 'IT', position: 'Developer' },
    { id: 2, name: 'Jane Smith', department: 'HR', position: 'Manager' }
  ];

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const newId = this.employees.length
      ? Math.max(...this.employees.map(e => e.id)) + 1
      : 1;

    this.employees.push({
      id: newId,
      ...employee
    });
  }

  updateEmployee(id: number, updatedEmployee: Omit<Employee, 'id'>): void {
    const index = this.employees.findIndex(e => e.id === id);

    if (index !== -1) {
      this.employees[index] = {
        id,
        ...updatedEmployee
      };
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}
