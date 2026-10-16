#!/usr/bin/env python3
"""Generate portfolio-ready Biashara OS editorial boards from authentic UI captures.
Input screenshots are created using a fictional demo API in jkidune/biashara-os.
No part of the live API is used. Illustrative figures must not be described as results.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import textwrap

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/"tmp"/"biashara-screens"
OUT=ROOT/"content"/"projects"/"assets"/"biashara-os"
OUT.mkdir(parents=True,exist_ok=True)
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
GREEN="#91ed71"
DARK="#15201a"
GRAY="#65716a"
WHITE="#ffffff"
BG="#f8faf6"
def font(n,b=False): return ImageFont.truetype(BOLD if b else FONT,n)
def txt(d,xy,s,n=25,color=DARK,b=False,max_width=1200,spacing=12):
    # Word-wrap without truncating the information.
    words=s.split()
    line=''; y=xy[1]
    for word in words:
        candidate=(line+" "+word).strip()
        if d.textbbox((0,0),candidate,font=font(n,b))[2]>max_width and line:
            d.text((xy[0],y),line,fill=color,font=font(n,b));y+=n+spacing;line=word
        else:line=candidate
    if line:d.text((xy[0],y),line,fill=color,font=font(n,b))
    return y+n
def board():
    img=Image.new("RGB",(1600,1000),BG)
    return img,ImageDraw.Draw(img)
def heading(d,kicker,title,subtitle=None):
    d.ellipse((82,76,96,90),fill=GREEN)
    txt(d,(111,72),kicker.upper(),21,GRAY,True)
    txt(d,(82,128),title,64,DARK,True,max_width=850,spacing=3)
    if subtitle:txt(d,(85,305),subtitle,23,GRAY,max_width=640)
def card(base,png,region,shadow=True):
    image=Image.open(SOURCE/png).convert("RGB")
    x,y,w,h=region
    if shadow:
        sh=Image.new("RGBA",base.size,(0,0,0,0))
        s=ImageDraw.Draw(sh)
        s.rounded_rectangle((x+12,y+16,x+w+12,y+h+16),radius=25,fill=(5,30,14,45))
        sh=sh.filter(ImageFilter.GaussianBlur(20))
        base.paste(Image.alpha_composite(base.convert("RGBA"),sh).convert("RGB"))
    ImageDraw.Draw(base).rounded_rectangle((x-7,y-7,x+w+7,y+h+7),radius=24,fill="#e2e9e1")
    im=Image.new("RGB",(w,h),"white")
    image.thumbnail((w,h),Image.Resampling.LANCZOS)
    im.paste(image,((w-image.width)//2,(h-image.height)//2))
    mask=Image.new("L",(w,h),0);ImageDraw.Draw(mask).rounded_rectangle((0,0,w-1,h-1),radius=16,fill=255)
    base.paste(im,(x,y),mask)
def save(im,name):im.save(OUT/name,"JPEG",quality=90,optimize=True,progressive=True)
def label(d,y,text):
    d.rounded_rectangle((82,y,600,y+54),radius=18,fill="#eaf8e8")
    txt(d,(102,y+10),text,20,DARK,True)
# 01 Cover
im,d=board();d.rounded_rectangle((1030,-190,1800,1180),radius=250,fill="#e4f8df")
txt(d,(86,66),"BARONS DIGITAL  /  SELECTED WORK",22,GRAY,True)
txt(d,(82,185),"Biashara",98,DARK,True);txt(d,(83,290),"OS.",117,DARK,True)
txt(d,(88,475),"A modern business operating system",29,DARK,True,max_width=625)
txt(d,(88,548),"Built around the everyday realities of Tanzanian SMEs.",22,GRAY,max_width=560)
label(d,740,"SAAS PRODUCT  /  2026")
card(im,"01-dashboard-desktop.png",(710,183,810,490))
card(im,"08-dashboard-mobile.png",(1135,595,270,355))
save(im,"01-hero-cover.jpg")
# 02 Overview
im,d=board();heading(d,"01 / Product overview","One connected business workspace.","Sales, invoices, clients, inventory, and compliance activities in one place.")
for i,(name,caption) in enumerate([("01  /  Sales","Track activity"),("02  /  Invoices","Manage documents"),("03  /  Inventory","Understand stock"),("04  /  Tax","Prepare next steps")]):
 y=475+i*112
 d.rounded_rectangle((80,y,690,y+86),radius=19,fill="#e8f7e7" if i%2==0 else "#eef2ec")
 txt(d,(105,y+14),name,28,DARK,True)
 txt(d,(410,y+21),caption,18,GRAY)
card(im,"01-dashboard-desktop.png",(755,288,800,520))
save(im,"02-overview.jpg")
# 03 Brand direction
im,d=board();heading(d,"02 / Visual direction","Clarity for every business.","Presentation branding, not a redesign of the live application.")
for i,(color,n) in enumerate([(GREEN,"Fresh green"),("#15201a","Forest ink"),("#f8faf6","Paper white"),("#cbd4ca","Soft neutral")]):
 x=87+i*280
 d.rounded_rectangle((x,440,x+230,724),radius=22,fill=color,outline="#ccd6cb",width=2)
 txt(d,(x,753),n,20,DARK,True,max_width=230)
txt(d,(94,868),"Biashara OS",49,DARK,True)
txt(d,(790,875),"Product design  ·  Tanzania  ·  2026",22,GRAY)
save(im,"03-brand-direction.jpg")
# 04 Dashboard
im,d=board();heading(d,"03 / Dashboard","A clearer picture of operations.","A single view for recent invoices, sales, deadlines and stock activity.")
card(im,"01-dashboard-desktop.png",(450,305,1060,630))
label(d,750,"REAL INTERFACE · DEMO DATA")
save(im,"04-dashboard-showcase.jpg")
# 05 Documents
im,d=board();heading(d,"04 / Sales documents","From proposal to invoice.","Real screens showing the sales document list and invoice composer.")
card(im,"02-invoices-desktop.png",(565,259,945,435))
card(im,"03-invoice-composer-desktop.png",(745,550,685,380))
label(d,800,"INVOICE CREATION · DEMO DATA")
save(im,"05-invoicing-workflows.jpg")
# 06 More functions + mobile
im,d=board();heading(d,"05 / Everyday operations","Workflows that connect.","Products, clients and tax preparation across devices.")
card(im,"05-inventory-desktop.png",(520,230,615,350))
card(im,"06-tax-compliance-desktop.png",(1020,260,530,345))
card(im,"08-dashboard-mobile.png",(525,610,205,330))
card(im,"09-invoices-mobile.png",(815,610,210,330))
txt(d,(1065,690),"Designed for",34,DARK,True)
txt(d,(1065,747),"the way teams work.",31,DARK,True)
txt(d,(1065,825),"Real interface  /  Illustrative data",18,GRAY)
save(im,"06-operations-mobile.jpg")
files=list(OUT.glob("*.jpg"))
assert len(files)==6,files
for f in files:print(f.name,f.stat().st_size)
