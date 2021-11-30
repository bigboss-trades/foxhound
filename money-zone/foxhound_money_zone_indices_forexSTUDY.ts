# FOXHOUND MONEY ZONE (for indices and forex)
# by bigboss
#
# Shows prior days Point of Control (POC), Value Area High (VAH), 
# Value Area Low (VAL), High, and Low. It also extends 10 periods of
# untagged (virgin) POC, VAL, and VAH. This study excludes the setting to toggle
# between Market Profile (TPOProfile) and Volume Profile so that it will
# function with tickers that have no volume.
#
# RECOMMENDED STUDY NAME: foxhound_money_zone_indices_forex
#
# VERSION 1.1 - LINES NOW EXTEND TO THE RIGHT
# VERSION 1.0 - INITIAL RELEASE

declare once_per_bar;

input showLabels = yes;
input showCloud = yes;
input pricePerRowHeightMode = {AUTOMATIC, default TICKSIZE, CUSTOM};
input customRowHeight = 1.0;
input timePerProfile = {HOUR, default DAY, WEEK, MONTH, "OPT EXP"};
input showPreviousHl = yes;
input showVirginPocs = yes;

DefineGlobalColor("Cloud", Color.GRAY);
DefineGlobalColor("VAH", Color.LIGHT_RED);
DefineGlobalColor("POC", Color.YELLOW);
DefineGlobalColor("VAL", Color.LIGHT_GREEN);
DefineGlobalColor("PH", Color.DARK_RED);
DefineGlobalColor("PL", Color.DARK_GREEN);

def pc = if IsNaN(close) then pc[1] else TPOProfile(onExpansion = no, pricePerRowHeightMode = pricePerRowHeightMode, timeperprofile = timePerProfile).POC;
def vah = if IsNaN(close) then vah[1] else TPOProfile(onExpansion = no, pricePerRowHeightMode = pricePerRowHeightMode, timeperprofile = timePerProfile).VAHigh;
def val =  if IsNaN(close) then val[1] else TPOProfile(onExpansion = no, pricePerRowHeightMode = pricePerRowHeightMode, timeperprofile = timePerProfile).VALow;
def ph =  if IsNaN(close) then ph[1] else TPOProfile(onExpansion = no, pricePerRowHeightMode = pricePerRowHeightMode, timeperprofile = timePerProfile).ProfileHigh;
def pl =  if IsNaN(close) then pl[1] else TPOProfile(onExpansion = no, pricePerRowHeightMode = pricePerRowHeightMode, timeperprofile = 
timePerProfile).ProfileLow;

def rollover_poc = pc <> pc[1] or val <> val[1] or vah <> vah[1] or ph <> ph[1] or pl <> pl[1];

def ppc = if rollover_poc then pc[1] else if pc[-1] <> pc then Double.NaN else ppc[1];
plot prev_pc = ppc;

def pval = if rollover_poc then val[1] else if val[-1] <> val then Double.NaN else pval[1];
plot prev_val = pval;

def pvah = if rollover_poc then vah[1] else if vah[-1] <> vah then Double.NaN else pvah[1];
plot prev_vah = pvah;

def ppl = if rollover_poc then pl[1] else if pl[-1] <> pl then Double.NaN else ppl[1];
plot prev_pl = ppl;

def pph = if rollover_poc then ph[1] else if ph[-1] <> ph then Double.NaN else pph[1];
plot prev_ph = pph;

prev_pc.SetDefaultColor(GlobalColor("POC"));
prev_val.SetDefaultColor(GlobalColor("VAL"));
prev_vah.SetDefaultColor(GlobalColor("VAH"));
prev_pl.SetDefaultColor(GlobalColor("PL"));
prev_ph.SetDefaultColor(GlobalColor("PH"));
prev_pc.SetStyle(Curve.SHORT_DASH);
prev_val.SetStyle(Curve.SHORT_DASH);
prev_vah.SetStyle(Curve.SHORT_DASH);
prev_ph.SetHiding(!showPreviousHl);
prev_pl.SetHiding(!showPreviousHl);

