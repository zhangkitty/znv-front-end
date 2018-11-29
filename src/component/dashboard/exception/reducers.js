import assign from 'object-assign';
import moment from 'moment';
import * as types from './types';

export const defaultState = {
  rawData:
    { track: [{ coord: [120.13066322374, 30.268018034923], elevation: 111.6 }, { coord: [120.13072464058, 30.26812602625], elevation: 89.6 }, { coord: [120.13009398914, 30.268424197074], elevation: 71.2 }, { coord: [120.12923727763, 30.268663217393], elevation: 67.6 }, { coord: [120.12988112502, 30.268417072372], elevation: 61.9 }, { coord: [120.13071143157, 30.268359939212], elevation: 31.8 }, { coord: [120.12763326899, 30.269332140358], elevation: 37.4 }, { coord: [120.12737287724, 30.269598282251], elevation: 35.7 }, { coord: [120.12752568678, 30.269734588111], elevation: 35.8 }, { coord: [120.1274269774, 30.269905331933], elevation: 38.6 }, { coord: [120.1265342664, 30.270380302422], elevation: 50.4 }, { coord: [120.12630772691, 30.270279109478], elevation: 51.7 }, { coord: [120.125213728, 30.270644624827], elevation: 54.1 }, { coord: [120.1245931855, 30.271185177461], elevation: 72.4 }, { coord: [120.12402322026, 30.270959901357], elevation: 86.7 }, { coord: [120.12365428103, 30.271024881195], elevation: 93.8 }, { coord: [120.12332525492, 30.271216812266], elevation: 103.2 }, { coord: [120.12352236071, 30.271374470295], elevation: 108.7 }, { coord: [120.12336543572, 30.271461904914], elevation: 112.2 }, { coord: [120.12344949772, 30.271589930277], elevation: 115.9 }, { coord: [120.1229399874, 30.271852266379], elevation: 144.7 }, { coord: [120.12256379098, 30.271766807728], elevation: 149.1 }, { coord: [120.1216098094, 30.271194943944], elevation: 162.7 }, { coord: [120.1207357629, 30.270939241784], elevation: 170.1 }, { coord: [120.12028678541, 30.270461086136], elevation: 185.2 }, { coord: [120.11986231124, 30.269460931864], elevation: 179.6 }, { coord: [120.11935846044, 30.269094612349], elevation: 173.9 }, { coord: [120.11812482445, 30.267650592548], elevation: 171.3 }, { coord: [120.11775016491, 30.267068864704], elevation: 178.2 }, { coord: [120.11754804761, 30.266152886203], elevation: 178.4 }, { coord: [120.11740448974, 30.265967716112], elevation: 182.9 }, { coord: [120.11687718254, 30.2658615843], elevation: 179.2 }, { coord: [120.11653378872, 30.265439524281], elevation: 178.9 }, { coord: [120.11612329398, 30.264531073305], elevation: 157.5 }, { coord: [120.11587650685, 30.26320059495], elevation: 151.1 }, { coord: [120.11558899596, 30.26255035637], elevation: 146.6 }, { coord: [120.11522453668, 30.262130670152], elevation: 134.4 }, { coord: [120.11559646612, 30.260853366535], elevation: 138.1 }, { coord: [120.11606515865, 30.260177579454], elevation: 138.9 }, { coord: [120.11604991911, 30.259711306408], elevation: 141.9 }, { coord: [120.11571402561, 30.259245643817], elevation: 143.7 }, { coord: [120.11504392102, 30.25899533352], elevation: 148.7 }, { coord: [120.1146484008, 30.258651101186], elevation: 153.7 }, { coord: [120.11394671666, 30.257334362333], elevation: 193 }, { coord: [120.11284027941, 30.256366900834], elevation: 194.1 }, { coord: [120.11123556423, 30.256060671464], elevation: 224.3 }, { coord: [120.11050864959, 30.255443154503], elevation: 238.2 }, { coord: [120.10944986188, 30.255353315903], elevation: 252.5 }, { coord: [120.10883001126, 30.255164998537], elevation: 252.1 }, { coord: [120.10826699785, 30.254718753977], elevation: 250.4 }, { coord: [120.10710581699, 30.254240556307], elevation: 247.6 }, { coord: [120.10491876437, 30.254470111473], elevation: 270.6 }, { coord: [120.10433113018, 30.254265435991], elevation: 272.8 }, { coord: [120.10392036393, 30.253705576897], elevation: 271.9 }, { coord: [120.1038550691, 30.253197321047], elevation: 292.3 }, { coord: [120.10347701697, 30.252952433512], elevation: 303.3 }, { coord: [120.10344884233, 30.252576416959], elevation: 298.2 }, { coord: [120.10320137511, 30.252476247021], elevation: 301.8 }, { coord: [120.10287824552, 30.251760143264], elevation: 319.2 }, { coord: [120.1019234661, 30.250997572323], elevation: 322.3 }, { coord: [120.1009713742, 30.250986105614], elevation: 312.5 }, { coord: [120.10041941882, 30.249016622212], elevation: 305.6 }, { coord: [120.09984169392, 30.248547593684], elevation: 331.2 }, { coord: [120.09898440695, 30.248207567171], elevation: 359.1 }, { coord: [120.09842797356, 30.247406161194], elevation: 344.2 }, { coord: [120.0983709459, 30.246812226502], elevation: 337.9 }, { coord: [120.09743933995, 30.246098382239], elevation: 334.2 }, { coord: [120.09704297822, 30.245261957777], elevation: 314.1 }, { coord: [120.09623807355, 30.244618028515], elevation: 303.8 }, { coord: [120.09590149152, 30.244159070226], elevation: 299.7 }, { coord: [120.09526850439, 30.243995684606], elevation: 314.9 }, { coord: [120.0950438765, 30.243721192051], elevation: 321.8 }, { coord: [120.09459774812, 30.243598810686], elevation: 330 }, { coord: [120.09421877365, 30.242872373479], elevation: 310.4 }, { coord: [120.09345169258, 30.242553546061], elevation: 323 }, { coord: [120.09303123819, 30.242207345497], elevation: 331.9 }, { coord: [120.09310605743, 30.24142188319], elevation: 343.3 }, { coord: [120.09267479524, 30.240794954373], elevation: 356.7 }, { coord: [120.09274361331, 30.240208534118], elevation: 337.7 }, { coord: [120.09251224559, 30.239673521493], elevation: 302.9 }, { coord: [120.09270185317, 30.239461876654], elevation: 291.3 }, { coord: [120.09190561359, 30.238040865337], elevation: 248.8 }, { coord: [120.0919838469, 30.23738054204], elevation: 240.2 }, { coord: [120.09249891958, 30.236974389597], elevation: 229.1 }, { coord: [120.09299181361, 30.236232795633], elevation: 248.9 }, { coord: [120.09266752814, 30.234333480159], elevation: 274.7 }, { coord: [120.09198321402, 30.233863649116], elevation: 252.1 }, { coord: [120.09162113102, 30.233204745501], elevation: 235.7 }, { coord: [120.0909794364, 30.23271280489], elevation: 246.1 }, { coord: [120.09014521089, 30.231549553149], elevation: 288.1 }, { coord: [120.09073339721, 30.231235103808], elevation: 285.5 }, { coord: [120.09147171441, 30.231320704922], elevation: 285.5 }, { coord: [120.09295625092, 30.230990260101], elevation: 282.2 }, { coord: [120.09388751648, 30.23107469272], elevation: 279.3 }, { coord: [120.09418302079, 30.23089276949], elevation: 275.8 }, { coord: [120.09470870187, 30.230156839127], elevation: 289.9 }, { coord: [120.09512078063, 30.229890870228], elevation: 298.1 }, { coord: [120.09625839809, 30.229791134268], elevation: 316.7 }, { coord: [120.09643189561, 30.228813371152], elevation: 332.6 }, { coord: [120.09659868677, 30.22872727242], elevation: 346.9 }, { coord: [120.09648449297, 30.228301056135], elevation: 366.9 }, { coord: [120.09691264837, 30.228255994674], elevation: 371.7 }, { coord: [120.09735738999, 30.227954859793], elevation: 352.1 }, { coord: [120.09799232878, 30.227866758755], elevation: 343.2 }, { coord: [120.09929746711, 30.22697052806], elevation: 354.6 }, { coord: [120.09891590168, 30.2263336749], elevation: 356.6 }, { coord: [120.09902313122, 30.225891572485], elevation: 372.2 }, { coord: [120.09892801603, 30.225169217969], elevation: 408.9 }, { coord: [120.10044005655, 30.22471455627], elevation: 426.5 }, { coord: [120.10090537635, 30.224310251113], elevation: 409.2 }, { coord: [120.10182413902, 30.224032737211], elevation: 378.6 }, { coord: [120.102359693, 30.223547881447], elevation: 346.3 }, { coord: [120.10313762236, 30.223344795906], elevation: 314.9 }, { coord: [120.10411520159, 30.221486068177], elevation: 305.2 }, { coord: [120.10418009927, 30.220749306901], elevation: 321.1 }, { coord: [120.10464209465, 30.220188160927], elevation: 332.2 }, { coord: [120.10500509443, 30.220112460403], elevation: 333.2 }, { coord: [120.10512093654, 30.219944342663], elevation: 330.3 }, { coord: [120.1050036496, 30.219629557638], elevation: 327.6 }, { coord: [120.10423646392, 30.218934612517], elevation: 310.9 }, { coord: [120.10389338347, 30.218339682422], elevation: 303.8 }, { coord: [120.10395484068, 30.216650192256], elevation: 267.6 }, { coord: [120.1044518049, 30.215423492658], elevation: 259.9 }, { coord: [120.10490206828, 30.215208263936], elevation: 275.9 }, { coord: [120.10566924645, 30.214518153896], elevation: 276.2 }, { coord: [120.1061936621, 30.213774952524], elevation: 287.5 }, { coord: [120.10657974649, 30.213497559545], elevation: 281.4 }, { coord: [120.10667247117, 30.21310846099], elevation: 283 }, { coord: [120.10612939042, 30.212082063215], elevation: 291.7 }, { coord: [120.10534497049, 30.211900480954], elevation: 271.9 }, { coord: [120.10519752262, 30.211744994023], elevation: 284.4 }, { coord: [120.10543156738, 30.211247685146], elevation: 295.5 }, { coord: [120.10535169433, 30.21093900831], elevation: 301.1 }, { coord: [120.10436312646, 30.209984362187], elevation: 321.5 }, { coord: [120.10461605974, 30.209608719838], elevation: 324.5 }, { coord: [120.10464139185, 30.209012146792], elevation: 324.6 }, { coord: [120.10352248958, 30.208181332911], elevation: 346.5 }, { coord: [120.10334423688, 30.207566802569], elevation: 353.5 }, { coord: [120.10381013264, 30.206925135944], elevation: 331.6 }, { coord: [120.10375832069, 30.20628275133], elevation: 323.3 }, { coord: [120.10494263235, 30.205330377978], elevation: 326 }, { coord: [120.10482879838, 30.205056924801], elevation: 329.3 }, { coord: [120.10502075348, 30.20427797957], elevation: 321.5 }, { coord: [120.10564841603, 30.203123681123], elevation: 342.2 }, { coord: [120.10610657682, 30.202697090527], elevation: 342.1 }, { coord: [120.10609933835, 30.201817932723], elevation: 345.8 }, { coord: [120.10657653398, 30.201284968505], elevation: 343.7 }, { coord: [120.10666375565, 30.200967164051], elevation: 344.2 }, { coord: [120.10698477551, 30.201260134181], elevation: 347.6 }, { coord: [120.10752025734, 30.201293917893], elevation: 342 }, { coord: [120.10905441982, 30.201153461294], elevation: 296 }, { coord: [120.11013134771, 30.200590684829], elevation: 269.3 }, { coord: [120.11077102942, 30.20043558742], elevation: 263.6 }, { coord: [120.11153856525, 30.20077363914], elevation: 236.9 }, { coord: [120.11276898607, 30.200612626923], elevation: 223.3 }, { coord: [120.11394059025, 30.200273237529], elevation: 198.1 }, { coord: [120.11444772692, 30.199639436949], elevation: 169.7 }, { coord: [120.11541255243, 30.199203341098], elevation: 130 }, { coord: [120.11575422499, 30.199289262355], elevation: 125.1 }, { coord: [120.11603267154, 30.19962941145], elevation: 125.1 }, { coord: [120.11601072436, 30.200015409263], elevation: 125.1 }, { coord: [120.11619504278, 30.200325575311], elevation: 125.1 }, { coord: [120.11683551144, 30.20084526153], elevation: 125.1 }, { coord: [120.11837778543, 30.20143510978], elevation: 125.1 }, { coord: [120.11876829885, 30.201698424749], elevation: 125.1 }, { coord: [120.11896032388, 30.202018776966], elevation: 125.1 }, { coord: [120.12022875718, 30.202143767622], elevation: 125.1 }, { coord: [120.12009352205, 30.202257402825], elevation: 125.1 }, { coord: [120.12013245777, 30.203169492895], elevation: 125.1 }, { coord: [120.11900215908, 30.20477553842], elevation: 125.1 }, { coord: [120.11960336128, 30.205700492652], elevation: 125.1 }, { coord: [120.11958729391, 30.205866651892], elevation: 125.1 }, { coord: [120.11879114563, 30.206414690186], elevation: 125.1 }, { coord: [120.11937978243, 30.207078220883], elevation: 125.1 }, { coord: [120.11974206213, 30.208468003688], elevation: 125.1 }, { coord: [120.1196988289, 30.208898454452], elevation: 125.1 }, { coord: [120.11913827924, 30.20956436601], elevation: 125.1 }, { coord: [120.11925855453, 30.211147113247], elevation: 125.1 }, { coord: [120.12001350347, 30.212739155537], elevation: 125.1 }, { coord: [120.12103261259, 30.214028301088], elevation: 125.1 }, { coord: [120.1214028801, 30.214835275925], elevation: 125.1 }, { coord: [120.12203554686, 30.215022088788], elevation: 125.1 }, { coord: [120.12274743049, 30.215582875667], elevation: 125.1 }, { coord: [120.1234779052, 30.215545629456], elevation: 125.1 }, { coord: [120.12376252143, 30.21625712333], elevation: 125.1 }, { coord: [120.12508945726, 30.216244236652], elevation: 125.1 }, { coord: [120.12594810318, 30.216454939118], elevation: 125.1 }, { coord: [120.1267621697, 30.216308485222], elevation: 125.1 }, { coord: [120.12748550003, 30.216431932496], elevation: 125.1 }, { coord: [120.12867362519, 30.217252716215], elevation: 125.1 }, { coord: [120.1288432921, 30.217698562578], elevation: 125.1 }, { coord: [120.12910524115, 30.217816714594], elevation: 125.1 }, { coord: [120.12939329704, 30.218250757045], elevation: 125.1 }, { coord: [120.13038239171, 30.218385444585], elevation: 125.1 }, { coord: [120.13107738758, 30.219042511804], elevation: 125.1 }, { coord: [120.13227688955, 30.219260960379], elevation: 125.1 }, { coord: [120.13280968649, 30.219527436819], elevation: 125.1 }, { coord: [120.13311495881, 30.218694033132], elevation: 125.1 }, { coord: [120.13283941901, 30.218401994637], elevation: 125.1 }, { coord: [120.13245110037, 30.217289684916], elevation: 125.1 }, { coord: [120.13318193523, 30.216808523242], elevation: 125.1 }, { coord: [120.1343575302, 30.216530549157], elevation: 125.1 }, { coord: [120.13655765978, 30.216920178246], elevation: 125.1 }, { coord: [120.13907411514, 30.215956332584], elevation: 125.1 }, { coord: [120.141057268, 30.215605288262], elevation: 125.1 }, { coord: [120.14130792906, 30.215727863097], elevation: 125.1 }, { coord: [120.14144210484, 30.216041293836], elevation: 125.1 }, { coord: [120.14171517325, 30.217886880338], elevation: 125.1 }, { coord: [120.14229653901, 30.219501694039], elevation: 125.1 }, { coord: [120.14342415945, 30.219414273571], elevation: 125.1 }, { coord: [120.14402049023, 30.219618950536], elevation: 125.1 }, { coord: [120.14449193829, 30.220099320579], elevation: 125.1 }, { coord: [120.14465993844, 30.220007228523], elevation: 125.1 }, { coord: [120.14508289246, 30.220155864153], elevation: 125.1 }, { coord: [120.14562780525, 30.219908298006], elevation: 125.1 }, { coord: [120.14591616185, 30.219514413335], elevation: 125.1 }, { coord: [120.14626000036, 30.218366254125], elevation: 125.1 }, { coord: [120.14827557627, 30.218537763182], elevation: 125.1 }, { coord: [120.14859490874, 30.218753102592], elevation: 125.1 }, { coord: [120.14905589503, 30.21870714305], elevation: 125.1 }, { coord: [120.1495223229, 30.218444530857], elevation: 125.1 }, { coord: [120.14977517732, 30.218428413527], elevation: 125.1 }, { coord: [120.14967546497, 30.218540852731], elevation: 125.1 }, { coord: [120.14987656517, 30.218631436045], elevation: 125.1 }, { coord: [120.15153196716, 30.218494048417], elevation: 125.1 }, { coord: [120.15387799887, 30.219146142233], elevation: 125.1 }, { coord: [120.15479405115, 30.220591526372], elevation: 125.1 }, { coord: [120.15480938993, 30.220897520708], elevation: 125.1 }, { coord: [120.15512065986, 30.220957343469], elevation: 125.1 }, { coord: [120.15509321618, 30.221272007918], elevation: 125.1 }, { coord: [120.15547426502, 30.221339468563], elevation: 125.1 }, { coord: [120.15533614328, 30.221561531091], elevation: 125.1 }, { coord: [120.15556542241, 30.221766937025], elevation: 125.1 }, { coord: [120.1558455742, 30.221649365339], elevation: 125.1 }, { coord: [120.15660389357, 30.221874671957], elevation: 125.1 }, { coord: [120.15700135185, 30.222101602106], elevation: 125.1 }, { coord: [120.15718379377, 30.222412874793], elevation: 125.1 }, { coord: [120.15745498329, 30.222403716213], elevation: 125.1 }, { coord: [120.15814038743, 30.222986902863], elevation: 125.1 }, { coord: [120.1586073049, 30.223091304372], elevation: 125.1 }, { coord: [120.15904840051, 30.223392899217], elevation: 125.1 }, { coord: [120.16042083202, 30.222451331745], elevation: 125.1 }, { coord: [120.16163201495, 30.221933837229], elevation: 125.1 }, { coord: [120.16228412733, 30.221964130791], elevation: 125.1 }, { coord: [120.16345331499, 30.223364945921], elevation: 125.1 }, { coord: [120.16375074144, 30.22501113165], elevation: 125.1 }, { coord: [120.16447578645, 30.225651052487], elevation: 125.1 }, { coord: [120.16487521282, 30.226739751105], elevation: 125.1 }, { coord: [120.16566551427, 30.227219937658], elevation: 125.1 }, { coord: [120.16624463535, 30.228989612975], elevation: 125.1 }, { coord: [120.16659930454, 30.229432575097], elevation: 125.1 }, { coord: [120.16639081116, 30.230062714225], elevation: 125.1 }, { coord: [120.16651354086, 30.230285633812], elevation: 125.1 }, { coord: [120.16647307342, 30.230835985296], elevation: 125.1 }, { coord: [120.16615443409, 30.231659509602], elevation: 125.1 }, { coord: [120.1662190393, 30.232434158899], elevation: 125.1 }, { coord: [120.16637095369, 30.232678301792], elevation: 125.1 }, { coord: [120.16701800946, 30.232870227338], elevation: 125.1 }, { coord: [120.16718788367, 30.233108446787], elevation: 125.1 }, { coord: [120.16658883478, 30.233991222252], elevation: 125.1 }, { coord: [120.16653846182, 30.23466276487], elevation: 125.1 }, { coord: [120.16664909592, 30.234716860657], elevation: 125.1 }, { coord: [120.16701776253, 30.234238530277], elevation: 125.1 }, { coord: [120.16729818646, 30.234104357919], elevation: 125.1 }, { coord: [120.16818982066, 30.233753138061], elevation: 125.1 }, { coord: [120.16900530919, 30.233653934181], elevation: 125.1 }, { coord: [120.16886964156, 30.233907215486], elevation: 125.1 }, { coord: [120.16844869214, 30.233954290117], elevation: 125.1 }, { coord: [120.16813462629, 30.234188113231], elevation: 125.1 }, { coord: [120.16752412129, 30.235558088986], elevation: 125.1 }, { coord: [120.16769634485, 30.235671237997], elevation: 125.1 }, { coord: [120.1690004115, 30.235583967415], elevation: 125.1 }, { coord: [120.17014349959, 30.236001137103], elevation: 125.1 }, { coord: [120.17004426293, 30.236151785948], elevation: 125.1 }, { coord: [120.1702477593, 30.236295678227], elevation: 125.1 }, { coord: [120.1701003212, 30.236729736172], elevation: 125.1 }, { coord: [120.1702168701, 30.237943651514], elevation: 125.1 }, { coord: [120.17130218739, 30.238503044292], elevation: 125.1 }, { coord: [120.17201339136, 30.239081616371], elevation: 125.1 }, { coord: [120.17203091957, 30.239479710284], elevation: 125.1 }, { coord: [120.17125369777, 30.240441854997], elevation: 125.1 }, { coord: [120.17107251863, 30.241103937116], elevation: 125.1 }, { coord: [120.17139446097, 30.241859329906], elevation: 125.1 }, { coord: [120.17350844593, 30.243501286408], elevation: 125.1 }, { coord: [120.17299354663, 30.243681437796], elevation: 125.1 }, { coord: [120.17230173496, 30.244159254102], elevation: 125.1 }, { coord: [120.17208385245, 30.245339943922], elevation: 125.1 }, { coord: [120.17134628034, 30.245628888047], elevation: 125.1 }, { coord: [120.17172079439, 30.245618470737], elevation: 125.1 }, { coord: [120.17097155157, 30.245719720968], elevation: 125.1 }], waypoints: [{ coord: [120.1522067889, 30.220401316541], elevation: -1, name: '玉皇山' }, { coord: [120.13332893084, 30.267673182153], elevation: -1, name: '浙大玉泉校区（起点）' }, { coord: [120.10398230099, 30.251539563241], elevation: -1, name: '北高峰' }, { coord: [120.09936699229, 30.24795454021], elevation: -1, name: '美女峰' }, { coord: [120.0925855886, 30.236972469482], elevation: -1, name: '石人亭' }, { coord: [120.09026835912, 30.231559628359], elevation: -1, name: '天门山岔口' }, { coord: [120.09904301079, 30.225125529525], elevation: -1, name: '天门山' }, { coord: [120.10656174847, 30.201949222269], elevation: -1, name: '五云山' }, { coord: [120.16772818951, 30.233391579518], elevation: -1, name: '万松书院' }, { coord: [120.13251548293, 30.217214434177], elevation: -1, name: '贵人阁' }, { coord: [120.1410499159, 30.215717416623], elevation: -1, name: '跑虎' }, { coord: [120.17289023966, 30.245117012844], elevation: -1, name: '吴山广场（结束）' }] },


  ready: false,
  cityTree: [],
  clickedId: '0',
  node: null,

  TabValue: 0,

  onlineRate: {
    headTable: {
      dataSource: [],
    },
    trend: {
      dateValue: [
        moment().subtract(1, 'days').toDate(),
        moment().toDate(),
      ],
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      dataSource: [],
      showType: [
        { value: 0, name: '折线图' },
        { value: 1, name: '表格' },
      ],
      choosedShowType: 0,
    },
    detailData: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      choosedData: moment().format('YYYY-MM-DD'),
      showType: [
        { value: 0, name: '柱状图' },
        { value: 1, name: '表格' },
      ],
      choosedShowType: 0,
      dataSource: [],
    },
    deviceTable: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      dataSource: [],
      choosedData: moment().format('YYYY-MM-DD'),
      showType: [
        { value: 1, name: '离线时间超长' },
        { value: 2, name: '频繁离线' },
        { value: 3, name: '稳定在线' },
        { value: 4, name: '云运维离线设备' },
      ],
      chooseType: 1,
    },
  },
  staffAttendance: {
    ready: true,
    headTable: {
      dataSource: [],
    },
    trend: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      dateValue: [
        moment().subtract(30, 'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      choosedImensiond: 0,
      dataSource: [],
      showType: [

      ],
    },
    detailData: {
      imensiond: [
        { value: 0, name: '按天', disabled: false },
        // { value: 1, name: '按周', disabled: true },
        { value: 2, name: '按月', disabled: true },
        { value: 3, name: '按季', disabled: true },
      ],
      choosedImensiond: 0,
      choosedData: moment().format('YYYY-MM-DD'),
      showType: [
        { value: 1, name: '地图' },
        { value: 2, name: '柱状图' },
      ],
      chooseType: 1,
      dataSource: [],
      dataSourcePerson: [], // 人员轨迹
      dataSourceTask: [], // 任务轨迹查询
    },
  },
};

