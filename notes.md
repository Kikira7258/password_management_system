[TO-DO]

# If Deleting Item note, then give a warning that the item will also be deleted

# Add Authentication and authorization

# Add guards

# Make images corresspond to company images on listing and notes

# Add session timed out

# Oauth for Google and Facebook

# forgot password sent to email

# save token on 'remember me' | token expires when window close

# Change Background of login and registration

# Verify email change

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
