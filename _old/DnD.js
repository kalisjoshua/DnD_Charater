
function roll( diceNumber, diceFace ) {
	var temp = [];
	for( var i = 0; i < diceNumber; i++ ) { temp.push( parseInt( Math.random() * diceFace, 10 ) + 1 ); }
	temp.sort( sortDescending );
	return temp;
}

var RandomStats = {
	list: [],
	
	Calc: function( ar ) {
		ar.sort( sortDescending );
		var top = ( ar[0] + ar[1] + ar[2] ) / 48 * ar [0];
		var bot = ( ar[4] + ar[5] + ar[6] ) / 30 * ar [6];
		return parseInt( ( top + bot ) / 0.005265, 10 ) / 100;
	},
	
	Generate: function() {
		var cols = [];
		for( var i = 0; i < 3; i++ ) {
			cols[i] = [];
			for( var j = 0; j < 7; j++ ) {
				var score = roll( 4, 6 ); score.pop();
				while( score.sum() < 8 ) { score = roll( 4, 6 ); score.pop(); }
				cols[i][j] = score.sum();
			}
			cols[i].sort( sortDescending );
		}
		
		var ranking = [ this.Calc( cols[0] ), this.Calc( cols[1] ), this.Calc( cols[2] ) ];
		var ColumnsIndex = ranking.find( ranking.max() );
		
		var uniqIndex = cols[ColumnsIndex].find( cols[ColumnsIndex].unique().sort( sortAscending )[1] ); // find the second lowest index in the chosen column
		var others = "012".replace( ColumnsIndex, "" ); // find the other Columns
		cols[ColumnsIndex][uniqIndex] = max( cols[others[0]][0], cols[others[1]][0] ); // take the highest from other Columns
		
		this.list = cols[ColumnsIndex].sort( sortDescending ).copy();
		this.Display();
	},
	
	Get: function() {
		if( this.list.isEmpty() ) { this.Read(); }
		return this.list;
	},
	
	Set: function( ar ) {
		this.list = ar.slice();
		this.Display();
	},
	
	Read: function() {
		var temp = document.forms.generator.stats.value.split( "," );
		for( var i in temp ) { temp[i] = parseInt( temp[i], 10 ); }
		this.list = temp.sort( sortDescending );
		this.Display();
	},
	
	Display: function() {
		document.forms.generator.stats.value = this.list.join( "," );
		$( "rating" ).innerHTML = "&nbsp;" + this.Calc( this.list );
	}
};