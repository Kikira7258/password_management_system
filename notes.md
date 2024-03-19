# ShoppingList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## TO-DO

# Fix Pagination visibility when only 1 page (Pagination should not be shown when there are one 1 page (Add a check for the last item, then relog the page if it's zero))

# If Deleting Item note, then give a warning that the item will also be deleted

# Add Authentication and authorization

# Add guards

# Make images corresspond to company images on listing and notes

# validation

# file upload

# Add loader to profile save and cancel buttons

# add view password on useer profile

# Add session timed out

# logged in notification?

# double password for registration

# Password change

# Transfer the content from the item-detail to item-form

# Oauth for Google and Gmail

# forgot password set to email

# save token on 'remember me' | token expires when window close

# Change Background of login and registration












[Dashboard HTML]
<aside class="h-screen bg-dark-gray w-[200px] fixed p-8">
    <div class="mb-8 border-b-[1px] border-opacity-30 border-off-white w-full">
        <img src="assets/images/logos/safe-secret.png" alt="logo" class="w-24 mb-2" />
    </div>


    <div class="h-[80%] flex flex-col justify-between text-white">

        <ul class="">
            <li class="hover:text-off-white">
                <a routerLink="/items" routerLinkActive="active" class="group mb-4 flex justify-between">
                    <div class="">
                        <span  class="mr-2">
                            <i class="fa-solid fa-shield"></i>
                        </span>
                        Items
                    </div>
                    <span class="badge group-[.active]:bg-cyan">10</span>
                </a>
            </li>
            
            <li class="hover:text-off-white">
                <a routerLink="/favorites" routerLinkActive="active" class="group mb-4 flex justify-between">
                    <div>
                        <span  class="mr-2">
                            <i class="fa-solid fa-heart"></i>
                        </span>                    
                        Favorites
                    </div>
                    <span class="badge group-[.active]:bg-cyan">10</span>
                </a>
            </li>
    
            <li class="hover:text-off-white">
                <a routerLink="/notes" routerLinkActive="active" class="group flex justify-between">
                    <div>
                        <span  class="mr-2">
                            <i class="fa-solid fa-sticky-note"></i>
                        </span>
                        Notes
                    </div>
                    <span class="badge group-[.active]:bg-cyan">10</span>
                </a>            
            </li>
        </ul>

        <a routerLink="/login"><span class="mr-2"><i class="fa-solid fa-arrow-right-from-bracket"></i></span>Logout</a>

    </div>
</aside>