AddCloud(if showCloud then prev_val else Double.NaN, if showCloud then prev_vah else Double.NaN, GlobalColor("Cloud"), GlobalColor("Cloud"));
AddLabel(showLabels, "Money Zone (Market)", Color.WHITE);

# VIRGIN POCS

def rollover = if showVirginPocs then rollover_poc else 0;

def prev_poc_00 = if rollover then pc[1] else prev_poc_00[1];
def prev_poc_01 = if rollover then prev_poc_00[1] else prev_poc_01[1];
def prev_poc_02 = if rollover then prev_poc_01[1] else prev_poc_02[1];
def prev_poc_03 = if rollover then prev_poc_02[1] else prev_poc_03[1];
def prev_poc_04 = if rollover then prev_poc_03[1] else prev_poc_04[1];
def prev_poc_05 = if rollover then prev_poc_04[1] else prev_poc_05[1];
def prev_poc_06 = if rollover then prev_poc_05[1] else prev_poc_06[1];
def prev_poc_07 = if rollover then prev_poc_06[1] else prev_poc_07[1];
def prev_poc_08 = if rollover then prev_poc_07[1] else prev_poc_08[1];
def prev_poc_09 = if rollover then prev_poc_08[1] else prev_poc_09[1];
def prev_poc_10 = if rollover then prev_poc_09[1] else prev_poc_10[1];

def flag_00 = if rollover then 0 else if low crosses prev_poc_00 or high crosses prev_poc_00 then 1 else flag_00[1];
def flag_01 = if rollover then 0 else if low crosses prev_poc_01 or high crosses prev_poc_01 then 1 else flag_01[1];
def flag_02 = if rollover then 0 else if low crosses prev_poc_02 or high crosses prev_poc_02 then 1 else flag_02[1];
def flag_03 = if rollover then 0 else if low crosses prev_poc_03 or high crosses prev_poc_03 then 1 else flag_03[1];
def flag_04 = if rollover then 0 else if low crosses prev_poc_04 or high crosses prev_poc_04 then 1 else flag_04[1];
def flag_05 = if rollover then 0 else if low crosses prev_poc_05 or high crosses prev_poc_05 then 1 else flag_05[1];
def flag_06 = if rollover then 0 else if low crosses prev_poc_06 or high crosses prev_poc_06 then 1 else flag_06[1];
def flag_07 = if rollover then 0 else if low crosses prev_poc_07 or high crosses prev_poc_07 then 1 else flag_07[1];
def flag_08 = if rollover then 0 else if low crosses prev_poc_08 or high crosses prev_poc_08 then 1 else flag_08[1];
def flag_09 = if rollover then 0 else if low crosses prev_poc_09 or high crosses prev_poc_09 then 1 else flag_09[1];
def flag_10 = if rollover then 0 else if low crosses prev_poc_10 or high crosses prev_poc_10 then 1 else flag_10[1];

