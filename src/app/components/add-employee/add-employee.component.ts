import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employee: any = {};

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {}

  save(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const emp = {
      ...this.employee,
      salary: Number(this.employee.salary),
    };

    this.empService.addEmployee(emp).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
