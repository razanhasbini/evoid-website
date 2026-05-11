import { useState } from "react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Rami Kronbi",
    role: "Mechatronics Engineer",
    img: "/ramy.jpg",
    desc: "Heart of Operations Management & Computer vision",
  },
  {
    name: "Razan Hasbini",
    role: "Software Engineer",
    img: "/razan.jpg",
    desc: "The newer perspective of every project",
  },
  {
    name: "Tayseer Laz",
    role: "Computer Engineer",
    img: "/tayseer.jpg",
    desc: "The guarantee that every decision and every creation is guided by data and purpose.",
  },
  {
    name: "Abou Baker Khatib",
    role: "Computer Engineer",
    img: "/abu baker.jpg",
    desc: "The passion drive after every milestone",
  },
];

const faqs = [
  {
    question: "What does the 'void' stand for",
    answer:
      "A void is an unclear issue ,or the lack of a feature that lying below an idea , business , country or company , that is stoppping it from flourishing",
  },
  {
    question: "How did Evoid start?",
    answer:
      "Evoid was born from the idea that every system has a 'void' — a missing piece that, when filled with innovation, transforms potential into excellence.",
  },
  {
    question: "What industries does Evoid work with?",
    answer:
      "From AI-driven analytics to computer vision and digital experience design, Evoid collaborates with businesses across tech, logistics, sports,food sectors, governments, med , Agriclture ,Civil Engineering , Architecture , Arts and anything that comes to mind",
  },
  {
    question: "Does Evoid offer help with finding what is missing?",
    answer:
      "Absolutely! Evoid would also come to you with an innovative offer regarding upscaling your business",
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
  
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%),radial-gradient(ellipse_at_top_left,hsl(var(--accent)/0.15),transparent_60%)] animate-pulse-glow opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20%_30%,hsl(var(--silver)),transparent),radial-gradient(2px_2px_at_70%_50%,hsl(var(--silver)/0.9),transparent),radial-gradient(1px_1px_at_50%_70%,hsl(var(--silver)/0.8),transparent)] bg-[length:300px_300px] opacity-80 animate-drift blur-[0.5px]" />

     
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-background/20">
        <div className="text-2xl font-light tracking-[0.3em] uppercase">
          <Link to="/">evoid</Link>
        </div>
        <nav className="flex gap-8">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link to="/about" className="text-sm text-primary transition-colors">
            About
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 pt-32 pb-24 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-semibold text-primary mb-10">
          About Evoid
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 leading-relaxed">
          The idea of <strong>Evoid</strong> was born from a simple observation —
          every business, system, or even person is just one void away from
          flourishing. We exist to fill that void. Whether through smart hardware, code,
          or vision, we bridge the gap between potential and reality.
        </p>

        {/* Team section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          {team.map((member) => (
            <div
              key={member.name}
              className="group relative bg-background/30 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_25px_rgba(186,147,216,0.15)] hover:shadow-[0_0_40px_rgba(186,147,216,0.35)] transition-all duration-500"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 mx-auto rounded-full object-cover mb-6 border-2 border-primary/40 group-hover:border-primary transition-all"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-4">
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.desc}
              </p>
            </div>
          ))}
        </section>

        
        <div className="mt-32 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-10">
            Why Evoid?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed mb-16">
            Because innovation is born where something is missing. We believe
            every system, every idea, and every human pursuit has a hidden void
            — a place where potential is waiting to unfold. Evoid exists to
            uncover those gaps and fill them with technology, creativity, and
            precision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {[
              {
                title: "Adaptive Innovation",
                desc: "Our solutions evolve with the world — adapting to new challenges and shifting needs, ensuring longevity and relevance.",
              },
              {
                title: "Human-Centered Design",
                desc: "Every product and experience we craft is built for real people's needs",
              },
              {
                title: "Vision Beyond Code",
                desc: "We don’t just build systems, we craft ecosystems that merge logic and imagination, turning ideas into lasting impact.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-background/40 backdrop-blur-lg rounded-2xl p-8 shadow-[0_0_25px_rgba(186,147,216,0.15)] hover:shadow-[0_0_45px_rgba(186,147,216,0.3)] transition-all duration-500 hover:-translate-y-2"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-32 text-left max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-primary mb-12">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-primary/20 border border-primary/10 rounded-2xl backdrop-blur-sm">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 cursor-pointer transition-all duration-500 hover:bg-background/40"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-foreground">
                    {faq.question}
                  </h3>
                  <span
                    className={`text-primary text-2xl transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        


        <footer className="mt-20 py-8">
  <div className="max-w-5xl mx-auto text-center px-6">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
   
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} evoid. All rights reserved.
      </p>

  
      <div className="flex gap-6 text-muted-foreground">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          title="Twitter"
        >
          <i className="fab fa-twitter text-lg"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          title="Instagram"
        >
          <i className="fab fa-instagram text-lg"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          title="LinkedIn"
        >
          <i className="fab fa-linkedin text-lg"></i>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
          title="GitHub"
        >
          <i className="fab fa-github text-lg"></i>
        </a>
      </div>
    </div>
  </div>
</footer>
      </main>
    </div>
  );
};

export default About;
