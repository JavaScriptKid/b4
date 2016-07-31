import {getMatchupPairs} from './get-matchup-pairs'
//import {playRound} from './game'
import {runWholeBattle} from './battle-runner'


var occurrencesInArray = function(member="", array=[]) {
    return array.filter(m => { return m === member }).length;
};

export default function(participantIds=[], doneCallback, GeneratedCombatants) {



    //Run each matchup 10 times. Send result object up after every matchup
    var runMatchup = function(remainingMatchups=[]) {

        const matchup = remainingMatchups[0];

        console.log(matchup);

        function getResult(currentResults = []) {
            if (currentResults.length < 10) {


                // TODO: Don't run duplicates
                if (matchup[0] != matchup[1]) {
                    runWholeBattle(
                        GeneratedCombatants[matchup[0]],
                        GeneratedCombatants[matchup[1]],
                        currentResults, //current progress of runMatchup
                        getResult //callback function for battle
                    );
                } else {
                    //Let the first guy win

                    getResult([...currentResults, matchup[0]])
                }


            } else {
                doneCallback({
                    firstCombatantId: matchup[0],
                    firstCombatantWins: occurrencesInArray(matchup[0], currentResults),
                    secondCombatantId: matchup[1],
                    secondCombatantWins: occurrencesInArray(matchup[1], currentResults)
                });

                if (remainingMatchups.length > 1) {
                    const nextRemainingMatchups = remainingMatchups.filter((m,i) => {
                        return i > 0;
                    });
                    runMatchup(nextRemainingMatchups)
                }
            }
        }

        getResult();
    };

    const matchups = getMatchupPairs(participantIds);
    runMatchup(matchups);

}