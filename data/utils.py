from os import listdir
import re
import unicodedata
import json
import numpy as np


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
    text = [
        sentence.strip() for paragraph in text for sentence in paragraph.split('.') if sentence]

    with open('text.sv.js', 'w+', encoding='utf-8') as out:
        json.dump(text, out, ensure_ascii=False)
