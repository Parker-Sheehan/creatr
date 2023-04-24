# On first visit
three options in center one for sign-up/one for loggin 
strech goal loggin with google option
jwt to make it unnecessary for next vists

# On boarding
## sign-up wizard

### first of wizard
email, password, confirm, first name

### second of wizard
picture up load prompt to something about aesthetc

### third of wizard
bio

### fourth of wizard (strech goal)
pick intrests

### fifth of wizard (strech goal)
pick questions

### explaination of functionality (strech goal)
use modals to overlay interctive bits and explain how to use them

# profile page (left nav button)
view profile how others would be able to see your's
button for updating profile
button for deleting profile

# main page
profiles in center of page stacking on each other 
buttons at bottom yes button, undo button, no button
create state to represent number of profiles swiped from array

## grab profiles function
return every id that hasn't been interacted with by the user
create array of all ids grab 100 randomly
make another HTTP request to get array of profile objects

## swipe function
on swipe load next profile in array using profiles swiped state update profile swipped state
if last profile was swipped left send http reqest to store interation of previous last profile state then set last profile state to profile just swipped on for undo fuctionality
if swipped right clear last profile state then send http request to save interation

# chat room page 
make http request to grab all chat rooms where id = userID, verrify jwt, on click of