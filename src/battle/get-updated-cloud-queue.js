/**
 * Read the description Object and Determine if the move should add stuff to cloud queue.
 * Return the new version of cloud queue with stuff added
 */


import {addQueuedSubmissions} from './cloud-queue'
export function getUpdatedCloudQueue(descriptionObject, currentQueue) {


    if (descriptionObject.addActionToCloudQueue) { //This property needs to exist to add stuff
        const action = { //TODO: temporary hard coding, should read from dObj.addActionToCloudQueue
            casterId: descriptionObject.casterId,
            targetId: descriptionObject.targetId,
            actionId: "attack-001-a"
        };

        return addQueuedSubmissions(currentQueue, action, 1); //TODO: temporary hard the number, should read from dObj.addActionToCloudQueue
    }

    return currentQueue;
}