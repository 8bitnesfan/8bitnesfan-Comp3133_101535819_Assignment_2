import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  standalone: false,
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const found = this.empService.getEmployeeById(id);

    if (!found) {
      console.warn('Employee not found');
      this.router.navigate(['/employees']);
      return;
    }

    this.employee = found;
  }
}
