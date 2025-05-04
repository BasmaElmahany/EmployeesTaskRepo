import { Routes } from '@angular/router';
import {LoginComponent} from '../app/components/login/login.component'
import {EmployeeListComponent} from '../app/components/employee-list/employee-list.component'
import {AddEmployeeComponent} from '../app/components/add-employee/add-employee.component'
import {EmployeeDetailsComponent} from '../app/components/employee-details/employee-details.component'
import {UpdateEmployeeComponent} from '../app/components/update-employee/update-employee.component'
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'add-employee', component: AddEmployeeComponent },
    { path: 'employee-details/:id', component: EmployeeDetailsComponent },
    { path: 'update/:id', component: UpdateEmployeeComponent }

  ];
