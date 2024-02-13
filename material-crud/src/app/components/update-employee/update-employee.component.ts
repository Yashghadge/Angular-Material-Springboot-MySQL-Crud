import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
 id!:number;
  employee:Employee =new Employee();

  constructor(private employeeService:EmployeeService,private router:Router,private route:ActivatedRoute,private toaster:ToastrService){}

 ngOnInit(): void {
     this.id=this.route.snapshot.params['id'];
     this.employeeService.getEmpById(this.id).subscribe({
      next:(response)=>{
        this.employee=response;
      },
      error:(error)=>{console.log(error);
      }
     })
     
 }

 goToList(){
  this.router.navigate(['employee-list']);
}
 onUpdate(){
 this.employeeService.updateEmployee(this.id,this.employee).subscribe({
  next:(response)=>{
    this.goToList();
  },
  error:(error)=>{console.log(error);
  }
 });
 this.toaster.success("Employee Details Updated Successfully");
 }

}
