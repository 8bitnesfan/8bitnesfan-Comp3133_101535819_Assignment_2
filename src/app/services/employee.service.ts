import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}


  addEmployee(emp: any) {
    const mutation = `
    mutation {
      addEmployee(
        first_name: "${emp.first_name}",
        last_name: "${emp.last_name}",
        email: "${emp.email}",
        gender: "${emp.gender || ""}",
        designation: "${emp.designation}",
        salary: ${emp.salary || 0},
        date_of_joining: "${emp.date_of_joining || ""}",
        department: "${emp.department}",
        employee_photo: "${emp.employee_photo || ""}"
      ) {
        id
      }
    }
  `;

    return this.http.post<any>(this.url, { query: mutation });
  }

  getEmployeeById(id: string): Observable<any> {
    if (!id) throw new Error('Employee ID is required');

    const query = `
    query {
      getEmployeeById(id: "${id}") {
        id
        first_name
        last_name
        email
        department
        designation
        salary
      }
    }
  `;

    return this.http.post<any>(this.url, { query }).pipe(
      map(res => {
        const emp = res.data.getEmployeeById;
        if (emp) emp.id = emp.id || emp._id;
        return emp;
      })
    );
  }

  getEmployees(): Observable<any[]> {
    const query = `
      query {
        getEmployees {
          id
          first_name
          last_name
          email
          designation
          department
          salary
        }
      }
    `;

    return this.http.post<any>(
      this.url,
      { query },
      { headers: { 'Content-Type': 'application/json' } } // optional but safe
    ).pipe(
      map(res => {
        console.log('GraphQL RESPONSE:', res); // debug
        return res.data.getEmployees || [];
      })
    );
  }

  updateEmployee(id: string, emp: any) {
    const mutation = `
    mutation {
      updateEmployee(
        id: "${id}",
        input: {
          first_name: "${emp.first_name}",
          last_name: "${emp.last_name}",
          email: "${emp.email}",
          gender: "${emp.gender || ""}",
          designation: "${emp.designation}",
          salary: ${emp.salary || 0},
          date_of_joining: "${emp.date_of_joining || ""}",
          department: "${emp.department}",
          employee_photo: "${emp.employee_photo || ""}"
        }
      ) {
        id
      }
    }
  `;

    return this.http.post<any>(this.url, { query: mutation });
  }

  deleteEmployee(id: string): Observable<any> {
    const mutation = `
      mutation {
        deleteEmployee(id: "${id}")
      }
    `;

    return this.http.post<any>(
      this.url,
      { query: mutation },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
