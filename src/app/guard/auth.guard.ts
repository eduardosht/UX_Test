import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private user:UserService,private router:Router){}
    canActivate(
    next: ActivatedRouteSnapshot,
    state:RouterStateSnapshot):boolean{
        this.router.navigate(['/login']);
    return this.user.getUserLoggedIn();
    }
    
}