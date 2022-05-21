# FOXHOUND FLOOR PIVOTS MOBILE
# by bigboss
#
# Version 1.2 - add 1H, shownextperiod
# Version 1.1 - add 4H
# Version 1.0 - initial

input showDevelopingCpr = no;
input extendDevelopingCpr= no;
input showDcprCloud = no;
input showCPR = yes;
input showCPRCloud = yes;
input showFloorPivots = yes;
input showR3S3R4S4 = no; # mobile friendly
input showMidPivots = no;
input paintbars = no;

def o = open;
def h = high;
def l = low;
def c = close;
def na = Double.NaN;
def dayStart = if getyyyymmdd() <> getyyyymmdd()[1] then gettime() else dayStart[1];

def rollover = dayStart <> dayStart[1];

def dh = if rollover or h > dh[1] then h else dh[1];
def dl = if rollover or l < dl[1] then l else dl[1];

def _dcp = if isNaN(close) and extendDevelopingCpr then _dcp[1] else (dh + dl + c) / 3;
def _dbc = if isNaN(close) and extendDevelopingCpr then _dbc[1] else (dh + dl) / 2;
def _dtc = if isNaN(close) and extendDevelopingCpr then _dtc[1] else (_dcp - _dbc) + _dcp;

plot dcp = if showDevelopingCpr then _dcp else na;
plot dbc = if showDevelopingCpr and showDevelopingCpr then _dbc else na;
plot dtc = if showDevelopingCpr and showDevelopingCpr then _dtc else na;

dcp.AssignValueColor(if _dtc > _dbc then Color.GREEN else Color.RED);
dtc.AssignValueColor(if _dtc > _dbc then Color.LIGHT_GREEN else Color.LIGHT_RED);
dbc.AssignValueColor(if _dtc > _dbc then Color.DARK_GREEN else Color.DARK_RED);

AddCloud(if showDcprCloud then dtc else na,if showDcprCloud then dbc else na,Color.LIGHT_GREEN,Color.LIGHT_RED);

dbc.SetLineWeight(2);

# CPR
def _tc = if rollover then _dtc[1] else _tc[1];
def _cp = if rollover then _dcp[1] else _cp[1];
def _bc = if rollover then _dbc[1] else _bc[1];

plot tc = if showCpr then _tc else na;
plot cp = if showCpr then _cp else na;
plot bc = if showCpr then _bc else na;

tc.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
cp.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
bc.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

tc.SetDefaultColor(Color.VIOLET);
cp.SetDefaultColor(Color.MAGENTA);
bc.SetDefaultColor(Color.VIOLET);

AddCloud(if showCPRCloud then tc else na,if showcprCloud then bc else na,Color.VIOLET,Color.VIOLET);

# FLOOR PIVOTS
def _r1 = if rollover then 
    _dcp[1]*2-dl[1] else _r1[1];
def _r2 = if rollover then 
    _dcp[1] + (dh[1]-dl[1]) else _r2[1];
def _r3 = if rollover then
    _r1 + (dh[1] -dl[1]) else _r3[1];
def _r4 = if rollover then
    _r3 + (_r2-_r1) else _r4[1];

def _s1 = if rollover then 
    _dcp[1]*2-dh[1] else _s1[1];
def _s2 = if rollover then 
    _dcp[1] - (dh[1]-dl[1]) else _s2[1];
def _s3 = if rollover then
    _s1 - (dh[1] -dl[1]) else _s3[1];
def _s4 = if rollover then
    _s3 - (_s1-_s2) else _s4[1];

plot r4 = if showFloorPivots and showR3S3R4S4 then _r4 else na;
plot r3 = if showFloorPivots and showR3S3R4S4 then _r3 else na;
plot r2 = if showFloorPivots then _r2 else na;
plot r1 = if showFloorPivots then _r1 else na;
plot s1 = if showFloorPivots then _s1 else na;
plot s2 = if showFloorPivots then _s2 else na;
plot s3 = if showFloorPivots and showR3S3R4S4 then _s3 else na;
plot s4 = if showFloorPivots and showR3S3R4S4 then _s4 else na;

r4.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
r3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
r2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
r1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
s1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
s2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
s3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
s4.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

r4.SetDefaultColor(CreateColor(64,0,0));
r3.SetDefaultColor(CreateColor(128,0,0));
r2.SetDefaultColor(CreateColor(192,0,0));
r1.SetDefaultColor(CreateColor(255,0,0));
s1.SetDefaultColor(CreateColor(0,255,0));
s2.SetDefaultColor(CreateColor(0,192,0));
s3.SetDefaultColor(CreateColor(0,128,0));
s4.SetDefaultColor(CreateColor(0,64,0));

assignpricecolor(if !paintbars then color.current else
        if close > _tc and close > _bc and _dtc > _dbc then color.green else
        if close > _tc and close > _bc and _dtc < _dbc then color.orange else
        if close < _tc and close < _bc and _dtc < _dbc then color.red else
        if close < _tc and close < _bc and _dtc > _dbc then color.dark_green else
        color.WHITE);

# mid pivots
plot r05 = if showFloorPivots and showmidPivots then (r1 + cp) / 2 else na;
plot r15 = if showFloorPivots and showmidPivots then (r1 + r2) / 2 else na;
plot r25 = if showFloorPivots and showmidPivots then (r2 + r3) / 2 else na;
plot r35 = if showFloorPivots and showmidPivots then (r3 + r4) / 2 else na;

plot s05 = if showFloorPivots and showmidPivots then (s1 + cp) / 2 else na;
plot s15 = if showFloorPivots and showmidPivots then (s1 + s2) / 2 else na;
plot s25 = if showFloorPivots and showmidPivots then (s2 + s3) / 2 else na;
plot s35 = if showFloorPivots and showmidPivots then (s3 + s4) / 2 else na;

r05.SetPaintingStrategy(PaintingStrategy.DASHES);
r05.SetDefaultColor(Color.GRAY);
r15.SetPaintingStrategy(PaintingStrategy.DASHES);
r15.SetDefaultColor(Color.GRAY);
r25.SetPaintingStrategy(PaintingStrategy.DASHES);
r25.SetDefaultColor(Color.GRAY);
r35.SetPaintingStrategy(PaintingStrategy.DASHES);
r35.SetDefaultColor(Color.GRAY);


s05.SetPaintingStrategy(PaintingStrategy.DASHES);
s05.SetDefaultColor(Color.GRAY);
s15.SetPaintingStrategy(PaintingStrategy.DASHES);
s15.SetDefaultColor(Color.GRAY);
s25.SetPaintingStrategy(PaintingStrategy.DASHES);
s25.SetDefaultColor(Color.GRAY);
s35.SetPaintingStrategy(PaintingStrategy.DASHES);
s35.SetDefaultColor(Color.GRAY);
