function addEvent( obj, evType, fn ) {
	if( obj.addEventListener ) {
		obj.addEventListener( evType, fn, false );
		return true;
	}
	else if( obj.attachEvent ) {
		var r = obj.attachEvent( "on" + evType, fn );
		return r;
	}
	else { return false; }
}

function load_scripts( paths ) {
	var scripts = paths || [ "jkd_lib" ];
	
	for( var i = 0; i < scripts.length; i++ ) {
		var newScript = document.createElement( "script" );
		newScript.type = "text/javascript";
		newScript.src = scripts[i] + ".js";
		document.getElementsByTagName( "head" )[0].appendChild( newScript );
	}
}

function waitFor( time, obj, fn ) {
	if ( !obj ) {
		if ( ( time-- ) < 1 ) { console.info( "Program load timeout" ); }
		else { setTimeout( "waitFor( " + time + ", " + obj + ", " + fn + " )", 200 ); }
	}
	else { if( !!fn ) { fn(); } }
	return;
}

function hello( arg ) { alert( arg || "hello" ); }

function $( id ) { return document.getElementById( id ); }
function _( tag ) { return document.getElementsByTagName( tag.toUpperCase() ); }
function isNumeric( question ) { return ( /^-?\d*(\.\d+)?$/.test( question ) ); }
function sortAscending( a, b ) { return a - b; }
function sortDescending( a, b ) { return b - a; }
function max( a, b ) { return ( a > b )? a: b; }
function min( a, b ) { return ( parseInt( a, 10 ) < parseInt( b, 10 ) )? a: b; }

Array.prototype.copy = function() { return this.slice(); };
Array.prototype.find = function( itm ) {
	for( var i = 0; i < this.length; i++ ) { if( this[i] == itm ) { return i; } }
	return false;
};
Array.prototype.hasElement = function( indx ) {
	for( var i = 0; i < this.length; i++ ) { if( this[i] == indx ) { return true; } }
	return false;
};
Array.prototype.isEmpty = function() { return this.join( "" ) === ""; };
Array.prototype.max = function () {
	var result = this[0];
	for( var i = 1; i < this.length; i++ ) {
		if( this[i] > result ) { result = this[i]; }
	}
	return result;
};
Array.prototype.min = function () {
	var result = this[0];
	for( var i = 1; i < this.length; i++ ) {
		if( this[i] < result ) { result = this[i]; }
	}
	return result;
};
Array.prototype.removeAtIndex = function ( indx ) {
    return this.slice( 0, indx ).concat( this.slice( indx + 1, this.length ) );
};
Array.prototype.removeItem = function ( itm ) {
    var temp = this.copy();
    for( var i = 0; i < temp.length; i++ ) {
        if( temp[i] == itm ) { temp = temp.removeAtIndex ( i ); }
    }
    return temp;
};
Array.prototype.sum = function() {
	var result = 0;
	for( var i = 0; i < this.length; i++ ) { result += this[i]; }
	return result;
};
Array.prototype.unique = function() {
	var temp = [];
	this.sort();
	for( var i = 0; i < this.length; i++ ) {
		if( temp[temp.length - 1] != this[i] ) {
			temp.push( this[i] );
		}
	}
	return temp;
};
