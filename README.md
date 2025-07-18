# Obsidian Delete Empty Notes

An Obsidian plugin that automatically deletes newly created "Untitled" notes if left empty.

## Features

- **Automatically removes empty notes**: When a new note is created with a name that contains the word “Untitled", the plugin will delete the note if the note remains empty and focus is switched to another note.
- **Only deletes notes with no content**: Notes containing any text or content will not be deleted. Only completely empty notes will be deleted.

## How It Works

1. A new note is created using Obsidian’s default new  note command.
2. If the note is closed without renaming or focus is switched away from the note without adding content, the note is automatically deleted.
3. If any text is added to the note, it will not be deleted, even if the name remains “Untitled”.

## Installation

1. Download or clone this repository.
2. Move the `main.js`, `manifest.json`, and `styles.css` (if provided) files into the vault’s `/plugins/auto-delete-empty-notes/` folder.
3. In Obsidian, navigate to Settings, then Community plugins, then Disabled plugins, and enable Auto Delete Empty Notes.

## FAQ

**Are notes ever deleted if they contain any content?**
No. The plugin only deletes notes that are completely empty, with no text at all.

**Does the plugin work for renamed notes?**
No. Only notes with names such as “Untitled.md” or “Untitled 1.md” are affected.

**How can an empty note be preserved?**
Rename the note to something other than “Untitled” or add any content.
