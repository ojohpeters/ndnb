<?php

namespace App\Http\Controllers;

use App\Models\Biography;
use App\Models\Education;
use App\Models\Occupation;
use Illuminate\Support\Str;
use App\Http\Requests\StoreBiographyRequest;
use App\Http\Requests\UpdateBiographyRequest;
use App\Services\NotificationService;

class BiographyController extends Controller
{
    public $regions = [
        'North Central' => ['Abuja', 'Benue', 'Kogi', 'Kwara', 'Nassarawa', 'Niger', 'Plateau'],
        'North East' => ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
        'North West' => ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
        'South East' => ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
        'South South' => ['AkwaIbom', 'Bayelsa', 'CrossRiver', 'Delta', 'Edo', 'Rivers'],
        'South West' => ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
    ];

    public $states_and_lgas = [
        [
            "code" => "FC",
            "name" => "Abuja",
            "lgas" => [
                "Abuja",
                "Kwali",
                "Kuje",
                "Gwagwalada",
                "Bwari",
                "Abaji",
            ],
        ],
        [
            "code" => "AB",
            "name" => "Abia",
            "lgas" => [
                "Aba North",
                "Aba South",
                "Arochukwu",
                "Bende",
                "Ikawuno",
                "Ikwuano",
                "Isiala-Ngwa North",
                "Isiala-Ngwa South",
                "Isuikwuato",
                "Umu Nneochi",
                "Obi Ngwa",
                "Obioma Ngwa",
                "Ohafia",
                "Ohaozara",
                "Osisioma",
                "Ugwunagbo",
                "Ukwa West",
                "Ukwa East",
                "Umuahia North",
                "Umuahia South",
            ],
        ],
        [
            "code" => "AD",
            "name" => "Adamawa",
            "lgas" => [
                "Demsa",
                "Fufore",
                "Ganye",
                "Girei",
                "Gombi",
                "Guyuk",
                "Hong",
                "Jada",
                "Lamurde",
                "Madagali",
                "Maiha",
                "Mayo-Belwa",
                "Michika",
                "Mubi-North",
                "Mubi-South",
                "Numan",
                "Shelleng",
                "Song",
                "Toungo",
                "Yola North",
                "Yola South",
            ],
        ],
        [
            "code" => "AK",
            "name" => "AkwaIbom",
            "lgas" => [
                "Abak",
                "Eastern-Obolo",
                "Eket",
                "Esit-Eket",
                "Essien-Udim",
                "Etim-Ekpo",
                "Etinan",
                "Ibeno",
                "Ibesikpo-Asutan",
                "Ibiono-Ibom",
                "Ika",
                "Ikono",
                "Ikot-Abasi",
                "Ikot-Ekpene",
                "Ini",
                "Itu",
                "Mbo",
                "Mkpat-Enin",
                "Nsit-Atai",
                "Nsit-Ibom",
                "Nsit-Ubium",
                "Obot-Akara",
                "Okobo",
                "Onna",
                "Oron",
                "Oruk Anam",
                "Udung-Uko",
                "Ukanafun",
                "Urue-Offong/Oruko",
                "Uruan",
                "Uyo",
            ],
        ],
        [
            "code" => "AN",
            "name" => "Anambra",
            "lgas" => [
                "Aguata",
                "Anambra East",
                "Anambra West",
                "Anaocha",
                "Awka North",
                "Awka South",
                "Ayamelum",
                "Dunukofia",
                "Ekwusigo",
                "Idemili-North",
                "Idemili-South",
                "Ihiala",
                "Njikoka",
                "Nnewi-North",
                "Nnewi-South",
                "Ogbaru",
                "Onitsha-North",
                "Onitsha-South",
                "Orumba-North",
                "Orumba-South",
            ],
        ],
        [
            "code" => "BA",
            "name" => "Bauchi",
            "lgas" => [
                "Alkaleri",
                "Bauchi",
                "Bogoro",
                "Damban",
                "Darazo",
                "Dass",
                "Gamawa",
                "Ganjuwa",
                "Giade",
                "Itas Gadau",
                "Jama'Are",
                "Katagum",
                "Kirfi",
                "Misau",
                "Ningi",
                "Shira",
                "Tafawa-Balewa",
                "Toro",
                "Warji",
                "Zaki",
            ],
        ],
        [
            "code" => "BY",
            "name" => "Bayelsa",
            "lgas" => [
                "Brass",
                "Ekeremor",
                "Kolokuma Opokuma",
                "Nembe",
                "Ogbia",
                "Sagbama",
                "Southern-Ijaw",
                "Yenagoa",
            ],
        ],
        [
            "code" => "BE",
            "name" => "Benue",
            "lgas" => [
                "Ado",
                "Agatu",
                "Apa",
                "Buruku",
                "Gboko",
                "Guma",
                "Gwer-East",
                "Gwer-West",
                "Katsina-Ala",
                "Konshisha",
                "Kwande",
                "Logo",
                "Makurdi",
                "Ogbadibo",
                "Ohimini",
                "Oju",
                "Okpokwu",
                "Otukpo",
                "Tarka",
                "Ukum",
                "Ushongo",
                "Vandeikya",
            ],
        ],
        [
            "code" => "BO",
            "name" => "Borno",
            "lgas" => [
                "Abadam",
                "Askira-Uba",
                "Bama",
                "Bayo",
                "Biu",
                "Chibok",
                "Damboa",
                "Dikwa",
                "Gubio",
                "Guzamala",
                "Gwoza",
                "Hawul",
                "Jere",
                "Kaga",
                "Kala Balge",
                "Konduga",
                "Kukawa",
                "Kwaya-Kusar",
                "Mafa",
                "Magumeri",
                "Maiduguri",
                "Marte",
                "Mobbar",
                "Monguno",
                "Ngala",
                "Nganzai",
                "Shani",
            ],
        ],
        [
            "code" => "CR",
            "name" => "CrossRiver",
            "lgas" => [
                "Abi",
                "Akamkpa",
                "Akpabuyo",
                "Bakassi",
                "Bekwarra",
                "Biase",
                "Boki",
                "Calabar-Municipal",
                "Calabar-South",
                "Etung",
                "Ikom",
                "Obanliku",
                "Obubra",
                "Obudu",
                "Odukpani",
                "Ogoja",
                "Yakurr",
                "Yala",
            ],
        ],
        [
            "code" => "DE",
            "name" => "Delta",
            "lgas" => [
                "Aniocha North",
                "Aniocha-North",
                "Aniocha-South",
                "Bomadi",
                "Burutu",
                "Ethiope-East",
                "Ethiope-West",
                "Ika-North-East",
                "Ika-South",
                "Isoko-North",
                "Isoko-South",
                "Ndokwa-East",
                "Ndokwa-West",
                "Okpe",
                "Oshimili-North",
                "Oshimili-South",
                "Patani",
                "Sapele",
                "Udu",
                "Ughelli-North",
                "Ughelli-South",
                "Ukwuani",
                "Uvwie",
                "Warri South-West",
                "Warri North",
                "Warri South",
            ],
        ],
        [
            "code" => "EB",
            "name" => "Ebonyi",
            "lgas" => [
                "Abakaliki",
                "Afikpo-North",
                "Afikpo South (Edda)",
                "Ebonyi",
                "Ezza-North",
                "Ezza-South",
                "Ikwo",
                "Ishielu",
                "Ivo",
                "Izzi",
                "Ohaukwu",
                "Onicha",
            ],
        ],
        [
            "code" => "ED",
            "name" => "Edo",
            "lgas" => [
                "Akoko Edo",
                "Egor",
                "Esan-Central",
                "Esan-North-East",
                "Esan-South-East",
                "Esan-West",
                "Etsako-Central",
                "Etsako-East",
                "Etsako-West",
                "Igueben",
                "Ikpoba-Okha",
                "Oredo",
                "Orhionmwon",
                "Ovia-North-East",
                "Ovia-South-West",
                "Owan East",
                "Owan-West",
                "Uhunmwonde",
            ],
        ],
        [
            "code" => "EK",
            "name" => "Ekiti",
            "lgas" => [
                "Ado-Ekiti",
                "Efon",
                "Ekiti-East",
                "Ekiti-South-West",
                "Ekiti-West",
                "Emure",
                "Gbonyin",
                "Ido-Osi",
                "Ijero",
                "Ikere",
                "Ikole",
                "Ilejemeje",
                "Irepodun Ifelodun",
                "Ise-Orun",
                "Moba",
                "Oye",
            ],
        ],
        [
            "code" => "EN",
            "name" => "Enugu",
            "lgas" => [
                "Aninri",
                "Awgu",
                "Enugu-East",
                "Enugu-North",
                "Enugu-South",
                "Ezeagu",
                "Igbo-Etiti",
                "Igbo-Eze-North",
                "Igbo-Eze-South",
                "Isi-Uzo",
                "Nkanu-East",
                "Nkanu-West",
                "Nsukka",
                "Oji-River",
                "Udenu",
                "Udi",
                "Uzo-Uwani",
            ],
        ],
        [
            "code" => "GO",
            "name" => "Gombe",
            "lgas" => [
                "Akko",
                "Balanga",
                "Billiri",
                "Dukku",
                "Funakaye",
                "Gombe",
                "Kaltungo",
                "Kwami",
                "Nafada",
                "Shongom",
                "Yamaltu Deba",
            ],
        ],
        [
            "code" => "IM",
            "name" => "Imo",
            "lgas" => [
                "Aboh-Mbaise",
                "Ahiazu-Mbaise",
                "Ehime-Mbano",
                "Ezinihitte",
                "Ideato-North",
                "Ideato-South",
                "Ihitte Uboma",
                "Ikeduru",
                "Isiala-Mbano",
                "Isu",
                "Mbaitoli",
                "Ngor-Okpala",
                "Njaba",
                "Nkwerre",
                "Nwangele",
                "Obowo",
                "Oguta",
                "Ohaji-Egbema",
                "Okigwe",
                "Onuimo",
                "Orlu",
                "Orsu",
                "Oru-East",
                "Oru-West",
                "Owerri-Municipal",
                "Owerri-North",
                "Owerri-West",
            ],
        ],
        [
            "code" => "JI",
            "name" => "Jigawa",
            "lgas" => [
                "Auyo",
                "Babura",
                "Biriniwa",
                "Birnin-Kudu",
                "Buji",
                "Dutse",
                "Gagarawa",
                "Garki",
                "Gumel",
                "Guri",
                "Gwaram",
                "Gwiwa",
                "Hadejia",
                "Jahun",
                "Kafin-Hausa",
                "Kaugama",
                "Kazaure",
                "Kiri kasama",
                "Maigatari",
                "Malam Madori",
                "Miga",
                "Ringim",
                "Roni",
                "Sule-Tankarkar",
                "Taura",
                "Yankwashi",
            ],
        ],
        [
            "code" => "KD",
            "name" => "Kaduna",
            "lgas" => [
                "Birnin-Gwari",
                "Chikun",
                "Giwa",
                "Igabi",
                "Ikara",
                "Jaba",
                "Jema'A",
                "Kachia",
                "Kaduna-North",
                "Kaduna-South",
                "Kagarko",
                "Kajuru",
                "Kaura",
                "Kauru",
                "Kubau",
                "Kudan",
                "Lere",
                "Makarfi",
                "Sabon-Gari",
                "Sanga",
                "Soba",
                "Zangon-Kataf",
                "Zaria",
            ],
        ],
        [
            "code" => "KN",
            "name" => "Kano",
            "lgas" => [
                "Ajingi",
                "Albasu",
                "Bagwai",
                "Bebeji",
                "Bichi",
                "Bunkure",
                "Dala",
                "Dambatta",
                "Dawakin-Kudu",
                "Dawakin-Tofa",
                "Doguwa",
                "Fagge",
                "Gabasawa",
                "Garko",
                "Garun-Mallam",
                "Gaya",
                "Gezawa",
                "Gwale",
                "Gwarzo",
                "Kabo",
                "Kano-Municipal",
                "Karaye",
                "Kibiya",
                "Kiru",
                "Kumbotso",
                "Kunchi",
                "Kura",
                "Madobi",
                "Makoda",
                "Minjibir",
                "Nasarawa",
                "Rano",
                "Rimin-Gado",
                "Rogo",
                "Shanono",
                "Sumaila",
                "Takai",
                "Tarauni",
                "Tofa",
                "Tsanyawa",
                "Tudun-Wada",
                "Ungogo",
                "Warawa",
                "Wudil",
            ],
        ],
        [
            "code" => "KT",
            "name" => "Katsina",
            "lgas" => [
                "Bakori",
                "Batagarawa",
                "Batsari",
                "Baure",
                "Bindawa",
                "Charanchi",
                "Dan-Musa",
                "Dandume",
                "Danja",
                "Daura",
                "Dutsi",
                "Dutsin-Ma",
                "Faskari",
                "Funtua",
                "Ingawa",
                "Jibia",
                "Kafur",
                "Kaita",
                "Kankara",
                "Kankia",
                "Katsina",
                "Kurfi",
                "Kusada",
                "Mai-Adua",
                "Malumfashi",
                "Mani",
                "Mashi",
                "Matazu",
                "Musawa",
                "Rimi",
                "Sabuwa",
                "Safana",
                "Sandamu",
                "Zango",
            ],
        ],
        [
            "code" => "KE",
            "name" => "Kebbi",
            "lgas" => [
                "Aleiro",
                "Arewa-Dandi",
                "Argungu",
                "Augie",
                "Bagudo",
                "Birnin-Kebbi",
                "Bunza",
                "Dandi",
                "Fakai",
                "Gwandu",
                "Jega",
                "Kalgo",
                "Koko-Besse",
                "Maiyama",
                "Ngaski",
                "Sakaba",
                "Shanga",
                "Suru",
                "Wasagu/Danko",
                "Yauri",
                "Zuru",
            ],
        ],
        [
            "code" => "KO",
            "name" => "Kogi",
            "lgas" => [
                "Adavi",
                "Ajaokuta",
                "Ankpa",
                "Dekina",
                "Ibaji",
                "Idah",
                "Igalamela-Odolu",
                "Ijumu",
                "Kabba Bunu",
                "Kogi",
                "Lokoja",
                "Mopa-Muro",
                "Ofu",
                "Ogori Magongo",
                "Okehi",
                "Okene",
                "Olamaboro",
                "Omala",
                "Oyi",
                "Yagba-East",
                "Yagba-West",
            ],
        ],
        [
            "code" => "KW",
            "name" => "Kwara",
            "lgas" => [
                "Asa",
                "Baruten",
                "Edu",
                "Ekiti (Araromi/Opin)",
                "Ilorin-East",
                "Ilorin-South",
                "Ilorin-West",
                "Isin",
                "Kaiama",
                "Moro",
                "Offa",
                "Oke-Ero",
                "Oyun",
                "Pategi",
            ],
        ],
        [
            "code" => "LA",
            "name" => "Lagos",
            "lgas" => [
                "Agege",
                "Ajeromi-Ifelodun",
                "Alimosho",
                "Amuwo-Odofin",
                "Apapa",
                "Badagry",
                "Epe",
                "Eti-Osa",
                "Ibeju-Lekki",
                "Ifako-Ijaiye",
                "Ikeja",
                "Ikorodu",
                "Kosofe",
                "Lagos-Island",
                "Lagos-Mainland",
                "Mushin",
                "Ojo",
                "Oshodi-Isolo",
                "Shomolu",
                "Surulere",
                "Yewa-South",
            ],
        ],
        [
            "code" => "NA",
            "name" => "Nassarawa",
            "lgas" => [
                "Akwanga",
                "Awe",
                "Doma",
                "Karu",
                "Keana",
                "Keffi",
                "Kokona",
                "Lafia",
                "Nasarawa",
                "Nasarawa-Eggon",
                "Obi",
                "Wamba",
                "Toto",
            ],
        ],
        [
            "code" => "NI",
            "name" => "Niger",
            "lgas" => [
                "Agaie",
                "Agwara",
                "Bida",
                "Borgu",
                "Bosso",
                "Chanchaga",
                "Edati",
                "Gbako",
                "Gurara",
                "Katcha",
                "Kontagora",
                "Lapai",
                "Lavun",
                "Magama",
                "Mariga",
                "Mashegu",
                "Mokwa",
                "Moya",
                "Paikoro",
                "Rafi",
                "Rijau",
                "Shiroro",
                "Suleja",
                "Tafa",
                "Wushishi",
            ],
        ],
        [
            "code" => "OG",
            "name" => "Ogun",
            "lgas" => [
                "Abeokuta-North",
                "Abeokuta-South",
                "Ado-Odo Ota",
                "Ewekoro",
                "Ifo",
                "Ijebu-East",
                "Ijebu-North",
                "Ijebu-North-East",
                "Ijebu-Ode",
                "Ikenne",
                "Imeko-Afon",
                "Ipokia",
                "Obafemi-Owode",
                "Odeda",
                "Odogbolu",
                "Ogun-Waterside",
                "Remo-North",
                "Shagamu",
                "Yewa North",
            ],
        ],
        [
            "code" => "ON",
            "name" => "Ondo",
            "lgas" => [
                "Akoko North-East",
                "Akoko North-West",
                "Akoko South-West",
                "Akoko South-East",
                "Akure-North",
                "Akure-South",
                "Ese-Odo",
                "Idanre",
                "Ifedore",
                "Ilaje",
                "Ile-Oluji-Okeigbo",
                "Irele",
                "Odigbo",
                "Okitipupa",
                "Ondo West",
                "Ondo-East",
                "Ose",
                "Owo",
            ],
        ],
        [
            "code" => "OS",
            "name" => "Osun",
            "lgas" => [
                "Atakumosa West",
                "Atakumosa East",
                "Ayedaade",
                "Ayedire",
                "Boluwaduro",
                "Boripe",
                "Ede South",
                "Ede North",
                "Egbedore",
                "Ejigbo",
                "Ife North",
                "Ife South",
                "Ife-Central",
                "Ife-East",
                "Ifelodun",
                "Ila",
                "Ilesa-East",
                "Ilesa-West",
                "Irepodun",
                "Irewole",
                "Isokan",
                "Iwo",
                "Obokun",
                "Odo-Otin",
                "Ola Oluwa",
                "Olorunda",
                "Oriade",
                "Orolu",
                "Osogbo",
            ],
        ],
        [
            "code" => "OY",
            "name" => "Oyo",
            "lgas" => [
                "Afijio",
                "Akinyele",
                "Atiba",
                "Atisbo",
                "Egbeda",
                "Ibadan North",
                "Ibadan North-East",
                "Ibadan North-West",
                "Ibadan South-East",
                "Ibadan South-West",
                "Ibarapa-Central",
                "Ibarapa-East",
                "Ibarapa-North",
                "Ido",
                "Ifedayo",
                "Irepo",
                "Iseyin",
                "Itesiwaju",
                "Iwajowa",
                "Kajola",
                "Lagelu",
                "Ogo-Oluwa",
                "Ogbomosho-North",
                "Ogbomosho-South",
                "Olorunsogo",
                "Oluyole",
                "Ona-Ara",
                "Orelope",
                "Ori-Ire",
                "Oyo-West",
                "Oyo-East",
                "Saki-East",
                "Saki-West",
                "Surulere",
            ],
        ],
        [
            "code" => "PL",
            "name" => "Plateau",
            "lgas" => [
                "Barkin-Ladi",
                "Bassa",
                "Bokkos",
                "Jos-East",
                "Jos-North",
                "Jos-South",
                "Kanam",
                "Kanke",
                "Langtang-North",
                "Langtang-South",
                "Mangu",
                "Mikang",
                "Pankshin",
                "Qua'an Pan",
                "Riyom",
                "Shendam",
                "Wase",
            ],
        ],
        [
            "code" => "RI",
            "name" => "Rivers",
            "lgas" => [
                "Abua Odual",
                "Ahoada-East",
                "Ahoada-West",
                "Akuku Toru",
                "Andoni",
                "Asari-Toru",
                "Bonny",
                "Degema",
                "Eleme",
                "Emuoha",
                "Etche",
                "Gokana",
                "Ikwerre",
                "Khana",
                "Obio Akpor",
                "Ogba-Egbema-Ndoni",
                "Ogba Egbema Ndoni",
                "Ogu Bolo",
                "Okrika",
                "Omuma",
                "Opobo Nkoro",
                "Oyigbo",
                "Port-Harcourt",
                "Tai",
            ],
        ],
        [
            "code" => "SO",
            "name" => "Sokoto",
            "lgas" => [
                "Binji",
                "Bodinga",
                "Dange-Shuni",
                "Gada",
                "Goronyo",
                "Gudu",
                "Gwadabawa",
                "Illela",
                "Kebbe",
                "Kware",
                "Rabah",
                "Sabon Birni",
                "Shagari",
                "Silame",
                "Sokoto-North",
                "Sokoto-South",
                "Tambuwal",
                "Tangaza",
                "Tureta",
                "Wamako",
                "Wurno",
                "Yabo",
            ],
        ],
        [
            "code" => "TA",
            "name" => "Taraba",
            "lgas" => [
                "Ardo-Kola",
                "Bali",
                "Donga",
                "Gashaka",
                "Gassol",
                "Ibi",
                "Jalingo",
                "Karim-Lamido",
                "Kurmi",
                "Lau",
                "Sardauna",
                "Takum",
                "Ussa",
                "Wukari",
                "Yorro",
                "Zing",
            ],
        ],
        [
            "code" => "YO",
            "name" => "Yobe",
            "lgas" => [
                "Bade",
                "Bursari",
                "Damaturu",
                "Fika",
                "Fune",
                "Geidam",
                "Gujba",
                "Gulani",
                "Jakusko",
                "Karasuwa",
                "Machina",
                "Nangere",
                "Nguru",
                "Potiskum",
                "Tarmuwa",
                "Yunusari",
                "Yusufari",
            ],
        ],
        [
            "code" => "ZA",
            "name" => "Zamfara",
            "lgas" => [
                "Anka",
                "Bakura",
                "Birnin Magaji/Kiyaw",
                "Bukkuyum",
                "Bungudu",
                "Gummi",
                "Gusau",
                "Isa",
                "Kaura-Namoda",
                "Kiyawa",
                "Maradun",
                "Maru",
                "Shinkafi",
                "Talata-Mafara",
                "Tsafe",
                "Zurmi",
            ],
        ],
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Biography::query();

        // Search by name or title
        if (request('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            });
        }

        // Filter by state_of_origin
        if (request('state_of_origin')) {
            $query->where('state_of_origin', request('state_of_origin'));
        }

        // Filter by region
        if (request('region')) {
            $query->where('region', request('region'));
        }

        // Filter by birth year
        if (request('birth_year')) {
            $query->whereYear('date_of_birth', request('birth_year'));
        }

        // Filter by birth month
        if (request('birth_month')) {
            $query->whereMonth('date_of_birth', request('birth_month'));
        }

        // Filter by birth day
        if (request('birth_day')) {
            $query->whereDay('date_of_birth', request('birth_day'));
        }

        // Filter by occupation
        if (request('occupation')) {
            $query->whereHas('occupations', function($q) {
                $q->where('title', 'like', '%' . request('occupation') . '%');
            });
        }

        // For filter dropdowns
        $states = Biography::select('state_of_origin')
            ->distinct()
            ->whereNotNull('state_of_origin')
            ->orderBy('state_of_origin')
            ->pluck('state_of_origin');

        $regions = Biography::select('region')
            ->distinct()
            ->whereNotNull('region')
            ->orderBy('region')
            ->pluck('region');

        $occupations = \App\Models\Occupation::select('title')
            ->distinct()
            ->whereNotNull('title')
            ->orderBy('title')
            ->pluck('title');

        $biographies = $query->latest()->paginate(15)->withQueryString();

        return inertia('Biographies/Index', [
            'biographies' => $biographies,
            'filters' => [
                'search' => request('search'),
                'state_of_origin' => request('state_of_origin'),
                'region' => request('region'),
                'birth_year' => request('birth_year'),
                'birth_month' => request('birth_month'),
                'birth_day' => request('birth_day'),
                'occupation' => request('occupation'),
            ],
            'states' => $states,
            'regions' => $regions,
            'occupations' => $occupations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


        return inertia('Biographies/Create', [
            'states_and_lgas' => $this->states_and_lgas,
            'regions' => $this->regions,
            'relatedOptions' => Biography::select('id', 'full_name')->get()->map(fn($b) => [
                'value' => $b->id,
                'label' => $b->full_name,
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBiographyRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();

        if ($data['status'] === 'draft') {
            // Save as draft in separate table
            $draftData = [
                'created_by' => $data['created_by'],
                'full_name' => $data['full_name'],
                'title' => $data['title'] ?? null,
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'date_of_death' => $data['date_of_death'] ?? null,
                'place_of_birth' => $data['place_of_birth'] ?? null,
                'place_of_death' => $data['place_of_death'] ?? null,
                'cause_of_death' => $data['cause_of_death'] ?? null,
                'state_of_origin' => $data['state_of_origin'] ?? null,
                'local_government_area' => $data['lga'] ?? null,
                'ethnicity' => $data['ethnic_group'] ?? null,
                'religion' => $data['religion'] ?? null,
                'region' => $data['region'] ?? null,
                'biography_text' => $data['biography'] ?? null,
                'how_to_cite' => $data['how_to_cite'] ?? null,
                'references' => $data['references'] ?? null,
                'education' => $data['education'] ?? [],
                'occupations' => $data['occupations'] ?? [],
                'related_entries' => $data['related_entries'] ?? [],
            ];

            \App\Models\DraftBiography::create($draftData);
            
            return redirect()
                ->route('biographies.drafts')
                ->with('success', 'Biography saved as draft successfully.');
        } else {
            // Submit for review - save to main biographies table
            $slug = \Illuminate\Support\Str::slug($data['full_name']);
            $originalSlug = $slug;
            $count = 1;
            while (Biography::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            $data['slug'] = $slug;
            $data['submitted_at'] = now();

            $mappedData = [
                'created_by' => $data['created_by'],
                'full_name' => $data['full_name'],
                'slug' => $data['slug'],
                'title' => $data['title'] ?? null,
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'date_of_death' => $data['date_of_death'] ?? null,
                'place_of_birth' => $data['place_of_birth'] ?? null,
                'place_of_death' => $data['place_of_death'] ?? null,
                'cause_of_death' => $data['cause_of_death'] ?? null,
                'state_of_origin' => $data['state_of_origin'] ?? null,
                'local_government_area' => $data['lga'] ?? null,
                'ethnicity' => $data['ethnic_group'] ?? null,
                'religion' => $data['religion'] ?? null,
                'region' => $data['region'] ?? null,
                'biography_text' => $data['biography'] ?? null,
                'how_to_cite' => $data['how_to_cite'] ?? null,
                'references' => $data['references'] ?? null,
                'status' => 'submitted',
                'submitted_at' => now(),
            ];

            $education = $data['education'] ?? [];
            $occupations = $data['occupations'] ?? [];
            $relatedEntries = $data['related_entries'] ?? [];

            $biography = Biography::create($mappedData);

            foreach ($education as $edu) {
                if (!empty($edu['institution_name'])) {
                    $biography->education()->create($edu);
                }
            }

            foreach ($occupations as $occ) {
                if (!empty($occ['title'])) {
                    $biography->occupations()->create($occ);
                }
            }

            $biography->relatedBiographies()->sync($relatedEntries);
            
            NotificationService::notifyBiographySubmitted($biography);
            
            return redirect()
                ->route('biographies.index')
                ->with('success', 'Biography submitted for review successfully.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Biography $biography)
    {

        return inertia('Biographies/Show', [
            'biography' => $biography->load(['education', 'occupations', 'relatedBiographies', 'relatedTo', 'creator']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Biography $biography)
    {
        return inertia('Biographies/Edit', [
            'biography' => $biography->load(['education', 'occupations', 'relatedBiographies']),
            'states_and_lgas' => $this->states_and_lgas,
            'relatedOptions' => Biography::select('id', 'full_name')->get()->map(fn($b) => [
                'value' => $b->id,
                'label' => $b->full_name,
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBiographyRequest $request, Biography $biography)
    {
        $data = $request->validated();

        // Generate slug from full_name
        $slug = Str::slug($data['full_name']);
        $originalSlug = $slug;
        $count = 1;
        while (
            Biography::where('slug', $slug)
            ->where('id', '!=', $biography->id)
            ->exists()
        ) {
            $slug = $originalSlug . '-' . $count++;
        }

        // Handle photo upload if present
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('biographies', 'public');
        } else {
            unset($data['photo']);
        }

        $data['slug'] = $slug;

        // Remove related_entries, education, occupations from $data before update
        $relatedEntries = $data['related_entries'] ?? [];
        unset($data['related_entries']);

        $education = $data['education'] ?? [];
        unset($data['education']);

        $occupations = $data['occupations'] ?? [];
        unset($data['occupations']);

        // Update main biography record
        $biography->update($data);

        // Sync related entries (self-referencing many-to-many)
        $biography->relatedBiographies()->sync($relatedEntries);

        // Update education records
        $biography->education()->delete();
        foreach ($education as $edu) {
            if (!empty($edu['institution_name'])) {
                $biography->education()->create($edu);
            }
        }

        // Update occupation records
        $biography->occupations()->delete();
        foreach ($occupations as $occ) {
            if (!empty($occ['title'])) {
                $biography->occupations()->create($occ);
            }
        }

        $redirectRoute = $data['status'] === 'draft' ? 'biographies.drafts' : 'biographies.index';
        $message = $data['status'] === 'draft' 
            ? 'Biography saved as draft successfully.' 
            : 'Biography updated and submitted for review successfully.';

        return redirect()
            ->route($redirectRoute)
            ->with('success', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Biography $biography)
    {
        // Delete related entries (self-referencing many-to-many)
        $biography->relatedBiographies()->detach();

        // Delete education records
        $biography->education()->delete();

        // Delete occupation records
        $biography->occupations()->delete();

        // Finally, delete the biography itself
        $biography->delete();

        return redirect()
            ->route('biographies.index')
            ->with('success', 'Biography deleted successfully!');
    }

    public function drafts()
    {
        $drafts = \App\Models\DraftBiography::where('created_by', auth()->id())
            ->latest()
            ->paginate(10);

        return inertia('Biographies/Drafts', [
            'drafts' => $drafts,
        ]);
    }
}