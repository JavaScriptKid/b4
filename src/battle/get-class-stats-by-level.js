import Classes from '../_data/_classes'

export function getClassStatsByLevel(characterClass="", level=1) {

    const classModel = Classes[characterClass];

    const arrayIndex = level - 1; /* Stat array[0] = level 1 */

    return {
        maxHp: classModel.hpGrowthPattern[arrayIndex],
        maxPp: classModel.ppGrowthPattern[arrayIndex],
        atk: classModel.atkGrowthPattern[arrayIndex],
        def: classModel.defGrowthPattern[arrayIndex],
        spec: classModel.specGrowthPattern[arrayIndex],
        spd: classModel.spdGrowthPattern[arrayIndex]
    }
}