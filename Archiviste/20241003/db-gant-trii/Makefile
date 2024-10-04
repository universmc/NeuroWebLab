# Variables
PROJECT = default
GPT_TYPE = codex

ifeq ($(PROJECT), zira)
    GPT_TYPE = agi
endif

# Règles
all: create_directories generate_files

create_directories:
    mkdir -p $(PROJECT)/$(GPT_TYPE)/data
    mkdir -p $(PROJECT)/$(GPT_TYPE)/scripts

generate_files:
    touch $(PROJECT)/$(GPT_TYPE)/data/input.txt
    cp template.py $(PROJECT)/$(GPT_TYPE)/scripts/script.py

clean:
    rm -rf $(PROJECT)

.PHONY: all create_directories generate_files clean
