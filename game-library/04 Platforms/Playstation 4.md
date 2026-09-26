
```base
filters:
  and:
    - file.inFolder("02 Library")
    - note.platform.contains("Playstation 4")
properties:
  note.status:
    displayName: Status
  note.hours-logged:
    displayName: Time
views:
  - type: table
    name: Table View
    groupBy:
      property: status
      direction: DESC
    order:
      - file.name
      - status
      - hours-logged
    sort:
      - property: file.name
        direction: DESC
  - type: cards
    name: Card View
    order:
      - file.name
      - genre
      - status
    image: note.image
    imageAspectRatio: 1.2

```
