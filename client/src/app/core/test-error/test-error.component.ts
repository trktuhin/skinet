import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  validationErrors: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(environment.baseApiUrl + 'products/42').subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  get500Error() {
    this.http.get(environment.baseApiUrl + 'buggy/servererror').subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  get400Error() {
    this.http.get(environment.baseApiUrl + 'buggy/badrequest').subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  get400ValidationError() {
    this.http.get(environment.baseApiUrl + 'products/twenty').subscribe({
      next: res => console.log(res),
      error: err => this.validationErrors = err
    });
  }

}
