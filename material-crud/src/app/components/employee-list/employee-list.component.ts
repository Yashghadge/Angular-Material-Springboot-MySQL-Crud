import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';import { ToastrService } from 'ngx-toastr';
;
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dataSource:Employee[]=[];
  displayedColumns: string[] = ['id', 'employeeName','address', 'contactNumber','actions'
];
 

constructor(private employeeService:EmployeeService,private router:Router,private toaster:ToastrService){}



  ngOnInit(): void {
      this.getEmployeeList();
  }

  getEmployeeList(){
   this.employeeService.getEmployees().subscribe(
    (data:any)=>{this.dataSource=data;
    console.log(data);}
   )
  }
  
 updateEmployee(id:number){
  this.router.navigate([`update-employee`,id]);
 }


  deleteEmployee(id:number){
    console.log(id);
    this.employeeService.deleteEmployee(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toaster.success("employee with id "+id+" deleted successfully");
        this.getEmployeeList();

      },
      error:(error:HttpErrorResponse)=>{
        console.log(error);
        
      }
    });
  }
  

  goToForm(){
    this.router.navigate([`add-employee`]);
  }
  
}
