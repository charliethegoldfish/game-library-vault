---
aliases:
tags:
genre:
  - Shooter
  - Adventure
released: 2014
platform:
  - Playstation 4
store:
  - Physical
status: Completed
hours-logged: 60
image: "[[IMG-Wolfenstein - The New Order.webp]]"
related-games:
---
# Wolfenstein - The New Order
![[Attachments/02 Library/Wolfenstein - The New Order/IMG-Wolfenstein - The New Order.webp]]


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
