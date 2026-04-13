import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number;

  employee: Omit<Employee, 'id'> = {
    name: '',
    department: '',
    position: ''
  };

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    const existing = this.empService.getEmployeeById(this.id);

    if (existing) {
      this.employee = {
        name: existing.name,
        department: existing.department,
        position: existing.position
      };
    }
  }

  update() {
    this.empService.updateEmployee(this.id, this.employee);
    this.router.navigate(['/employees']);
  }
}
