export function formatTimeAgo(timestamp: string, locale: "en" | "ar" = "en"): string {
    const date = new Date(timestamp);
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    const translations = {
      en: {
        seconds: "seconds ago",
        minutes: "minutes ago",
        hours: "hours ago",
        days: "days ago",
        weeks: "weeks ago",
        months: "months ago",
        years: "years ago",
      },
      ar: {
        seconds: "ثواني مضت",
        minutes: "دقائق مضت",
        hours: "ساعات مضت",
        days: "أيام مضت",
        weeks: "أسابيع مضت",
        months: "أشهر مضت",
        years: "سنوات مضت",
      },
    };
  
    if (secondsAgo < 60) {
      return `${secondsAgo} ${translations[locale].seconds}`;
    }
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} ${translations[locale].minutes}`;
    }
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} ${translations[locale].hours}`;
    }
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return `${daysAgo} ${translations[locale].days}`;
    }
    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return `${weeksAgo} ${translations[locale].weeks}`;
    }
    const monthsAgo = Math.floor(weeksAgo / 4);
    if (monthsAgo < 12) {
      return `${monthsAgo} ${translations[locale].months}`;
    }
    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo} ${translations[locale].years}`;
  }
  