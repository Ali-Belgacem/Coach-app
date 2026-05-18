// @refresh reset
import React, { createContext, useEffect, useState } from "react";

const translations = {
  en: {
    // Navbar / sections
    home: "Home",
    program: "Program",
    transformation: "Transformation",
    "about-us": "About Us",
    subscribe: "Subscribe",

    // Home
    "Professional Online Coaching": "Professional Online Coaching",
    "TRANSFORM YOUR BODY": "TRANSFORM YOUR BODY",
    "WITH COACH FARES": "WITH COACH FARES",
    "YOUR FUTURE STARTS TODAY": "YOUR FUTURE STARTS TODAY",
    "START NOW": "START NOW",
    "BOOK A SESSION": "BOOK A SESSION",
    Scroll: "Scroll",

    // About
    "WHO IS COACH FARES?": "WHO IS COACH FARES?",
    "IFBB PRO COACH": "IFBB PRO COACH",
    "Internationally Certified Nutritionist":
      "Internationally Certified Nutritionist",
    "Helped 200+ clients achieve their fitness goals":
      "Helped 200+ clients achieve their fitness goals",
    "Specialist in lifestyle transformation programs":
      "Specialist in lifestyle transformation programs",
    "Personal trainer for competitive athletes":
      "Personal trainer for competitive athletes",
    "My Certificates": "My Certificates",
    "Official Credentials": "Official Credentials",

    // Programme
    "Daily planning train": "Daily planning train",
    "Cardio programme": "Cardio programme",
    "Daily follow-up via WhatsApp": "Daily follow-up via WhatsApp",
    "Crossfit planning": "Crossfit planning",
    "Our Training Plans": "Our Training Plans",
    "TRAINING PROGRAMMES": "TRAINING PROGRAMMES",

    // Transformation
    "Real Results": "Real Results",
    "CLIENT TRANSFORMATIONS": "CLIENT TRANSFORMATIONS",
    "More than ": "More than ",
    "satisfied clients": "satisfied clients",
    BEFORE: "BEFORE",
    AFTER: "AFTER",

    // Footer
    "COACH FARES": "COACH FARES",
    "Professional fitness coaching — transform your body and mindset with certified IFBB Pro trainer.":
      "Professional fitness coaching — transform your body and mindset with certified IFBB Pro trainer.",
    "Quick Links": "Quick Links",
    "Get in Touch": "Get in Touch",
    "Ready to start your transformation? Book a free consultation today.":
      "Ready to start your transformation? Book a free consultation today.",
    "💬 WhatsApp Us": "💬 WhatsApp Us",
    "©": "©",

    // Subscribe / Pricing
    "Pricing Plans": "Pricing Plans",
    "CHOOSE YOUR PLAN": "CHOOSE YOUR PLAN",
    "Select the plan that fits your goals and budget":
      "Select the plan that fits your goals and budget",
    "Loading transformations...": "Loading transformations...",
    Client: "Client",
    "Basic Pack": "Basic Pack",
    "Premium Pack": "Premium Pack",
    "Elite Pack": "Elite Pack",
    "CHOOSE PLAN": "CHOOSE PLAN",

    // Pricing features - English (keys match full English strings used in code)
    "Diet: Customized nutrition plan adapted to your goals":
      "Diet: Customized nutrition plan adapted to your goals",
    "Plan Workout: Structured training program designed for you":
      "Plan Workout: Structured training program designed for you",
    "Answer Basic Questions: Direct support for your essential queries":
      "Answer Basic Questions: Direct support for your essential queries",

    "24/7 Service: Round-the-clock support for all your needs":
      "24/7 Service: Round-the-clock support for all your needs",
    "Guiding supplements vitamins: Expert advice on supplementation":
      "Guiding supplements vitamins: Expert advice on supplementation",
    "Nutrition: Comprehensive nutritional guidance":
      "Nutrition: Comprehensive nutritional guidance",
    "Answer questions every day at any time: Unlimited consulting access":
      "Answer questions every day at any time: Unlimited consulting access",
    "Planing workout: Evolving customized training schedules":
      "Planing workout: Evolving customized training schedules",
    "Planing diet every week: Weekly adjustments to your meal plan":
      "Planing diet every week: Weekly adjustments to your meal plan",

    "All Features of Premium Included: Everything from the Premium Pack plus premium services":
      "All Features of Premium Included: Everything from the Premium Pack plus premium services",
    "Daily Coaching: Personalized daily support to keep you motivated and on track":
      "Daily Coaching: Personalized daily support to keep you motivated and on track",
    "Competition Program & In-Person Sessions: Exclusive face-to-face consultations":
      "Competition Program & In-Person Sessions: Exclusive face-to-face consultations",
    "Ultimate Support: Designed for individuals committed to exceptional results":
      "Ultimate Support: Designed for individuals committed to exceptional results",

    // Confirme / Form
    "Entrez vos informations": "Enter your information",
    Prénom: "First name",
    Nom: "Last name",
    "Numéro de téléphone": "Phone number",
    Email: "Email",
    "Date de naissance": "Date of birth",
    "Upload Image": "Upload Image",
    "Cliquez pour uploader ou glisser-déposer":
      "Click to upload or drag & drop",
    "PNG, JPG (MAX. 5MB)": "PNG, JPG (MAX. 5MB)",
    "Envoi en cours...": "Submitting...",
    Confirmer: "Confirm",
    "Veuillez remplir tous les champs et sélectionner une image":
      "Please fill all fields and select an image",
    "Informations enregistrées avec succès !":
      "Information saved successfully!",
    "Une erreur est survenue lors de l'envoi des données":
      "An error occurred while sending data",

    // Cards / mock data titles (will be used as keys)
    "Cardio planing": "Cardio planning",
    "Crosfit-programme": "Crossfit programme",
    "Trainig plan": "Training plan",
    "Diet of your choice": "Diet of your choice",

    // Transformation durations
    "12 weeks": "12 weeks",
    "8 weeks": "8 weeks",
    "16 weeks": "16 weeks",
    "10 weeks": "10 weeks",
  },
  ar: {
    // Navbar / sections
    home: "الرئيسية",
    program: "البرنامج",
    transformation: "التحويلات",
    "about-us": "من نحن",
    subscribe: "اشترك",

    // Home
    "Professional Online Coaching": "تدريب احترافي أونلاين",
    "TRANSFORM YOUR BODY": "حوّل جسدك",
    "WITH COACH FARES": "مع المدرب فارس",
    "YOUR FUTURE STARTS TODAY": "مستقبلك يبدأ اليوم",
    "START NOW": "ابدأ الآن",
    "BOOK A SESSION": "حجز جلسة",
    Scroll: "مرر",

    // About
    "WHO IS COACH FARES?": "من هو المدرب فارس؟",
    "IFBB PRO COACH": "مدرب IFBB محترف",
    "Internationally Certified Nutritionist": "أخصائي تغذية معتمد دولياً",
    "Helped 200+ clients achieve their fitness goals":
      "ساعد أكثر من 200 عميل على تحقيق أهدافهم",
    "Specialist in lifestyle transformation programs":
      "متخصص في برامج تحويل نمط الحياة",
    "Personal trainer for competitive athletes": "مدرب شخصي للرياضيين",
    "My Certificates": "شهاداتي",
    "Official Credentials": "الاعتمادات الرسمية",

    // Programme
    "Daily planning train": "تخطيط تدريبي يومي",
    "Cardio programme": "برنامج كارديو",
    "Daily follow-up via WhatsApp": "متابعة يومية عبر واتساب",
    "Crossfit planning": "تخطيط كروسفيت",
    "Our Training Plans": "خطط التدريب لدينا",
    "TRAINING PROGRAMMES": "برامج التدريب",

    // Transformation
    "Real Results": "نتائج حقيقية",
    "CLIENT TRANSFORMATIONS": "تحويلات العملاء",
    "More than ": "أكثر من ",
    "satisfied clients": "عملاء راضون",
    BEFORE: "قبل",
    AFTER: "بعد",

    // Footer
    "COACH FARES": "المدرب فارس",
    "Professional fitness coaching — transform your body and mindset with certified IFBB Pro trainer.":
      "تدريب لياقة احترافي — حوّل جسدك وعقليتك مع مدرب IFBB معتمد.",
    "Quick Links": "روابط سريعة",
    "Get in Touch": "تواصل معنا",
    "Ready to start your transformation? Book a free consultation today.":
      "هل ترغب ببدء تحويلك؟ احجز استشارة مجانية اليوم.",
    "💬 WhatsApp Us": "💬 مراسلتنا على واتساب",
    "©": "©",

    // Subscribe / Pricing
    "Pricing Plans": "خطط الأسعار",
    "CHOOSE YOUR PLAN": "اختر خطتك",
    "Select the plan that fits your goals and budget":
      "اختر الخطة التي تناسب أهدافك وميزانيتك",
    "Loading transformations...": "جارٍ تحميل التحويلات...",
    Client: "العميل",
    "Basic Pack": "الباقة الأساسية",
    "Premium Pack": "الباقة الممتازة",
    "Elite Pack": "الباقة المميزة",
    "CHOOSE PLAN": "اختر الخطة",

    // Confirme / Form
    "Entrez vos informations": "أدخل معلوماتك",
    Prénom: "الاسم الأول",
    Nom: "اسم العائلة",
    "Numéro de téléphone": "رقم الهاتف",
    Email: "البريد الإلكتروني",
    "Date de naissance": "تاريخ الميلاد",
    "Upload Image": "رفع صورة",
    "Cliquez pour uploader ou glisser-déposer": "اضغط للرفع أو اسحب وأفلت",
    "PNG, JPG (MAX. 5MB)": "PNG, JPG (الحد الأقصى 5 ميغابايت)",
    "Envoi en cours...": "جاري الإرسال...",
    Confirmer: "تأكيد",
    "Veuillez remplir tous les champs et sélectionner une image":
      "يرجى ملء جميع الحقول واختيار صورة",
    "Informations enregistrées avec succès !": "تم حفظ المعلومات بنجاح!",
    "Une erreur est survenue lors de l'envoi des données":
      "حدث خطأ أثناء إرسال البيانات",

    // Cards / mock data titles
    "Cardio planing": "تخطيط الكارديو",
    "Crosfit-programme": "برنامج كروسفيت",
    "Trainig plan": "خطة تدريب",
    "Diet of your choice": "نظام غذائي حسب اختيارك",

    // Transformation durations
    "12 weeks": "12 أسبوعًا",
    "8 weeks": "8 أسابيع",
    "16 weeks": "16 أسبوعًا",
    "10 weeks": "10 أسابيع",
    // Pricing features - Arabic
    "Diet: Customized nutrition plan adapted to your goals":
      "حِمية: خطة تغذية مخصصة تتناسب مع أهدافك",
    "Plan Workout: Structured training program designed for you":
      "خطة تدريب: برنامج تدريبي منظم مصمم لك",
    "Answer Basic Questions: Direct support for your essential queries":
      "الإجابة على الأسئلة الأساسية: دعم مباشر لاستفساراتك الأساسية",

    "24/7 Service: Round-the-clock support for all your needs":
      "خدمة 24/7: دعم مستمر لجميع احتياجاتك",
    "Guiding supplements vitamins: Expert advice on supplementation":
      "ارشاد المكملات والفيتامينات: نصائح خبراء حول المكملات",
    "Nutrition: Comprehensive nutritional guidance":
      "التغذية: إرشاد غذائي شامل",
    "Answer questions every day at any time: Unlimited consulting access":
      "الرد على الأسئلة يوميًا في أي وقت: وصول استشاري غير محدود",
    "Planing workout: Evolving customized training schedules":
      "تخطيط التمرين: جداول تدريب مخصصة تتطور مع تقدمك",
    "Planing diet every week: Weekly adjustments to your meal plan":
      "تخطيط النظام الغذائي كل أسبوع: تعديلات أسبوعية على نظامك الغذائي",

    "All Features of Premium Included: Everything from the Premium Pack plus premium services":
      "جميع ميزات الباقة الممتازة: كل شيء من الباقة الممتازة بالإضافة إلى خدمات مميزة",
    "Daily Coaching: Personalized daily support to keep you motivated and on track":
      "تدريب يومي: دعم يومي شخصي للحفاظ على تحفيزك وتقدمك",
    "Competition Program & In-Person Sessions: Exclusive face-to-face consultations":
      "برنامج المسابقات وجلسات حضور شخصي: استشارات وجهًا لوجه حصرية",
    "Ultimate Support: Designed for individuals committed to exceptional results":
      "الدعم النهائي: مصمم للأفراد الملتزمين بنتائج استثنائية",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore storage errors
    }
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  const t = (key) =>
    translations[lang] && translations[lang][key]
      ? translations[lang][key]
      : key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
