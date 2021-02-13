import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../_services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed=true;
  user: firebase.default.User;
  constructor(private afAuth: AngularFireAuth, private af: AuthenticationService) { 
    af.afAuth.authState.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }
  logout(){
    this.afAuth.signOut();
    this.af.logout();
  }
}
