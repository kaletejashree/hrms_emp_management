import { Component, OnInit } from '@angular/core';
import { attendance, IAttendance } from '../../classes/employee';
import { EmployeeService } from '../../service/employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit{

  attendanceArray:IAttendance []=[];
  attendanceObj: attendance=new attendance();
  employeeArray: any[]=[];

  constructor(private empSrv:EmployeeService, private http: HttpClient){
   
  }

  ngOnInit(): void {
    this.loadAllAttendance();
    this.getEmployee();
  }

loadAllAttendance(){
  this.http.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendance").subscribe((res:any)=>{
this.attendanceArray=res.data;
  })
}

  getEmployee(){
    this.empSrv.getAllEmployee().subscribe((result: any)=>{
      this.employeeArray=result.data;
    })
  }

  onEdit(id:number){
    this.empSrv.getEmpById(id).subscribe((res:any)=>{
      this.attendanceObj=res.data;
    })

  }
  onDelete(id:number){
    // this.empSrv.deleteEmpById(attendanceId).subscribe((res:any)=>{
     
    //   if(res.result){
    //    this.loadAllAttendance();
    //    alert(res.message);
      
    //   }
    //   else{
    //    alert(res.message);
    //   }
    //  })
  }


  onSave(){
   this.http.post("https://onlinetestapi.gerasim.in/api/TeamSync/AddAttendance",this.attendanceObj).subscribe((Res:any)=>{
if(Res.result){
  this.loadAllAttendance();
  this.attendanceObj=new attendance();

}

alert(Res.message);
   })
  }
  onUpdate(){

  }
}
