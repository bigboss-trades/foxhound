# FOXHOUND SMOOTHED HA RIBBON
# ported to thinkscript by bigboss from https://fr.tradingview.com/script/DTDQ3y76/
#
# This is just a smoothed heiken ashi indicator.
# It's commonly sold for significant $$$, some names like
#  Wonder Trader Pro - length 10, 1 smoothing, SMA
#  Trend Trader Pro - (not sure of settings)
#
# With settings of length 1, smoothing 1, SMA you get heiken 
# ashi candle and coloring on a candlestick chart.
#
# VERSION 1.1 - Added support for TEMA 
#               Added buy/sell arrows
# VERSION 1.0 - INITIAL PORT

input ma_type = {"VWMA","EMA", "SMA", "SWMA", "WMA", default "TEMA"};
input ma_period = 21;
input ma_period_smoothing = 1;
input paintbars = no;

DefineGlobalColor("Bullish",CreateColor(38,166,154));
DefineGlobalColor("Bearish",CreateColor(239,83,80));
DefineGlobalColor("Cloud",CreateColor(128,128,128));

input showLines = no;
input show_hl_cloud = yes;
input show_oc_cloud = yes;

script ma {
input ma_type = {"VWMA", "EMA", "SMA", "SWMA", "WMA", default "TEMA"};
input price = close;
input ma_period = 7;
def ma;
switch (ma_type){
    case "EMA":
        ma = MovAvgExponential(price,ma_period);
    case "VWMA": 
        ma = Sum(volume * price, ma_period) / Sum(volume, ma_period);
    case "SMA": 
        ma = Average(price,ma_period);
    case "SWMA": 
        ma = MovAvgTriangular(price,ma_period);
    case "WMA":
        ma = MovAvgWeighted(price,ma_period);
    case "TEMA":
        ma = tema(price,ma_period);
    }
plot data = ma;
}

def o = compoundvalue(1,ma(ma_Type,open,ma_period),open);
def c = compoundvalue(1,ma(ma_Type,close,ma_period),close);
def h = compoundvalue(1,ma(ma_Type,high,ma_period),high);
def l = compoundvalue(1,ma(ma_Type,low,ma_period),low);

def ha_o;
def ha_c;

#Vervoot vs Vacrut or whatever
ha_o = CompoundValue(1, ( (ha_o[1] + (o[1] + h[1] + l[1] + c[1]) /4.0)/2.0), open);
ha_c = ((o + h + l + c)/4.0) ;
# ha_o= CompoundValue(1, ( (ha_o[1] + (o[1] + h[1] + l[1] + c[1]) /4.0)/2.0), open);
#    ha_c= ((((o+ h+ l+ c)/4.0) + ha_o+ Max(h, ha_o) + Min(l, ha_o))/4.0);

def ha_l = min(l, ha_o);
def ha_h = max(h,ha_o);

def ha_o_smooth = ma(ma_type, ha_o, ma_period_smoothing);
def ha_c_smooth = ma(ma_type, ha_c, ma_period_smoothing);
def ha_h_smooth = ma(ma_type, ha_h, ma_period_smoothing);
def ha_l_smooth = ma(ma_type, ha_l, ma_period_smoothing);

def trend = ha_c_smooth >= ha_o_smooth;

plot o_line = ha_o_smooth;
plot c_line = ha_c_smooth;

plot h_line = ha_h_smooth;
plot l_line = ha_l_smooth;

addcloud(if show_hl_cloud then h_line else double.nan,if show_hl_cloud then l_line else double.nan,GlobalColor("Cloud"),GlobalColor("Cloud"));
addcloud(if show_oc_cloud then c_line else double.nan,if show_oc_cloud then o_line else double.nan, GlobalColor("Bullish"),GlobalColor("Bearish"));

o_line.AssignValueColor(if o_line > c_line then GlobalColor("Bearish") else GlobalColor("Bullish"));
c_line.AssignValueColor(if o_line > c_line then GlobalColor("Bearish") else GlobalColor("Bullish"));
h_line.SetdefaultColor(GlobalColor("Cloud"));
l_line.SetdefaultColor(GlobalColor("Cloud"));


o_line.sethiding(!showlines);
c_line.sethiding(!showlines);
h_line.sethiding(!showlines);
l_line.sethiding(!showlines);

AssignPriceColor(if !paintbars then color.current else if o_line > c_line then color.red else color.light_green);


# ARROWS
input show_arrows = yes;
def na = Double.Nan;

plot buy = if c_line crosses above o_line and show_arrows then (c_line+o_line)/2 else na;
buy.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
buy.SetDefaultColor(Color.GREEN);

plot sell = if c_line crosses below o_line and show_arrows then (c_line+o_line)/2 else na;
sell.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
sell.SetDefaultColor(Color.RED);

