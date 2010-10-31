function ClassObj( Title, HP, Prefs, Dual ) {
	//					  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22
	var thaco = [];
	thaco.Fighter 	 = [ 20, 20, 18, 18, 16, 16, 14, 14, 12, 12, 10, 10,  8,  8,  6,  6,  4,  4,  4,  2,  2,  0, 0 ];
	thaco.Cleric 	 = [ 20, 20, 20, 18, 18, 18, 16, 16, 16, 14, 14, 14, 12, 12, 12, 10, 10, 10,  9,  9,  8,  8, 7 ];
	thaco.Mage 		 = [ 20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 16, 16, 16, 16, 16, 13, 13, 13, 13, 13, 11, 11, 9 ];
	thaco.Thief 	 = [ 20, 20, 20, 20, 19, 19, 19, 19, 16, 16, 16, 16, 14, 14, 14, 14, 12, 12, 12, 12, 10, 10, 8 ];
	
	thaco.Barbarian 	= thaco.Fighter.copy();
	thaco.Bard 			= thaco.Fighter.copy();
	thaco.Cavalier 		= thaco.Fighter.copy();
	thaco.Paladin 		= thaco.Fighter.copy();
	thaco.Ranger 		= thaco.Fighter.copy();
	thaco.Archer 		= thaco.Cleric.copy();
	thaco.Archer 		= thaco.Cleric.copy();
	thaco.Monk 			= thaco.Cleric.copy();
	thaco.Illusionist 	= thaco.Mage.copy();
	thaco.Acrobat 		= thaco.Thief.copy();
	thaco.Assassin 		= thaco.Thief.copy();

	var lvl = 1;
	var saves = [];
	saves.Cleric = [];
	saves.Cleric[lvl++] = [ 10, 13, 14, 16, 15 ]; //  1
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  //  2
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  //  3
	saves.Cleric[lvl++] = [ 9, 12, 13, 15, 14 ];  //  4
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  //  5
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  //  6
	saves.Cleric[lvl++] = [ 7, 10, 11, 13, 12 ];  //  7
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  //  8
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  //  9
	saves.Cleric[lvl++] = [ 6, 9, 10, 12, 11 ];   // 10
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 11
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 12
	saves.Cleric[lvl++] = [ 5, 8, 9, 11, 10 ];    // 13
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 14
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 15
	saves.Cleric[lvl++] = [ 4, 7, 8, 10, 9 ];     // 16
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 17
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 18
	saves.Cleric[lvl++] = [ 2, 5, 6, 8, 7 ];      // 19
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 20
	saves.Cleric[lvl++] = saves.Cleric[lvl - 2];  // 21
	saves.Cleric[lvl++] = [ 1, 3, 4, 6, 5 ];      // 22

	lvl = 0;
	saves.Fighter = [];
	saves.Fighter[lvl++] = [ 16, 17, 18, 20, 19 ]; //  0
	saves.Fighter[lvl++] = [ 14, 15, 16, 17, 17 ]; //  1
	saves.Fighter[lvl++] = [ 14, 15, 16, 17, 17 ]; //  2
	saves.Fighter[lvl++] = [ 13, 14, 15, 16, 16 ]; //  3
	saves.Fighter[lvl++] = [ 13, 14, 15, 16, 16 ]; //  4
	saves.Fighter[lvl++] = [ 11, 12, 13, 13, 14 ]; //  5
	saves.Fighter[lvl++] = [ 11, 12, 13, 13, 14 ]; //  6
	saves.Fighter[lvl++] = [ 10, 11, 12, 12, 13 ]; //  7
	saves.Fighter[lvl++] = [ 10, 11, 12, 12, 13 ]; //  8
	saves.Fighter[lvl++] = [  8,  9, 10,  9, 11 ]; //  9
	saves.Fighter[lvl++] = [  8,  9, 10,  9, 11 ]; // 10
	saves.Fighter[lvl++] = [  7,  8,  9,  8, 10 ]; // 11
	saves.Fighter[lvl++] = [  7,  8,  9,  8, 10 ]; // 12
	saves.Fighter[lvl++] = [  5,  6,  7,  5,  8 ]; // 13
	saves.Fighter[lvl++] = [  5,  6,  7,  5,  8 ]; // 14
	saves.Fighter[lvl++] = [  4,  5,  6,  4,  7 ]; // 15
	saves.Fighter[lvl++] = [  4,  5,  6,  4,  7 ]; // 16
	saves.Fighter[lvl++] = [  3,  4,  5,  4,  6 ]; // 17
	saves.Fighter[lvl++] = [  3,  4,  5,  4,  6 ]; // 18
	saves.Fighter[lvl++] = [  2,  3,  4,  3,  5 ]; // 19
	saves.Fighter[lvl++] = [  2,  3,  4,  3,  5 ]; // 20
	saves.Fighter[lvl++] = [  1,  2,  3,  3,  4 ]; // 21
	saves.Fighter[lvl++] = [  1,  2,  3,  3,  4 ]; // 22

	lvl = 1;
	saves.Mage = [];
	saves.Mage[lvl++] = [ 14, 13, 11, 15, 12 ]; //  1
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    //  2
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    //  3
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    //  4
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    //  5
	saves.Mage[lvl++] = [ 13, 11, 9, 13, 10 ];  //  6
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    //  7
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    //  8
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    //  9
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 10
	saves.Mage[lvl++] = [ 11, 9, 7, 11, 8 ];    // 11
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 12
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 13
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 14
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 15
	saves.Mage[lvl++] = [ 10, 7, 5, 9, 6 ];     // 16
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 17
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 18
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 19
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 20
	saves.Mage[lvl++] = [ 8, 5, 3, 7, 4 ];      // 21
	saves.Mage[lvl++] = saves.Mage[lvl - 2];    // 22

	lvl = 1;
	saves.Thief = [];
	saves.Thief[lvl++] = [ 13, 12, 14, 16, 15 ]; //  1
	saves.Thief[lvl++] = [ 13, 12, 14, 16, 15 ]; //  2
	saves.Thief[lvl++] = [ 13, 12, 14, 16, 15 ]; //  3
	saves.Thief[lvl++] = [ 13, 12, 14, 16, 15 ]; //  4
	saves.Thief[lvl++] = [ 12, 11, 12, 15, 13 ]; //  5
	saves.Thief[lvl++] = [ 12, 11, 12, 15, 13 ]; //  6
	saves.Thief[lvl++] = [ 12, 11, 12, 15, 13 ]; //  7
	saves.Thief[lvl++] = [ 12, 11, 12, 15, 13 ]; //  8
	saves.Thief[lvl++] = [ 11, 10, 10, 14, 11 ]; //  9
	saves.Thief[lvl++] = [ 11, 10, 10, 14, 11 ]; // 10
	saves.Thief[lvl++] = [ 11, 10, 10, 14, 11 ]; // 11
	saves.Thief[lvl++] = [ 11, 10, 10, 14, 11 ]; // 12
	saves.Thief[lvl++] = [ 10,  9,  8, 13,  9 ]; // 13
	saves.Thief[lvl++] = [ 10,  9,  8, 13,  9 ]; // 14
	saves.Thief[lvl++] = [ 10,  9,  8, 13,  9 ]; // 15
	saves.Thief[lvl++] = [ 10,  9,  8, 13,  9 ]; // 16
	saves.Thief[lvl++] = [  9,  8,  6, 12,  7 ]; // 17
	saves.Thief[lvl++] = [  9,  8,  6, 12,  7 ]; // 18
	saves.Thief[lvl++] = [  9,  8,  6, 12,  7 ]; // 19
	saves.Thief[lvl++] = [  9,  8,  6, 12,  7 ]; // 20
	saves.Thief[lvl++] = [  8,  7,  4, 11,  5 ]; // 21
	saves.Thief[lvl++] = [  8,  7,  4, 11,  5 ]; // 22
	
	saves.Acrobat     = saves.Thief.copy();
	saves.Archer      = saves.Cleric.copy();
	saves.Assassin    = saves.Thief.copy();
	saves.Barbarian   = saves.Fighter.copy();
	saves.Bard        = saves.Fighter.copy();
	saves.Cavalier    = saves.Fighter.copy();
	saves.Illusionist = saves.Mage.copy();
	saves.Monk        = saves.Thief.copy();
	saves.Paladin     = saves.Fighter.copy();
	saves.Ranger      = saves.Fighter.copy();
	
	lvl = 1;
	var spells = [];
	spells.Cleric = [];
	spells.Cleric[lvl++] = [ 1, '', '', '', '', '', '' ]; //  1
	spells.Cleric[lvl++] = [ 2, '', '', '', '', '', '' ]; //  2
	spells.Cleric[lvl++] = [ 2,  1, '', '', '', '', '' ]; //  3
	spells.Cleric[lvl++] = [ 3,  2, '', '', '', '', '' ]; //  4
	spells.Cleric[lvl++] = [ 3,  3,  1, '', '', '', '' ]; //  5
	spells.Cleric[lvl++] = [ 1,  3,  2, '', '', '', '' ]; //  6
	spells.Cleric[lvl++] = [ 1,  3,  2,  1, '', '', '' ]; //  7
	spells.Cleric[lvl++] = [ 3,  3,  3,  2, '', '', '' ]; //  8
	spells.Cleric[lvl++] = [ 4,  4,  3,  2,  1, '', '' ]; //  9
	spells.Cleric[lvl++] = [ 4,  4,  3,  3,  2, '', '' ]; // 10
	spells.Cleric[lvl++] = [ 5,  4,  4,  3,  2,  1, '' ]; // 11
	spells.Cleric[lvl++] = [ 6,  5,  5,  3,  2,  2, '' ]; // 12
	spells.Cleric[lvl++] = [ 6,  6,  6,  4,  2,  2, '' ]; // 13
	spells.Cleric[lvl++] = [ 6,  6,  6,  5,  3,  2, '' ]; // 14
	spells.Cleric[lvl++] = [ 7,  7,  7,  5,  4,  2, '' ]; // 15
	spells.Cleric[lvl++] = [ 7,  7,  7,  6,  5,  3,  1 ]; // 16
	spells.Cleric[lvl++] = [ 8,  8,  8,  6,  5,  3,  1 ]; // 17
	spells.Cleric[lvl++] = [ 8,  8,  8,  7,  6,  4,  1 ]; // 18
	spells.Cleric[lvl++] = [ 9,  9,  9,  7,  6,  4,  2 ]; // 19
	spells.Cleric[lvl++] = [ 9,  9,  9,  8,  7,  5,  2 ]; // 20
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  8,  6,  2 ]; // 21
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  6,  3 ]; // 22
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  7,  3 ]; // 23
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  8,  3 ]; // 24
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  8,  4 ]; // 25
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  9,  4 ]; // 26
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  9,  5 ]; // 27
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  9,  6 ]; // 28
	spells.Cleric[lvl++] = [ 9,  9,  9,  9,  9,  9,  7 ]; // 29
	
	lvl = 1;
	spells.Druid = [];
	spells.Druid[lvl++] = [ 2, '', '', '', '', '', '' ]; //  1
	spells.Druid[lvl++] = [ 2,  1, '', '', '', '', '' ]; //  2
	spells.Druid[lvl++] = [ 3,  2,  1, '', '', '', '' ]; //  3
	spells.Druid[lvl++] = [ 4,  2,  2, '', '', '', '' ]; //  4
	spells.Druid[lvl++] = [ 4,  3,  2, '', '', '', '' ]; //  5
	spells.Druid[lvl++] = [ 4,  3,  2,  1, '', '', '' ]; //  6
	spells.Druid[lvl++] = [ 4,  4,  3,  1, '', '', '' ]; //  7
	spells.Druid[lvl++] = [ 4,  4,  3,  2, '', '', '' ]; //  8
	spells.Druid[lvl++] = [ 5,  4,  3,  2,  1, '', '' ]; //  9
	spells.Druid[lvl++] = [ 5,  4,  3,  3,  2, '', '' ]; // 10
	spells.Druid[lvl++] = [ 5,  5,  3,  3,  2,  1, '' ]; // 11
	spells.Druid[lvl++] = [ 5,  5,  4,  4,  3,  2,  1 ]; // 12
	spells.Druid[lvl++] = [ 6,  5,  5,  5,  4,  3,  2 ]; // 13
	spells.Druid[lvl++] = [ 6,  6,  6,  6,  5,  4,  3 ]; // 14
	
	lvl = 9;
	spells.Paladin = [];
	spells.Paladin[lvl++] = [ 1, '', '', '' ]; //  9
	spells.Paladin[lvl++] = [ 2, '', '', '' ]; // 10
	spells.Paladin[lvl++] = [ 2,  1, '', '' ]; // 11
	spells.Paladin[lvl++] = [ 2,  2, '', '' ]; // 12
	spells.Paladin[lvl++] = [ 2,  2,  1, '' ]; // 13
	spells.Paladin[lvl++] = [ 3,  2,  1, '' ]; // 14
	spells.Paladin[lvl++] = [ 3,  2,  1,  1 ]; // 15
	spells.Paladin[lvl++] = [ 3,  3,  1,  1 ]; // 16
	spells.Paladin[lvl++] = [ 3,  3,  2,  1 ]; // 17
	spells.Paladin[lvl++] = [ 3,  3,  3,  1 ]; // 18
	spells.Paladin[lvl++] = [ 3,  3,  3,  2 ]; // 19
	spells.Paladin[lvl++] = [ 3,  3,  3,  3 ]; // 20
	
	lvl = 8;
	spells.Ranger = [];
	spells.Ranger[lvl++] = [ 1, '', '', '', '' ]; //  8
	spells.Ranger[lvl++] = [ 1, '', '',  1, '' ]; //  8
	spells.Ranger[lvl++] = [ 2, '', '',  1, '' ]; // 10
	spells.Ranger[lvl++] = [ 2, '', '',  2, '' ]; // 11
	spells.Ranger[lvl++] = [ 2,  1, '',  2, '' ]; // 12
	spells.Ranger[lvl++] = [ 2,  1, '',  2,  1 ]; // 13
	spells.Ranger[lvl++] = [ 2,  2, '',  2,  1 ]; // 14
	spells.Ranger[lvl++] = [ 2,  2, '',  2,  2 ]; // 15
	spells.Ranger[lvl++] = [ 2,  2,  1,  2,  2 ]; // 16
	spells.Ranger[lvl++] = [ 2,  2,  2,  2,  2 ]; // 17
	
	lvl = 1;
	spells.Mage = [];
	spells.Mage[lvl++] = [ 1, '', '', '', '', '', '', '', '' ]; //  1
	spells.Mage[lvl++] = [ 2, '', '', '', '', '', '', '', '' ]; //  2
	spells.Mage[lvl++] = [ 2,  1, '', '', '', '', '', '', '' ]; //  3
	spells.Mage[lvl++] = [ 3,  2, '', '', '', '', '', '', '' ]; //  4
	spells.Mage[lvl++] = [ 4,  2,  1, '', '', '', '', '', '' ]; //  5
	spells.Mage[lvl++] = [ 4,  2,  2, '', '', '', '', '', '' ]; //  6
	spells.Mage[lvl++] = [ 4,  3,  2,  1, '', '', '', '', '' ]; //  7
	spells.Mage[lvl++] = [ 4,  3,  3,  2, '', '', '', '', '' ]; //  8
	spells.Mage[lvl++] = [ 4,  3,  3,  2,  1, '', '', '', '' ]; //  9
	spells.Mage[lvl++] = [ 4,  4,  3,  2,  2, '', '', '', '' ]; // 10
	spells.Mage[lvl++] = [ 4,  4,  4,  3,  3, '', '', '', '' ]; // 11
	spells.Mage[lvl++] = [ 4,  4,  4,  4,  4,  1, '', '', '' ]; // 12
	spells.Mage[lvl++] = [ 5,  5,  5,  4,  4,  2, '', '', '' ]; // 13
	spells.Mage[lvl++] = [ 5,  5,  5,  4,  4,  2,  1, '', '' ]; // 14
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  2,  1, '', '' ]; // 15
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  3,  2,  1, '' ]; // 16
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  3,  3,  2, '' ]; // 17
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  3,  3,  2,  1 ]; // 18
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  3,  3,  3,  1 ]; // 19
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  4,  3,  3,  2 ]; // 20
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  4,  4,  4,  2 ]; // 21
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  5,  4,  4,  3 ]; // 22
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  5,  5,  5,  3 ]; // 23
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  5,  5,  5,  4 ]; // 24
	spells.Mage[lvl++] = [ 5,  5,  5,  5,  5,  5,  5,  5,  5 ]; // 25
	spells.Mage[lvl++] = [ 6,  6,  6,  6,  5,  5,  5,  5,  5 ]; // 26
	spells.Mage[lvl++] = [ 6,  6,  6,  6,  6,  6,  6,  5,  5 ]; // 27
	spells.Mage[lvl++] = [ 6,  6,  6,  6,  6,  6,  6,  6,  6 ]; // 28
	spells.Mage[lvl++] = [ 7,  7,  7,  7,  6,  6,  6,  6,  6 ]; // 29
	
	lvl = 1;
	spells.Illusionist = [];
	spells.Illusionist[lvl++] = [ 1, '', '', '', '', '', '' ]; //  1
	spells.Illusionist[lvl++] = [ 2, '', '', '', '', '', '' ]; //  2
	spells.Illusionist[lvl++] = [ 2,  1, '', '', '', '', '' ]; //  3
	spells.Illusionist[lvl++] = [ 3,  2, '', '', '', '', '' ]; //  4
	spells.Illusionist[lvl++] = [ 4,  2,  1, '', '', '', '' ]; //  5
	spells.Illusionist[lvl++] = [ 4,  3,  1, '', '', '', '' ]; //  6
	spells.Illusionist[lvl++] = [ 4,  3,  2, '', '', '', '' ]; //  7
	spells.Illusionist[lvl++] = [ 4,  3,  2,  1, '', '', '' ]; //  8
	spells.Illusionist[lvl++] = [ 4,  3,  3,  2, '', '', '' ]; //  9
	spells.Illusionist[lvl++] = [ 5,  4,  3,  2,  1, '', '' ]; // 10
	spells.Illusionist[lvl++] = [ 5,  4,  4,  3,  2, '', '' ]; // 11
	spells.Illusionist[lvl++] = [ 5,  5,  4,  3,  2,  1, '' ]; // 12
	spells.Illusionist[lvl++] = [ 5,  5,  4,  3,  2,  2, '' ]; // 13
	spells.Illusionist[lvl++] = [ 5,  5,  4,  3,  2,  2,  1 ]; // 14
	spells.Illusionist[lvl++] = [ 5,  5,  5,  4,  2,  2,  2 ]; // 15
	spells.Illusionist[lvl++] = [ 5,  5,  5,  4,  3,  2,  2 ]; // 16
	spells.Illusionist[lvl++] = [ 5,  5,  5,  5,  3,  2,  2 ]; // 17
	spells.Illusionist[lvl++] = [ 5,  5,  5,  5,  3,  3,  2 ]; // 18
	spells.Illusionist[lvl++] = [ 5,  5,  5,  5,  4,  3,  2 ]; // 19
	spells.Illusionist[lvl++] = [ 5,  5,  5,  5,  4,  3,  3 ]; // 20
	spells.Illusionist[lvl++] = [ 5,  5,  5,  5,  5,  4,  3 ]; // 21
	spells.Illusionist[lvl++] = [ 5,  5,  5,  5,  5,  5,  4 ]; // 22
	spells.Illusionist[lvl++] = [ 5,  5,  5,  5,  5,  5,  5 ]; // 23
	spells.Illusionist[lvl++] = [ 6,  6,  6,  6,  5,  5,  5 ]; // 24
	spells.Illusionist[lvl++] = [ 6,  6,  6,  6,  6,  6,  6 ]; // 25
	spells.Illusionist[lvl++] = [ 7,  7,  7,  7,  6,  6,  6 ]; // 26
	
	this.Title = Title;
	this.HP = HP;
	this.Prefs = Prefs;
	this.Dual = Dual;
	this.THACO = thaco[Title];
	this.Saves = saves[Title];
}

