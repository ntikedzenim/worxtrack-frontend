import { Component, ViewChild, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/model/currentuser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  breakpoint: number;
  isLoadingResults = false;
  currentUserSubscription: Subscription;
  currentUser: CurrentUser;
  opened = true;
  expandHeight = '30px';
  collapseHeight = '30px';

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  constructor(public authenticationService: AuthenticationService, private router: Router) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (window.innerWidth < 992) {
      this.sidenav.fixedTopGap = 110;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 110;
      this.opened = true;
    }
    this.breakpoint = (window.innerWidth <= 992) ? 1 : 4;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 992) {
      this.sidenav.fixedTopGap = 110;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 110
      this.opened = true;
    }
    this.breakpoint = (event.target.innerWidth <= 992) ? 1 : 4;
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 992) {
      return true;
    } else {
      return false;
    }
  }

  downloadFile() {
    let link = document.createElement("a");
    link.download = "Worxstation_Manual";
    link.href = "assets/documents/Worxstation_Manual.pdf";
    link.click();
  }

  logout() {
    this.isLoadingResults = true;
    this.authenticationService.logout()
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks   
    this.currentUserSubscription.unsubscribe();
  }
}

