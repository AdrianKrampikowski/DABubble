import { Injectable } from '@angular/core';
import {
  Firestore,
  getFirestore,
  provideFirestore,
  onSnapshot
} from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { doc, setDoc, addDoc, collection, getDoc } from 'firebase/firestore';
import { ChannelService } from './channel.service';
import { FirestoreService } from '../firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatList: any = [];

  constructor(private firestore: Firestore, public channelService: ChannelService, public FirestoreService: FirestoreService) {}

  db = getFirestore();
  chatsCollection = collection(this.db, 'chats');

  async sendData(text: any) {
    let chat = await setDoc(doc(this.chatsCollection, text.id), text).then(
      () => {
        console.log('data saved');
      }
    );
  }

  subChatList(docID: any) {
    this.channelService.channelID = docID;
    return onSnapshot(this.getChatRef(), (list) => {
      this.chatList = [];
      list.forEach(element => {
        if (element.data()['id'] == docID) {
          this.chatList.push(this.setChatObject(element.data(), element.id));
        }
      });
      this.chatList = this.FirestoreService.sortArray(this.chatList)
    })
  }

  getChatRef() {
    return collection(this.firestore, 'chats');
  }

  setChatObject(obj: any, id: string) {
    return {
      id: id || "",
      channelID: obj.id || "",
      textAreaInput: obj.textAreaInput || "",
      channelName: obj.channelName || "",
      time: obj.time || "",
      date: obj.date || "",
      loginName: obj.loginName || "",
      emoji: obj.emoji || "",
      profileImg: obj.profileImg || "kein img vorhanden",
      mail: obj.mail || 'email@nichtVorhanden.de',
      chatImage: obj.chatImage || 'noImage'
    }
  }
}