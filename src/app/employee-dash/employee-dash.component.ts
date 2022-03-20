import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { EmployeeModal } from './employee-dash.model';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {

  formValue!: FormGroup
  employeeModelObj: EmployeeModal = new EmployeeModal();
  employeeData: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({

      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']

    })

    this.getAllEmployee();

  }

  postEmployeeDetail() {


    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(res => {
      console.log(res);
      alert("employee added sucessfully")
      this.formValue.reset();
      let ref = document.getElementById("cancel")
      ref?.click();
      this.getAllEmployee();
    },
      err => {
        alert("ERROR");
      })
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;

    })
  }

  deleteEmployee(id:number){
    this.api.deleteEmployee(id)
    .subscribe(res=>{
      // console.log(id);
      alert("Employee Data deleted");
     this.getAllEmployee();
    })
  }

  onEdit(row : any){
    this.employeeModelObj.id = row.id;
    console.log(row.id);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetail(){
  
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
   
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
    
      alert("Value update succesfully");
      this.formValue.reset();
      let ref = document.getElementById("cancel")
      ref?.click();
      this.getAllEmployee();
    })

  }

}
