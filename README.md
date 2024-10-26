# SvRinc.Game.RiskyTurn

Attempt at risk based game.

# Game rules for 2 players

## Units

| Unit    | Attack power | Hit points |
| ------- | ------------ | ---------- |
| Soldier | 1            | 1          |

Defence advantage: 1 hit point per unit, not kept if not lost during battle

## Unit building

| Unit    | Turns to build | Cost |
| ------- | -------------- | ---- |
| Soldier | 1              | 1    |

## Income

- Base income 2,
- +1 income per additional field

## Specials

- Extra defense for cost of 1, shrugs off additional 2 points per unit
- Fields taken while building, delivers unit to conqueror

## Game play

0. Place initial units
1. All player execute `Player turn` actions
2. `Turn actions` are executed
3. Step 1 & 2 repeat until one player dominates map.

### A. Player turn

#### 1. Administrative

- Get income
- Get units build (including from conquered field)

#### 2. Purchase actions

- Build unit
- Set defense mode for field

#### 3. Move actions

- Decide number of units to move from an owned field
- Set target owned field

No limit on units to move, but only to adjacent field.

#### 4. Battle actions

- Decide number of units to attack from an owned field
- Set target field

### B. Turn action execution

### 1. Movement

- Execute all move actions

### 2. Attack engagement resolve

Base rules

- Only 1 field can be attacked from a field. (for now)
- If two or more attacks are on an unclaimed field, it is resolved as attack on
  attack, with victor wins tweak.

#### Single attack on defense

- Defence advantage applied
- Resolve: first attack, then defense

#### Multi attack on defense

- Defence advantage applied
- Damage is spread over attacking forces, as it will be seen as single force
- Resolve: first attack, then defense

#### Single attack against attack

- Only attacking forces are part of battle
- Resolve: attacks simultaneously

_Note: continued attack applied, after damage resolve_

#### Multi attack against attack

- Stage1 - only attacking forces of attack on attack are part of battle, handled
  as attack on attack
- Stage2 - all remaining units will defend against other attacking, defence
  advantage applied, handled as attack on defense

_Note: continued attack applied for stage 1, after damage resolve_

### 3. Damage resolve

- spread damage with same ratio as initial attack force
-

### 6. Special, continued attack.

To prevent single or outnumbered counter-attack preventing conquering an attack
on attack is continued under the following condition:

- An attacking force outnumbered weaker force by 3 to 1 in number of damage
  points on start

### 5. Update conquered status

- All attack on defend actions, that result in attacker having at least 1 unit
  left, result in conquering the field attacked.
