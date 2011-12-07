load("util/jslint.js");

var src = readFile("dist/project.js");

JSLINT(src, { evil: true, forin: true, maxerr: 100, onevar: true, nomen: true, eqeqeq: true, 
    plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true });

var e = JSLINT.errors, found = 0, w;

for ( var i = 0; i < e.length; i++ ) {
	w = e[i];

	print( "\n" + w.evidence + "\n" );
	print( "    Problem at line " + w.line + " character " + w.character + ": " + w.reason );
}

if ( found > 0 ) {
	print( "\n" + found + " Error(s) found." );

} else {
	print( "JSLint check passed." );
}
