import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
 
export interface List {
  id?: string;
  name: string;
  text: string;
  date: any;
}
 
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  constructor(private firestore: Firestore) { }
 
  getList(): Observable<List[]> {
    const todolist = collection(this.firestore, 'Todo-list');
    return collectionData(todolist, { idField: 'id'}) as Observable<List[]>;
  }
 
  getListById(id): Observable<List> {
    const todolistId = doc(this.firestore, `Todo-list/${id}`);
    return docData(todolistId, { idField: 'id' }) as Observable<List>;
  }
 
  addList(list: List) {
    const todolistAdd = collection(this.firestore, 'Todo-list');
    return addDoc(todolistAdd, list);
  }
 
  deleteList(list: List) {
    const noteDocRef = doc(this.firestore, `Todo-list/${list.id}`);
    return deleteDoc(noteDocRef);
  }
 
  updateList(list: List) {
    const noteDocRef = doc(this.firestore, `Todo-list/${list.id}`);
    return updateDoc(noteDocRef, { name: list.name, text: list.text, date: list.date });
  }
}