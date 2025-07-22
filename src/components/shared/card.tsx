export interface ICard {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function Card({ Icon, title, description }: ICard) {
  return (
    <div className="w-full p-5 rounded-lg bg-green-50 text-green-500 flex flex-col justify-center items-center gap-y-4">
      <div className="flex justify-center items-center gap-x-4">
        <Icon />
        <p>{title}</p>
      </div>
      <p className="text-sm font-light">{description}</p>
    </div>
  );
}