def ppoc_00 = if IsNaN(close) then ppoc_00[1] else if flag_00 then Double.NaN else prev_poc_00;
def ppoc_01 = if IsNaN(close) then ppoc_01[1] else if rollover and IsNaN(ppoc_00[1]) then Double.NaN else if rollover then ppoc_00[1] else if flag_01 then Double.NaN else ppoc_01[1];
def ppoc_02 = if IsNaN(close) then ppoc_02[1] else if rollover and IsNaN(ppoc_01[1]) then Double.NaN else if rollover then ppoc_01[1] else if flag_02 then Double.NaN else ppoc_02[1];
def ppoc_03 = if IsNaN(close) then ppoc_03[1] else if rollover and IsNaN(ppoc_02[1]) then Double.NaN else if rollover then ppoc_02[1] else if flag_03 then Double.NaN else ppoc_03[1];
def ppoc_04 = if IsNaN(close) then ppoc_04[1] else if rollover and IsNaN(ppoc_03[1]) then Double.NaN else if rollover then ppoc_03[1] else if flag_04 then Double.NaN else ppoc_04[1];
def ppoc_05 = if IsNaN(close) then ppoc_05[1] else if rollover and IsNaN(ppoc_04[1]) then Double.NaN else if rollover then ppoc_04[1] else if flag_05 then Double.NaN else ppoc_05[1];
def ppoc_06 = if IsNaN(close) then ppoc_06[1] else if rollover and IsNaN(ppoc_05[1]) then Double.NaN else if rollover then ppoc_05[1] else if flag_06 then Double.NaN else ppoc_06[1];
def ppoc_07 = if IsNaN(close) then ppoc_07[1] else if rollover and IsNaN(ppoc_06[1]) then Double.NaN else if rollover then ppoc_06[1] else if flag_07 then Double.NaN else ppoc_07[1];
def ppoc_08 = if IsNaN(close) then ppoc_08[1] else if rollover and IsNaN(ppoc_07[1]) then Double.NaN else if rollover then ppoc_07[1] else if flag_08 then Double.NaN else ppoc_08[1];
def ppoc_09 = if IsNaN(close) then ppoc_09[1] else if rollover and IsNaN(ppoc_08[1]) then Double.NaN else if rollover then ppoc_08[1] else if flag_09 then Double.NaN else ppoc_09[1];
def ppoc_10 = if IsNaN(close) then ppoc_10[1] else if rollover and IsNaN(ppoc_09[1]) then Double.NaN else if rollover then ppoc_09[1] else if flag_10 then Double.NaN else ppoc_10[1];

plot poc_00 = ppoc_00;
plot poc_01 = ppoc_01;
plot poc_02 = ppoc_02;
plot poc_03 = ppoc_03;
plot poc_04 = ppoc_04;
plot poc_05 = ppoc_05;
plot poc_06 = ppoc_06;
plot poc_07 = ppoc_07;
plot poc_08 = ppoc_08;
plot poc_09 = ppoc_09;
plot poc_10 = ppoc_10;

plot poc_00d = if IsNaN(ppoc_00[1]) then ppoc_00 else if ppoc_00 <> ppoc_00[1] then ppoc_00 else Double.NaN;
poc_00d.SetPaintingStrategy(PaintingStrategy.POINTS);

poc_00.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_01.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_02.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_03.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_04.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_05.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_06.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_07.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_08.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_09.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
poc_10.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

poc_00.SetDefaultColor(GlobalColor("POC"));
poc_00d.SetDefaultColor(GlobalColor("POC"));
poc_01.SetDefaultColor(GlobalColor("POC"));
poc_02.SetDefaultColor(GlobalColor("POC"));
poc_03.SetDefaultColor(GlobalColor("POC"));
poc_04.SetDefaultColor(GlobalColor("POC"));
poc_05.SetDefaultColor(GlobalColor("POC"));
poc_06.SetDefaultColor(GlobalColor("POC"));
poc_07.SetDefaultColor(GlobalColor("POC"));
poc_08.SetDefaultColor(GlobalColor("POC"));
poc_09.SetDefaultColor(GlobalColor("POC"));
poc_10.SetDefaultColor(GlobalColor("POC"));
poc_00d.SetDefaultColor(GlobalColor("POC"));

### NEAREST VA

def prev_val_00 = if rollover then val[1] else prev_val_00[1];
def prev_val_01 = if rollover then prev_val_00[1] else prev_val_01[1];
def prev_val_02 = if rollover then prev_val_01[1] else prev_val_02[1];
def prev_val_03 = if rollover then prev_val_02[1] else prev_val_03[1];
def prev_val_04 = if rollover then prev_val_03[1] else prev_val_04[1];
def prev_val_05 = if rollover then prev_val_04[1] else prev_val_05[1];
def prev_val_06 = if rollover then prev_val_05[1] else prev_val_06[1];
def prev_val_07 = if rollover then prev_val_06[1] else prev_val_07[1];
def prev_val_08 = if rollover then prev_val_07[1] else prev_val_08[1];
def prev_val_09 = if rollover then prev_val_08[1] else prev_val_09[1];
def prev_val_10 = if rollover then prev_val_09[1] else prev_val_10[1];

