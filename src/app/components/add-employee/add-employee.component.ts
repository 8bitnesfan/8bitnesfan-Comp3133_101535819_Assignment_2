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

  employee = {
    name: '',
    department: '',
    position: ''
  };

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {}

  save() {
    this.empService.addEmployee(this.employee);
    this.router.navigate(['/employees']);
  }
}
