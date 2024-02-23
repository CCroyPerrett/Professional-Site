# Chase Croy-Perrett
# 1908389
# I was helped by the user "alexr" in the CSE 20 discord
    #I wrote the code myself, but they infomred me on the command "endswith()" for pluralize_english_word(word)
# This script is made of five functions that can be called, each with a different purpose.
    # sphere_volume(radius)
        # takes radius as the input, and then calculates the volume
        # to calculate pi, math is imported. the cubed function is calculated first, on a
        # seperate line, to ensure I wouldn't mess up order of operations
    # square_larger_number(a , b)
        #takes two numbers as inputs, returns the square of the larger one, using "** 2" to square
    # find_bimmy_or_jammy takes a list as an input, if any of the names are jammy or bimmy,
        # the first instance is returned
    # count_numbers_greater_than_five(numbers)
        # accepts a list of numbers as the input. The returned value starts at zero, and
        # increases by one with each number inthe list greater than five
    # pluralize_english_word(word)
        # Takes a single word as input, uses a list of if statments with the endswith("x")command 
        # to determine the method of pluralization, including specific words with unique pluralizations
    

import math

def sphere_volume(radius):
    """
    Takes the radius of a sphere as the input, then calculates the volume.
    """
    radiusCubed = radius ** 3
    volume = radiusCubed * math.pi * 4 / 3
    
    return (volume)


def square_larger_number(a , b):
    """
    Takes in two numbers as inputs, determines which is greater, and
    reutrns the square of the larger number. Still returns a square
    if the numbers are equal.
    """
    if (a > b):
        largerSquare = a ** 2
    elif (b > a):
        largerSquare = b ** 2
    else:
        largerSquare = a ** 2

    return largerSquare

# An empty list is created, to be filled by the function input.
# Trying to create the list in the function parenthasis works with variables
# but leads to loads of errors with lists
names = []
def find_bimmy_or_jammy():
    """
    Takes a list as input. If any items on the list are the names
    "bimmy" or "jammy", it returns the name. The name returned is
    the name first on the list.
    """
    for name in names:
        if (name == "bimmy"):
            return "bimmy"
        elif (name == "jammy"):
            return "jammy"
        else:
            continue

numbers = []
def count_numbers_greater_than_five(numbers):
    """
    Takes a list of numbers as an input, and returns the amount of numbers
    in the list that are greater than five.
    """
    greaterCount= 0
    for number in numbers:
        if(number > 5):
            greaterCount += 1

    return greaterCount

def pluralize_english_word(word):
    """
    Accepts an english word as an input, returns the plural version
    of the english word as an output
    """
    if(word == "mouse" or word == "Mouse"):
        return "mice"
    elif(word == "deer" or word == "Deer"):
        return "deer"
    elif(word == "person" or word == "Person"):
        return "deer"
    elif(word == "ox" or word == "Ox"):
        return "oxen"
    elif(word.endswith("o")):
        return word + "es"
    elif(word.endswith("x") or word.endswith("sh") or word.endswith("s")
    or word.endswith("ch") or word.endswith("z")):
        return word + "es"
    else:
        return word + "s"


    
        

    
        

