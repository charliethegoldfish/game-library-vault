---
aliases:
tags:
genre:
  - Shooter
  - Adventure
released: 2017
platform:
  - PC
  - Playstation 4
store:
  - Physical
  - Steam
status: Backlog
hours-logged: 0
image: "[[IMG-Wolfenstein - The New Colossus.webp]]"
related-games: "[[Wolfenstein - The New Order]]"
---
# Wolfenstein - The New Colossus
![[Attachments/02 Library/Wolfenstein - The New Colossus/IMG-Wolfenstein - The New Colossus.webp]]


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
