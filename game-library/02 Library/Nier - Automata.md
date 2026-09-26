---
aliases:
tags:
genre:
  - RPG
  - Hack and Slash
released: 2017
platform:
  - PC
  - Playstation 4
store:
  - Steam
  - Physical
status: Completed
hours-logged: 60
image: "[[IMG-Nier - Automata.webp]]"
related-games:
---
# Nier - Automata
![[Attachments/02 Library/Nier - Automata/IMG-Nier - Automata.webp]]


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
