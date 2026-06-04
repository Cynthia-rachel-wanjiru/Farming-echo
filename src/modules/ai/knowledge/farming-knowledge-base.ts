/**
 * FarmEcho AI Knowledge Base
 * Contains farming knowledge and responses for the AI assistant
 */

export interface KnowledgeResponse {
  en: string;
  sw: string;
}

export const farmingKnowledge: { [key: string]: KnowledgeResponse } = {
  maize: {
    en: `**Maize Growing Guide:**\n\n🌱 **Planting Time:** Plant at the start of long rains (March-April) or short rains (October-November) in Kenya.\n\n🌾 **Spacing:** 75cm between rows, 25cm between plants.\n\n💧 **Water:** Needs 500-800mm of water during growing season. Critical at tasseling and grain filling.\n\n🌿 **Fertilizer:** Apply DAP (50kg/acre) at planting, then top-dress with CAN (50kg/acre) at knee-high stage.\n\n⏰ **Harvest:** Ready in 3-4 months when kernels are hard and leaves turn brown.`,
    sw: `**Mwongozo wa Kupanda Mahindi:**\n\n🌱 **Wakati wa Kupanda:** Panda mwanzoni mwa mvua za masika (Machi-Aprili) au mvua za vuli (Oktoba-Novemba) Kenya.\n\n🌾 **Umbali:** Cm 75 kati ya mistari, cm 25 kati ya mimea.\n\n💧 **Maji:** Inahitaji mm 500-800 za maji wakati wa kukua. Muhimu wakati wa kutoa maua na kujaza nafaka.\n\n🌿 **Mbolea:** Tumia DAP (kg 50/ekari) wakati wa kupanda, kisha ongeza CAN (kg 50/ekari) wakati wa hatua ya goti.\n\n⏰ **Mavuno:** Iko tayari katika miezi 3-4 wakati punje ni ngumu na majani yanageuka kahawia.`,
  },
  irrigation: {
    en: `**Irrigation Best Practices:**\n\n💧 **Frequency:** Water deeply 2-3 times per week rather than daily light watering.\n\n⏰ **Timing:** Early morning (5-7 AM) is best to reduce evaporation.\n\n🌡️ **Amount:** Most vegetables need 25-50mm per week. Use your finger - soil should be moist 10cm deep.\n\n🚿 **Method:** Drip irrigation is most efficient (90% vs 60% for sprinklers).\n\n⚠️ **Signs of Problems:**\n- Wilting = Too little water\n- Yellow leaves = Too much water\n- Brown leaf tips = Inconsistent watering`,
    sw: `**Mbinu Bora za Umwagiliaji:**\n\n💧 **Mzunguko:** Mwagilia kwa kina mara 2-3 kwa wiki badala ya kumwagilia kidogo kila siku.\n\n⏰ **Muda:** Asubuhi mapema (5-7 AM) ni bora zaidi kupunguza mvuke.\n\n🌡️ **Kiasi:** Mboga nyingi zinahitaji mm 25-50 kwa wiki. Tumia kidole chako - udongo unapaswa kuwa na unyevu kina cha cm 10.\n\n🚿 **Njia:** Umwagiliaji wa tone ni wa ufanisi zaidi (90% dhidi ya 60% kwa vinyunyiziaji).\n\n⚠️ **Dalili za Matatizo:**\n- Kunyauka = Maji machache sana\n- Majani ya njano = Maji mengi sana\n- Ncha za majani za kahawia = Umwagiliaji usio na uthabiti`,
  },
  pests: {
    en: `**Natural Pest Control Methods:**\n\n🌿 **Neem Oil:** Spray diluted neem oil (2 tablespoons per liter) for aphids, whiteflies.\n\n🧄 **Garlic Spray:** Crush 5 cloves in 1L water, strain, spray on leaves for general pests.\n\n🌼 **Companion Planting:** Plant marigolds to repel nematodes. Basil deters flies and mosquitoes.\n\n🐦 **Natural Predators:** Encourage birds, ladybugs, praying mantis in your farm.\n\n🔄 **Crop Rotation:** Change crop families each season to break pest cycles.\n\n🧹 **Hygiene:** Remove infected plants immediately. Clean tools between uses.`,
    sw: `**Njia za Asili za Kudhibiti Wadudu:**\n\n🌿 **Mafuta ya Mwarobaini:** Nyunyizia mafuta ya mwarobaini yaliyochujwa (vijiko 2 vya chai kwa lita) kwa ajili ya aphids, nzi weupe.\n\n🧄 **Dawa ya Kitunguu Saumu:** Ponda karafuu 5 katika maji ya lita 1, chuja, nyunyizia kwenye majani kwa ajili ya wadudu wa jumla.\n\n🌼 **Kupanda Pamoja:** Panda maua ya marigold kuzuia nematodes. Basil inazuia nzi na mbu.\n\n🐦 **Wawindaji wa Asili:** Himiza ndege, dudu wa Abu, mantis wa sala katika shamba lako.\n\n🔄 **Mzunguko wa Mazao:** Badilisha familia za mazao kila msimu kuvunja mizunguko ya wadudu.\n\n🧹 **Usafi:** Ondoa mimea iliyoambukizwa mara moja. Safisha zana kati ya matumizi.`,
  },
  fertilizer: {
    en: `**Fertilizer Application Guide:**\n\n📊 **NPK Numbers:** N=Nitrogen (leaves), P=Phosphorus (roots), K=Potassium (fruits)\n\n🌱 **For Leafy Vegetables:** Use high N like 20-10-10. Apply every 2 weeks.\n\n🍅 **For Fruiting Crops:** Use balanced 10-10-10 or high K like 10-10-20 during fruiting.\n\n🌾 **For Cereals:** DAP (18-46-0) at planting, CAN (21-0-0) as top dressing.\n\n💡 **Application Tips:**\n- Apply in the morning or evening\n- Water before and after application\n- Keep fertilizer 10cm away from plant stem\n- Don't exceed recommended rates - more ≠ better`,
    sw: `**Mwongozo wa Kutumia Mbolea:**\n\n📊 **Nambari za NPK:** N=Nitrojeni (majani), P=Fosforasi (mizizi), K=Potasiamu (matunda)\n\n🌱 **Kwa Mboga za Majani:** Tumia N ya juu kama 20-10-10. Tumia kila wiki 2.\n\n🍅 **Kwa Mazao ya Matunda:** Tumia 10-10-10 iliyosawazishwa au K ya juu kama 10-10-20 wakati wa kutoa matunda.\n\n🌾 **Kwa Nafaka:** DAP (18-46-0) wakati wa kupanda, CAN (21-0-0) kama kuongeza juu.\n\n💡 **Vidokezo vya Matumizi:**\n- Tumia asubuhi au jioni\n- Mwagilia kabla na baada ya kutumia\n- Weka mbolea cm 10 mbali na shina la mmea\n- Usizidi viwango vilivyopendekezwa - zaidi ≠ bora`,
  },
  prices: {
    en: `**Current Market Price Trends (June 2026):**\n\n🌾 **Maize:** KES 40-45 per kg (wholesale), KES 50-55 (retail)\n📈 Trend: Stable, expect slight increase in dry season\n\n🥔 **Potatoes:** KES 60-70 per kg\n📈 Trend: Rising due to low supply\n\n🍅 **Tomatoes:** KES 80-100 per kg\n📉 Trend: Decreasing as more farmers harvest\n\n💡 **Tip:** Sell tomatoes now! Prices dropping as supply increases. Hold maize for better prices in August-September.`,
    sw: `**Mitindo ya Bei ya Soko ya Sasa (Juni 2026):**\n\n🌾 **Mahindi:** KES 40-45 kwa kg (jumla), KES 50-55 (rejareja)\n📈 Mwelekeo: Imara, tarajia ongezeko kidogo katika msimu wa kiangazi\n\n🥔 **Viazi:** KES 60-70 kwa kg\n📈 Mwelekeo: Inaongezeka kutokana na usambazaji mdogo\n\n🍅 **Nyanya:** KES 80-100 kwa kg\n📉 Mwelekeo: Inapungua kwa kuwa wakulima zaidi wanavuna\n\n💡 **Kidokezo:** Uza nyanya sasa! Bei zinapungua kwa kuwa usambazaji unaongezeka. Shikilia mahindi kwa bei bora Agosti-Septemba.`,
  },
  weather: {
    en: `**Weather Tips for Kenyan Farmers:**\n\n🌧️ **Rainy Seasons:**\n- Long rains: March-May (best for maize, beans)\n- Short rains: October-December (beans, vegetables)\n\n☀️ **Dry Seasons:**\n- January-February: Harvest and storage\n- June-September: Irrigation critical\n\n💡 **Climate-Smart Practices:**\n- Mulching reduces water loss by 70%\n- Drought-resistant varieties: Katumani maize, Punda beans\n- Rainwater harvesting: Can provide 50% of irrigation needs\n\n📱 **Stay Updated:** Check FarmEcho weather forecasts daily for your region.`,
    sw: `**Vidokezo vya Hali ya Hewa kwa Wakulima wa Kenya:**\n\n🌧️ **Misimu ya Mvua:**\n- Mvua ndefu: Machi-Mei (bora kwa mahindi, maharage)\n- Mvua fupi: Oktoba-Desemba (maharage, mboga)\n\n☀️ **Misimu Kavu:**\n- Januari-Februari: Mavuno na uhifadhi\n- Juni-Septemba: Umwagiliaji muhimu\n\n💡 **Mbinu Zinazojali Hali ya Hewa:**\n- Kufunika udongo hupunguza upotevu wa maji kwa 70%\n- Aina zinazostahimili ukame: Mahindi ya Katumani, maharage ya Punda\n- Ukusanyaji wa maji ya mvua: Unaweza kutoa 50% ya mahitaji ya umwagiliaji\n\n📱 **Endelea Kusasishwa:** Angalia utabiri wa hali ya hewa ya FarmEcho kila siku kwa mkoa wako.`,
  },
  tomato: {
    en: `**Tomato Growing Tips:**\n\n🌱 Plant tomatoes during rainy seasons for best results.\n💧 Water regularly but avoid waterlogging.\n🌿 Use NPK 10-10-20 fertilizer for better fruiting.\n🐛 Watch for late blight - spray with copper fungicide if needed.\n⏰ Harvest after 2.5-3 months when fruits are firm and red.`,
    sw: `**Vidokezo vya Kupanda Nyanya:**\n\n🌱 Panda nyanya wakati wa misimu ya mvua kwa matokeo bora.\n💧 Mwagilia mara kwa mara lakini epuka maji mengi.\n🌿 Tumia mbolea ya NPK 10-10-20 kwa matunda bora.\n🐛 Angalia ukungu wa mwisho - nyunyizia na dawa ya kuangamiza kuvu ya shaba ikiwa ni lazima.\n⏰ Vuna baada ya miezi 2.5-3 wakati matunda ni imara na mekundu.`,
  },
  beans: {
    en: `**Bean Farming Guide:**\n\n🌱 Plant at start of rains, 45cm between rows.\n💧 Beans are drought-resistant but need water at flowering.\n🌿 Minimal fertilizer needed - beans fix their own nitrogen!\n⏰ Ready to harvest in 2-3 months.\n💡 Intercrop with maize for better yields!`,
    sw: `**Mwongozo wa Kilimo cha Maharage:**\n\n🌱 Panda mwanzoni mwa mvua, cm 45 kati ya mistari.\n💧 Maharage yanastahimili ukame lakini yanahitaji maji wakati wa kutoa maua.\n🌿 Mbolea kidogo inahitajika - maharage yanatengeneza nitrojeni yao wenyewe!\n⏰ Tayari kuvunwa katika miezi 2-3.\n💡 Panda pamoja na mahindi kwa mavuno bora!`,
  },
  default: {
    en: `I can help you with farming questions! Here are some topics I know well:\n\n🌾 Crop planting and management (maize, beans, tomatoes, etc.)\n💧 Irrigation and water management\n🐛 Pest and disease control\n🌿 Fertilizer and soil health\n📊 Market prices and trends\n☀️ Weather and climate adaptation\n\nPlease ask me a specific question, or try one of the quick questions above!`,
    sw: `Ninaweza kukusaidia na maswali ya kilimo! Hapa kuna mada ninazozijua vizuri:\n\n🌾 Kupanda na kusimamia mazao (mahindi, maharage, nyanya, n.k.)\n💧 Umwagiliaji na usimamizi wa maji\n🐛 Kudhibiti wadudu na magonjwa\n🌿 Mbolea na afya ya udongo\n📊 Bei za soko na mwelekeo\n☀️ Hali ya hewa na kubadilika kwa tabia nchi\n\nTafadhali niulize swali maalum, au jaribu mojawapo ya maswali ya haraka hapo juu!`,
  },
};

