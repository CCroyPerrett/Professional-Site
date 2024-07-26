# Chase Croy-Perrett
# 1908389
# I Had No Collaborators
# This is a script with 5 functions
    # count_perfect_squares(perfect_square_list)
        # Takes in a list of numbers, returns the amount in the list 
        # that are perfect squares.
    # are_anagrams(string_1, string_2)
        # Returns true if the two strings are anagrams of eachother,
        # returns false otherwise.
    # find_movies_by_director(my_movies_list, director_name)
        # Returns a list of movies in the movie list that contains the
        # matching director's name.
    # find_friend_with_longest_name(my_friends_list)
        # Takes in a list of dictionaries on data of different friends.
        # Returns the dictionary of the friend of the longest name.
    # sort_friends_by_name_length(friend_list)
        # Takes in a list of dictionaries on data of different friends.
        # Returns a new list of dictionaries, equal to the argument
        # but rearranged in descending order of name length.

import math


perfect_square_list = []
def count_perfect_squares(perfect_square_list):
    '''
    Takes in a list of numbers for an argument. Returns the amount
    of those numbers that are perfect squares (if their square root
    is a whole number).
    '''
    count = 0
    for number in perfect_square_list:
        int_sqrt = int((math.sqrt(number)))
        if (int_sqrt == math.sqrt(number)):
            count +=1
    return count

    
def are_anagrams(string_1, string_2):
    '''
    Takes in two strings as an argument. If the two strings are
    anagrams, it returns true. Else, it returns false.
    '''

    # sets both strings into all lower case
    string_1_lower = string_1.lower()
    string_2_lower = string_2.lower()

    # sorts letters into a list
    string_1_list = list(string_1_lower)
    string_2_list = list(string_2_lower)

    # Creates the "editing" versions of the lists
    string_1_list_editing = string_1_list
    string_2_list_editing = string_2_list

    # Checks if list 1 shares each value with list 2
    # Removes one instance of the letter each time from the "editing" version
    # of list 2, to check for repeat letters.
    # Returns false if it finds a missing letter 
    for letter in string_1_list:
        if (letter in string_2_list_editing):
            string_2_list_editing.remove(letter)
        else:
            return False

    # Checks if list 2 shares each value with list 1
    # Removes one instance of the letter each time from the "editing" version
    # of list 1, to check for repeat letters.
    # Returns false if it finds a missing letter 
    for letter in string_2_list:
        if (letter in string_1_list_editing):
            string_1_list_editing.remove(letter)
        else:
            return False

    return True

my_movies = [("Blade", 1998, "Stephen Norrington"),
             ("Underworld", 2003, "Len Wiseman"),
             ("The Lost Boys", 1987, "Joel Schumacher"),
             ("The Hunger", 1983, "Tony Scott")]

def find_movies_by_director(my_movies_list, director_name):
    '''
    Takes in a list of tuples, ordered ("MovieName", release_year, "Director_Name")
    (or just the list my_movies for the pre-made list), as the first argument.
    As the second argument, takes in a string representing the name of a director.
    
    Returns a list listing the details of all movies in the argument list with
    the matching director name.
    '''
    list_of_matching_movies = []
    for movie in my_movies_list:
        if (movie[2] == director_name):
            list_of_matching_movies.append(movie)
    return list_of_matching_movies


my_friends = [              
    {"name": "bimmy", "height": 60},
    {"name": "Ian Donald Calvin Euclid Zappa", "height": 175},
]

def find_friend_with_longest_name(my_friends_list):
    '''
    Takes in a list of dictionaries as an argument, ordered
    [{"name" : "friend_name", height : height_amount}]
    or the list my_friends for the pre-made list.
    
    Returns the dictionary of the friend with the longest name.
    Returns none if the list or argument is empty.
    '''

    longest_name = ""

    # Returns none if no argument, or if list is empty
    if (my_friends_list == None):
        return None
    if (my_friends_list == []):
        return None

    # If the new friend has a longer name than the previous one,
    # They are the new longest named friend.
    # Repeats untill all friends are processed
    for friend in my_friends_list:
        length_of_name = len(friend.get("name"))
        longest_name_length = len(longest_name)
        if (length_of_name > longest_name_length):
            longest_named_friend = friend
            
    return longest_named_friend
            
  
def sort_friends_by_name_length(friend_list):
    '''
    Takes in a list of dictionaries as an argument, ordered
    [{"name" : "friend_name", height : height_amount}]
    or the list my_friends for the pre-made list.

    Returns a new list, of the dictionaries sorted in a list of
    descending name size
    '''
    # Creates the unsorted list that will be messed with (to protect the origional)
    # And creates the (now empty) sorted list
    friend_list_unsorted = friend_list
    friend_list_sorted = []

    # Compares the selected friend from unsorted with every friend in sorted,
    # And inserts the friend into the sorted list after determining how many of
    # the friends in sorted it has a longer name than.
    for friend in friend_list_unsorted:
        name_order = 0
        length_of_friend_name = len(friend.get("name"))
        for sorted_friend in friend_list_sorted:
            length_of_sorted_friend_name = len(sorted_friend.get("name"))
            if (length_of_friend_name < length_of_sorted_friend_name):
                name_order +=1
        friend_list_sorted.insert(name_order, friend)
            
    return friend_list_sorted


