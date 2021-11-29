# FOXHOUND MONEY ZONE / VOLUME PROFILE
# by bigboss
#
# Shows current day volume profile as lines and prior day vah/l/poc as clouds
#
# STUDY NAME: foxhound_vpro
# VERSION 1.0 - INITIAL RELEASE

declare once_per_bar;

input atrDilationFactor = 0.0075;

DefineGlobalColor("Profile",COLOR.DARK_GRAY);
DefineGlobalColor("VAH",COLOR.RED);
DefineGlobalColor("POC",COLOR.ORANGE);
DefineGlobalColor("VAL",COLOR.GREEN);


def yyyymmdd = GetYYYYMMDD();
def period = CountTradingDays(Min(First(yyyymmdd), yyyymmdd), yyyymmdd) - 1;
def count = CompoundValue(1, if period != period[1] then (count[1] + period - period[1]) % 1 else count[1], 0);
def cond = count < count[1] + period - period[1];

profile vpro = VolumeProfile(onexpansion = no, startNewProfile = cond, priceperrow = PricePerRow.TICKSIZE);
vpro.Show(GlobalColor("Profile"), Color.Current, Color.CURRENT, 65);

plot pc = vpro.GetPointOfControl();
plot val = vpro.GetLowestValueArea();
plot vah = vpro.GetHighestValueArea();

def ppc = if cond then pc[1] else if cond[-1] then Double.NaN else ppc[1];
plot prev_pc = if ppc <> 0 then ppc else double.nan;

def pval = if cond then val[1] else if cond[-1] then Double.NaN else pval[1];
plot prev_val = if pval <> 0 then pval else double.nan;
def pvah = if cond then vah[1] else if cond[-1] then Double.NaN else pvah[1];
plot prev_vah = if pvah <> 0 then pvah else double.nan;

pc.SetDefaultColor(GlobalColor("POC"));
val.SetDefaultColor(GlobalColor("VAL"));
vah.SetDefaultColor(GlobalColor("VAH"));
pc.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
val.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
vah.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

prev_pc.SetDefaultColor(GlobalColor("POC"));
prev_val.SetDefaultColor(GlobalColor("VAL"));
prev_vah.SetDefaultColor(GlobalColor("VAH"));
prev_pc.SetStyle(Curve.SHORT_DASH);
prev_val.SetStyle(Curve.SHORT_DASH);
prev_vah.SetStyle(Curve.SHORT_DASH);
prev_vah.sethiding(1);
prev_val.sethiding(1);
prev_pc.sethiding(1);


def pe = aggregationPeriod.DAY;

def atr = MovingAverage(averageType.Wilders, TrueRange(high(period=pe), close(period=pe), low(period=pe)), 14) * atrDilationFactor;

addcloud(prev_pc + atr, prev_pc-atr,GlobalColor("POC"),GlobalColor("POC"));
addcloud(prev_vah + atr, prev_vah-atr,GlobalColor("VAH"),GlobalColor("VAH"));
addcloud(prev_val + atr, prev_val-atr,GlobalColor("VAL"),GlobalColor("VAL"));