def flagval_00 = if rollover then 0 else if low crosses prev_val_00 or high crosses prev_val_00 then 1 else flagval_00[1];
def flagval_01 = if rollover then 0 else if low crosses prev_val_01 or high crosses prev_val_01 then 1 else flagval_01[1];
def flagval_02 = if rollover then 0 else if low crosses prev_val_02 or high crosses prev_val_02 then 1 else flagval_02[1];
def flagval_03 = if rollover then 0 else if low crosses prev_val_03 or high crosses prev_val_03 then 1 else flagval_03[1];
def flagval_04 = if rollover then 0 else if low crosses prev_val_04 or high crosses prev_val_04 then 1 else flagval_04[1];
def flagval_05 = if rollover then 0 else if low crosses prev_val_05 or high crosses prev_val_05 then 1 else flagval_05[1];
def flagval_06 = if rollover then 0 else if low crosses prev_val_06 or high crosses prev_val_06 then 1 else flagval_06[1];
def flagval_07 = if rollover then 0 else if low crosses prev_val_07 or high crosses prev_val_07 then 1 else flagval_07[1];
def flagval_08 = if rollover then 0 else if low crosses prev_val_08 or high crosses prev_val_08 then 1 else flagval_08[1];
def flagval_09 = if rollover then 0 else if low crosses prev_val_09 or high crosses prev_val_09 then 1 else flagval_09[1];
def flagval_10 = if rollover then 0 else if low crosses prev_val_10 or high crosses prev_val_10 then 1 else flagval_10[1];

def pval_00 = if IsNaN(close) then pval_00[1] else if flagval_00 then Double.NaN else prev_val_00;
def pval_01 = if IsNaN(close) then pval_01[1] else if rollover and IsNaN(pval_00[1]) then Double.NaN else if rollover then pval_00[1] else if flagval_01 then Double.NaN else pval_01[1];
def pval_02 = if IsNaN(close) then pval_02[1] else if rollover and IsNaN(pval_01[1]) then Double.NaN else if rollover then pval_01[1] else if flagval_02 then Double.NaN else pval_02[1];
def pval_03 = if IsNaN(close) then pval_03[1] else if rollover and IsNaN(pval_02[1]) then Double.NaN else if rollover then pval_02[1] else if flagval_03 then Double.NaN else pval_03[1];
def pval_04 = if IsNaN(close) then pval_04[1] else if rollover and IsNaN(pval_03[1]) then Double.NaN else if rollover then pval_03[1] else if flagval_04 then Double.NaN else pval_04[1];
def pval_05 = if IsNaN(close) then pval_05[1] else if rollover and IsNaN(pval_04[1]) then Double.NaN else if rollover then pval_04[1] else if flagval_05 then Double.NaN else pval_05[1];
def pval_06 = if IsNaN(close) then pval_06[1] else if rollover and IsNaN(pval_05[1]) then Double.NaN else if rollover then pval_05[1] else if flagval_06 then Double.NaN else pval_06[1];
def pval_07 = if IsNaN(close) then pval_07[1] else if rollover and IsNaN(pval_06[1]) then Double.NaN else if rollover then pval_06[1] else if flagval_07 then Double.NaN else pval_07[1];
def pval_08 = if IsNaN(close) then pval_08[1] else if rollover and IsNaN(pval_07[1]) then Double.NaN else if rollover then pval_07[1] else if flagval_08 then Double.NaN else pval_08[1];
def pval_09 = if IsNaN(close) then pval_09[1] else if rollover and IsNaN(pval_08[1]) then Double.NaN else if rollover then pval_08[1] else if flagval_09 then Double.NaN else pval_09[1];
def pval_10 = if IsNaN(close) then pval_10[1] else if rollover and IsNaN(pval_09[1]) then Double.NaN else if rollover then pval_09[1] else if flagval_10 then Double.NaN else pval_10[1];

