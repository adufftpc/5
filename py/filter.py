import re
import sys

DEFAULT_MASK = ''

def main():
    pass


if __name__ == "__main__":
    mask = sys.argv[1] if len(sys.argv) == 1 else DEFAULT_MASK
    main(mask)
