import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../Models/Employee';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-employee.component.html'
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  id!: number;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employeeForm.patchValue(data);
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  updateEmployee() {
    const updatedEmployee = {
      id: this.id, // include the ID
      ...this.employeeForm.value
    };
    
    this.employeeService.updateEmployee(this.id, updatedEmployee).subscribe({
      next: () => {
        this.successMessage = 'Employee updated successfully.';
        setTimeout(() => this.router.navigate(['/employees']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to update employee.';
        console.error('Update failed:', err);
      }
    });
  }

  back() {
    this.router.navigate(['/employees']);
  }
}
