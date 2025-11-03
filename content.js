let isEnabled = true;
let popup = null;

// A mapping of country names to their Wikimedia Commons SVG locator map URLs.
const countryMap = {
  "Afghanistan": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Afghanistan_in_the_world_%28W3%29.svg/512px-Afghanistan_in_the_world_%28W3%29.svg.png",
  "Albania": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Albania_in_Europe.svg/512px-Albania_in_Europe.svg.png",
  "Algeria": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Algeria_in_the_world_%28W3%29.svg/512px-Algeria_in_the_world_%28W3%29.svg.png",
  "Andorra": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Andorra_in_Europe.svg/512px-Andorra_in_Europe.svg.png",
  "Angola": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Angola_in_the_world_%28W3%29.svg/512px-Angola_in_the_world_%28W3%29.svg.png",
  "Antigua and Barbuda": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Antigua_and_Barbuda_in_the_world_%28W3%29.svg/512px-Antigua_and_Barbuda_in_the_world_%28W3%29.svg.png",
  "Argentina": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Argentina_in_the_world_%28W3%29.svg/512px-Argentina_in_the_world_%28W3%29.svg.png",
  "Armenia": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Armenia_in_the_world_%28W3%29.svg/512px-Armenia_in_the_world_%28W3%29.svg.png",
  "Australia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Australia_in_the_world_%28W3%29.svg/512px-Australia_in_the_world_%28W3%29.svg.png",
  "Austria": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Austria_in_Europe.svg/512px-Austria_in_Europe.svg.png",
  "Azerbaijan": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Azerbaijan_in_the_world_%28W3%29.svg/512px-Azerbaijan_in_the_world_%28W3%29.svg.png",
  "Bahamas": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bahamas_in_the_world_%28W3%29.svg/512px-Bahamas_in_the_world_%28W3%29.svg.png",
  "Bahrain": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bahrain_in_the_world_%28W3%29.svg/512px-Bahrain_in_the_world_%28W3%29.svg.png",
  "Bangladesh": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Bangladesh_in_the_world_%28W3%29.svg/512px-Bangladesh_in_the_world_%28W3%29.svg.png",
  "Barbados": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Barbados_in_the_world_%28W3%29.svg/512px-Barbados_in_the_world_%28W3%29.svg.png",
  "Belarus": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Belarus_in_Europe.svg/512px-Belarus_in_Europe.svg.png",
  "Belgium": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Belgium_in_Europe.svg/512px-Belgium_in_Europe.svg.png",
  "Belize": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Belize_in_the_world_%28W3%29.svg/512px-Belize_in_the_world_%28W3%29.svg.png",
  "Benin": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Benin_in_the_world_%28W3%29.svg/512px-Benin_in_the_world_%28W3%29.svg.png",
  "Bhutan": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Bhutan_in_the_world_%28W3%29.svg/512px-Bhutan_in_the_world_%28W3%29.svg.png",
  "Bolivia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bolivia_in_the_world_%28W3%29.svg/512px-Bolivia_in_the_world_%28W3%29.svg.png",
  "Bosnia and Herzegovina": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Bosnia_and_Herzegovina_in_Europe.svg/512px-Bosnia_and_Herzegovina_in_Europe.svg.png",
  "Botswana": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Botswana_in_the_world_%28W3%29.svg/512px-Botswana_in_the_world_%28W3%29.svg.png",
  "Brazil": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Brazil_in_the_world_%28W3%29.svg/512px-Brazil_in_the_world_%28W3%29.svg.png",
  "Brunei": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Brunei_in_the_world_%28W3%29.svg/512px-Brunei_in_the_world_%28W3%29.svg.png",
  "Bulgaria": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Bulgaria_in_Europe.svg/512px-Bulgaria_in_Europe.svg.png",
  "Burkina Faso": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Burkina_Faso_in_the_world_%28W3%29.svg/512px-Burkina_Faso_in_the_world_%28W3%29.svg.png",
  "Burundi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Burundi_in_the_world_%28W3%29.svg/512px-Burundi_in_the_world_%28W3%29.svg.png",
  "Cabo Verde": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Cape_Verde_in_the_world_%28W3%29.svg/512px-Cape_Verde_in_the_world_%28W3%29.svg.png",
  "Cambodia": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cambodia_in_the_world_%28W3%29.svg/512px-Cambodia_in_the_world_%28W3%29.svg.png",
  "Cameroon": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Cameroon_in_the_world_%28W3%29.svg/512px-Cameroon_in_the_world_%28W3%29.svg.png",
  "Canada": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Canada_in_the_world_%28W3%29.svg/512px-Canada_in_the_world_%28W3%29.svg.png",
  "Central African Republic": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Central_African_Republic_in_the_world_%28W3%29.svg/512px-Central_African_Republic_in_the_world_%28W3%29.svg.png",
  "Chad": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Chad_in_the_world_%28W3%29.svg/512px-Chad_in_the_world_%28W3%29.svg.png",
  "Chile": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chile_in_the_world_%28W3%29.svg/512px-Chile_in_the_world_%28W3%29.svg.png",
  "China": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/China_in_the_world_%28W3%29.svg/512px-China_in_the_world_%28W3%29.svg.png",
  "Colombia": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Colombia_in_the_world_%28W3%29.svg/512px-Colombia_in_the_world_%28W3%29.svg.png",
  "Comoros": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Comoros_in_the_world_%28W3%29.svg/512px-Comoros_in_the_world_%28W3%29.svg.png",
  "Congo, Democratic Republic of the": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Democratic_Republic_of_the_Congo_in_the_world_%28W3%29.svg/512px-Democratic_Republic_of_the_Congo_in_the_world_%28W3%29.svg.png",
  "Congo, Republic of the": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Republic_of_the_Congo_in_the_world_%28W3%29.svg/512px-Republic_of_the_Congo_in_the_world_%28W3%29.svg.png",
  "Costa Rica": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Costa_Rica_in_the_world_%28W3%29.svg/512px-Costa_Rica_in_the_world_%28W3%29.svg.png",
  "Côte d'Ivoire": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/C%C3%B4te_d%27Ivoire_in_the_world_%28W3%29.svg/512px-C%C3%B4te_d%27Ivoire_in_the_world_%28W3%29.svg.png",
  "Croatia": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Croatia_in_Europe.svg/512px-Croatia_in_Europe.svg.png",
  "Cuba": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cuba_in_the_world_%28W3%29.svg/512px-Cuba_in_the_world_%28W3%29.svg.png",
  "Cyprus": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cyprus_in_Europe.svg/512px-Cyprus_in_Europe.svg.png",
  "Czech Republic": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Czech_Republic_in_Europe.svg/512px-Czech_Republic_in_Europe.svg.png",
  "Denmark": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Denmark_in_Europe.svg/512px-Denmark_in_Europe.svg.png",
  "Djibouti": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Djibouti_in_the_world_%28W3%29.svg/512px-Djibouti_in_the_world_%28W3%29.svg.png",
  "Dominica": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Dominica_in_the_world_%28W3%29.svg/512px-Dominica_in_the_world_%28W3%29.svg.png",
  "Dominican Republic": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Dominican_Republic_in_the_world_%28W3%29.svg/512px-Dominican_Republic_in_the_world_%28W3%29.svg.png",
  "Ecuador": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Ecuador_in_the_world_%28W3%29.svg/512px-Ecuador_in_the_world_%28W3%29.svg.png",
  "Egypt": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Egypt_in_the_world_%28W3%29.svg/512px-Egypt_in_the_world_%28W3%29.svg.png",
  "El Salvador": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/El_Salvador_in_the_world_%28W3%29.svg/512px-El_Salvador_in_the_world_%28W3%29.svg.png",
  "Equatorial Guinea": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Equatorial_Guinea_in_the_world_%28W3%29.svg/512px-Equatorial_Guinea_in_the_world_%28W3%29.svg.png",
  "Eritrea": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Eritrea_in_the_world_%28W3%29.svg/512px-Eritrea_in_the_world_%28W3%29.svg.png",
  "Estonia": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Estonia_in_Europe.svg/512px-Estonia_in_Europe.svg.png",
  "Eswatini": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Eswatini_in_the_world_%28W3%29.svg/512px-Eswatini_in_the_world_%28W3%29.svg.png",
  "Ethiopia": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ethiopia_in_the_world_%28W3%29.svg/512px-Ethiopia_in_the_world_%28W3%29.svg.png",
  "Fiji": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Fiji_in_the_world_%28W3%29.svg/512px-Fiji_in_the_world_%28W3%29.svg.png",
  "Finland": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Finland_in_Europe.svg/512px-Finland_in_Europe.svg.png",
  "France": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/France_in_Europe.svg/512px-France_in_Europe.svg.png",
  "Gabon": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Gabon_in_the_world_%28W3%29.svg/512px-Gabon_in_the_world_%28W3%29.svg.png",
  "Gambia": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Gambia_in_the_world_%28W3%29.svg/512px-Gambia_in_the_world_%28W3%29.svg.png",
  "Georgia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Georgia_in_the_world_%28W3%29.svg/512px-Georgia_in_the_world_%28W3%29.svg.png",
  "Germany": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Germany_in_Europe.svg/512px-Germany_in_Europe.svg.png",
  "Ghana": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Ghana_in_the_world_%28W3%29.svg/512px-Ghana_in_the_world_%28W3%29.svg.png",
  "Greece": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Greece_in_Europe.svg/512px-Greece_in_Europe.svg.png",
  "Grenada": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Grenada_in_the_world_%28W3%29.svg/512px-Grenada_in_the_world_%28W3%29.svg.png",
  "Guatemala": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Guatemala_in_the_world_%28W3%29.svg/512px-Guatemala_in_the_world_%28W3%29.svg.png",
  "Guinea": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Guinea_in_the_world_%28W3%29.svg/512px-Guinea_in_the_world_%28W3%29.svg.png",
  "Guinea-Bissau": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Guinea-Bissau_in_the_world_%28W3%29.svg/512px-Guinea-Bissau_in_the_world_%28W3%29.svg.png",
  "Guyana": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Guyana_in_the_world_%28W3%29.svg/512px-Guyana_in_the_world_%28W3%29.svg.png",
  "Haiti": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Haiti_in_the_world_%28W3%29.svg/512px-Haiti_in_the_world_%28W3%29.svg.png",
  "Honduras": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Honduras_in_the_world_%28W3%29.svg/512px-Honduras_in_the_world_%28W3%29.svg.png",
  "Hungary": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hungary_in_Europe.svg/512px-Hungary_in_Europe.svg.png",
  "Iceland": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Iceland_in_Europe.svg/512px-Iceland_in_Europe.svg.png",
  "India": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/India_in_the_world_%28W3%29.svg/512px-India_in_the_world_%28W3%29.svg.png",
  "Indonesia": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Indonesia_in_the_world_%28W3%29.svg/512px-Indonesia_in_the_world_%28W3%29.svg.png",
  "Iran": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Iran_in_the_world_%28W3%29.svg/512px-Iran_in_the_world_%28W3%29.svg.png",
  "Iraq": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Iraq_in_the_world_%28W3%29.svg/512px-Iraq_in_the_world_%28W3%29.svg.png",
  "Ireland": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ireland_in_Europe.svg/512px-Ireland_in_Europe.svg.png",
  "Israel": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Israel_in_the_world_%28W3%29.svg/512px-Israel_in_the_world_%28W3%29.svg.png",
  "Italy": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Italy_in_Europe.svg/512px-Italy_in_Europe.svg.png",
  "Jamaica": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jamaica_in_the_world_%28W3%29.svg/512px-Jamaica_in_the_world_%28W3%29.svg.png",
  "Japan": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Japan_in_the_world_%28W3%29.svg/512px-Japan_in_the_world_%28W3%29.svg.png",
  "Jordan": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Jordan_in_the_world_%28W3%29.svg/512px-Jordan_in_the_world_%28W3%29.svg.png",
  "Kazakhstan": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Kazakhstan_in_the_world_%28W3%29.svg/512px-Kazakhstan_in_the_world_%28W3%29.svg.png",
  "Kenya": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Kenya_in_the_world_%28W3%29.svg/512px-Kenya_in_the_world_%28W3%29.svg.png",
  "Kiribati": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kiribati_in_the_world_%28W3%29.svg/512px-Kiribati_in_the_world_%28W3%29.svg.png",
  "Kuwait": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Kuwait_in_the_world_%28W3%29.svg/512px-Kuwait_in_the_world_%28W3%29.svg.png",
  "Kyrgyzstan": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Kyrgyzstan_in_the_world_%28W3%29.svg/512px-Kyrgyzstan_in_the_world_%28W3%29.svg.png",
  "Laos": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Laos_in_the_world_%28W3%29.svg/512px-Laos_in_the_world_%28W3%29.svg.png",
  "Latvia": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Latvia_in_Europe.svg/512px-Latvia_in_Europe.svg.png",
  "Lebanon": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Lebanon_in_the_world_%28W3%29.svg/512px-Lebanon_in_the_world_%28W3%29.svg.png",
  "Lesotho": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lesotho_in_the_world_%28W3%29.svg/512px-Lesotho_in_the_world_%28W3%29.svg.png",
  "Liberia": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Liberia_in_the_world_%28W3%29.svg/512px-Liberia_in_the_world_%28W3%29.svg.png",
  "Libya": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Libya_in_the_world_%28W3%29.svg/512px-Libya_in_the_world_%28W3%29.svg.png",
  "Liechtenstein": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Liechtenstein_in_Europe.svg/512px-Liechtenstein_in_Europe.svg.png",
  "Lithuania": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Lithuania_in_Europe.svg/512px-Lithuania_in_Europe.svg.png",
  "Luxembourg": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Luxembourg_in_Europe.svg/512px-Luxembourg_in_Europe.svg.png",
  "Madagascar": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Madagascar_in_the_world_%28W3%29.svg/512px-Madagascar_in_the_world_%28W3%29.svg.png",
  "Malawi": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Malawi_in_the_world_%28W3%29.svg/512px-Malawi_in_the_world_%28W3%29.svg.png",
  "Malaysia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Malaysia_in_the_world_%28W3%29.svg/512px-Malaysia_in_the_world_%28W3%29.svg.png",
  "Maldives": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Maldives_in_the_world_%28W3%29.svg/512px-Maldives_in_the_world_%28W3%29.svg.png",
  "Mali": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mali_in_the_world_%28W3%29.svg/512px-Mali_in_the_world_%28W3%29.svg.png",
  "Malta": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Malta_in_Europe.svg/512px-Malta_in_Europe.svg.png",
  "Marshall Islands": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Marshall_Islands_in_the_world_%28W3%29.svg/512px-Marshall_Islands_in_the_world_%28W3%29.svg.png",
  "Mauritania": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mauritania_in_the_world_%28W3%29.svg/512px-Mauritania_in_the_world_%28W3%29.svg.png",
  "Mauritius": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mauritius_in_the_world_%28W3%29.svg/512px-Mauritius_in_the_world_%28W3%29.svg.png",
  "Mexico": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Mexico_in_the_world_%28W3%29.svg/512px-Mexico_in_the_world_%28W3%29.svg.png",
  "Micronesia": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Federated_States_of_Micronesia_in_the_world_%28W3%29.svg/512px-Federated_States_of_Micronesia_in_the_world_%28W3%29.svg.png",
  "Moldova": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Moldova_in_Europe.svg/512px-Moldova_in_Europe.svg.png",
  "Monaco": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Monaco_in_Europe.svg/512px-Monaco_in_Europe.svg.png",
  "Mongolia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Mongolia_in_the_world_%28W3%29.svg/512px-Mongolia_in_the_world_%28W3%29.svg.png",
  "Montenegro": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Montenegro_in_Europe.svg/512px-Montenegro_in_Europe.svg.png",
  "Morocco": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Morocco_in_the_world_%28W3%29.svg/512px-Morocco_in_the_world_%28W3%29.svg.png",
  "Mozambique": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Mozambique_in_the_world_%28W3%29.svg/512px-Mozambique_in_the_world_%28W3%29.svg.png",
  "Myanmar": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Myanmar_in_the_world_%28W3%29.svg/512px-Myanmar_in_the_world_%28W3%29.svg.png",
  "Namibia": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Namibia_in_the_world_%28W3%29.svg/512px-Namibia_in_the_world_%28W3%29.svg.png",
  "Nauru": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nauru_in_the_world_%28W3%29.svg/512px-Nauru_in_the_world_%28W3%29.svg.png",
  "Nepal": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Nepal_in_the_world_%28W3%29.svg/512px-Nepal_in_the_world_%28W3%29.svg.png",
  "Netherlands": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Netherlands_in_Europe.svg/512px-Netherlands_in_Europe.svg.png",
  "New Zealand": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/New_Zealand_in_the_world_%28W3%29.svg/512px-New_Zealand_in_the_world_%28W3%29.svg.png",
  "Nicaragua": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Nicaragua_in_the_world_%28W3%29.svg/512px-Nicaragua_in_the_world_%28W3%29.svg.png",
  "Niger": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Niger_in_the_world_%28W3%29.svg/512px-Niger_in_the_world_%28W3%29.svg.png",
  "Nigeria": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Nigeria_in_the_world_%28W3%29.svg/512px-Nigeria_in_the_world_%28W3%29.svg.png",
  "North Korea": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/North_Korea_in_the_world_%28W3%29.svg/512px-North_Korea_in_the_world_%28W3%29.svg.png",
  "North Macedonia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/North_Macedonia_in_Europe.svg/512px-North_Macedonia_in_Europe.svg.png",
  "Norway": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Norway_in_Europe.svg/512px-Norway_in_Europe.svg.png",
  "Oman": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Oman_in_the_world_%28W3%29.svg/512px-Oman_in_the_world_%28W3%29.svg.png",
  "Pakistan": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pakistan_in_the_world_%28W3%29.svg/512px-Pakistan_in_the_world_%28W3%29.svg.png",
  "Palau": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Palau_in_the_world_%28W3%29.svg/512px-Palau_in_the_world_%28W3%29.svg.png",
  "Panama": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Panama_in_the_world_%28W3%29.svg/512px-Panama_in_the_world_%28W3%29.svg.png",
  "Papua New Guinea": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Papua_New_Guinea_in_the_world_%28W3%29.svg/512px-Papua_New_Guinea_in_the_world_%28W3%29.svg.png",
  "Paraguay": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Paraguay_in_the_world_%28W3%29.svg/512px-Paraguay_in_the_world_%28W3%29.svg.png",
  "Peru": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Peru_in_the_world_%28W3%29.svg/512px-Peru_in_the_world_%28W3%29.svg.png",
  "Philippines": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Philippines_in_the_world_%28W3%29.svg/512px-Philippines_in_the_world_%28W3%29.svg.png",
  "Poland": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Poland_in_Europe.svg/512px-Poland_in_Europe.svg.png",
  "Portugal": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Portugal_in_Europe.svg/512px-Portugal_in_Europe.svg.png",
  "Qatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Qatar_in_the_world_%28W3%29.svg/512px-Qatar_in_the_world_%28W3%29.svg.png",
  "Romania": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Romania_in_Europe.svg/512px-Romania_in_Europe.svg.png",
  "Russia": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Russia_in_the_world_%28W3%29.svg/512px-Russia_in_the_world_%28W3%29.svg.png",
  "Rwanda": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Rwanda_in_the_world_%28W3%29.svg/512px-Rwanda_in_the_world_%28W3%29.svg.png",
  "Saint Kitts and Nevis": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Saint_Kitts_and_Nevis_in_the_world_%28W3%29.svg/512px-Saint_Kitts_and_Nevis_in_the_world_%28W3%29.svg.png",
  "Saint Lucia": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Saint_Lucia_in_the_world_%28W3%29.svg/512px-Saint_Lucia_in_the_world_%28W3%29.svg.png",
  "Saint Vincent and the Grenadines": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Saint_Vincent_and_the_Grenadines_in_the_world_%28W3%29.svg/512px-Saint_Vincent_and_the_Grenadines_in_the_world_%28W3%29.svg.png",
  "Samoa": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Samoa_in_the_world_%28W3%29.svg/512px-Samoa_in_the_world_%28W3%29.svg.png",
  "San Marino": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/San_Marino_in_Europe.svg/512px-San_Marino_in_Europe.svg.png",
  "Sao Tome and Principe": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sao_Tome_and_Principe_in_the_world_%28W3%29.svg/512px-Sao_Tome_and_Principe_in_the_world_%28W3%29.svg.png",
  "Saudi Arabia": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Saudi_Arabia_in_the_world_%28W3%29.svg/512px-Saudi_Arabia_in_the_world_%28W3%29.svg.png",
  "Senegal": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Senegal_in_the_world_%28W3%29.svg/512px-Senegal_in_the_world_%28W3%29.svg.png",
  "Serbia": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Serbia_in_Europe.svg/512px-Serbia_in_Europe.svg.png",
  "Seychelles": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Seychelles_in_the_world_%28W3%29.svg/512px-Seychelles_in_the_world_%28W3%29.svg.png",
  "Sierra Leone": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Sierra_Leone_in_the_world_%28W3%29.svg/512px-Sierra_Leone_in_the_world_%28W3%29.svg.png",
  "Singapore": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Singapore_in_the_world_%28W3%29.svg/512px-Singapore_in_the_world_%28W3%29.svg.png",
  "Slovakia": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Slovakia_in_Europe.svg/512px-Slovakia_in_Europe.svg.png",
  "Slovenia": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Slovenia_in_Europe.svg/512px-Slovenia_in_Europe.svg.png",
  "Solomon Islands": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Solomon_Islands_in_the_world_%28W3%29.svg/512px-Solomon_Islands_in_the_world_%28W3%29.svg.png",
  "Somalia": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Somalia_in_the_world_%28W3%29.svg/512px-Somalia_in_the_world_%28W3%29.svg.png",
  "South Africa": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/South_Africa_in_the_world_%28W3%29.svg/512px-South_Africa_in_the_world_%28W3%29.svg.png",
  "South Korea": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/South_Korea_in_the_world_%28W3%29.svg/512px-South_Korea_in_the_world_%28W3%29.svg.png",
  "South Sudan": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/South_Sudan_in_the_world_%28W3%29.svg/512px-South_Sudan_in_the_world_%28W3%29.svg.png",
  "Spain": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Spain_in_Europe.svg/512px-Spain_in_Europe.svg.png",
  "Sri Lanka": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sri_Lanka_in_the_world_%28W3%29.svg/512px-Sri_Lanka_in_the_world_%28W3%29.svg.png",
  "Sudan": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Sudan_in_the_world_%28W3%29.svg/512px-Sudan_in_the_world_%28W3%29.svg.png",
  "Suriname": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Suriname_in_the_world_%28W3%29.svg/512px-Suriname_in_the_world_%28W3%29.svg.png",
  "Sweden": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Sweden_in_Europe.svg/512px-Sweden_in_Europe.svg.png",
  "Switzerland": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Switzerland_in_Europe.svg/512px-Switzerland_in_Europe.svg.png",
  "Syria": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Syria_in_the_world_%28W3%29.svg/512px-Syria_in_the_world_%28W3%29.svg.png",
  "Taiwan": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Taiwan_in_the_world_%28W3%29.svg/512px-Taiwan_in_the_world_%28W3%29.svg.png",
  "Tajikistan": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tajikistan_in_the_world_%28W3%29.svg/512px-Tajikistan_in_the_world_%28W3%29.svg.png",
  "Tanzania": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tanzania_in_the_world_%28W3%29.svg/512px-Tanzania_in_the_world_%28W3%29.svg.png",
  "Thailand": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Thailand_in_the_world_%28W3%29.svg/512px-Thailand_in_the_world_%28W3%29.svg.png",
  "Timor-Leste": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Timor-Leste_in_the_world_%28W3%29.svg/512px-Timor-Leste_in_the_world_%28W3%29.svg.png",
  "Togo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Togo_in_the_world_%28W3%29.svg/512px-Togo_in_the_world_%28W3%29.svg.png",
  "Tonga": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Tonga_in_the_world_%28W3%29.svg/512px-Tonga_in_the_world_%28W3%29.svg.png",
  "Trinidad and Tobago": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Trinidad_and_Tobago_in_the_world_%28W3%29.svg/512px-Trinidad_and_Tobago_in_the_world_%28W3%29.svg.png",
  "Tunisia": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tunisia_in_the_world_%28W3%29.svg/512px-Tunisia_in_the_world_%28W3%29.svg.png",
  "Turkey": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Turkey_in_the_world_%28W3%29.svg/512px-Turkey_in_the_world_%28W3%29.svg.png",
  "Turkmenistan": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Turkmenistan_in_the_world_%28W3%29.svg/512px-Turkmenistan_in_the_world_%28W3%29.svg.png",
  "Tuvalu": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tuvalu_in_the_world_%28W3%29.svg/512px-Tuvalu_in_the_world_%28W3%29.svg.png",
  "Uganda": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Uganda_in_the_world_%28W3%29.svg/512px-Uganda_in_the_world_%28W3%29.svg.png",
  "Ukraine": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ukraine_in_Europe.svg/512px-Ukraine_in_Europe.svg.png",
  "United Arab Emirates": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/United_Arab_Emirates_in_the_world_%28W3%29.svg/512px-United_Arab_Emirates_in_the_world_%28W3%29.svg.png",
  "United Kingdom": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/United_Kingdom_in_Europe.svg/512px-United_Kingdom_in_Europe.svg.png",
  "United States": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/United_States_in_the_world_%28W3%29.svg/512px-United_States_in_the_world_%28W3%29.svg.png",
  "Uruguay": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Uruguay_in_the_world_%28W3%29.svg/512px-Uruguay_in_the_world_%28W3%29.svg.png",
  "Uzbekistan": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Uzbekistan_in_the_world_%28W3%29.svg/512px-Uzbekistan_in_the_world_%28W3%29.svg.png",
  "Vanuatu": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Vanuatu_in_the_world_%28W3%29.svg/512px-Vanuatu_in_the_world_%28W3%29.svg.png",
  "Vatican City": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vatican_City_in_Europe.svg/512px-Vatican_City_in_Europe.svg.png",
  "Venezuela": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Venezuela_in_the_world_%28W3%29.svg/512px-Venezuela_in_the_world_%28W3%29.svg.png",
  "Vietnam": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Vietnam_in_the_world_%28W3%29.svg/512px-Vietnam_in_the_world_%28W3%29.svg.png",
  "Yemen": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Yemen_in_the_world_%28W3%29.svg/512px-Yemen_in_the_world_%28W3%29.svg.png",
  "Zambia": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Zambia_in_the_world_%28W3%29.svg/512px-Zambia_in_the_world_%28W3%29.svg.png",
  "Zimbabwe": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zimbabwe_in_the_world_%28W3%29.svg/512px-Zimbabwe_in_the_world_%28W3%29.svg.png",
};


chrome.storage.local.get('isEnabled', (data) => {
  isEnabled = data.isEnabled;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.isEnabled) {
    isEnabled = changes.isEnabled.newValue;
  }
});

document.addEventListener('mouseover', (event) => {
  if (!isEnabled || popup) {
    return;
  }

  const text = event.target.textContent.trim();
  if (countryMap[text]) {
    popup = document.createElement('div');
    const mapImage = document.createElement('img');
    mapImage.src = countryMap[text];
    mapImage.style.width = '200px'; // You can adjust the size of the map
    mapImage.style.height = 'auto';
    popup.appendChild(mapImage);

    popup.style.position = 'absolute';
    popup.style.backgroundColor = 'yellow';
    popup.style.border = '1px solid black';
    popup.style.padding = '5px';
    popup.style.zIndex = '9999';
    popup.style.left = `${event.pageX + 10}px`;
    popup.style.top = `${event.pageY + 10}px`;
    document.body.appendChild(popup);
  }
});

document.addEventListener('mouseout', (event) => {
  if (popup) {
    popup.remove();
    popup = null;
  }
});
