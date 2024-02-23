# Chase Croy-Perrett
# 1908389
# I had No Collaborators
# This script contains 3 functions and 2 classes
    # save_friendsdb(friendsdb, filename)
        # This function stores the info on friends in the given filename
    # load_friendsdb(filename)
        # Constructs a list of dictionaries, on the friend data in the
        # file.
    # lookup_friends_heights(friendsDatabase, friendsNames)
        # Returns a list of friends heights assosiated to the given
        # names from the friends database.
    # class Friend
        # It's objects represents a friend, and contains their name,
        # hieght, and list of favorite foods, with functions to
        # manipulate the list.
    # class GameEnemy
        # It's objects represent an instance of an enemy in a game.
        # Contains the enemy's name, x and y coordinates, and their
        # health value.
        # Contains a function to print a healthbar.

my_friends = [              
    {"name": "bimmy", "height": 600},
    {"name": "Ian Donald Calvin Euclid Zappa", "height": 175},
]

def save_friendsdb(friendsdb, filename):
    '''
Takes two arguments. The first being friendsdb, a list of dictionaries, each
containing the name and height of a friend. The second argument is the name
of a text file to be created, in which the name and height of each friend
will be saved.

The file will be ordered
name + '\t' + height
with the data of each friend seperate, but adjacent, lines.
    '''
    fileToAddFriends = open(filename, 'w')
    
    for friend in friendsdb:
        # Writes the data that will go into the given line
        fileToAddFriends.write(friend.get('name')+'\t'+str(friend.get('height'))+'\n')
        
    fileToAddFriends.close


def load_friendsdb(filename):
    '''
Takes the name of a text file as an argument. The text file should be
constructed

name + (tab) + height

on each line, the values being the name and height for the given friend.

Creates and returns a list of dictionaries, each one containing the name
and height of a friend.
    '''
    fileWithFriends = open(filename, 'r')
    listOfFriends = []

    for line in fileWithFriends:
        # Splits the line on the tab
        lineList = line.split("\t")

        # Formats the second item correctly, removing \n and turning to int
        lineList[1] = lineList[1].strip("\n")
        lineList[1] = int(lineList[1])
        
        friendDict = {"name" : lineList[0], "height" : lineList[1]}
        listOfFriends.append(friendDict)

    fileWithFriends.close 
    return listOfFriends


def lookup_friends_heights(friendsDatabase, friendsNames):
    '''
Takes two arguments, the first being a database of friends (containing
their names and heights), the second being a list of friend's names.

Will return a list of the friend's heights, in the order of their names
in the second argument. If the friend is not in the database, the
returned list will have None in their given slot.
    '''

    listOfHeights = []

    for name in friendsNames:
        # Ensures the hiehgt will return as none if no value is given.
        friendHieght = None
        for dictionary in friendsDatabase:
            if (dictionary.get("name") == name):
                friendHieght = dictionary.get("height")
        listOfHeights.append(friendHieght)

    return listOfHeights



class Friend:
    '''
A class whose objects represent individual friends.

This class takes 2 argument when an object is made, the name and
the height number of a given friend.
    '''
    
    def __init__(self, name, height):
        '''
Is run when an object of the class is made.
Takes the name and height of the friend as an argument, assigns
them to the object.
Also creates an empty set of favorite foods, to be accesed and
edited by the other functions.
        '''
        self.name = name
        self.height = height
        self.favoriteFoods = set()

    
    def add_favorite_food(self, food):
        '''
Adds an item to the object's set of favorite foods.
        '''
        self.favoriteFoods.add(food)

    
    def number_of_favorite_foods(self):
        '''
Returns the number of items in the object's set of favorite foods.
        '''
        return len(self.favoriteFoods)



class GameEnemy:
    '''
A class whose objects represents instances of an enemy in a game.

When an instance is made, takes the enemy's name, x coordinate,
y coordinate, and hitpoint value as arguments.
    '''
    
    def __init__(self, name, x, y, hitPoints):
        '''
Run when an object of the class is made. Accepts the arguments
name, x, y, hitpoints,
representing the data of a given enemy.

If the Hit Point value is a positive integer, it will assign
these values to the object.
        '''
        # If and Elif ensure no values are assigned untill hit points
        # are a proper value (ensuring no error will occur when
        # the healthbar function is called)
        if(hitPoints < 0):
            return "Hit point value must be a non-negative integer"
        elif(type(hitPoints) == float):
            return "Hit point value must be a non-negative integer"
        else:
            self.name = name
            self.x = x
            self.y = y
            self.hitPoints = hitPoints


    def healthbar(self):
        '''
Returns a representation of the enemy's healthbar, with the enemy's
name, and a number of astericks equal to it's remaining hit points.
        '''
        # Creates the string that represents the healthbar.
        healthBar = str(self.name) + ': ' + '*'*int(self.hitPoints)
        return healthBar
