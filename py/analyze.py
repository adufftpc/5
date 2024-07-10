from collections import Counter, defaultdict
import matplotlib.pyplot as plt


def main():
    counts = defaultdict(int)
    with open('5_letter_nouns.txt', 'r') as f:
        for word in f:
            w_count = Counter(word.strip().replace('ё', 'е'))
            for k, v in w_count.items():
                counts[k] += v
    return counts


if __name__ == "__main__":
    result = {}
    counts = main()
    sorted_list = sorted(counts.items(), key=lambda i: i[1], reverse=True)
    print(sorted_list)
    for k, v in sorted_list:
        result[k] = v
    plt.bar(result.keys(), result.values(), )
    plt.show()
