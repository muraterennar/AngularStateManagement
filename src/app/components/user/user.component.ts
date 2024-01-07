import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { actionUpdateUser } from 'src/app/state/app.actions';
import { getUserSelector } from 'src/app/state/app.selectors';
import { UserState } from 'src/app/state/app.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  userSubscription?: Subscription;
  userData?:UserModel;

  constructor(private userState: Store<UserState>, private router:Router) { }


  ngOnInit(): void {
    this.userSubscription = this.userState.select(getUserSelector).subscribe((response) => {
      this.userData = response;
      console.log('Response : ', response);
    });
  }

  submitHandler(name: string, email: string, phoneNumber: string, password: string) {

    this.userState.dispatch(actionUpdateUser({ user: { id: guidGenerator(), name: name, email: email, phoneNumber: phoneNumber, password: password } }))
    console.log({ id: guidGenerator(), name: name, email: email, phoneNumber: phoneNumber, password: password });

    this.router.navigate(["/"])
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}

  // -------- GUID Generator ----------
  export const guidGenerator = () => {
    const characters = '0123456789abcdef';

    let guid:string = '';

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        guid += '-';
      } else if (i === 14) {
        guid += '4'; // 14. karakter her zaman 4 olmalıdır
      } else if (i === 19) {
        const index = Math.floor(Math.random() * 4); // 19. karakterde 0, 1, 2, veya 3 olmalıdır
        guid += ['8', '9', 'a', 'b'][index];
      } else {
        const index = Math.floor(Math.random() * 16); // Diğer karakterler rastgele seçilmelidir
        guid += characters[index];
      }
    }

    return guid;
  }