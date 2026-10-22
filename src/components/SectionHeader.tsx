type SectionHeaderProps = {
  index: string;
  title: string;
  aside?: string;
  id?: string;
};

const SectionHeader = ({ index, title, aside, id }: SectionHeaderProps) => (
  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1 pb-4 pt-10">
    <h2 id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
      <span className="mr-3 font-mono text-sm font-medium text-primary">{index}</span>
      {title}
    </h2>
    {aside && <span className="font-mono text-xs text-muted-foreground">{aside}</span>}
  </div>
);

export default SectionHeader;
