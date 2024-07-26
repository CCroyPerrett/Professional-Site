# Chase Croy-Perrett
# 1908389
# I Had No Collaborators
# This script is a list of five functions
    # integer_division takes a numerator and a denominator as an input
        # and returns the amount of times the demoninator goes into the
        # numerator (no decimals or remainders)
    # update_names_in_list takes a list of names, and two additional strings,
        # the first for the oldname, the item in the list which will get replaced
        # the second for the newname, the item that will replace the oldname
    # form_letter takes in a list of dictionaries, each with two entries
        # the first item for the name of the recipient of the letter, the
        # second for the time of the appointment. Returns a list of
        # strings, to be used as letters to send to the recipients
    # make_word_backwards takes in a single string as an input
        # and returns the word with all it's letters reversed
    # make_each_word_backwards is similar to the above, but instead of reversing
        # the order of every letter, it reverses the letters of each
        # word individually. (It takes in a sentence as an input, and each
        # word must be seperated by a space to function)


def integer_division(numerator, denominator):
    '''
    Function takes two inputs, (numerator, denominator), and returns
    the amount of times the denominator goes into the numerator. No
    decimals or remainders are factored in. Returns none if either of
    the inputs are less than or equal to zero.
    '''
    result = 0
    if(numerator <= 0 or denominator <= 0):
        return None
    else:
        while(numerator > denominator):
            result += 1
            numerator = numerator - denominator
        return result


names = []
def update_names_in_list(names, oldname, newname):
    '''
    Takes in the inputs (names (a list), oldname, and newname
    (both strings)). Returns a new list equal to names, except if
    an item on the list is equal to oldname. In that case, oldname
    in the new list is replaced with newname.
    '''
    newNames = []
    for name in names:
        if(name == oldname):
            name = newname
            newNames.append(name)
        else:
            newNames.append(name)
    return newNames


form_letter_list = [{}]
def form_letter(form_letter_list):
    '''
    Takes a list of dictionaries as arguments. Dictionaries should
    be structured ["name" : "nameString", "time" : "timeString"]
    Replace nameString and timeString with the desired name and time
    for the appointment (in string form). For each dictionary, the function
    will print a letter notifying nameString that their appointment
    will be at timeString.
    '''
    return_list = []
    for form_letter_dictionary in form_letter_list:
        TEMPLATE = """Dear {name},
Your appointment is at {time}.
Thanks very much.
-- bimmy"""

        return_list.append(TEMPLATE.format(**form_letter_dictionary))
    return return_list


def make_word_backwards(word):
    '''
    Takes a singular string as an input, and returns a new string,
    equal to the old string with letter order reversed.
    '''
    list_word_backwards = []
    count = 0
    
    for letter in word:
        list_word_backwards.append(word[-1-count])
        count += 1
    return str("".join(list_word_backwards))


def make_each_word_backwards(sentence):
    '''
    Takes a sentence as an input, and returns a new sentence. The new
    sentence is the old one, except all words have their letters reversed.
    '''
    sentence_list = sentence.split(" ")
    list_result = []
    
    for word in sentence_list:
        list_word_backwards = []
        wordstr = str(word)
        count = 1
        for letter in wordstr:
            list_word_backwards.append(word[-count])
            count += 1
        word_backwards = "".join(list_word_backwards)
        list_result.append(word_backwards)
    return " ".join(list_result)
        
    

