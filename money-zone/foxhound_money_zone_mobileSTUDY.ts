# FOXHOUND MONEY ZONE / TIME PRICE OPPORTUNITY (MARKET) PROFILE MOBILE
# by bigboss
#
# Shows prior day vah/l/poc/vpoc as lines. Mobile TOS Friendly.
#
# RECOMMENDED STUDY NAME: foxhound_money_zone_mobile
#
# VERSION 1.1 - ADDED VOLUME PROFILE POC
#               Changed method to color bars to be mobile friendly
# VERSION 1.0 - INITIAL RELEASE

declare once_per_bar;

def yyyymmdd = GetYYYYMMDD();
def period = CountTradingDays(Min(First(yyyymmdd), yyyymmdd), yyyymmdd) - 1;
def count = CompoundValue(1, if period != period[1] then (count[1] + period - period[1]) % 1 else count[1], 0);
def cond = count < count[1] + period - period[1];

profile mpro = TimeProfile(onexpansion = no, startNewProfile = cond, priceperrow = PricePerRow.TICKSIZE);
#mpro.Show(GlobalColor("Profile"), Color.Current, Color.CURRENT, 65);

def pc = mpro.GetPointOfControl();
def val = mpro.GetLowestValueArea();
def vah = mpro.GetHighestValueArea();
def pl = mpro.GetLowest();
def ph = mpro.GetHighest();
def vpoc = reference VolumeProfile(onexpansion = no, timeperprofile = "DAY", pricePerRowHeightMode = "TICKSIZE").POC;

def ppc = if cond then pc[1] else if cond[-1] then Double.NaN else ppc[1];
plot prev_pc = if ppc <> 0 then ppc else Double.NaN;

def pval = if cond then val[1] else if cond[-1] then Double.NaN else pval[1];
plot prev_val = if pval <> 0 then pval else Double.NaN;

def pvah = if cond then vah[1] else if cond[-1] then Double.NaN else pvah[1];
plot prev_vah = if pvah <> 0 then pvah else Double.NaN;

def plow = if cond then pl[1] else if cond[-1] then Double.NaN else plow[1];
plot prev_low = if plow <> 0 then plow else Double.NaN;

def phigh = if cond then ph[1] else if cond[-1] then Double.NaN else phigh[1];
plot prev_high = if phigh <> 0 then phigh else Double.NaN;

def pvpoc = if cond then vpoc[1] else if cond[-1] then Double.NaN else pvpoc[1];
plot prev_vpoc = if pvpoc <> 0 then pvpoc else Double.NaN;

prev_pc.SetDefaultColor(Color.YELLOW);
prev_val.SetDefaultColor(Color.LIGHT_GREEN);
prev_vah.SetDefaultColor(Color.LIGHT_RED);
prev_pc.SetStyle(Curve.SHORT_DASH);
prev_vpoc.SetStyle(Curve.SHORT_DASH);
prev_val.SetStyle(Curve.SHORT_DASH);
prev_vah.SetStyle(Curve.SHORT_DASH);
prev_high.SetDefaultColor(Color.DARK_RED);
prev_low.SetDefaultColor(Color.DARK_GREEN);
prev_vpoc.SetDefaultColor(Color.Orange);

AddCloud(prev_val, prev_vah, Color.GRAY, Color.GRAY);
