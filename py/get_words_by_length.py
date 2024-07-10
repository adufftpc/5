
def main():
    with open("russian-mnemonic-words.txt", "r") as f_in, open("5_letter_nouns.txt", "w") as f_out:
        for word in f_in:
            if len(word) == 6:
                f_out.write(f'{word.strip()}\n')


if __name__ == "__main__":
    main()
