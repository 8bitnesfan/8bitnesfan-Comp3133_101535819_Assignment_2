import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  searchText: string = '';
  employees: any[] = [];

  get filteredEmployees() {
    if (!Array.isArray(this.employees)) return [];

    const searchWords = (this.searchText || '')
      .toLowerCase()
      .trim()
      .split(/\s+/);

    return this.employees.filter(emp => {
      const firstName = (emp.first_name || '').toLowerCase();
      const lastName = (emp.last_name || '').toLowerCase();
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const department = String(emp.department || '').toLowerCase();
      const designation = String(emp.designation || '').toLowerCase();
      const fields = [firstName, lastName, fullName, department, designation];

      return searchWords.every(word =>
        fields.some(field => field.includes(word))
      );
    });
  }


  constructor(
    private empService: EmployeeService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe(
      res => {
        console.log('EMPLOYEES LOADED:', res);
        this.employees = res;
        this.cdr.detectChanges();
      },
      err => {
        console.error('LOAD FAILED:', err);
        this.employees = [];
      }
    );
  }

  deleteEmployee(id: string) {
    this.empService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
