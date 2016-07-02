export function getExtraActionAdds(action, casterState, targetState, currentChanges) {

    let changes = {};

    //TODO: logic for reading action schema and adding the proper attack or followup action (like recovering)

    changes["addActionToCloudQueue"] = []; /* This property should always exist. empty or full */

    /* Example */
    /*
    [
       {
            turnsFromNow: 2,
            action: {
                 casterId: currentChanges.casterId,
                 targetId: currentChanges.targetId,
                 actionId: "attack-001-a"
            }
       }
    ]
     */

    return {
        ...currentChanges,
        ...changes
    }
}