---
aliases:
tags:
  - "#play-next"
genre:
  - Puzzle
  - RPG
  - Adventure
released: 2012
platform:
  - PC
store:
  - Steam
  - Physical
status: Backlog
hours-logged: 0
image: "[[IMG-Dishonored.webp]]"
related-games:
---
# Dishonored
![[Attachments/02 Library/Dishonored/IMG-Dishonored.webp]]


# Related Games
```base
filters:
  and:
    - file.inFolder("02 Library")
    - or:
	    - file.hasLink(this.file)
		- this.file.hasLink(file)
properties:
  note.status:
    displayName: Status
  note.hours-logged:
    displayName: Time
views:
  - type: cards
    name: Card View
    order:
      - file.name
      - genre
      - status
    image: note.image
    imageAspectRatio: 1.2

```
