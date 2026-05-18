import { useContext } from "react";
import LanguageContext from "./i18n";

export const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
