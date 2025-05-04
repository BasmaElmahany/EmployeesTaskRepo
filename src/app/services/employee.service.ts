import { Injectable } from '@angular/core';
import {Employee} from '/Users/HP/EmployeeFrontend/src/Models/Employee'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private apiUrl = 'https://localhost:44310/api/Employee'
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/GetAllEmployees`);
  }
  addEmployee(employee: Employee) {
    return this.http.post<Employee>(`${this.apiUrl}`, employee);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:44310/api/Employee/${id}`);
  }
  updateEmployee(id: number, employee: Employee): Observable<any> {

    return this.http.put(`https://localhost:44310/api/Employee/${id}`, employee, { responseType: 'text' });
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
