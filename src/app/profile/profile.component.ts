import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: firebase.default.User;
  constructor(private afAuth: AngularFireAuth, private af: AuthenticationService) { 
    af.afAuth.authState.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    console.log(this.user);
  }

}
