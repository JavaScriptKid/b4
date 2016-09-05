# Combatant Model `combatant-model.js`
Receives current state of a combatant (a bunch of properties) and returns
the same properties alongside helpful combatant methods. EX: `isOutOfUsablePp()`.

Many character upgrades take effect within the combatant-model, like Oathbreaker and Dangerous I & II.
TODO: ?? Many statuses also take effect in the Combatant Model, like Fury and Zen ("Focus")
 
 
# executeTurn `execute-turn.js`

Takes in submission models (which have Speed attached)
    1) Makes an action queue, taking in user submissions and any actions that are up to bat in the Cloud Queue
    2) Runs the queue through `processActions`
    3) Returns the result of `processActions`, which is a new entry in history state
    
    
# getStepDescriptionObject `get-step-description-object.js`

Builds up the `descriptionObject`, which allows us to create a 
human readable Rollout Step. The changes object is piped through many functions that
will return added or edited values. EX: `affectTargetHpPoints: -4`
Each function has access to `action, casterModel, targetModel`


# Missing

During getStepDescriptionObject, `miss.js` will look at the action's `accuracyModifier` and
pass that in to Combatant Model's `getMiss` method. getMiss returns a true/false based on `percentChance`.
Items, Supers, and a few Special attacks all have `accuracyModifier` pumped up to 999 so they will not miss.
The `accuracyModifier` is SUBTRACTED from the chance to miss. Higher accuracyModifier = less likely to miss.

(percentChance CAN be given numbers higher than 100, which will always return `true` )

