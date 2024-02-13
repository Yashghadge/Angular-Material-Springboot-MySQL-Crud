import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

employee:Employee={
  id:0,
  employeeName:'',
  contactNumber:'',
  address:'',
  
  employeeGender:'',
  employeeDepartment:'',
  employeeSkills:''
}



constructor(private employeeService:EmployeeService,private router:Router,private toaster:ToastrService){}

  ngOnInit(): void {
   
  }

goToList(){
  this.router.navigate(['employee-list']);
}






saveEmployee(){
  this.employeeService.addEmployee(this.employee).subscribe(data=>{this.employee=data;
    console.log("Data",data);
 
  this.goToList();
}
  );
  // alert("Employee Data Added Successfully");
  this.toaster.success("Employee Data Added Successfully" );
}

}
