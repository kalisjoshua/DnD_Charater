function RaceObj( Name, Move, Stats, Abilities, Infravision, SavesBonus, Languages ) {
	var savesBonuses = {
		0: '',
		1: '+1 on saves(rsw, sp) for each 3 1/2 of con',
		2: '+1 on saves(rsw, sp, poison) for each 3 1/2 of con'
	};
	
	this.Name = Name;
	this.Move = Move;
	this.Stats = Stats;
	this.Abilities = Abilities;
	this.Infravision = Infravision || 60;
	this.SavesBonus = savesBonuses[SavesBonus];
	this.Languages = Languages || [];
	
}

var Races = {
	"Dwarf":
		new RaceObj( "Dwarf", 		 6, [ 0,0,0,0, 1,-1,0], [  0, 10,15, 0, 0, 0,-10, -5], '', 2, [4,5,8,9] ),
	"Elf":
		new RaceObj( "Elf", 		12, [ 0,0,0,1,-1, 0,0], [  5, -5, 0, 5,10, 5,  0,  0], '', 0, [3,4,5,6,7,9] ),
	"Gnome":
		new RaceObj( "Gnome", 		 6, [-1,0,0,1, 0, 0,0], [  0,  5,10, 5, 5,10, 15,  0], '', 1, [0,1,6,5,8] ),
	"Goblin":
		new RaceObj( "Goblin", 		 8, [-1,1,0,1, 0,-1,0], [  0, 15,10, 0, 0,15,  0, 15], 30, 0, [1,3,7,8] ),
	"Half-Elf":
		new RaceObj( "Half-Elf", 	12, [ 0,0,0,0, 0, 0,0], [ 10,  0, 0, 5, 0, 0,  0,  0], '', 0, [3,4,5,6,7,9] ),
	"Half-Orc":
		new RaceObj( "Half-Orc", 	12, [ 1,0,0,0, 1,-1,0], [ -5,  5, 5, 0, 0, 5,  5,-10], '', 0, [] ),
	"Halfling":
		new RaceObj( "Halfling", 	 6, [-1,0,0,1, 0, 0,0], [  5,  5, 5,10,15, 5,-15, -5], 30, 2, [1,2,4,5,9] ),
	"Human":
		new RaceObj( "Human", 		12, [ 0,0,0,0, 0, 0,0], [  0,  0, 0, 0, 0, 0,  0,  0],  0, 0, [] )
};

var Languages = {
	 0: "burrowing mammal",
	 1: "dwarven",
	 2: "elvish",
	 3: "gnoll",
	 4: "gnome",
	 5: "goblin",
	 6: "halfling",
	 7: "hobgoblin",
	 8: "kobold",
	 9: "orcish"
};