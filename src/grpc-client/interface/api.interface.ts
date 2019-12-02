import { Observable } from "rxjs";


export interface CatsService {
  findOne(data: {
    id: number
  }): Observable<any>;
}

