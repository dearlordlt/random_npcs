const npcs = new Vue({
    el: '#npcs',
    data: {
        npcs: [],
        npc_number: 1,
        npc_power: 0,
        weapons: [
            {name: 'dagger', description: 'R0/1, SW 0+BBT, TR 0+BBC, W0, +1 to attack from side hexes, +1 Armor Piercing TR'},
            {name: 'sword', description: 'R1, SW 1+BBT, TR 1+BBC, W1, +1 to defence when using shield'},
            {name: 'axe', description: 'R1, SW 2+BBC, W2, +2 to shield damage'},
            {name: 'mace', description: 'R1, SW 3+TTTT, W3, Stun damage to head, +2 Fatigue'},
            {name: 'spear', description: 'R2, TR 2+BBC, W2, +1W when used in one hand'},
            {name: 'bow', description: 'BBC, STR12, W2'},
            {name: 'throwing spear', description: 'R:STR*2, BBC, W2'},
        ],
        spells: [
            {name: 'Shock', description: 'COST:1/d, R: POW, Shocks target with damage or breaks shield'},
            {name: 'Sunder armor', description: 'COST:1*Q/Armor, R: Melee, Breaks target armor'},
            {name: 'Impact', description: 'COST:4, R: POW*2 (MINR: POW), Charges to target dealing POW+1 damage. This is automatic success and full turn action'},
            {name: 'Curse', description: 'COST:1/e, R: MST*2, Curses attack or defence of target; MAX = MST'},
            {name: 'Summon Spirit', description: 'COST:3, R: MST, Attacks target for MST/2 (min 1) until destroyed. Maximum one summon per caster'},
            {name: 'Teleport', description: 'COST:2, R: MST*2, Teleports to location (LOS); this action is free'},
            {name: 'Precise Att/Def', description: 'COST:2 per +1, R: Weapon, Enhance Att/Def Max KNW/2'},
            {name: 'Heal', description: 'COST:1 per HP, R: KW*2, Heals target/Self'},
            {name: 'Block Spell', description: 'COST:1 per Caster Power, R: KW*2, Can be casted on Ally'}
        ]
    },
    methods: {
        generate: function () {
            for(let i = 0; i < this.npc_number; i++) {
                this.npcs.push(npcs.getNpc());
            }
        },
        getNpc: function () {
            const power = parseInt(this.npc_power);
            const halfPower = Math.round(power/2);
            const binaryPower = (power ? 1 : 0);
            const shield = Math.floor(Math.random()*3);
            return { 
                name: generate_name('egyptian'), 
                att: 10 + power + Math.floor(Math.random()*5), 
                def: 10 + power + Math.floor(Math.random()*5) + shield,
                STR: 10 + binaryPower + Math.floor(Math.random()*4), 
                move: 4 + halfPower + Math.floor(Math.random()*4), 
                weapon: this.weapons[Math.floor(Math.random()*this.weapons.length)], 
                shield: shield,
                armor: binaryPower + Math.floor(Math.random()*3),
                hp: 6 + power + Math.floor(Math.random()*6), 
                magic: this.spells[Math.floor(Math.random()*this.spells.length)],
                magicPower: Math.floor(Math.random()*4) - 1 + binaryPower
            }
        },
        clear: function () {
            this.npcs = [];
        },
        kill: function (index) {
            this.npcs[index].hp = 0;
        },
        addShield: function(index) {
            this.npcs[index].shield >=4 ? this.npcs[index].shield = 4 : (this.npcs[index].shield ++, this.npcs[index].def ++);
        },
        removeShield: function(index) {
            this.npcs[index].shield <=0 ? this.npcs[index].shield = 0 : (this.npcs[index].shield --, this.npcs[index].def --);
        }
    }
})

const bsTooltip = (el, binding) => {
    const t = []

    if (binding.modifiers.focus) t.push('focus')
    if (binding.modifiers.hover) t.push('hover')
    if (binding.modifiers.click) t.push('click')
    if (!t.length) t.push('hover')

    $(el).tooltip({
        title: binding.value,
        placement: binding.arg || 'top',
        trigger: t.join(' '),
        html: !!binding.modifiers.html,
    });
}
  
Vue.directive('tooltip', {
    bind: bsTooltip,
    update: bsTooltip,
    unbind (el) {
        $(el).tooltip('dispose')
    }
});