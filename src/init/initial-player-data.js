/* Player starts the game with these values: */
export default {
    name: "Jacob",
    skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
    level: 1,
    hp: 8,
    maxHp: 25,

    pp: 2,
    maxPp: 20,

    xp: 0, //0,
    coins: 10,

    healthStatPoints: 3,
    attackStatPoints: 3,  //3,
    defenseStatPoints: 3,
    speedStatPoints: 3,
    efficiencyStatPoints: 3,

    attacks: [
        "action_attack_basic_001",
        "action_attack_theft_001"
    ],
    items: [
        { libraryId: "action_item_hp_001", instanceId: "action_item_hp_001_a" },
        { libraryId: "action_item_hp_001", instanceId: "action_item_hp_001_b" },
        { libraryId: "action_item_hp_001", instanceId: "action_item_hp_001_c" },
        { libraryId: "action_item_pp_001", instanceId: "action_item_pp_001_a" },
        { libraryId: "action_item_accuracy_001", instanceId: "action_item_accuracy_001_a" },
        { libraryId: "action_item_accuracy_002", instanceId: "action_item_accuracy_002_a" },
        { libraryId: "action_item_clearStatus_lag_001", instanceId: "action_item_clearStatus_lag_001_a" },
        { libraryId: "action_item_clearStatus_lag_001", instanceId: "action_item_clearStatus_lag_001_b" },
        { libraryId: "action_item_clearStatus_lag_001", instanceId: "action_item_clearStatus_lag_001_c" },
        { libraryId: "action_item_sticker_attack_001", instanceId: "action_item_sticker_attack_001_a" },
        { libraryId: "action_item_sticker_attack_001", instanceId: "action_item_sticker_attack_001_b" },
        { libraryId: "action_item_sticker_speed_001", instanceId: "action_item_sticker_speed_001_a" },
        { libraryId: "action_item_sticker_speed_001", instanceId: "action_item_sticker_speed_001_b" },
    ], //Note, this is different. B3 expects a straight array of libraryIds

    laptopParts: [ /* Current inventory of parts & models */
        {
            _id: "laptop_model_000_a",
            partId: "laptop_model_000"
        },
        {
            _id: "laptop_model_001_a",
            partId: "laptop_model_001"
        },
        {
            _id: "laptop_ram_002_a",
            partId: "laptop_ram_002"
        },
        {
            _id: "laptop_ram_003_aa",
            partId: "laptop_ram_003"
        },
        {
            _id: "laptop_ram_003_bb",
            partId: "laptop_ram_003"
        },
        {
            _id: "laptop_ram_003_ccc",
            partId: "laptop_ram_003"
        },
        {
            _id: "laptop_ram_007_a",
            partId: "laptop_ram_007"
        },
        {
            _id: "laptop_ram_007_b",
            partId: "laptop_ram_007"
        },
        {
            _id: "laptop_ram_008_a",
            partId: "laptop_ram_008"
        },
        {
            _id: "laptop_screen_003_a",
            partId: "laptop_screen_003"
        },
        {
            _id: "laptop_keyboard_001_a",
            partId: "laptop_keyboard_001"
        }
    ],
    laptopModel: {
        _id: "laptop_model_001_a",
        partId: "laptop_model_001"
    },
    laptopRam: {
        //_id: "laptop_ram_007_a",
        //partId: "laptop_ram_007"

        _id: "laptop_ram_002_a",
        partId: "laptop_ram_002"

    },
    laptopScreen: {
        _id: "laptop_screen_003_a",
        partId: "laptop_screen_003"
    },
    laptopKeyboard: null,
    laptopDrive: null
}

/* ATTACKS */
/*
    "attack_001": {
        levelRequirement: 4
        dependentOn: "some_id"
    }
    
*/





