# Chase Croy-Perrett
# 1908389
# I created variables for each of the inputs, and then calculated teh volume of the Cube and Cone
# The print command was unable to print out a float, so I made 2 new variables, strings, with the purpose of printing them out in print statments
# The value of Pi wasn't automatically built in, so I made a float named pi to use in calculations (having infinite decimal places would get annoying anyways)
# At the end I put some if statments checking which shape had more volume, and printing text accordingly
# I added a funny option at the end if the cube and cone were somehow equal, but I'm pretty sure that's impossible,
# especially with the pi value, unless someone was really specific with their inputs.
# After I made sure all the math worked, I spammed a bunch of print statmetns to make a funny story, and then changed them into print(input statments to space the text out more
# (It doesn't look nice having a giant wall of text that comes out all at once

print(input("Put any key to begin!"))
print(input("Remember, to also input a key once you're done reading a line! Like this one! (Ok the story will start now)"))
print(input("(A cube walks into his apartment) Cube: Honey! I'm Home! : D"))
print(input(" Cone: Ugh, have you gotten fatter than last time??"))

cubeSide = float(input(" Cube: Of course not! Im only... (Enter the width of the cube) :"))
cubeSidePrint = str(cubeSide)
print(input(cubeSidePrint + " inches wide!"))
anInchLess = str(cubeSide - 1)
print(input(" Cone: I'm pretty sure you were " + anInchLess + " inches yesterday!"))
print(input(" Cube: Aw shuddup ya hag! You're getting shorter by the day!"))
print(input(" Cube: You used to be so tall and thin, but now you're ..."))
coneHeight = float(input("(Put in the hieght of the cone) "))
coneRadius = float(input("(Put in the radius of the cone) "))

coneHeightPrint = str(coneHeight)
coneRadiusPrint = str(coneRadius)

cubeVolume = float(cubeSide * cubeSide * cubeSide)
π = float(3.1415926535)
coneVolume = float(π * coneRadius * coneRadius * coneHeight / 3)

coneVolumePrint = str(coneVolume)
cubeVolumePrint = str(cubeVolume)

print(input(" Cube:... only " + coneHeightPrint + " Inches tall..."))
print(input(" Cube: And a whopping radius of " + coneRadiusPrint + "! Wow, I guess you're getting fat too!"))
print(input(" Cone: Aww, I wish you would just die of old age already!"))
print(input(" At that moment, an explosion rocks teh apartment complex! The couple rushes to the lobby!"))
print(input(" The couple, unable to stand eachother, jump into opposite elevators! But the damages elevators are struggling to keep up their tremendous weight..."))

print("The cube's volume is " + cubeVolumePrint + "!")
print(input("The cone's volume is " + coneVolumePrint + "!"))

if(cubeVolume > coneVolume):
    print("The cube has more volume! The cube's elevator strings breaks, and plummets to the ground! The cone survives!")
    print("End of program! Thanks for playing! : D")
if(coneVolume > cubeVolume):
    print("The cone has more volume! The cone's elevator strings, and plummets to the ground! The cube survives!")
    print("End of program! Thanks for playing! : D")
if(cubeVolume == coneVolume):
    print("The cube and the cone... are... equal??? How the frick did u do that. Like, seriousley, this should be impossible. I'm reporting u to the SCP Foundation.")
    print("End of program! Thanks for playing! : D")