const transfrom = data => data.map(v => assign({}, v, {
  id: `${v.level}.${v.areaCode}`,
  children: (function (a) {
    if (a.userInfo === undefined) {
      return null;
    }
    if (a.userInfo === undefined || a.userInfo === '') {
      return transfrom(a.cityList);
    }
    a.userInfo.split(',').map(t => a.cityList.push({
      areaCode: t.split(':')[0],
      areaName: t.split(':')[1],
      cityList: [],
      level: `${a.level}.${a.areaCode}`,
      person: true,
    }));
    if (a.cityList.length > 0) {
      return transfrom(a.cityList);
    }
    return null;
  }(v)),
}));

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.init:
      return defaultState;
    case types.changeValue:
      return assign({}, state, {
        [action.key]: action.value,
      });
    case types.initSuccess:
      return assign({}, state, {
        cityTree: [{
          areaName: '全国',
          id: '0',
          children: transfrom((action.data)[0].data),
        }],
        node: {
          areaName: '全国',
          id: '0',
        },
        onlineRate: assign({}, state.onlineRate, {
          headTable: assign({}, state.onlineRate.headTable, {
            dataSource: action.data[1].data.list,
          }),
          trend: assign({}, state.onlineRate.trend, {
            dataSource: action.data[2].data.list,
          }),
          detailData: assign({}, state.onlineRate.detailData, {
            dataSource: action.data[3].data.list,
          }),
        }),
        ready: true,
      });

    case types.getExceptionRateSuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          headTable: assign({}, state.onlineRate.headTable, {
            dataSource: action.data[0].data.list,
          }),
          trend: assign({}, state.onlineRate.trend, {
            dataSource: action.data[1].data.list,
          }),
          detailData: assign({}, state.onlineRate.detailData, {
            dataSource: action.data[2].data.list,
          }),
          deviceTable: assign({}, state.onlineRate.deviceTable, {
            dataSource: action.data[3] && action.data[3].data.list,
          }),
        }),
      });

    case types.changeDetailDay:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          detailData: assign({}, state.onlineRate.detailData, {
            choosedData: action.props.onlineRate.detailData.choosedData,
          }),
        }),
      });


    case types.changeDetailDaySuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          detailData: assign({}, state.onlineRate.detailData, {
            dataSource: action.data.data.list,
          }),
        }),
      });

    case types.changeTrendDays:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          trend: assign({}, state.onlineRate.trend, {
            dateValue: action.props.onlineRate.trend.dateValue,
          }),
        }),
      });

    case types.changeTrendDaysSuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          trend: assign({}, state.onlineRate.trend, {
            dataSource: action.data.data.list,
          }),
        }),
      });

    case types.getDevicedetail:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          deviceTable: assign({}, state.onlineRate.deviceTable, {
            chooseType: action.props.onlineRate.deviceTable.chooseType,
            choosedData: action.props.onlineRate.deviceTable.choosedData,
          }),
        }),
      });

    case types.getDevicedetailSuccess:
      return assign({}, state, {
        onlineRate: assign({}, state.onlineRate, {
          deviceTable: assign({}, state.onlineRate.deviceTable, {
            dataSource: action.data.list,
          }),
        }),
      });

    case types.staffAttendanceInit:
      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          ready: false,
        }),
      });

    case types.staffAttendanceInitSuccess:
      const len = state.clickedId.split('.').length;
      if (len === 1) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            ready: true,
            headTable: assign({}, state.staffAttendance.headTable, {
              dataSource: action.data[0].data.list,
            }),
            trend: assign({}, state.staffAttendance.trend, {
              dataSource: action.data[1].data.list,
            }),
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data[2].data.list,
            }),
          }),
        });
      }
      if (len === 3) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            ready: true,
            headTable: assign({}, state.staffAttendance.headTable, {
              dataSource: action.data[0].data.list,
            }),
            trend: assign({}, state.staffAttendance.trend, {
              dataSource: action.data[1].data.list,
            }),
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data[2].data.list,
            }),
          }),
        });
      }
      if (len > 3) {
        return assign({}, state, {

          staffAttendance: assign({}, state.staffAttendance, {
            ready: true,
            headTable: assign({}, state.staffAttendance.headTable, {
              dataSource: action.data[0].data.list,
            }),
            trend: assign({}, state.staffAttendance.trend, {
              dataSource: action.data[1].data.list,
            }),
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSourcePerson: action.data[2].data.list,
              dataSourcePersonTask: action.data[3].data.list,
            }),
          }),
        });
      }


    case types.changeTrendDaysInTab1:

      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          trend: assign({}, state.staffAttendance.trend, {
            dateValue: action.props.staffAttendance.trend.dateValue,
          }),
        }),
      });


    case types.changeTrendDaysInTab1Success:

      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          trend: assign({}, state.staffAttendance.trend, {
            dataSource: action.data.data.list || [],
          }),
        }),
      });

    case types.changeDetailDayTab1:
      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          detailData: assign({}, state.staffAttendance.detailData, {
            choosedData: action.props.staffAttendance.detailData.choosedData,
          }),
        }),
      });


    case types.changeDetailDayTab1Success:
      if (state.clickedId.split('.').length === 1) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data.data.list,
            }),
          }),
        });
      }
      if (state.clickedId.split('.').length === 3) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSource: action.data.data.list,
            }),
          }),
        });
      }
      if (state.clickedId.split('.').length > 3) {
        return assign({}, state, {
          staffAttendance: assign({}, state.staffAttendance, {
            detailData: assign({}, state.staffAttendance.detailData, {
              dataSourcePerson: action.data[0].data.list,
              dataSourceTask: action.data[1].data.list,
            }),
          }),
        });
      }


    case types.changeDetailTypeTab1:
      return assign({}, state, {
        staffAttendance: assign({}, state.staffAttendance, {
          detailData: assign({}, state.staffAttendance.detailData, {
            chooseType: action.props.staffAttendance.detailData.chooseType,
          }),
        }),
      });


    default:
      return state;
  }
};

export default reducer;
