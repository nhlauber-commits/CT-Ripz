// Copied unchanged from pack-rip.html ("data"). Do not edit names, odds, prices or tiers here.
import { hash, rng } from '../art/helpers.js'

const R=[
  {id:'common',name:'Common',w:55,sell:10},
  {id:'uncommon',name:'Uncommon',w:25,sell:30},
  {id:'rare',name:'Rare',w:12,sell:90},
  {id:'epic',name:'Epic',w:6,sell:300},
  {id:'legendary',name:'Legendary',w:2,sell:1500}
];
const TIERS=[
  {name:'Single',n:1,cost:100,note:'1 card'},
  {name:'Triple',n:3,cost:270,note:'3 cards, save 10%'},
  {name:'Mega',n:5,cost:425,note:'5 cards, at least one Rare or better',min:2}
];
const START=1000,PAY=1000,WAIT=60000,CAP=5000; // free coins every minute, only while the balance is under CAP
// Each theme: d = one string per rarity (40 / 28 / 18 / 10 / 4 cards), written as "artKey:Name,Name;artKey:Name"
const T=[
{id:'monsters',name:'Monsters',a:'#e2452f',b:'#f2a922',h:[15,200,130,275,45],em:'Solardrake',
 g:{fire:'Fire',water:'Water',leaf:'Grass',bug:'Bug',bolt:'Electric',ice:'Ice',rock:'Rock',ghost:'Ghost',wind:'Wind',dragon:'Dragon',star:'Cosmic'},d:[
 "rock:Pebblit,Gravlet,Dustmite,Cobblepup,Mudlump,Clodder;leaf:Leaflet,Sproutle,Mossback,Twiglet,Budkin,Fernip;bug:Fizzbug,Nibblet,Skitterling,Silkit,Buzzlet,Grubble;water:Puddlet,Driplet,Tadpip,Minnowisp,Bubblub;fire:Sparklet,Cinderkit,Smoldit,Ashpup;wind:Breezlet,Fluffin,Chirplet,Gustling;bolt:Zaplet,Statick,Zipzap;ice:Chillip,Snowmote,Frostnip;ghost:Wisplet,Boolet,Shadekin",
 "fire:Emberpup,Flarefox,Scorchling,Kindlecat;water:Tidefin,Coralisk,Splashotter,Brinecrab;leaf:Thornling,Bloomeer,Vinecoil,Shroomkin;bolt:Voltail,Sparkhare,Ampfin;ice:Glacipup,Sleetwing,Icicub;rock:Boulderon,Quartzle,Ironshell;ghost:Glowghast,Duskmoth,Spookit;wind:Gustwing,Cloudram,Zephyrat;bug:Stingfly",
 "fire:Blazehound,Pyrolisk;water:Torrentoad,Reefwyrm;leaf:Thornback,Floradon;bolt:Thunderam,Stormlynx;ice:Frostlynx,Glaciark;rock:Cragmaul,Obsidiant;ghost:Phantomane,Dreadwisp;wind:Tempestork,Cyclowl;bug:Bladewing,Beetlord",
 "fire:Magmaw,Infernox;water:Abyssquid,Leviatide;leaf:Eldergrove;bolt:Voltitan;ice:Cryoclasm;rock:Titanolith;ghost:Nightshroud;dragon:Wyvernox",
 "dragon:Solardrake,Voidwyrm;star:Lunaveil,Prismare"]},
{id:'drugs',name:'Drugs',a:'#7b2fd0',b:'#19b88a',h:[280,160,320,200],em:'Penicillin',
 g:{cup:'Caffeine',pill:'Pharmacy',bottle:'Bottle',cig:'Nicotine',leaf:'Cannabis',herb:'Botanical',flask:'Lab',mush:'Psychedelic',crystal:'Crystal',syringe:'Injectable',blotter:'Psychedelic'},d:[
 "cup:Coffee,Green Tea,Energy Drink,Espresso,Cola,Yerba Mate,Black Tea;pill:Aspirin,Ibuprofen,Paracetamol,Antacid,Vitamin C,Melatonin,Antihistamine,Cough Drop,Caffeine Pill,Multivitamin,Zinc Lozenge,Naproxen;bottle:Cough Syrup,Lager,Cider,House Wine,Hard Seltzer,Light Beer,Saline Spray,Eye Drops;cig:Cigarette,Nicotine Gum,Nicotine Patch,Chewing Tobacco,Cigarillo,Snus;leaf:Shake,Hemp;herb:Catnip,Chamomile,Peppermint,Kava,Valerian Root",
 "bottle:Whiskey,Vodka,Tequila,Rum,Gin,Sake,Craft IPA,Champagne;leaf:Sativa,Indica,Hybrid,CBD Flower;herb:Kratom,Khat;pill:Amoxicillin,Prednisone,Metformin,Statin,Beta Blocker,Codeine,Muscle Relaxant,Sleeping Pill;cig:Cigar,Hookah,Pipe Tobacco;flask:Nitrous Oxide,Ether,Novocaine",
 "leaf:Sour Diesel,Blue Dream,OG Kush,Hashish;herb:Coca Leaf,Salvia;mush:Magic Mushrooms,Peyote,San Pedro;pill:Adderall,Xanax,Valium,Ritalin,Oxycodone;bottle:Absinthe,Moonshine,Ayahuasca;crystal:Ketamine",
 "crystal:Cocaine,Methamphetamine,MDMA,DMT;syringe:Morphine,Heroin,Fentanyl;blotter:LSD;herb:Opium Poppy;pill:Viagra",
 "flask:Penicillin;syringe:Insulin,Polio Vaccine;pill:Antiretrovirals"]},
{id:'sports',name:'Sports',a:'#1553b5',b:'#d8342c',h:[215,355,140,30],em:'Super Bowl Ring',
 g:{fb:'Football',soc:'Soccer',base:'Baseball',bask:'Basketball'},d:[
 "fb:Kickoff,First Down,Punt,Handoff,Snap,Huddle,Touchback,Fair Catch,Screen Pass,Field Goal;soc:Throw-In,Goal Kick,Corner Kick,Back Pass,Offside Flag,Shin Guards,Tap-In,Yellow Card,Wall Pass,Clearance;base:Base Hit,Ground Ball,Fly Out,Foul Ball,Walk,Bunt,Strike One,Pop Fly,Rosin Bag,Batting Glove;bask:Layup,Free Throw,Bounce Pass,Jump Ball,Rebound,Chest Pass,Box Out,Inbound Pass,Shot Clock,Dribble",
 "fb:Touchdown,Sack,Interception,Two-Point Conversion,Play Action,Blitz,Onside Kick;soc:Free Kick,Clean Sheet,Penalty Kick,Nutmeg,Header,Slide Tackle,Captain’s Armband;base:Double,Stolen Base,Double Play,Strikeout,Curveball,Sacrifice Fly,Triple;bask:Three-Pointer,Slam Dunk,Steal,Block,Fast Break,Pick and Roll,Crossover",
 "fb:Pick Six,Hail Mary,Pro Bowl,Goal-Line Stand,One-Handed Catch;soc:Hat-Trick,Bicycle Kick,Golden Glove,Derby Win;base:Home Run,Grand Slam,Gold Glove,Triple Play,Hit for the Cycle;bask:Alley-Oop,Triple-Double,Buzzer Beater,Poster Dunk",
 "fb:Super Bowl MVP,Heisman Trophy,Perfect Passer Rating;soc:Golden Boot,MLS Cup;base:No-Hitter,Triple Crown,Cy Young Award;bask:Scoring Title,60-Point Game",
 "fb:Super Bowl Ring;soc:World Cup Trophy;base:World Series Ring;bask:NBA Championship"]},
{id:'tech',name:'Technology',a:'#2456d6',b:'#22c1e6',h:[215,190,250,170],em:'Quantum Computer',
 g:{cable:'Accessory',disk:'Storage',screen:'Device',phone:'Handheld',gamepad:'Controls',chip:'Hardware',robot:'Robotics',rocket:'Space & Mobility',atom:'Frontier'},d:[
 "cable:USB Cable,HDMI Cable,Ethernet Cable,Power Strip,Phone Charger,Aux Cord,Extension Lead,Dongle,AA Battery,Wall Adapter;disk:Floppy Disk,CD-ROM,USB Stick,SD Card,VHS Tape,Cassette,DVD,Zip Disk;screen:CRT Monitor,Calculator,Digital Watch,Webcam,Office Printer,Wi-Fi Router,Dial-Up Modem,Fax Machine,Desk Phone,Pager;phone:Flip Phone,Brick Phone,MP3 Player,Walkie-Talkie,Pocket Radio,Alarm Clock;gamepad:Mouse,Keyboard,Joystick,TV Remote,Trackball,Mouse Pad",
 "phone:Smartphone,Tablet,Smartwatch,E-Reader,Fitness Band,Wireless Earbuds;screen:Laptop,4K Monitor,Smart TV,Projector,Dash Cam,Action Camera;gamepad:Mechanical Keyboard,Game Console,Handheld Console,Racing Wheel,Arcade Stick;chip:Graphics Card,SSD,RAM Stick,Raspberry Pi,Motherboard,CPU;robot:Robot Vacuum,Drone,Smart Thermostat,3D Pen,Smart Lock",
 "screen:Gaming PC,Ultrawide Monitor,OLED TV,Mirrorless Camera;chip:Liquid-Cooled Rig,Server Rack,FPGA Board,Neural Chip;robot:3D Printer,VR Headset,Robot Arm,Electric Scooter,Exoskeleton;rocket:Satellite Dish,Weather Balloon,Electric Car,CubeSat,Hoverboard",
 "robot:Humanoid Robot,Self-Driving Car,Brain Implant,Robot Dog;rocket:Reusable Rocket,Space Station,Mars Rover;chip:Supercomputer,AI Datacenter;atom:Fusion Reactor",
 "atom:Quantum Computer,Dyson Sphere;rocket:Mars Colony Ship;robot:Superintelligence"]},
{id:'crypto',name:'Crypto & Stocks',a:'#e07a10',b:'#1fa866',h:[35,150,210,270],em:'Bitcoin',
 g:{coin:'Coin',chart:'Market',doc:'Paperwork',bear:'Bear',bull:'Bull',vault:'Vault'},d:[
 "coin:Penny Stock,Meme Coin,Dust Balance,Stablecoin,Dog Coin,Frog Coin,Testnet Token,Wrapped Token,Faucet Drip,Airdrop Crumbs;chart:Red Candle,Green Candle,Sideways Market,Limit Order,Market Order,Stop Loss,Bid-Ask Spread,Paper Trade,The Dip,Dead Cat Bounce,Pump,Dump;doc:Gas Fee,Seed Phrase,Brokerage Statement,Ticker Symbol,Tax Form,Dividend Cheque,Prospectus,Trade Confirmation,Margin Call,KYC Check;bear:Rug Pull,Bag Holder,FOMO,FUD,Paper Hands,Rekt,Exit Scam,Bear Trap",
 "coin:Dogecoin,Litecoin,Cardano,Polkadot,Chainlink,XRP,Avalanche,Monero;chart:Index Fund,ETF,Dividend Stock,Growth Stock,Value Stock,Treasury Bond,Call Option,Put Option;vault:Hardware Wallet,Cold Storage,Hot Wallet,Roth IRA,401k,Savings Bond;bull:Diamond Hands,HODL,Buy the Dip,Bull Flag,Golden Cross,Airdrop",
 "coin:Solana,BNB,Tether,Blue-Chip NFT;chart:S&P 500,Nasdaq 100,Dow Jones,Blue-Chip Stock,IPO Day,Stock Split;vault:Mining Rig,Validator Node,Staking Rewards,Yield Farm;bull:Bull Run,Whale,Short Squeeze,To the Moon",
 "coin:Ethereum,Bitcoin Halving;chart:Trillion-Dollar Company,Ten-Bagger,All-Time High,Bitcoin ETF;vault:Hedge Fund,Gold Reserve;bull:Wall Street Bull,Unicorn Startup",
 "coin:Bitcoin,Genesis Block;vault:Satoshi’s Wallet;chart:Berkshire Class A"]},
{id:'cars',name:'Nice Cars',a:'#b3122a',b:'#3a3f4a',h:[355,215,30,260,5],em:'Bugatti Chiron',
 g:{hatch:'Hot Hatch',sedan:'Sedan',coupe:'Sports Car',suv:'Off-Road',classic:'Classic',super:'Supercar',hyper:'Hypercar'},d:[
 "hatch:VW Golf GTI,Honda Civic Si,Mini Cooper S,Ford Fiesta ST,Hyundai Veloster N,Mazda3 Turbo,Fiat 500 Abarth,Ford Focus ST,Renault Clio RS,Peugeot 208 GTi,Suzuki Swift Sport;sedan:Honda Accord Sport,Toyota Camry TRD,Mazda6,Kia Stinger,VW Jetta GLI,Subaru Legacy GT,Acura TLX,Nissan Maxima,Lexus IS 350,Volvo S60,Genesis G70,Infiniti Q50;coupe:Mazda MX-5 Miata,Toyota GR86,Subaru BRZ,Honda Prelude,Nissan 350Z,VW Scirocco,Toyota Celica,Mitsubishi Eclipse,Audi TT;suv:Jeep Wrangler,Ford Bronco,Toyota 4Runner,Land Rover Defender,Toyota Tacoma,Ford F-150,Suzuki Jimny,Subaru Outback",
 "coupe:Ford Mustang GT,Chevy Camaro SS,Dodge Challenger,Nissan 370Z,Toyota GR Supra,BMW M2,Audi TT RS,Porsche Cayman,Lotus Elise,Alfa Romeo 4C;sedan:BMW M3,Subaru WRX STI,Mitsubishi Lancer Evo,Audi RS3,Mercedes C63 AMG,Dodge Charger Hellcat,Cadillac CT5-V,Tesla Model S Plaid,Alfa Romeo Giulia QV;hatch:Honda Civic Type R,Toyota GR Yaris,VW Golf R,Ford Focus RS,Mercedes A45 AMG;suv:Ford F-150 Raptor,Mercedes G-Wagon,Range Rover Sport,Porsche Cayenne Turbo",
 "coupe:Porsche 911 Carrera,Nissan GT-R,Chevy Corvette Z06,BMW M4 CSL,Mercedes-AMG GT,Lexus LC 500,Aston Martin Vantage,Jaguar F-Type R,Dodge Viper,Acura NSX,Maserati GranTurismo;classic:Mazda RX-7 FD,Toyota Supra Mk4,Nissan Skyline R34,Shelby Cobra,1969 Boss 429,DeLorean DMC-12,Datsun 240Z",
 "super:Lamborghini Huracán,Ferrari F40,McLaren 720S,Porsche 911 GT3 RS,Lamborghini Aventador SVJ,Ford GT,Pagani Huayra,Audi R8 V10,Lexus LFA,Porsche Carrera GT",
 "hyper:Bugatti Chiron,McLaren F1,Koenigsegg Jesko;classic:Ferrari 250 GTO"]},
{id:'vapes',name:'Vapes',a:'#8b3fd9',b:'#ff5fa2',h:[275,325,190,300],em:'Gold-Plated Mod',
 g:{juice:'E-Liquid',coil:'Coil',battery:'Power',dispo:'Disposable',pod:'Pod',tank:'Tank',mod:'Mod',cloud:'Cloud'},d:[
 "juice:Cool Mint,Menthol,Classic Tobacco,Vanilla,Strawberry,Grape,Green Apple,Cola,Coffee,Bubblegum,Lemon,Cherry,Watermelon,Banana;coil:Burnt Coil,Stock Coil,Cotton Wick,Spare O-Ring,Drip Tip,Gunked Coil,Dry Hit,Spitback;battery:Dead Battery,Charging Cable,Low Battery Blink,USB-C Port,Battery Wrap,Wall Charger,Micro-USB Cable,Power Button;dispo:Empty Disposable,Gas Station Disposable,Cracked Pod,Lost Vape,Borrowed Vape,Pocket Lint Vape,Blinking Disposable,Cig-A-Like,Starter Kit,Vape Pen",
 "juice:Blue Razz,Mango Ice,Strawberry Kiwi,Peach Ice,Lush Ice,Pink Lemonade,Cotton Candy,Vanilla Custard,Tropical Punch,Sour Apple;dispo:Mint Disposable,5000-Puff Bar,Rechargeable Disposable,Mesh-Coil Disposable;pod:Pod System,Refillable Pod,Mango Pod,Nic Salt Pod,Draw-Activated Pod,Pod Mod;tank:Glass Tank,Bubble Glass,Top-Fill Tank,MTL Tank,Airflow Ring;battery:18650 Cell,21700 Cell,Dual Charger",
 "mod:Box Mod,Dual-Battery Mod,Temp Control Mod,Squonk Mod,Touchscreen Mod,Regulated Mod;tank:Sub-Ohm Tank,RTA,RDA,RDTA,Mesh RDA;coil:Clapton Coil,Alien Coil,Fused Clapton;cloud:Vapor Ring,Jellyfish Trick,Ghost Inhale,Tornado Trick",
 "mod:Custom Mech Mod,Stabilized Wood Mod,DNA Chip Mod,Titanium Tube Mod,Limited-Run Squonker;cloud:Cloud Chaser,Competition Cloud,Triple Ring;juice:Limited-Run Flavour,Reserve Custard",
 "mod:Gold-Plated Mod,One-of-One Engraved Mod;cloud:The Perfect Cloud;pod:Never-Ending Pod"]},
{id:'islam',name:'Islam',a:'#0e6b5c',b:'#c9a227',h:[165,45,200,150,265],em:'Eight-Point Star',
 g:{beads:'Daily Life',palm:'Food',crescent:'Times & Seasons',arch:'Architecture',lantern:'Celebration',pen:'Calligraphy',star:'Geometric Art',mosque:'Mosque',astro:'Golden Age',pillar:'Pillar',kaaba:'Pilgrimage'},d:[
 "beads:Prayer Mat,Tasbih,Kufi Cap,Miswak,Attar,Qibla Compass,Hijab,Thobe,Incense Burner,Wudu Jug;palm:Dates,Iftar Table,Suhoor,Samosa,Lentil Soup,Mint Tea,Qatayef,Baklava,Rose Sherbet,Olive Branch,Honey,Black Seed;crescent:Crescent Moon,Moon Sighting,Friday,Fajr,Dhuhr,Asr,Maghrib,Isha,Muharram,Rajab;arch:Minaret,Dome,Mihrab,Minbar,Courtyard Fountain,Horseshoe Arch,Mashrabiya,Prayer Hall",
 "lantern:Ramadan Lantern,Eid Sweets,Eidi Gift,Henna Night,Eid Prayer,Taraweeh;pen:Kufic Script,Naskh Script,Thuluth Script,Diwani Script,Nastaliq Script,Reed Pen;star:Arabesque,Zellige Tile,Muqarnas,Girih Pattern,Iznik Tile,Eight-Point Star;beads:Wudu,Dua,Dhikr,Sadaqah,Adhan,Jumuah;mosque:Neighbourhood Mosque,Wooden Mosque,Mud-Brick Mosque,Island Mosque",
 "mosque:Blue Mosque,Hassan II Mosque,Sheikh Zayed Mosque,Faisal Mosque,Great Mosque of Djenné,Umayyad Mosque,Great Mosque of Córdoba,Badshahi Mosque,Istiqlal Mosque,Great Mosque of Kairouan;astro:House of Wisdom,Astrolabe,Al-Khwarizmi’s Algebra,Ibn Sina’s Canon,Ibn al-Haytham’s Optics,Al-Jazari’s Clock,Ibn Battuta’s Travels,Al-Qarawiyyin University",
 "crescent:Ramadan,Eid al-Fitr,Eid al-Adha;pillar:Shahada,Salah,Zakat,Sawm;mosque:Al-Aqsa Mosque,Dome of the Rock;kaaba:Umrah",
 "kaaba:The Kaaba,Hajj;mosque:Masjid an-Nabawi;crescent:Laylat al-Qadr"]}
];

const PWR=[[8,39],[30,58],[50,74],[70,89],[90,99]];
T.forEach((t,ti)=>{
  t.i=ti;t.cards=[];
  t.d.forEach((s,ri)=>s.split(';').forEach(g=>{const[k,ns]=g.split(':');ns.split(',').forEach(n=>t.cards.push({n,k,ri,t}))}));
  t.cards.forEach((c,i)=>{c.i=i;c.key=t.id+':'+i;const p=PWR[c.ri];c.pw=p[0]+Math.floor(rng(hash(c.n)+7)()*(p[1]-p[0]+1))});
});
const TOTAL=T.reduce((n,t)=>n+t.cards.length,0);

export { R, TIERS, START, PAY, WAIT, CAP, T, TOTAL }
