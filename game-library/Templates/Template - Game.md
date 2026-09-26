---
aliases:
tags:
genre:
released:
platform:
store:
status:
hours-logged:
image:
related-games:
---
# {{VALUE:gameName}}
{{VALUE:image}}


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
