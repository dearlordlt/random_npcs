const npcs = new Vue({
    el: '#npcs',
    data: {
        npcs: [],
        npc_number: 1,
        weapons: [
            'dagger',
            'sword',
            'axe',
            'mace',
            'spear'
        ],
        spells: [
            'Shock',
            'Sunder armor',
            'Impact',
            'Curse',
            'Summon Spirit',
            'Teleport',
            'Precise Att/Def',
            'Heal',
            'Block Spell'
        ]
    },
    methods: {
        generate: function() {
            console.log('Generating');
            for(let i = 0; i < this.npc_number; i++) {
                const magicPower = Math.floor(Math.random()*4) - 1;
                const newNpc = { 
                    name: generate_name('egyptian'), 
                    att: Math.floor(Math.random()*5) + 10, 
                    def: Math.floor(Math.random()*5) + 10,
                    STR: 10 + Math.floor(Math.random()*4), 
                    move: 3 + Math.floor(Math.random()*4) + 1, 
                    weapon: this.weapons[Math.floor(Math.random()*this.weapons.length)], 
                    shield: Math.floor(Math.random()*3),
                    armor: Math.floor(Math.random()*3),
                    hp: 6 + Math.floor(Math.random()*6), 
                    magic:  magicPower > 0 ? magicPower + ' ' + this.spells[Math.floor(Math.random()*this.spells.length)] : '-',
                    magicPower: magicPower
                }
                this.npcs.push(newNpc);
            }
        },
        clear: function() {
            this.npcs = [];
        },
        kill: function(index) {
            this.npcs[index].hp = 0;
        }
    }
})