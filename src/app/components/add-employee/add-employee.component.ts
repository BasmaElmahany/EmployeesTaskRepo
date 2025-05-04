import { Component } from '@angular/core';
import { Employee } from '/Users/HP/EmployeeFrontend/src/Models/Employee';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '/Users/HP/EmployeeFrontend/src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule], 
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    position: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService, private fb: FormBuilder,private router: Router) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required]
    });

  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const employee: Employee = this.employeeForm.value;

    this.employeeService.addEmployee(employee).subscribe({
      next: (res) => {
        this.successMessage = 'Employee added successfully!';
        this.router.navigate(['/employees']);
        this.errorMessage = '';
      
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to add employee.';
        this.successMessage = '';
      }
    });
  }
}
