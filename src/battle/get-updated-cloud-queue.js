/**
 * Read the description Object and Determine if the move should add stuff to cloud queue.
 * Return the new version of cloud queue with stuff added
 */

import {getRandomInt} from '../helpers/numbers-helper'

import {addQueuedSubmissions} from './cloud-queue'
export function getUpdatedCloudQueue(descriptionObject, currentQueue) {


    if (descriptionObject.addActionToCloudQueue.length > 0) {

        var queue = [...currentQueue];
        descriptionObject.addActionToCloudQueue.forEach(a => {
            /*
                a.action = { casterId, targetId, actionId },
                a.turnRange = [min,max]
            */
            queue = addQueuedSubmissions(queue, a.action, getRandomInt(a.turnRange[0], a.turnRange[1]) )
        });
        return queue;
    }

    return currentQueue;
}