from os import listdir
import re
import unicodedata
import json


def has_numbers(string):
    return bool(re.search(r'\d', string))


files = listdir()

# for file_name in files:
with open('karolinerna.txt', encoding='utf-8') as f:
    text = f.readlines()
    text = [re.sub("[\(\[].*?[\)\]]|\\n|\. \ |\\t|-\ |\.\.\.", "", sentence.strip())
            for sentence in text if not has_numbers(sentence)
            and sentence != '\n'
            and len(sentence.split(' ')) > 10]

    with open('text.sv.js', 'w+') as out:
        out.write('export const data = ' + json.dumps(text))
