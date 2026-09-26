
```base
filters:
  and:
    - file.inFolder("02 Library")
    - note.store.contains("Steam")
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
      - genre
    sort: []
  - type: cards
    name: Card View
    order:
      - file.name
      - genre
      - status
    image: note.image
    imageAspectRatio: 1.2

```
