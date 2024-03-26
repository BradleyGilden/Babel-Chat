const langs = {
  "Afrikaans": "af",
  "Albanian": "sq",
  "Amharic": "am",
  "Arabic": "ar",
  "Armenian": "hy",
  "Azerbaijani": "az",
  "Basque": "eu",
  "Belarusian": "be",
  "Bengali": "bn",
  "Bosnian": "bs",
  "Bulgarian": "bg",
  "Catalan": "ca",
  "Cebuano": "ceb",
  "Chinese (Simplified)": "zh-CN",
  "Chinese (Traditional)": "zh-TW",
  "Corsican": "co",
  "Croatian": "hr",
  "Czech": "cs",
  "Danish": "da",
  "Dutch": "nl",
  "English": "en",
  "Esperanto": "eo",
  "Estonian": "et",
  "Finnish": "fi",
  "French": "fr",
  "Frisian": "fy",
  "Galician": "gl",
  "Georgian": "ka",
  "German": "de",
  "Greek": "el",
  "Gujarati": "gu",
  "Haitian Creole": "ht",
  "Hausa": "ha",
  "Hawaiian": "haw",
  "Hebrew": "iw",
  "Hindi": "hi",
  "Hmong": "hmn",
  "Hungarian": "hu",
  "Icelandic": "is",
  "Igbo": "ig",
  "Indonesian": "id",
  "Irish": "ga",
  "Italian": "it",
  "Japanese": "ja",
  "Javanese": "jw",
  "Kannada": "kn",
  "Kazakh": "kk",
  "Khmer": "km",
  "Korean": "ko",
  "Kurdish": "ku",
  "Kyrgyz": "ky",
  "Lao": "lo",
  "Latin": "la",
  "Latvian": "lv",
  "Lithuanian": "lt",
  "Luxembourgish": "lb",
  "Macedonian": "mk",
  "Malagasy": "mg",
  "Malay": "ms",
  "Malayalam": "ml",
  "Maltese": "mt",
  "Maori": "mi",
  "Marathi": "mr",
  "Mongolian": "mn",
  "Myanmar (Burmese)": "my",
  "Nepali": "ne",
  "Norwegian": "no",
  "Nyanja (Chichewa)": "ny",
  "Pashto": "ps",
  "Persian": "fa",
  "Polish": "pl",
  "Portuguese (Portugal, Brazil)": "pt",
  "Punjabi": "pa",
  "Romanian": "ro",
  "Russian": "ru",
  "Samoan": "sm",
  "Scots Gaelic": "gd",
  "Serbian": "sr",
  "Sesotho": "st",
  "Shona": "sn",
  "Sindhi": "sd",
  "Sinhala (Sinhalese)": "si",
  "Slovak": "sk",
  "Slovenian": "sl",
  "Somali": "so",
  "Spanish": "es",
  "Sundanese": "su",
  "Swahili": "sw",
  "Swedish": "sv",
  "Tagalog (Filipino)": "tl",
  "Tajik": "tg",
  "Tamil": "ta",
  "Telugu": "te",
  "Thai": "th",
  "Turkish": "tr",
  "Ukrainian": "uk",
  "Urdu": "ur",
  "Uzbek": "uz",
  "Vietnamese": "vi",
  "Welsh": "cy",
  "Xhosa": "xh",
  "Yiddish": "yi",
  "Yoruba": "yo",
  "Zulu": "zu",
  "Afrikaans (South Africa)": "af-ZA",
  "Amharic (Ethiopia)": "am-ET",
  "Armenian (Armenia)": "hy-AM",
  "Azerbaijani (Azerbaijan)": "az-AZ",
  "Indonesian (Indonesia)": "id-ID",
  "Malay (Malaysia)": "ms-MY",
  "Bengali (Bangladesh)": "bn-BD",
  "Bengali (India)": "bn-IN",
  "Catalan (Spain)": "ca-ES",
  "Czech (Czech Republic)": "cs-CZ",
  "Danish (Denmark)": "da-DK",
  "German (Germany)": "de-DE",
  "English (Australia)": "en-AU",
  "English (Canada)": "en-CA",
  "English (Ghana)": "en-GH",
  "English (United Kingdom)": "en-GB",
  "English (India)": "en-IN",
  "English (Ireland)": "en-IE",
  "English (Kenya)": "en-KE",
  "English (New Zealand)": "en-NZ",
  "English (Nigeria)": "en-NG",
  "English (Philippines)": "en-PH",
  "English (Singapore)": "en-SG",
  "English (South Africa)": "en-ZA",
  "English (Tanzania)": "en-TZ",
  "English (United States)": "en-US",
  "Spanish (Argentina)": "es-AR",
  "Spanish (Bolivia)": "es-BO",
  "Spanish (Chile)": "es-CL",
  "Spanish (Colombia)": "es-CO",
  "Spanish (Costa Rica)": "es-CR",
  "Spanish (Ecuador)": "es-EC",
  "Spanish (El Salvador)": "es-SV",
  "Spanish (Spain)": "es-ES",
  "Spanish (United States)": "es-US",
  "Spanish (Guatemala)": "es-GT",
  "Spanish (Honduras)": "es-HN",
  "Spanish (Mexico)": "es-MX",
  "Spanish (Nicaragua)": "es-NI",
  "Spanish (Panama)": "es-PA",
  "Spanish (Paraguay)": "es-PY",
  "Spanish (Peru)": "es-PE",
  "Spanish (Puerto Rico)": "es-PR",
  "Spanish (Dominican Republic)": "es-DO",
  "Spanish (Uruguay)": "es-UY",
  "Spanish (Venezuela)": "es-VE",
  "Basque (Spain)": "eu-ES",
  "Filipino (Philippines)": "fil-P",
  "French (Canada)": "fr-CA",
  "French (France)": "fr-FR",
  "Galician (Spain)": "gl-ES",
  "Georgian (Georgia)": "ka-GE",
  "Gujarati (India)": "gu-IN",
  "Croatian (Croatia)": "hr-HR",
  "Zulu (South Africa)": "zu-ZA",
  "Icelandic (Iceland)": "is-IS",
  "Italian (Italy)": "it-IT",
  "Javanese (Indonesia)": "jv-ID",
  "Kannada (India)": "kn-IN",
  "Khmer (Cambodia)": "km-KH",
  "Lao (Laos)": "lo-LA",
  "Latvian (Latvia)": "lv-LV",
  "Lithuanian (Lithuania)": "lt-LT",
  "Hungarian (Hungary)": "hu-HU",
  "Malayalam (India)": "ml-IN",
  "Marathi (India)": "mr-IN",
  "Dutch (Netherlands)": "nl-NL",
  "Nepali (Nepal)": "ne-NP",
  "Norwegian Bokmål (Norway)": "nb-NO",
  "Polish (Poland)": "pl-PL",
  "Portuguese (Brazil)": "pt-BR",
  "Portuguese (Portugal)": "pt-PT",
  "Romanian (Romania)": "ro-RO",
  "Sinhala (Sri Lanka)": "si-LK",
  "Slovak (Slovakia)": "sk-SK",
  "Slovenian (Slovenia)": "sl-SI",
  "Sundanese (Indonesia)": "su-ID",
  "Swahili (Tanzania)": "sw-TZ",
  "Swahili (Kenya)": "sw-KE",
  "Finnish (Finland)": "fi-FI",
  "Swedish (Sweden)": "sv-SE",
  "Tamil (India)": "ta-IN",
  "Tamil (Singapore)": "ta-SG",
  "Tamil (Sri Lanka)": "ta-LK",
  "Tamil (Malaysia)": "ta-MY",
  "Telugu (India)": "te-IN",
  "Vietnamese (Vietnam)": "vi-VN",
  "Turkish (Turkey)": "tr-TR",
  "Urdu (Pakistan)": "ur-PK",
  "Urdu (India)": "ur-IN",
  "Greek (Greece)": "el-GR",
  "Bulgarian (Bulgaria)": "bg-BG",
  "Russian (Russia)": "ru-RU",
  "Serbian (Serbia)": "sr-RS",
  "Ukrainian (Ukraine)": "uk-UA",
  "Hebrew (Israel)": "he-IL",
  "Arabic (Israel)": "ar-IL",
  "Arabic (Jordan)": "ar-JO",
  "Arabic (United Arab Emirates)": "ar-AE",
  "Arabic (Bahrain)": "ar-BH",
  "Arabic (Algeria)": "ar-DZ",
  "Arabic (Saudi Arabia)": "ar-SA",
  "Arabic (Iraq)": "ar-IQ",
  "Arabic (Kuwait)": "ar-KW",
  "Arabic (Morocco)": "ar-MA",
  "Arabic (Tunisia)": "ar-TN",
  "Arabic (Oman)": "ar-OM",
  "Arabic (State of Palestine)": "ar-PS",
  "Arabic (Qatar)": "ar-QA",
  "Arabic (Lebanon)": "ar-LB",
  "Arabic (Egypt)": "ar-EG",
  "Persian (Iran)": "fa-IR",
  "Hindi (India)": "hi-IN",
  "Thai (Thailand)": "th-TH",
  "Korean (South Korea)": "ko-KR",
  "Chinese, Mandarin (Traditional, Taiwan)": "zh-TW",
  "Chinese, Cantonese (Traditional, Hong Kong)": "yue-Hant-HK",
  "Japanese (Japan)": "ja-JP",
  "Chinese, Mandarin (Simplified, Hong Kong)": "zh-HK",
  "Chinese, Mandarin (Simplified, China)": "zh",
}

export default langs;
