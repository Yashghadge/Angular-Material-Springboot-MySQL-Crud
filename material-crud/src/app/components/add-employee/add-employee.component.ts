import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

departV=['IT','Finance']

skills:string[]=[];

constructor(private employeeService:EmployeeService,private router:Router){}

  ngOnInit(): void {
   
  }

goToList(){
  this.router.navigate(['employee-list']);
}

selectGender(gender:string):void{
 this.employee.employeeGender= gender;
}

checkGender(gender:string){
  return this.employee.employeeGender !=null && this.employee.employeeGender == (gender);
}

onSkillsChanges(event:any){
  console.log(event);
  if(event.checked){
    this.skills.push(event.source.value)
  }else{
    this.skills.forEach(
      (item,index)=>{
        if(item=== event.source.value){
          this.skills.splice(index,1);
        }
      }
    );
  }
  this.employee.employeeSkills = this.skills.toString();
}

checkSkills(skill:string){
return this.employee.employeeSkills !=null && this.employee.employeeSkills.includes(skill);
}

saveEmployee(){
  this.employeeService.addEmployee(this.employee).subscribe(data=>{this.employee=data;
    console.log("Data",data);
 
  this.goToList();
}
  );
  alert("Employee Data Added Successfully");
}

}
