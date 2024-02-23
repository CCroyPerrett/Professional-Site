# Chase Croy-Perrett
# 1908389
# I had no collaborators
# Holds the friend class from the previous homework, with a new __str__
    # method to print out the friend's data.
    # Also has the FriendsDB class, meant to hold and catalouge several
    # friend objects.




class Friend:
    '''
A class whose objects represent individual friends.

This class takes 2 argument when an object is made, the name and
the height number of a given friend.
    '''
    
    def __init__(self, name, height):
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

    def __str__(self):
        '''
Prints out a string containing the data of the friend's name, height,
and favorite foods (in alphabetical order), seperated by commas.
        '''
        
        count = 0

        nameStr = "".join("FRIEND name: " + self.name + ",")
        heightStr = " " + str(self.height) + ", "
        foodList = []

        for item in sorted(self.favoriteFoods):
           if (count == 0):
               foodList.append(': '.join(['favorite foods' , item]))
               count += 1
           else:
               foodList.append(item)
        
        
        foodStr = str(", ".join(foodList))

        selfList = "[" + "".join(nameStr + heightStr + foodStr) + "]"

        return selfList




    
class FriendsDB:
    '''
A class for objects meant to hold a database of friends.
    '''

    
    def __init__ (self):
        self.friends = []



    def add_friend(self, friend):
        '''
Accepts an object to add to the list of friends.
        '''
        self.friends.append(friend)

    
    def friends_who_love(self, food):
        '''
Returns a list of friends's names who was the argument as one of their
favorite foods.
        '''
        matchingFriends = []

        for Friend in self.friends:
            for item in Friend.favoriteFoods:
                if(item == food):
                    matchingFriends.append(Friend.name)

        return sorted(matchingFriends)

    def save(self, filename):
        '''
Stores the data of the database in a text file, with the same name
as the argument.
        '''
        friend_file = open(filename, "w")

        for friend in self.friends:
            
            friend_file.write(friend.name+"\t"+str(friend.height))
            for item in sorted(friend.favoriteFoods):
                friend_file.write('\t'+item)
            friend_file.write('\n')
            
        friend_file.close()


    
def load_friends_database(filename):
    '''
Returns a friend database, containing several friend objects, loading
data from an appropiate text file.
    '''
    data_base = FriendsDB()
    
    friend_file = open(filename, "r")

    for line in friend_file:
        friend_list = line.split('\t')
        friend_list[-1] = friend_list[-1].strip('\n')


        new_Friend = Friend(friend_list[0], friend_list[1])

        for food in friend_list[2:]:
            new_Friend.add_favorite_food(food)

        data_base.add_friend(new_Friend)

    return data_base
            
            

        

                              
