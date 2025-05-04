import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Employee } from '../../../Models/Employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true, 
  imports: [CommonModule,FormsModule,RouterModule], 
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  successMessage: string | null = null;  
  errorMessage: string | null = null;    
  constructor(private employeeService: EmployeeService,private router: Router) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (res: Employee[]) => {
        this.employees = res;
        this.filterEmployees(); 
      },
      (err) => {
        console.error('Error fetching employee data:', err);
      }
    );
  }

  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
    this.currentPage = 1; 
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployees = this.filteredEmployees.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredEmployees.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  goToAddEmployee(): void {
    this.router.navigate(['/add-employee']); 
  }
  goToDetails(id: number): void {
    this.router.navigate(['/employee-details', id]);
  }
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (res) => {
          alert(res); 
          this.successMessage = "Employee deleted successfully";
          this.ngOnInit(); 
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "Failed to delete employee.";
        }
      });
    }
  }
  
}