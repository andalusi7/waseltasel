import { useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { useStrapiData } from "@/hooks/useStrapiData";

interface Statistic {
  id: number;
  documentId: string;
  number: number;
  text: string;
  suffix?: string | null;
}

export default function ImpactCard() {
  const locale = useLocale();

  const {
    data: statistics,
    loading,
    error,
  } = useStrapiData<Statistic>("statistics", locale);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!statistics || statistics.length === 0) return <p>No data available.</p>;

  return (
    <Card className="p-8 bg-[#FFF5F2] border-[#FFE4DC]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        {statistics.slice(0, 3).map((stat) => (
          <div className="text-center" key={stat.id}>
            <div className="flex flex-col">
              <div className="flex items-end justify-center">
                <p className="text-[#FF6600] text-[80px] font-bold leading-none">
                  +{stat.number}
                </p>
                {stat.suffix && (
                  <span className="text-[#FF6600] text-xl m-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p>{stat.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {statistics.slice(3, 5).map((stat) => (
          <div className="text-center" key={stat.id}>
            <div className="flex flex-col">
              <div className="flex items-end justify-center">
                <p className="text-[#FF6600] text-[80px] font-bold leading-none">
                  +{stat.number}
                </p>
                {stat.suffix && (
                  <span className="text-[#FF6600] text-xl m-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p>{stat.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
