import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import store from '../../init/store'

export function addSubmission(submissionModel) {
    if (!submissionModel) {
        console.warn("addSubmission called without a proper submissionModel", submissionModel)
    }
    setBattleValue({
        submissions: [
            ...store.getState().submissions,
            submissionModel
        ]
    })
}