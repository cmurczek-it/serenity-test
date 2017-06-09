Feature: Create new Joining Sequences
    In order to document how parts should be assembled
    As a planner
    I want to create new joining sequences

Scenario: Create new joining sequence using just a plant name
    Given the following users
        | uid       | name          | roles     |
        | Planner   | Peter Plan    | PLANNER   |
        | Planner2  | Klaus Kleber  | PLANNER   |
    And Peter Plan is using DiFF
    When he creates a new joining sequence with the following metadata 
        | plantCode | 111 |
    Then he can see the entered plant code in the metadata

@Ignored
Scenario: Create new joining sequence using just an assembly stage
    Given the following users
        | uid       | name          | roles     |
        | Planner   | Peter Plan    | PLANNER   |
        | Planner2  | Klaus Kleber  | PLANNER   |
    And Peter Plan is using DiFF
    When he creates a new joining sequence with the following metadata 
        | assemblyStage | Stage123 |
    Then he can see the entered assembly stage in the metadata

@Ignored
Scenario: Create new joining sequence using just a primary planner
     the following users
        | uid       | name          | roles     |
        | Planner   | Peter Plan    | PLANNER   |
        | Planner2  | Klaus Kleber  | PLANNER   |
    And Peter Plan is using DiFF
    When he creates a new joining sequence with the following metadata 
        | primaryPlanner | Planner |
    Then he can see the selected primary planner in the metadata

@Ignored
Scenario: Create new joining sequence with a duplicated name
    Given  the following users
        | uid       | name          | roles     |
        | Planner   | Peter Plan    | PLANNER   |
        | Planner2  | Klaus Kleber  | PLANNER   |
    And Peter Plan is using DiFF
    And an existing joining sequence with the following metadata
        | plantCode | 111 |
    When he creates a new joining sequence with the following metadata
        | plantCode | 111 |
    Then DiFF informs that a joining sequence with these meta data already exists

@Ignored
Scenario: Cancel creating a new joining sequence
    Given  the following users
        | uid       | name          | roles     |
        | Planner   | Peter Plan    | PLANNER   |
        | Planner2  | Klaus Kleber  | PLANNER   |
    And Peter Plan is using DiFF
    When he cancels creating a new joining sequence with the following metadata
        | plantCode | 111 |
    Then DiFF returns to its previous state