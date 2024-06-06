import random

# Define the snake and ladder positions
snakes = {16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78}
ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100}

def roll_dice():
    return random.randint(1, 6)

def move_player(current_position, dice_roll):
    new_position = current_position + dice_roll
    if new_position in snakes:
        print(f"Oops! You landed on a snake. Moving from {new_position} to {snakes[new_position]}")
        new_position = snakes[new_position]
    elif new_position in ladders:
        print(f"Yay! You found a ladder. Moving from {new_position} to {ladders[new_position]}")
        new_position = ladders[new_position]
    return new_position

def main():
    player_position = 0
    while player_position < 100:
        input("Press Enter to roll the dice...")
        dice_roll = roll_dice()
        print(f"You rolled a {dice_roll}")
        player_position = move_player(player_position, dice_roll)
        print(f"Your current position is {player_position}")
        if player_position == 100:
            print("Congratulations! You won!")
            break

if __name__ == "__main__":
    main()
