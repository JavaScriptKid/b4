import {getMatchupPairs} from './get-matchup-pairs'
import {playRound} from './game'


var occurrencesInArray = function(member="", array=[]) {
    return array.filter(m => { return m === member }).length;
};

export default function(participantIds=[], doneCallback) {

    //Run each matchup 10 times. Send result object up after every matchup
    var runMatchup = function(remainingMatchups=[]) {

        const matchup = remainingMatchups[0];
        function getResult(currentResults = []) {
            if (currentResults.length < 10) {
                const result = playRound(matchup);
                setTimeout(() => {
                    getResult([...currentResults, result]);
                }, 30)
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