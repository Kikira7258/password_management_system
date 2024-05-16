import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';


export const requiresUnauthGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
      const userService = inject(UserService);
      const router = inject(Router);

      // console.log(router.getCurrentNavigation());
      
  
      // Check if the authentication token exists
      if (userService.auth_token) {

        // User is authenticated
        // Check if the user is trying to access the login or register page
        if (state?.url === '/login' || state?.url === '/register' ) {

          // If the user is authenticated and trying to access the login page,redirect them to another route
          router.navigateByUrl('/items'); // Redirect to another route
          return false; // Revent access to the login page
        }
         
      }


  // User is not authenticated, allow access to the login or register page
  return true;
};
