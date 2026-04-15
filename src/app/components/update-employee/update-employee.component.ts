import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: string;
  employee: any = {};

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.empService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    });
  }

  update() {
    this.empService.updateEmployee(this.id, this.employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
