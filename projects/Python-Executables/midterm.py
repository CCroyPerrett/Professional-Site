# Chase Croy-Perrett
# 1908389
# This is the midterm exam.

# I understand that getting help from a classmate or an external source would
# be a violation of academic integrity. So I did all of this work myself.
# signed: Chase Croy-Perrett

from math import sqrt

### QUESTION ONE ###

def area_of_equilateral_triangle(a):
    '''
    This function takes the side length of an equilateral triangle as
    an argument, and returns the value of the area of the triangle
    (in float form).
    '''
    # The formula is split into two parts, squaring the argument and having the
    # constant be in seperate variables to simplify the function, and ensuring
    # the order of operations works as intended.
    argument_squared = a**2
    equilateral_triangle_constant = sqrt(3) / 4
    
    area_of_triangle = equilateral_triangle_constant * argument_squared
    return area_of_triangle


### QUESTION TWO ###

def count_fred_and_ted(names):
    '''
    Takes a list of strings as an argument, and returns the number of strings
    in the list are equal to the names "ted" or "fred".

    The names may be presented in all lowercase, all uppercase, or with only
    the first letter capitalized.
    '''
    fred_and_ted_count = 0

    # Adds one to the count whenever "fred" or "ted" is found
    for name in names:
        if (name == "ted" or name == "fred"):
            fred_and_ted_count += 1
        elif (name == "Ted" or name == "Fred"):
            fred_and_ted_count += 1
        elif (name == "TED" or name == "FRED"):
            fred_and_ted_count += 1
            
    return fred_and_ted_count
            

### QUESTION THREE ###

def sum_of_greatest_two(a, b, c):
    '''
    Takes three numbers as an argument, and returns the sum of the greater
    two numbers added together.
    '''
    if (c <= b and c <= a):
        return a + b
    elif (b <= c and b <= a):
        return a + c
    elif (a <= c and a <= b):
        return b + c

### QUESTION FOUR ###

def pet_shopping_list(pet_type):
    '''
    Takes a string as an argument (intended to be a type of pet). Gets the
    singular form of the animal type (if presented as plural form origionally).

    Returns a shopping list, a list containing the food, treats, bed and house
    of the animal (in singular form, as is gramatically correct).
    '''
    if (pet_type == "mice"):
        pet_type_singular = "mouse"
    elif (pet_type[-2:] == "es"):
        pet_type_singular = pet_type[:-2]
    elif (pet_type[-1] == "s"):
        pet_type_singular = pet_type[:-1]
    else:
        pet_type_singular = pet_type

    shopping_list = [pet_type_singular + " food", pet_type_singular + " treats",
                     pet_type_singular + " bed", pet_type_singular + " house"]

    return shopping_list
        
    


### QUESTION FIVE ###

def calculate_new_balance(start, transactions):
    '''
    Takes two arguments. The first being a number representing the
    starting balance of the bank account. The second being a list of
    tuples, representing the transaction being made with the bank
    account each tuple being in the form:

    (string of reason of transation, positive number representing
    amount of money being deposited or withdrawn, and either the
    string "deposit" or "withdrawal" depending on whether money is
    being taken out or put in)

    Returns the amount of money the bank account hold after the
    stated transactions are complete.
    '''
    balance = start
    
    for transaction in transactions:
        if (transaction[2] == "deposit"):
            balance += transaction[1]
        elif (transaction[2] == "withdrawal"):
            balance -= transaction[1]
            
    return balance
    

### QUESTION SIX ###

def list_n_perfect_squares(n):
    '''
    Takes a positive integer as an argument
    '''
    one_to_argument = range(1,n+1)
    list_of_perfect_squares = []

    for number in one_to_argument:
        list_of_perfect_squares.append(number * number)

    return list_of_perfect_squares
    

### QUESTION SEVEN ###

def username_ends_with_digits(username):
    '''
    Returns true if the given argument (a string representing username)
    ends with numbers. Returns false otherwise.
    '''
    if(username[-1].isdigit() == True):
        return True
    else:
        return False

### QUESTION EIGHT ###

friends_database = [
    {"name":"bimmy", "height":600, "address":"in the woods"},
    {"name":"Dweezil", "height": 175, "address":"123 Main Street"},
    {"name":"Emily", "height": 190, "address":"7070 Willow Lane"}
]

def names_with_addresses(friends):
    '''
    Takes a list of dictionaries as an argument, each describing
    the name, address, and other (optional) data of a given friend.

    Returns a list of tuples, each containing a friend's name and
    address (in that order). The tuples are in the order of their
    dictionary in the argument list.
    '''
    list_of_names_and_addresses = []
    
    for dictionary in friends:
        friend_name_and_address = (dictionary["name"], dictionary["address"])
        list_of_names_and_addresses.append(friend_name_and_address)
        
    return list_of_names_and_addresses

### QUESTION NINE ###
"""
When this script is run, an empty list is printed. While the function
does create a list of the numbers sorted from greatest to least as
intended, that is not what the author attempts to print at the end.

The function systematically removes the current greatest number from
my_numbers, and attatches it to the end of the result. When the author
tried to print my_numbers at the end, all that is printed is the
empty list that everything has already been removed from.

To print the sorted list, the author should replace print(my_numbers)
with print(result).
"""

### QUESTION TEN ###
"""
The origional program printed the square of the square of the square
of two. This functioned because the square_number() formula returned
the integer of the argument squared, and could feed the integer to
the next integration.

But with the change of return to print in the function, there are
two changes. The first being that the console will print the squared
number assoon as the calculation finishes, the second being there is
no returned value to use as the argument for any square_number()
except the first.

The function will likly not work as intended, printing a 4, and then
an error. For (what I assume to be) the intended effect, instead of
replacing the return command with the print command, the print
command should be placed right before the return command in the
square_number() function.

"""
