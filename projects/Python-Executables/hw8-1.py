# Chase Croy-Perrett
# 1908389
# I had no collaborators
# The bimmypp programming language interpreter!

import json



def load_bimmypp(filename):
    with open(filename) as infile:
       return json.load(infile)



def validate(bpp):
    """Returns True if this is a valid bimmypp program, or if it finds a
    problem, raises a ValueError."""
        
    if(type(bpp) != int and type(bpp) != list):
        raise ValueError("The input is not an integer or a list!")

    if(type(bpp) == list):

        if(len(bpp) != 3):
            raise ValueError('The expression list is not a valid length.')
        
        if(bpp[0] != "add" and "sub" and "div" and "mul"):
            raise ValueError('The operator is not valid.')

        if(type(bpp[1]) != int and type(bpp[1]) != list):
            raise ValueError('The first operand is not valid.')

        if(type(bpp[2]) != int and type(bpp[2]) != list):
            raise ValueError('The second operand is not valid.')

        if(type(bpp[1]) == list):
            assert validate(bpp[1]) == True

        if(type(bpp[2]) == list):
            assert validate(bpp[2]) == True
      
    return True



            
def evaluate(bpp):
    """Evaluate a bpp expression. Returns the result of evaluating the program.
    Might also raise a ValueError, if we end up dividing by 0.
    """
    if(type(bpp) == int):
        return bpp

    if(type(bpp) == list):

        if(type(bpp[1]) == list):
            newFirstOperand = evaluate(bpp[1])
            bpp[1] = newFirstOperand

        if(type(bpp[2]) == list):
            newFirstOperand = evaluate(bpp[2])
            bpp[2] = newFirstOperand

        if(bpp[0] == 'add'):
            result = bpp[1] + bpp[2]
            return result

        if(bpp[0] == 'sub'):
            result = bpp[1] - bpp[2]
            return result

        if(bpp[0] == 'mul'):
            result = bpp[1] * bpp[2]
            return result

        if(bpp[0] == 'div'):
            if(bpp[2] == 0):
                raise ValueError("divide by zero")
            result = bpp[1] // bpp[2]
            return result



def run_bimmypp(filename):
    """Function for running a bimmypp program. Takes a filename and executes the file.

    You don't have to make any changes to this function."""
    try:
        bpp = load_bimmypp(filename)
    except json.decoder.JSONDecodeError:
        print("Could not load bimmypp file")
        return None
    except FileNotFoundError:
        print("no such file: ", filename)
        return None

    try:
        valid = validate(bpp)
    except ValueError as e:
        print(e)
        return None

    try:        
        value = evaluate(bpp)
        print("Success!")
        print("we got:", value)
        return value
    except ValueError as e:
        print(e)
        return None
