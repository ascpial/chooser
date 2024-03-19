with open("name-list.txt", 'r', encoding="utf-8") as file:
    names = [line.strip() for line in file.readlines()]

import datetime
import random
import json

now = datetime.datetime.now().timestamp()

random.shuffle(names)

output_list = []

for name in names[:45]:
    forename, name = name.split(" ")
    if random.randint(1, 5) == 1:
        date = "jamais"
    elif random.randint(1, 10) == 1:
        date = "hier"
    elif random.randint(1, 2) == 1:
        date = str(random.randint(1, 28)) + " février"
    else:
        date = str(random.randint(1, 17)) + " mars"

    output_list.append(
            {
                "forename": forename,
                "name": name,
                "selected": random.randint(1, 10) == 1,
                "date": date,
                }
            )

with open("output.json", 'w', encoding='utf-8')  as file:
    json.dump(output_list, file)
