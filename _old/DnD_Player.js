function PlayerObj() {
	
	var Labels = {
		Stats:   [ "str", "int", "wis", "dex", "con", "cha", "com" ],
		Saves:	 [ "ppd", "pp", "rsw", "bw", "sp" ],
		Skills:	 [
			"pickPockets",
			"openLocks",
			"findRemove",
			"moveSilent",
			"shadowHide",
			"hearNoise",
			"climbWalls",
			"readLanguage"
		]
	};
	
	var RaceSelect = document.forms.generator.race;
	for( var r in Races ) { RaceSelect.options[RaceSelect.options.length] = new Option( r, r ); }
	
	var pClassSelect = document.forms.generator.pClass;
	for( var p in Classes ) { pClassSelect.options[pClassSelect.options.length] = new Option( p, p ); }
	
	var sClassSelect = document.forms.generator.sClass;
	for( var s in Classes ) { if( Classes[s].Dual ) { sClassSelect.options[sClassSelect.options.length] = new Option( s, s ); } }
	
	var ComputedThiefAbilities = function( Race, Level, Dex ) {
		var base = [];
		base[0]  = [   0,   0,   0,   0,   0,   0,   0,   0 ];
		base[1]  = [  30,  25,  20,  15,  10,  10,  85,   0 ];
		base[2]  = [  35,  29,  25,  21,  15,  10,  86,   0 ];
		base[3]  = [  40,  33,  30,  27,  20,  15,  87,   0 ];
		base[4]  = [  45,  37,  35,  33,  25,  15,  88,  20 ];
		base[5]  = [  50,  42,  40,  40,  31,  20,  90,  25 ];
		base[6]  = [  55,  47,  45,  47,  37,  20,  92,  30 ];
		base[7]  = [  60,  52,  50,  55,  43,  25,  94,  35 ];
		base[8]  = [  65,  57,  55,  62,  49,  25,  96,  40 ];
		base[9]  = [  70,  62,  60,  70,  56,  30,  98,  45 ];
		base[10] = [  80,  67,  65,  78,  63,  30,  99,  50 ];
		base[11] = [  90,  72,  70,  86,  70,  35,  99,  55 ];
		base[12] = [ 100,  77,  75,  94,  77,  35,  99,  60 ];
		base[13] = [ 105,  82,  80,  99,  85,  40,  99,  65 ];
		base[14] = [ 110,  87,  85,  99,  93,  40,  99,  70 ];
		base[15] = [ 115,  92,  90,  99,  99,  50,  99,  75 ];
		base[16] = [ 125,  97,  95,  99,  99,  50,  99,  80 ];
		base[17] = [ 125,  99,  99,  99,  99,  55,  99,  80 ];
		base[18] = [ 125,  99,  99,  99,  99,  60,  99,  85 ];
		base[19] = [ 130,  99,  99,  99,  99,  65,  99,  90 ];
		base[20] = [ 135, 100, 100, 100, 100,  70, 100,  95 ];

		var mod_dex = [];
		mod_dex[9]  = [ -15, -10, -10, -20, -10,  0,  0,  0 ];
		mod_dex[10] = [ -10,  -5, -10, -15,  -5,  0,  0,  0 ];
		mod_dex[11] = [  -5,   0,  -5, -10,   0,  0,  0,  0 ];
		mod_dex[12] = [   0,   0,   0,  -5,   0,  0,  0,  0 ];
		mod_dex[13] = [   0,   0,   0,   0,   0,  0,  0,  0 ];
		mod_dex[14] = [   0,   0,   0,   0,   0,  0,  0,  0 ];
		mod_dex[15] = [   0,   0,   0,   0,   0,  0,  0,  0 ];
		mod_dex[16] = [   0,   5,   0,   0,   0,  0,  0,  0 ];
		mod_dex[17] = [   5,  10,   0,   5,   5,  0,  0,  0 ];
		mod_dex[18] = [  10,  15,   5,  10,  10,  0,  0,  0 ];
		mod_dex[19] = [  15,  20,  10,  15,  15,  0,  0,  0 ];
		mod_dex[20] = [  20,  25,  15,  20,  20,  0,  0,  0 ];
		
		var result = base[Level].copy();
		if( Level === 0 || Dex === 0 ) {
			result = base[0].copy();
		}
		else {
			for( var i = 0; i < result.length; i++ ) {
				result[i] = parseInt( result[i], 10 );
				result[i] += parseInt( mod_dex[Dex][i], 10 ) + Races[Race].Abilities[i];
			}
		}
		
		return result;
	};
	
	this.init = function() {
		this.isValid = false;
		this.Level = "";
		this.Race = "";
		this.Class = "";
		this.Stats = [];
		this.ExStr = "";
		this.Thief = [];
		var form = document.forms.generator;
		
		this.isValid =
			( this.Level = parseInt( form.level.value, 10 ) ) > 0 && this.Level < 23 &&
			( this.Race = Races[form.race.value] ) !== "" &&
			form.pClass.value !== "";
		
		if( this.isValid ) {
			if( form.stats.value === "" ) { RandomStats.Generate(); }
			StatsTables.ExceptionalStrength();
			
			// **** Use the line below to force dual-class rules ****
			//form.sClass.disabled = ( Classes[form.pClass.value].Dual )? "": "disabled";
			document.getElementById( "classComment" ).innerHTML = ( Classes[form.pClass.value].Dual )?
				"": "Class " + form.pClass.value + " should not dual-class.";
			
			this.Class = ( form.sClass.value !== "" && Classes[form.pClass.value].Dual )?
				new DualClassObj( Classes[form.pClass.value], Classes[form.sClass.value] ): Classes[form.pClass.value];
			
			form.thaco.value = this.Class.THACO[this.Level];
			form.move.value = this.Race.Move;
			for( var i = 0; i < Labels.Saves.length; i++ ) { form[Labels.Saves[i]].value = this.Class.Saves[this.Level][i]; }
			
			// **** Apply Stats ****
			//RandomStats.Set( [ 18,17,16,15,15,12,11 ] );
			if( form.useRandom.checked ) {
				var _new = RandomStats.list.copy();
				// **** check for stat overflow
				for( i = 0; i < this.Class.Prefs.length; i++ ) {
					var statPosition = this.Class.Prefs[i];
					var pos = 0;
					while(  ( _new[i+pos] + this.Race.Stats[statPosition] ) > 18 &&
							( _new[i+pos+1] + this.Race.Stats[statPosition] ) >= 17 ) { pos++; }
					var temp = _new[i];
					_new[i] = _new[i+pos];
					_new[i+pos] = temp;
				}
				for( i = 0; i < this.Class.Prefs.length; i++ ) {
					this.Stats[this.Class.Prefs[i]] = _new[i] + this.Race.Stats[this.Class.Prefs[i]];
				}
				if( this.Stats[0] > 17 ) {
					var exc = roll( 1, 100 );
					if( exc < 10 ) { exc = "0" + exc; }
					if( exc == 100 ) { exc = "00"; }
					this.Stats[0] = 18 + "." + exc;
				}
			}
			else {
				for( i = 0; i < Labels.Stats.length; i++ ) { this.Stats[i] = form[Labels.Stats[i]].value; }
				var parts = this.Stats[0].split( "." );
				if( parts[0] == 18 ) {
					if( parts[1] < 10 && parts[1] != "00" ) { parts[1] = "0" + parts[1]; }
					if( parts[1] > 99 ) { parts[1] = "00"; }
					this.Stats[0] = parts.join( "." );
				}
				else { this.Stats[0] = parts[0]; }
			}
			
			var tempHP = 0;
			for( i = 0; i < this.Level; i++ ) {
				temp = roll( 1, this.Class.HP );
				while( temp < 2 ) { temp = roll( 1, this.Class.HP ); }
				tempHP += parseInt( temp, 10 ) + StatsTables.con[this.Stats[4]][0];
			}
			
			form.hp.value = tempHP;
			
			// **** Display Stats ****
			var matrix = [];
			matrix.str = 'hit adj = ; dmg adj = ; wt adj = ; open doors = ; bend bars =%';
			matrix.int = 'add lang = ; know spell =% ; min spells = ; max spells =';
			matrix.wis = 'magic adj = ; spell fail =% ; bonus spells =';
			matrix.dex = 'react adj = ; missile adj = ; defense adj =';
			matrix.con = 'hp adj = ; system shock =% ; raise survival =% ; # of raise =';
			matrix.cha = 'max henchmen = ; loyalty base =% ; react adj =% ; com adj =';
			matrix.com = 'response = ; chance surprised =% ; chance to surprise =%';
			for( i = 0; i < Labels.Stats.length; i++ ) {
				form[Labels.Stats[i]].value = this.Stats[i];
				var tempDesc = "";
				var node = matrix[Labels.Stats[i]].split( ";" );
				for( var j = 0; j < node.length; j++ ) {
					tempDesc += " :: " + node[j].replace( "=", StatsTables[Labels.Stats[i]][this.Stats[i]][j] );
				}
				$( Labels.Stats[i] ).innerHTML = tempDesc;
			}
			
			for( i = 0; i < Labels.Skills.length; i++ ) { form[Labels.Skills[i]].value = ""; }
			if( /thief/i.test( this.Class.Title ) ) {
				var ar = new ComputedThiefAbilities( this.Race.Name, this.Level, this.Stats[4] );
				for( i = 0; i < Labels.Skills.length; i++ ) { form[Labels.Skills[i]].value = ar[i] + "%"; }
			}
			form.useRandom.checked = false;
		}
	};
	document.forms.generator.onchange = this.init;
}
