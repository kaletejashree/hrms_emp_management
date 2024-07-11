import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent implements OnInit{
salarObj:any={
  "salaryId": 0,
  "employeeId": 0,
  "salaryDate": "",
  "totalAdvance": 0,
  "presentDays": 0,
  "salaryAmount": 0
}

salaryArray: any[]=[];
employeeArray:any []=[];
totalAdvanceAmount:number=0;
totalLeaves:number=0;

constructor(private empSrv: EmployeeService,private http:HttpClient){

}
ngOnInit(): void {
    this.getAllSalary();
    this.loadAllEmp();
}
loadAllEmp(){
  this.empSrv.getAllEmployee().subscribe((res:any)=>{
    this.employeeArray=res.data;
  })
}

getAllSalary(){
   this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalary').subscribe((res:any)=>{
    this.salaryArray=res.data;
   })
}


getEmpData(){
  this.GetAllAdvance();
  this.GetAllLeaves();
}


GetAllAdvance(){
  this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance').subscribe((res:any)=>{
  const data=res.data.filter((m:any)=>m.employeeId==this.salarObj.employeeId);
  data.forEach((element:any) => {
    this.totalAdvanceAmount=this.totalAdvanceAmount+element.advanceAmount;
  });
  this.salarObj.totalAdvance= this.totalAdvanceAmount;
  })
}
GetAllLeaves(){
  this.http.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves').subscribe((res:any)=>{
 this.totalLeaves=res.data.filter((m:any)=>m.employeeId==this.salarObj.employeeId).length;
  this.salarObj.presentDays=30-this.totalLeaves;
  })
}

calculateSalary(){
  const empData=this.employeeArray.find(m=>m.empId==this.salarObj.employeeId);
  const perDaySalary=empData.salary/30;
  this.salarObj.salaryAmount=((this.salarObj.presentDays*perDaySalary)-this.salarObj.totalAdvance).toFixed(0);
}

saveSalary(){
  this.http.post('https://onlinetestapi.gerasim.in/api/TeamSync/AddSalary',this.salarObj).subscribe((res:any)=>{
    

    if(res.result){
      this.getAllSalary();
      alert(res.message);
    
     }
     else{
      alert(res.message);
     }
  })

}
}
