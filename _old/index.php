<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-Strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>D&D 1E+ Character Generator</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="all.css" type="text/css" />
</head>

<body>

<ol style="display: none;">
	<li>saves modification in racial descriptions</li>
	<li>base languages</li>
	<li>spells matrix</li>
	
	<li>XP</li>
	<li>money</li>
	
	<li>magic resistance matrix</li>
	<li>see invisibility matrix</li>
	
	<li>acrobat abilities</li>
	
	<li>comeliness/surprise matrix</li>
</ol>

<form name="generator" action="./" method="post" class="styled">
		
	<div id="worksheet">
		<div id="slider">
			<div class="row">
				<label class="info">Level</label>
				<input class="lvl" name="level" value="1" />
			</div>
			
			<div class="row">
				<label class="info">Race</label>
				<select class="opt" name="race">
					<option value="">-- select one --</option>
				</select>
			</div>
			
			<div class="row">
				<label class="info">Primary Class</label>
				<select class="opt" name="pClass">
					<option value="">-- select one --</option>
				</select>
			</div>
			
			<div class="row">
				<label class="info">Secondary Class</label>
				<select class="opt" name="sClass">
					<option value=""></option>
				</select>
				<span id="classComment"></span>
			</div>
			
			<div class="row">
				<label class="info">Stats</label>
				<input class="opt" name="stats" value="" disabled="disabled" />
				<span id="rating" onClick="RandomStats.Generate();"><a href="javascript: RandomStats.Read();"></a></span>
				<div class="indent">
					<label class="clickable"><input type="checkbox" checked="true" name="useRandom" />
						&nbsp;Yes, use these generated stats. (click to re-generate)</label>
				</div>
			</div>
		</div>
	</div>
	
	<div id="baseCharacter">
		<div class="column stats">
			<div class="row">
				<label class="stats">str</label>
				<input class="value" type="row" name="str" />
			</div>
			<div class="row">
				<label class="stats">int</label>
				<input class="value" type="row" name="int" />
			</div>
			<div class="row">
				<label class="stats">wis</label>
				<input class="value" type="row" name="wis" />
			</div>
			<div class="row">
				<label class="stats">dex</label>
				<input class="value" type="row" name="dex" />
			</div>
			<div class="row">
				<label class="stats">con</label>
				<input class="value" type="row" name="con" />
			</div>
			<div class="row">
				<label class="stats">cha</label>
				<input class="value" type="row" name="cha" />
			</div>
			<div class="row">
				<label class="stats">com</label>
				<input class="value" type="row" name="com" />
			</div>
		</div>
		<div class="column statsMatrix">
			<div class="row" id="str">&nbsp;</div>
			<div class="row" id="int">&nbsp;</div>
			<div class="row" id="wis">&nbsp;</div>
			<div class="row" id="dex">&nbsp;</div>
			<div class="row" id="con">&nbsp;</div>
			<div class="row" id="cha">&nbsp;</div>
			<div class="row" id="com">&nbsp;</div>
		</div>
		
		<div class="column">
			<div class="row">
				<label class="stats">HP</label>
				<input class="value" name="hp" disabled="disabled" />
			</div>
			<div class="row">
				<label class="stats">THAC0</label>
				<input class="value" name="thaco" disabled="disabled" />
			</div>
			<div class="row">
				<label class="stats">Move</label>
				<input class="value" name="move" disabled="disabled" />
			</div>
			<div class="row">
				<div style="text-align: right;">See Invisible</div>
				<label class="stats">&nbsp;</label>
				<input class="value" name="seeInvis" disabled="disabled" />
			</div>
			<div class="row">
				<div style="text-align: right;">Magic Resistance</div>
				<label class="stats">&nbsp;</label>
				<input class="value" name="magicRes" disabled="disabled" />
			</div>
		</div>
		
		<div class="column">
			<div class="row">
				<label class="stats">ppd</label>
				<input class="value" name="ppd" disabled="disabled" />
			</div>
			<div class="row">
				<label class="stats">pp</label>
				<input class="value" name="pp" disabled="disabled" />
			</div>
			<div class="row">
				<label class="stats">rsw</label>
				<input class="value" name="rsw" disabled="disabled" />
			</div>
			<div class="row">
				<label class="stats">bw</label>
				<input class="value" name="bw" disabled="disabled" />
			</div>
			<div class="row">
				<label class="stats">sp</label>
				<input class="value" name="sp" disabled="disabled" />
			</div>
		</div>
	</div>
	
	
	<div id="thiefSkills">
		<div>
			<input class="value" name="pickPockets" disabled="disabled" /><br />
			Pick Pockets
		</div>
		<div>
			<input class="value" name="openLocks" disabled="disabled" /><br />
			Open Locks
		</div>
		<div>
			<input class="value" name="findRemove" disabled="disabled" /><br />
			Find/Remove
		</div>
		<div>
			<input class="value" name="moveSilent" disabled="disabled" /><br />
			Move Silent
		</div>
		<div>
			<input class="value" name="shadowHide" disabled="disabled" /><br />
			Shadow Hide
		</div>
		<div>
			<input class="value" name="hearNoise" disabled="disabled" /><br />
			Hear Noise
		</div>
		<div>
			<input class="value" name="climbWalls" disabled="disabled" /><br />
			Climb Walls
		</div>
		<div>
			<input class="value" name="readLanguage" disabled="disabled" /><br />
			Read Language
		</div>
	</div>

</form>

<script language="JavaScript" type="text/javascript">
function scriptLoader( paths ) {
	var scripts = paths || [ "jkd_lib" ];
	
	for( var i = 0; i < scripts.length; i++ ) {
		var newScript = document.createElement( "script" );
		newScript.type = "text/javascript";
		newScript.src = scripts[i] + ".js";
		document.getElementsByTagName( "head" )[0].appendChild( newScript );
	}
}
scriptLoader( [
	"jkd_lib",
	"DnD",
	"DnD_Classes",
	"DnD_Races",
	"DnD_Stats",
	"DnD_Player"
] );

var player = null;
window.onload = function() {
	document.forms.generator.reset();
	waitFor( 10, PlayerObj, function() { player = new PlayerObj(); } );
};
</script>
</body>
</html>


