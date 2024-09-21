# Makefile pour générer du code HTML à partir de Markdown

# Variables
SRC_DIR = src
BUILD_DIR = build
HTML_DIR = html
MARKDOWN = $(wildcard $(SRC_DIR)/*.md)
HTML = $(patsubst $(SRC_DIR)/%.md,$(HTML_DIR)/%.html,$(MARKDOWN))

# Règles
all: $(HTML)

html:

$(HTML_DIR)/%.html: $(SRC_DIR)/%.md
	@mkdir -p $(BUILD_DIR)
	@mkdir -p $(HTML_DIR)
	@pandoc -s -o $(BUILD_DIR)/$*.html $<
	@mv $(BUILD_DIR)/$*.html $(HTML_DIR)/$*.html

clean:
	@rm -rf $(BUILD_DIR) $(HTML_DIR)

.PHONY: all html
