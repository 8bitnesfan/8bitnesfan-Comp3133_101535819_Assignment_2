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

    const search = this.searchText.toLowerCase();

    return this.employees.filter(emp => {
      const firstName = (emp.first_name || '').toLowerCase();
      const lastName = (emp.last_name || '').toLowerCase();
      const fullName = `${firstName} ${lastName}`.trim();
      const department = (emp.department || '').toLowerCase();
      const position = (emp.position || '').toLowerCase();

      return (
        firstName.includes(search) ||
        lastName.includes(search) ||
        fullName.includes(search) ||
        department.includes(search) ||
        position.includes(search)
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
