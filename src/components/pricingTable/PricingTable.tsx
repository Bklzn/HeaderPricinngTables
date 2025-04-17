import { useEffect } from "react";
import { animate, stagger } from "motion";
import { Check } from "lucide-react";
import { motion } from "motion/react";

interface BenefitProps {
  name: string;
  avaliable: boolean;
}

interface PriceBoxProps {
  name: string;
  price: number;
  benefits: BenefitProps[];
  highlighted?: boolean;
}

const benefits: BenefitProps[] = [
  {
    name: "2 GB of hosting space",
    avaliable: true,
  },
  {
    name: "14 days of free backups",
    avaliable: true,
  },
  {
    name: "Social integrations",
    avaliable: true,
  },
  {
    name: "Advanced client billing",
    avaliable: true,
  },
];
const pricingPlans: PriceBoxProps[] = [
  {
    name: "Start",
    price: 19,
    benefits: benefits.map((b, i) => (i > 1 ? { ...b, avaliable: false } : b)),
  },
  {
    name: "Enterprise",
    price: 49,
    benefits: benefits.map((b, i) => (i > 2 ? { ...b, avaliable: false } : b)),
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 99,
    benefits,
  },
];

const PricingBox: React.FC<PriceBoxProps & { index: number }> = ({
  name,
  price,
  benefits,
  highlighted,
  index,
}) => {
  useEffect(() => {
    animate(
      `.pricing-box-${index}`,
      { opacity: [0, 1], y: [40, 0] },
      { duration: 0.4, delay: index * 0.15 }
    );
    animate("li", { opacity: [0, 1] }, { delay: stagger(0.2) });
  }, [index]);

  return (
    <div className={`max-w-[360px] pricing-box-${index}`}>
      <div
        className={`${
          highlighted
            ? "text-white bg-[#2F1893] border-[#2F1893]"
            : "border-[#EBEAED]"
        } border-2 rounded-[10px] py-10 px-6 lg:px-12 text-center`}
      >
        <h3
          className={`pb-10 text-${
            highlighted ? "white" : "[#1E0E62]"
          } uppercase tracking-[2px] font-bold`}
        >
          {name}
        </h3>
        <div
          className={`flex flex-row justify-center items-center gap-4 text-${
            highlighted ? "white" : "[#1E0E62]"
          } pb-10 max-h-[100px]`}
        >
          <div className="self-start">$</div>
          <div className="text-[58px] font-bold pe-3">
            <span>{price}</span>
          </div>
          <div className="text-start">
            per user
            <br />
            per month
          </div>
        </div>
        <p>
          All the features you need to keep your personal files safe,
          accessible, and easy to share.
        </p>
      </div>
      <ul className="grid pt-10 max-w-[200px] mx-auto py-8 space-y-2">
        {benefits.map((item, index) => (
          <li key={index} className={!item.avaliable ? "text-gray-200" : ""}>
            <Check
              className={`text-[#25DAC5] inline w-[16px] me-2 ${
                !item.avaliable ? "opacity-0" : ""
              }`}
            />
            {item.name}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${
          highlighted
            ? "bg-[#25DAC5] text-white border-[#25DAC5]"
            : "bg-white text-[#1E0E62] border-[#EBEAED]"
        } border-2 font-semibold px-7 py-[9px] rounded-full hover:cursor-pointer block mx-auto`}
      >
        Start Free Trial
      </motion.button>
    </div>
  );
};

const PricingTable: React.FC = () => {
  return (
    <div className="pt-25 pb-10 text-[#15143966]">
      <h1 className="text-[42px] text-[#1E0E62] font-bold max-w-[550px] mx-auto text-center leading-13 pb-6">
        Simple & flexible pricing built for everyone
      </h1>
      <p className="text-center pb-15">
        Start with 14-day free trial. No credit card needed. Cancel at anytime.
      </p>

      <div className="max-w-6xl w-full mx-auto flex flex-row flex-wrap lg:flex-nowrap justify-center gap-8 gap-y-25">
        {pricingPlans.map((plan, index) => (
          <PricingBox key={index} index={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