/**
 * Generate AI response based on user query
 * @param query - User's question
 * @param language - Language preference ('en' or 'sw')
 * @returns AI response string
 */
export function generateAIResponse(query: string, language: 'en' | 'sw'): string {
  const q = query.toLowerCase();

  // Match query to knowledge base
  if (q.includes('maize') || q.includes('mahindi') || q.includes('corn')) {
    return farmingKnowledge.maize[language];
  }
  if (q.includes('water') || q.includes('irrigat') || q.includes('maji') || q.includes('mwagili')) {
    return farmingKnowledge.irrigation[language];
  }
  if (q.includes('pest') || q.includes('insect') || q.includes('wadudu') || q.includes('bug') || q.includes('control')) {
    return farmingKnowledge.pests[language];
  }
  if (q.includes('fertilizer') || q.includes('mbolea') || q.includes('npk') || q.includes('nutrient')) {
    return farmingKnowledge.fertilizer[language];
  }
  if (q.includes('price') || q.includes('market') || q.includes('sell') || q.includes('bei') || q.includes('soko')) {
    return farmingKnowledge.prices[language];
  }
  if (q.includes('weather') || q.includes('rain') || q.includes('climate') || q.includes('hali ya hewa') || q.includes('mvua')) {
    return farmingKnowledge.weather[language];
  }
  if (q.includes('tomato') || q.includes('nyanya')) {
    return farmingKnowledge.tomato[language];
  }
  if (q.includes('bean') || q.includes('maharage')) {
    return farmingKnowledge.beans[language];
  }

  // Default response
  return farmingKnowledge.default[language];
}