plot val_00 = pval_00;
plot val_01 = pval_01;
plot val_02 = pval_02;
plot val_03 = pval_03;
plot val_04 = pval_04;
plot val_05 = pval_05;
plot val_06 = pval_06;
plot val_07 = pval_07;
plot val_08 = pval_08;
plot val_09 = pval_09;
plot val_10 = pval_10;

plot val_00d = if IsNaN(val_00[1]) then val_00 else if val_00 <> val_00[1] then val_00 else Double.NaN;
val_00d.SetPaintingStrategy(PaintingStrategy.POINTS);

val_00.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_01.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_02.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_03.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_04.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_05.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_06.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_07.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_08.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_09.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val_10.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);


val_00.SetDefaultColor(GlobalColor("VAL"));
val_01.SetDefaultColor(GlobalColor("VAL"));
val_02.SetDefaultColor(GlobalColor("VAL"));
val_03.SetDefaultColor(GlobalColor("VAL"));
val_04.SetDefaultColor(GlobalColor("VAL"));
val_05.SetDefaultColor(GlobalColor("VAL"));
val_06.SetDefaultColor(GlobalColor("VAL"));
val_07.SetDefaultColor(GlobalColor("VAL"));
val_08.SetDefaultColor(GlobalColor("VAL"));
val_09.SetDefaultColor(GlobalColor("VAL"));
val_10.SetDefaultColor(GlobalColor("VAL"));
val_00d.SetDefaultColor(GlobalColor("VAL"));



def prev_vah_00 = if rollover then vah[1] else prev_vah_00[1];
def prev_vah_01 = if rollover then prev_vah_00[1] else prev_vah_01[1];
def prev_vah_02 = if rollover then prev_vah_01[1] else prev_vah_02[1];
def prev_vah_03 = if rollover then prev_vah_02[1] else prev_vah_03[1];
def prev_vah_04 = if rollover then prev_vah_03[1] else prev_vah_04[1];
def prev_vah_05 = if rollover then prev_vah_04[1] else prev_vah_05[1];
def prev_vah_06 = if rollover then prev_vah_05[1] else prev_vah_06[1];
def prev_vah_07 = if rollover then prev_vah_06[1] else prev_vah_07[1];
def prev_vah_08 = if rollover then prev_vah_07[1] else prev_vah_08[1];
def prev_vah_09 = if rollover then prev_vah_08[1] else prev_vah_09[1];
def prev_vah_10 = if rollover then prev_vah_09[1] else prev_vah_10[1];
def flagvah_00 = if rollover then 0 else if low crosses prev_vah_00 or high crosses prev_vah_00 then 1 else flagvah_00[1];
def flagvah_01 = if rollover then 0 else if low crosses prev_vah_01 or high crosses prev_vah_01 then 1 else flagvah_01[1];
def flagvah_02 = if rollover then 0 else if low crosses prev_vah_02 or high crosses prev_vah_02 then 1 else flagvah_02[1];
def flagvah_03 = if rollover then 0 else if low crosses prev_vah_03 or high crosses prev_vah_03 then 1 else flagvah_03[1];
def flagvah_04 = if rollover then 0 else if low crosses prev_vah_04 or high crosses prev_vah_04 then 1 else flagvah_04[1];
def flagvah_05 = if rollover then 0 else if low crosses prev_vah_05 or high crosses prev_vah_05 then 1 else flagvah_05[1];
def flagvah_06 = if rollover then 0 else if low crosses prev_vah_06 or high crosses prev_vah_06 then 1 else flagvah_06[1];
def flagvah_07 = if rollover then 0 else if low crosses prev_vah_07 or high crosses prev_vah_07 then 1 else flagvah_07[1];
def flagvah_08 = if rollover then 0 else if low crosses prev_vah_08 or high crosses prev_vah_08 then 1 else flagvah_08[1];
def flagvah_09 = if rollover then 0 else if low crosses prev_vah_09 or high crosses prev_vah_09 then 1 else flagvah_09[1];
def flagvah_10 = if rollover then 0 else if low crosses prev_vah_10 or high crosses prev_vah_10 then 1 else flagvah_10[1];

