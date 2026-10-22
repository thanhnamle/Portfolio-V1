type SectionHeaderProps = {
  index: string;
  title: string;
  aside?: string;
  id?: string;
};

const SectionHeader = ({ index, title, aside, id }: SectionHeaderProps) => (
  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1 pb-6 pt-20 sm:pt-24">
    <h2 id={id} className="font-heading text-2xl font-semibold uppercase tracking-[0.04em] sm:text-[2rem]">
      <span className="mr-3 font-mono text-sm font-medium text-primary">{index}</span>
      {title}
    </h2>
    {aside && <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{aside}</span>}
  </div>
);

export default SectionHeader;
