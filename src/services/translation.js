import * as Localization from "expo-localization";
import i18n from "i18n-js";
import english from "../locales/en";
import israel from "../locales/il";
// Set the key-value pairs for the different languages you want to support.
// export const translate = () => {
i18n.translations = {
  en: english,
  il: israel,
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

//   return i18n;
export default i18n;
// };

// import LocalizedStrings from "react-native-localization";
// import english from "../locales/en";
// import israel from "../locales/il";

// export const strings = new LocalizedStrings({
//   en: english,
//   il: israel,
// });

// export const changeLaguage = (languageKey) => {
//   strings.setLanguage(languageKey);
// };

// export const translate = (en, il) => {
//   strings.setContent({ en: en, il, il });
// };
