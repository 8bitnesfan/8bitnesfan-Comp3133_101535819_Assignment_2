import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private auth: AuthService,
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employees = this.empService.getEmployees();
  }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id);
    this.employees = this.empService.getEmployees(); // refresh view
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
