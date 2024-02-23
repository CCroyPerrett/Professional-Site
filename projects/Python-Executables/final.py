# Chase Croy-Perrett
# 1908389
# This is the final exam 

# I understand that getting help from a classmate or an external source would
# be a violation of academic integrity. So I did all of this work myself.
# signed: Chase Croy-Perrett

### QUESTION ONE ###

import math

def ponder_orb_density(radius, mass):
    '''
A function to find an orb's denisty, the redius and mass being
the arguments.
    '''
    radius_cubed = radius * radius * radius
    volume = radius_cubed * math.pi * 4/3
    density = mass / volume
    return density


### QUESTION TWO ###

def remove_letters(message, letters_removed):
    '''
Takes 2 arguments, a message and a string comprising of letters to be
removed from the message. Returns a version of the message without those
letters (is case sensitive).
    '''

    list_of_letters_message = list(message)
    list_of_letters_2_remove = list(letters_removed)

    for letter_2_remove in list_of_letters_2_remove:
        for letter in list_of_letters_message:
            if(letter == letter_2_remove):
                list_of_letters_message.remove(letter)

    revised_message = ''.join(list_of_letters_message)

    return revised_message


### QUESTION THREE ###

def strings_to_ints(list_of_strings):
    '''
Converts a list of strings into a list of integers. If a given string is
not representative of an integer, will put 0 in it's place in the list.
    '''
    list_of_integers = []

    for item in list_of_strings:
        try:
            number = int(item)
            list_of_integers.append(item)
        except:
            list_of_integers.append(0)

    return list_of_integers


### QUESTION FOUR ###

def count_these_terms(list_of_terms, items_to_count):
    '''
Takes two list as an input. Returns a dictionary showing how many times
each item in the second list appeared in the first list.
    '''

    counting_dictionary = {}

    for item in items_to_count:
        item_amount = 0
        for term in list_of_terms:
            if (item == term):
                item_amount += 1
        counting_dictionary[item] = item_amount
        
    return counting_dictionary


### QUESTION FIVE ###

def select_lines_from_file(filename, word_to_find):
    '''
Searches through a text file, returns a list of every line that contains
the specified word.
    '''
    list_of_matching_lines = []
    with open(filename, 'r') as final_sample:
        for line in final_sample:
            if (word_to_find in line):
                list_of_matching_lines.append(line)

    final_sample.close()
    return list_of_matching_lines


### QUESTION SIX ###

def sum_highest_five(list_of_numbers):
    '''
Returns the sum of the five highest numbers from a list of numbers.
    '''
    list_of_highest_five = []

    if (len(list_of_numbers) < 5):
        raise ValueError('the list must contain at least 5 items')
                         
    while (len(list_of_highest_five) < 5):
        next_highest = list_of_numbers[0]
        for number in list_of_numbers:
            if (number > next_highest):
                next_highest = number
        list_of_numbers.remove(next_highest)  
        list_of_highest_five.append(next_highest)

    highest_five_sum = (list_of_highest_five[0]+list_of_highest_five[1]
                        +list_of_highest_five[2]+list_of_highest_five[3]
                        +list_of_highest_five[4])

    return highest_five_sum

### QUESTION SEVEN ###
class Friend:
    def __init__(self, name, height):
        self.name = name
        self.height = height
        self.favorite_foods = set()

    def add_favorite_food(self, food):
        self.favorite_foods.add(food)

    def number_of_favorite_foods(self):
        return len(self.favorite_foods)

    def __str__(self):
        foodlist = sorted(self.favorite_foods)
        foodstr = ", ".join(foodlist)
        return "[FRIEND name: {}, height: {}, favorite foods: {}]"\
            .format(self.name, self.height, foodstr)


class FriendsDB:
    def __init__(self):
        self.friends = []

    def add_friend(self, friend):
        self.friends.append(friend)

    def friends_who_love(self, food):
        out = sorted([friend.name for friend in self.friends
                      if food in friend.favorite_foods])
        return out

    def group_friends_by_food(self):
        food_dict = {}
        for friend in self.friends:
            for food in friend.favorite_foods:
                friend_food_list = []

                for friend2 in self.friends:
                    if (food in friend2.favorite_foods):
                        friend_food_list.append(friend2.name)
                friend_food_list.sort()
                food_dict[food] = friend_food_list
        return food_dict 
                        
              
### QUESTION EIGHT ###

class BinaryTree:
    def __init__(self, value, leftchild, rightchild):
        self.value = value
        self.leftchild = leftchild
        self.rightchild = rightchild

def sum_binary_tree(tree):
    if(tree == None):
        return 0
    
    if(type(tree) ==  BinaryTree):
        if (tree.leftchild == None):
            tree.leftchild = 0
        if (tree.rightchild == None):
            tree.rightchild = 0

        if(type(tree.leftchild) ==  BinaryTree):
            tree.leftchild = sum_binary_tree(tree.leftchild)
        if(type(tree.rightchild) ==  BinaryTree):
            tree.rightchild = sum_binary_tree(tree.rightchild)

        added_together = tree.value + tree.leftchild + tree.rightchild
        
        return added_together
        
                  

### QUESTION NINE ###
"""
If you run this code, although the

eleanor = Deer("eleanor")

command will run fine, the second line of code will return an error.

Because the Deer class does not inherit from the Animal class, the two
classes are consitered completley seperate. This means the Deer class does
not inherit the functionality of the Animal class's speak(self, name)
function, as the writer of the code most likley intended.

To edit the code, I would make the Deer a child class of Animal, by changing
the first line of Deer's code from

class Deer:

to

class Deer(Animal):

This will make the deer class a child of the Animal class, inheriting
from an instance of it. Additionally, I would edit the __init__
function of the Deer class, to inherit the name of the Animal Class.

I would change the Deer class to be:

class Deer(Animal):
    def __init__(self, Animal):
        self.name = Animal.name

    def run(self):
        print("I'm running all around!")

And to get the desired effect from the code, the input would be

eleanor = Deer(Animal("eleanor"))
eleanor.speak()
"""

### QUESTION TEN ###
"""
This binary search function only works if the list of words is already
sorted. If the list is already inputted sorted then it would work fine,
but if one wishes to sort through an unsorted book passage for example,
the function would most likley produce an undesirable result. (It would be
extremely unlikley for the word to be found at all!)

For this to work, there should be a seperate function to generate an 
sorted version of the list. (That functionality could be added on to this
function, but that would make it so the list would need to be re-sorted with
every new word search, and would take likley a while).

This function is pretty fast, much faster than a linear search. With this
binary method, far fewer items in the list need to be "checked" to find the
desired item.

While the time for a linear search grows linearly as a list linearly
increases, the binary search method decreases the search time exponentially
(when compared to the times of a linear search).

While a linear search could get "lucky" and find it's desired item almost
immediatly, so too could a binary search. But linear search has a much slower
"worst case senario" than binary search does.
"""