def pvah_00 = if IsNaN(close) then pvah_00[1] else if flagvah_00 then Double.NaN else prev_vah_00;
def pvah_01 = if IsNaN(close) then pvah_01[1] else if rollover and IsNaN(pvah_00[1]) then Double.NaN else if rollover then pvah_00[1] else if flagvah_01 then Double.NaN else pvah_01[1];
def pvah_02 = if IsNaN(close) then pvah_02[1] else if rollover and IsNaN(pvah_01[1]) then Double.NaN else if rollover then pvah_01[1] else if flagvah_02 then Double.NaN else pvah_02[1];
def pvah_03 = if IsNaN(close) then pvah_03[1] else if rollover and IsNaN(pvah_02[1]) then Double.NaN else if rollover then pvah_02[1] else if flagvah_03 then Double.NaN else pvah_03[1];
def pvah_04 = if IsNaN(close) then pvah_04[1] else if rollover and IsNaN(pvah_03[1]) then Double.NaN else if rollover then pvah_03[1] else if flagvah_04 then Double.NaN else pvah_04[1];
def pvah_05 = if IsNaN(close) then pvah_05[1] else if rollover and IsNaN(pvah_04[1]) then Double.NaN else if rollover then pvah_04[1] else if flagvah_05 then Double.NaN else pvah_05[1];
def pvah_06 = if IsNaN(close) then pvah_06[1] else if rollover and IsNaN(pvah_05[1]) then Double.NaN else if rollover then pvah_05[1] else if flagvah_06 then Double.NaN else pvah_06[1];
def pvah_07 = if IsNaN(close) then pvah_07[1] else if rollover and IsNaN(pvah_06[1]) then Double.NaN else if rollover then pvah_06[1] else if flagvah_07 then Double.NaN else pvah_07[1];
def pvah_08 = if IsNaN(close) then pvah_08[1] else if rollover and IsNaN(pvah_07[1]) then Double.NaN else if rollover then pvah_07[1] else if flagvah_08 then Double.NaN else pvah_08[1];
def pvah_09 = if IsNaN(close) then pvah_09[1] else if rollover and IsNaN(pvah_08[1]) then Double.NaN else if rollover then pvah_08[1] else if flagvah_09 then Double.NaN else pvah_09[1];
def pvah_10 = if IsNaN(close) then pvah_10[1] else if rollover and IsNaN(pvah_09[1]) then Double.NaN else if rollover then pvah_09[1] else if flagvah_10 then Double.NaN else pvah_10[1];

plot vah_00 = pvah_00;
plot vah_01 = pvah_01;
plot vah_02 = pvah_02;
plot vah_03 = pvah_03;
plot vah_04 = pvah_04;
plot vah_05 = pvah_05;
plot vah_06 = pvah_06;
plot vah_07 = pvah_07;
plot vah_08 = pvah_08;
plot vah_09 = pvah_09;
plot vah_10 = pvah_10;


plot vah_00d = if IsNaN(vah_00[1]) then vah_00 else if vah_00 <> vah_00[1] then vah_00 else Double.NaN;
vah_00d.SetPaintingStrategy(PaintingStrategy.POINTS);


vah_00.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_01.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_02.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_03.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_04.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_05.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_06.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_07.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_08.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_09.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah_10.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

vah_00.SetDefaultColor(GlobalColor("vah"));
vah_01.SetDefaultColor(GlobalColor("vah"));
vah_02.SetDefaultColor(GlobalColor("vah"));
vah_03.SetDefaultColor(GlobalColor("vah"));
vah_04.SetDefaultColor(GlobalColor("vah"));
vah_05.SetDefaultColor(GlobalColor("vah"));
vah_06.SetDefaultColor(GlobalColor("vah"));
vah_07.SetDefaultColor(GlobalColor("vah"));
vah_08.SetDefaultColor(GlobalColor("vah"));
vah_09.SetDefaultColor(GlobalColor("vah"));
vah_10.SetDefaultColor(GlobalColor("vah"));
vah_00d.SetDefaultColor(GlobalColor("vah"));
