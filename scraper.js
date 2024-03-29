import puppeteer from 'puppeteer-extra';
import fs from 'fs';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import { parse } from 'node-html-parser';
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin()).use(AdblockerPlugin({ blockTrackers: true }))

const getReviews = async (url) => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    });
  
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  
    await page.waitForSelector('section#REVIEWS');
    await new Promise(r => setTimeout(r, 10000));
    const data = await page.evaluate( () => {
        state = document.querySelectorAll('span[class="biGQs _P pZUbB avBIb osNWb"]')[2].textContent
        place = document.querySelector('h1[data-automation="mainH1"]').textContent
        ratings = document.querySelector('section#REVIEWS').querySelectorAll('title[id^="\\:lithium"][id$=\\:]')
        review_details = document.querySelector('section#REVIEWS').querySelectorAll('span.yCeTE')
        dates = document.querySelector('section#REVIEWS').querySelectorAll('div.RpeCd')
        serializedDates = []
        serializedReviewsTitle = []
        serializedReviewsDetails = []
        serializedRatings = []

        // Dates
        for (let i = 0; i < dates.length; i++) {
            console.log(dates[i].textContent);
            serializedDates.push(dates[i].textContent)
        }

        // Reviews
        for (let i = 1; i < review_details.length; i++) {
          console.log(review_details[i].textContent);
          if(serializedReviewsTitle.length ==0 || serializedReviewsTitle.length == serializedReviewsDetails.length){

          serializedReviewsTitle.push(review_details[i].textContent)
        }
        else{
          serializedReviewsDetails.push(review_details[i].textContent)
        }}

        // Ratings
        for (let i = 0; i < ratings.length; i++) {
          console.log(ratings[i].textContent);
          serializedRatings.push(ratings[i].textContent)
        }


        return{
          state,
          place, 
          serializedDates,
          serializedReviewsTitle,
          serializedReviewsDetails,
          serializedRatings

        }
  
    })

    //Save data to JSON file
    fs.appendFile('data.json', `${JSON.stringify(data)},`, err => {
      if (err) {
        throw err;
      }

    });

    await browser.close();

  };

  let review_links=[

    'https://www.tripadvisor.com.my/Attraction_Review-g298278-d3491018-Reviews-or10-Legoland_Malaysia-Johor_Bahru_Johor_Bahru_District_Johor.html',
    'https://www.tripadvisor.com/Attraction_Review-g608514-d2459865-Reviews-or10-Gunung_Lambak-Kluang_Kluang_District_Johor.html',
    'https://www.tripadvisor.com/Attraction_Review-g3446489-d3435949-Reviews-or10-Desaru_Beach-Pengerang_Johor_Bahru_District_Johor.html',

    'https://www.tripadvisor.com/Attraction_Review-g298283-d645113-Reviews-or10-Panorama_Langkawi_SkyCab-Langkawi_Langkawi_District_Kedah.html',
    'https://www.tripadvisor.com/Attraction_Review-g298283-d1454088-Reviews-or10-Telaga_Tujuh_Waterfalls-Langkawi_Langkawi_District_Kedah.html',
    'https://www.tripadvisor.com/Attraction_Review-g1096277-d4876875-Reviews-or10-Kilim_Karst_Geoforest_Park-Kuah_Langkawi_Langkawi_District_Kedah.html',
    'https://www.tripadvisor.com/Attraction_Review-g298283-d672549-Reviews-or10-Dev_s_Adventure_Tours-Langkawi_Langkawi_District_Kedah.html',
    'https://www.tripadvisor.com/Attraction_Review-g298283-d1940211-Reviews-or10-Mega_Water_Sports_Jet_Ski_Tours-Langkawi_Langkawi_District_Kedah.html',
    'https://www.tripadvisor.com.my/Attraction_Review-g298283-d645113-Reviews-or10-Panorama_Langkawi_SkyCab-Langkawi_Langkawi_District_Kedah.html',
    
    'https://www.tripadvisor.com/Attraction_Review-g298285-d4471289-Reviews-or10-Pasar_Besar_Siti_Khadijah-Kota_Bharu_Kelantan.html',
    'https://www.tripadvisor.com/Attraction_Review-g298285-d5539862-Reviews-or10-Pantai_Cahaya_Bulan-Kota_Bharu_Kelantan.html',
    'https://www.tripadvisor.com/Attraction_Review-g298285-d4505030-Reviews-or10-Handicraft_Village_and_Craft_Museum_Kelantan-Kota_Bharu_Kelantan.html',
 
    'https://www.tripadvisor.com/Attraction_Review-g306997-d450988-Reviews-or10-Baba_Nyonya_Heritage_Museum-Melaka_Central_Melaka_District_Melaka_State.html',
    'https://www.tripadvisor.com/Attraction_Review-g306997-d12235958-Reviews-or10-The_Huskitory-Melaka_Central_Melaka_District_Melaka_State.html',
    'https://www.tripadvisor.com.my/Attraction_Review-g306997-d456610-Reviews-or10-Jonker_Street-Melaka_Central_Melaka_District_Melaka_State.html',
    'https://www.tripadvisor.com.my/Attraction_Review-g306997-d455041-Reviews-or10-Red_Square_Dutch_Square-Melaka_Central_Melaka_District_Melaka_State.html',

    'https://www.tripadvisor.com/Attraction_Review-g303991-d2355529-Reviews-or10-Muzium_Tentera_Darat-Port_Dickson_Negeri_Sembilan.html',
    'https://www.tripadvisor.com/Attraction_Review-g303991-d11824984-Reviews-or10-Pusat_Ikan_Hiasan-Port_Dickson_Negeri_Sembilan.html',
    'https://www.tripadvisor.com/Attraction_Review-g298290-d3546217-Reviews-or10-Gunung_Angsi-Seremban_Seremban_District_Negeri_Sembilan.html',

    'https://www.tripadvisor.com/Attraction_Review-g1193625-d3224315-Reviews-or10-or10-Queensbay_Mall-Bayan_Lepas_Penang_Island_Penang.html',
    'https://www.tripadvisor.com/Attraction_Review-g298303-d455357-Reviews-or10-Cheong_Fatt_Tze_The_Blue_Mansion-George_Town_Penang_Island_Penang.html',
    'https://www.tripadvisor.com/Attraction_Review-g4327677-d455065-Reviews-or10-Kek_Lok_Si_Temple-Air_Itam_Penang_Island_Penang.html',
    'https://www.tripadvisor.com/Attraction_Review-g298303-d1221399-Reviews-or10-Chew_Jetty-George_Town_Penang_Island_Penang.html',
    'https://www.tripadvisor.com.my/Attraction_Review-g4975755-d3729571-Reviews-or10-Escape_Penang-Teluk_Bahang_Penang_Island_Penang.html',
    'https://www.tripadvisor.com.my/Attraction_Review-g298303-d1798470-Reviews-or10-Pinang_Peranakan_Mansion-George_Town_Penang_Island_Penang.html',

    'https://www.tripadvisor.com/Attraction_Review-g660784-d3280389-Reviews-or10-Chin_Swee_Cave_Temple-Genting_Highlands_Pahang.html',
    'https://www.tripadvisor.com/Attraction_Review-g1497917-d4952483-Reviews-or10-Cameron_Bharat_Tea_Estate-Tanah_Rata_Cameron_Highlands_Pahang.html',
    'https://www.tripadvisor.com/Attraction_Review-g298293-d1034350-Reviews-or10-Mossy_Forest-Brinchang_Cameron_Highlands_Pahang.html',
 
    'https://www.tripadvisor.com/Attraction_Review-g298298-d7806166-Reviews-or10-Ipoh_World_at_Han_Chin_Pet_Soo-Ipoh_Kinta_District_Perak.html',
    'https://www.tripadvisor.com/Attraction_Review-g298298-d1488280-Reviews-or10-Lost_World_Of_Tambun-Ipoh_Kinta_District_Perak.html',
    'https://www.tripadvisor.com/Attraction_Review-g670111-d2516926-Reviews-or10-Taiping_Lake_Gardens-Taiping_Larut_Matang_dan_Selama_District_Perak.html',

    'https://www.tripadvisor.com/Attraction_Review-g3239595-d7627149-Reviews-or10-Al_Hussain_Mosque_Floating_Mosque-Kuala_Perlis_Perlis.html',
    'https://www.tripadvisor.com/Attraction_Review-g6898342-d7624808-Reviews-or10-Gua_Kelam-Kaki_Bukit_Perlis.html',

    'https://www.tripadvisor.com/Attraction_Review-g1075066-d1478683-Reviews-or10-Sepilok_Orangutan_Rehabilitation_Centre-Sepilok_Sandakan_Division_Sabah.html',
    'https://www.tripadvisor.com/Attraction_Review-g3845613-d2279636-Reviews-or10-Desa_Dairy_Farm-Kundasang_Ranau_Sabah.html',
    'https://www.tripadvisor.com/Attraction_Review-g635753-d4521848-Reviews-or10-Sipadan_National_Park-Semporna_Semporna_District_Sabah.html',

    'https://www.tripadvisor.com/Attraction_Review-g298309-d1503816-Reviews-or10-Semenggoh_Nature_Reserve-Kuching_Sarawak.html',
    'https://www.tripadvisor.com/Attraction_Review-g298309-d455031-Reviews-or10-Kuching_Esplanade-Kuching_Sarawak.html',
    'https://www.tripadvisor.com/Attraction_Review-g298309-d455038-Reviews-or10-Sarawak_Cultural_Village-Kuching_Sarawak.html',
    'https://www.tripadvisor.com/Attraction_Review-g298309-d3567278-Reviews-or10-The_Great_Orangutan_Project-Kuching_Sarawak.html',
   
    'https://www.tripadvisor.com/Attraction_Review-g298313-d1487202-Reviews-or10-Sunway_Lagoon-Petaling_Jaya_Petaling_District_Selangor.html',
    'https://www.tripadvisor.com/Attraction_Review-g298313-d2547995-Reviews-or10-Sunway_Pyramid_Shopping_Mall-Petaling_Jaya_Petaling_District_Selangor.html',

    'https://www.tripadvisor.com/Attraction_Review-g304006-d2312022-Reviews-or10-Redang_Island-Pulau_Redang_Terengganu.html',
    'https://www.tripadvisor.com/Attraction_Review-g304004-d455575-Reviews-or10-Long_Beach-Pulau_Perhentian_Kecil_Perhentian_Islands_Terengganu.html'
]

for (let i = 0; i < review_links.length; i++) {
  for (let j = 10; j <= 30; j+=10) {
    let pg = "or" + j.toString()
    let new_link = review_links[i].replace("or10", pg)
    console.log(new_link)
    //wait for previous page to load and scrape data

    await getReviews(new_link);
  }
}

