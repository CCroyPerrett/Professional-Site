# Chase Croy-Perrett
# 1908389
# I had no collaborators.
# There are 2 identical while loops set up, one for the numerator, and for the denominator.
# The while loops will repeat the prompt until a positive integer is unputted, looping if
# a negative number or zero is inputted.
# The final while loop is where the calculations take place. With each loop, the
# denominator is subtracted from a copy of the numerator (named numeratorForMath) while also
# increasing the result by 1. This continues untill numeratorForMath is less than the
# denominator, ending the while loop. The results are announced in the "else" attatched
# to the while loop.


# Creation of the numerator variable, and loop for inputting the numerator.
numerator = 0

while(numerator <= 0):
    numerator = input("Give numerator for division: ")
    numerator = int(numerator)
    if(numerator > 0):
        break
    else:
        print("Please input a positive integer for the numerator.")


# Creation of the denominator variable, and loop for inputting the denominator.
denominator = 0

while(denominator <= 0):
    denominator = input("Give me the denominator for division: ")
    denominator = int(denominator)
    if(denominator > 0):
        break
    else:
        print("Please input a positive integer for the numerator.")


# Here i create essential variables, to be used in the upcoming while loop.
result = int
result = 0

numeratorForMath = int(numerator)


# Loop where the division is calculated. Results are announced once the loop ends.
while(numeratorForMath >= denominator):
    numeratorForMath = numeratorForMath - denominator
    result = result + 1
else:
    print("The numerator,", numerator, ", goes in to the denominator,", denominator,
          ",", result, "times." )
    print("The remainder is equal to", numeratorForMath)


