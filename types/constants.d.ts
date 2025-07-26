interface IBlog {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  title: string;
  description: string;
}

interface IFeature {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

interface IFaq {
  question: string;
  answer: string;
}