function DualClassObj( pClass, sClass ) {
	this.Title = pClass.Title + "/" + sClass.Title;
	this.HP = ( pClass.HP + sClass.HP ) / 2;
	
	/* **** Stat Preferences **** */
	var _new = [];
	var pref1 = pClass.Prefs.copy();
	var pref2 = sClass.Prefs.copy();
	while( pref1.length > 0 ) {
		_new.push( pref1[0] ); 
		pref2 = pref2.removeItem( pref1.shift() );
		_new.push( pref2[0] );
		pref1 = pref1.removeItem( pref2.shift() );
	}
	this.Prefs = _new.slice( 0, 7 );
	
	/* **** THACO Matrix **** */
	_new = [];
	for( var i = 0; i < pClass.THACO.length; i++ ) {
		_new[i] = ( pClass.THACO[i] < sClass.THACO[i] )? pClass.THACO[i]: sClass.THACO[i];
	}
	this.THACO = _new.copy();
	
	/* **** Saves Matrix **** */
	_new = [];
	for( i = 0; i < pClass.THACO.length; i++ ) {
		_new[i] = ( pClass.Saves[i] < sClass.Saves[i] )? pClass.Saves[i]: sClass.Saves[i];
	}
	this.Saves = _new.copy();
}

var Classes = {
	Acrobat:
		new ClassObj( "Acrobat", 		 6, [3,4,0,1,5,2,6], false ),
	Archer:
		new ClassObj( "Archer", 		 8, [3,0,4,2,1,5,6], false ),
	Assassin:
		new ClassObj( "Assassin", 		 6, [5,3,1,4,0,2,6], false ),
	Barbarian:
		new ClassObj( "Barbarian", 		12, [0,4,3,5,1,6,2], false ),
	Cavalier:
		new ClassObj( "Cavalier", 		10, [0,3,4,1,5,6,2], false ),
	Cleric:
		new ClassObj( "Cleric", 		 8, [2,4,0,3,1,5,6], true ),
	Druid:
		new ClassObj( "Druid", 			 8, [2,5,3,4,1,0,6], true ),
	Fighter:
		new ClassObj( "Fighter", 		10, [0,4,3,5,6,1,2], true ),
	Illusionist:
		new ClassObj( "Illusionist", 	 4, [1,3,6,5,4,2,0], true ),
	Mage:
		new ClassObj( "Mage", 			 4, [1,3,5,2,4,6,0], true ),
	Monk:
		new ClassObj( "Monk", 			 4, [3,4,2,1,0,5,6], false ),
	Paladin:
		new ClassObj( "Paladin", 		10, [0,4,3,5,1,6,2], false ),
	Ranger:
		new ClassObj( "Ranger", 		10, [0,4,3,2,5,6,1], false ),
	Thief:
		new ClassObj( "Thief", 			 6, [3,1,5,4,0,2,6], true )
};