# Roadmap

Snapshot of things todo, so no particular order, but more direction of different
parts of the app.

## Game App flow

- Minimal flow
  - [x] Start Menu
  - [x] Player status
  - [x] Game status
  - [x] Switch Player turns
  - [x] Switch Player actions
  - [x] Game finished

- Other
  - [ ] Game config
  - [ ] Audio Config
  - [ ] Game rules

## Game (technical)

- [ ] Hex grid logic
- [ ] Player view on game status

## Display

- [x] Animation
- [ ] Screen transition
- [x] Modal

## Audio

- Functional
  - [ ] Stop option, when starting new sound
  - [ ] Looping sound with start/stop option
  - [ ] Music
- Technical
  - [ ] Gain per stream
- Caveats
  - [ ] No sound on IOS
  - [ ] Sound sometime fails to start.

## Game (functional)

- [x] Dead tiles
  - Handle none, sea / rock
  - Handle domination
- [x] Income
  - Turn
  - Additional owned
- Other (buy) actions
  - [x] build
  - [ ] defend
  - [ ] move
- [ ] Attack
  - [x] single attack
  - [ ] single Battle result <-
  - [ ] adjacency check (hex first?)
  - [ ] multiple attacks
  - [ ] multi Battle result

- Code caveats
  - [ ] Location validate tests
  - [ ] publish change events in processor
  - [ ] Popup modal refactor for location
