import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
  standalone: false
})
export class ViewEmployeeComponent implements OnInit {

  employee: any = null;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/employees']);
      return;
    }

    this.empService.getEmployeeById(id).subscribe(
      emp => {
        this.employee = emp;         // store employee data
        this.cdr.detectChanges();    // <--- force Angular to update the view
        console.log('Employee fetched:', this.employee);
      },
      err => {
        console.error('Failed to fetch employee', err);
        this.router.navigate(['/employees']);
      }
    );
  }
}
