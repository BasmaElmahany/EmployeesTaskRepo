import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../Models/Employee';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule,FormsModule], 
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;

  constructor(
    
    private route: ActivatedRoute,
    private employeeService: EmployeeService,private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.employee = data;
    });
  }
  backToList(): void {
    this.router.navigate(['/employees']);
  }
}
