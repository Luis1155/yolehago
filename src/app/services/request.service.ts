import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { RequestInterface } from './../models/request';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private afStore: AngularFirestore) { }

  private requestsCollection: AngularFirestoreCollection<RequestInterface>;
  private requests: Observable<RequestInterface[]>;
  private requestDoc: AngularFirestoreDocument<RequestInterface>;
  private request: Observable<RequestInterface>;

  getAllRequest() {
    this.requestsCollection = this.afStore.collection<RequestInterface>('solicitudes');
    return this.requests = this.requestsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as RequestInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  addRequest(request: RequestInterface): void {
    this.requestsCollection.add(request);
  }
}
