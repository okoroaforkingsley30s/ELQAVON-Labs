import { ShieldCheck, Cpu, Workflow, Users } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Security-first engineering with scalable, reliable, and maintainable software solutions."
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    description:
      "Building with modern architectures, cloud technologies, AI, APIs, and enterprise platforms."
  },
  {
    icon: Workflow,
    title: "End-to-End Delivery",
    description:
      "From consulting and architecture to implementation, integration, deployment, and long-term support."
  },
  {
    icon: Users,
    title: "Business Partnership",
    description:
      "We work as long-term technology partners focused on solving business challenges—not just delivering code."
  }
];

export default function WhyElqavon() {
  return (
    <section className="pt-14 pb-24 lg:pt-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs">
            Why ELQAVON
          </span>

          <h2 className="mt-4 text-4xl font-bold text-secondary">
            Enterprise Technology Built Around Business Outcomes
          </h2>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            We combine software engineering, technology consulting,
            cloud infrastructure, artificial intelligence and enterprise
            integration to help organizations build secure, scalable and
            future-ready digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="glass rounded-2xl p-6"
            >
              <item.icon className="w-8 h-8 text-primary mb-5" />

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
