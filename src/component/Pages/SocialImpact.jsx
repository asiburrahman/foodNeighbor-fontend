import React from 'react';

const SocialImpact = () => {
    return (
        <section className="py-20 max-w-7xl mx-auto px-4 text-base-content bg-base-100">
      <h2 className="text-3xl md:text-5xl font-black text-center mb-20 leading-tight">
        A food sharing platform with{' '}
        <span className="text-gradient">game-changing</span>{' '}
        <span className="text-primary italic">social impact</span>
      </h2>

      <div className="space-y-32">
        {/* Item 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative group">
                <img
                  src="/hungry1.jpg"
                  alt="Mom feeding child"
                  className="rounded-[2.5rem] shadow-2xl premium-shadow group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="badge badge-primary badge-outline font-bold tracking-widest uppercase text-[10px] px-4 py-3">Community Love</div>
              <h3 className="text-3xl font-black leading-tight ">Be a <span className="text-primary">force for good</span> in your local community.</h3>
              <p className="text-base-content/60 text-lg leading-relaxed">
                Thanks to your spare food, families nearby can eat dinner that day (rather than going without). It's neighborly love at its best.
              </p>
            </div>
        </div>

        {/* Item 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="badge badge-secondary badge-outline font-bold tracking-widest uppercase text-[10px] px-4 py-3">Sustainability</div>
              <h3 className="text-3xl font-black leading-tight">Supercharge your <span className="text-secondary">sustainability</span> agenda.</h3>
              <p className="text-base-content/60 text-lg leading-relaxed">
                We'll make sure our work together is helping you progress faster towards ESG and Net Zero targets while keeping the environment clean.
              </p>
            </div>
            <div className="relative group">
                <img
                  src="/computer.png"
                  alt="Sustainability dashboard"
                  className="rounded-[2.5rem] shadow-2xl premium-shadow group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
            </div>
        </div>

        {/* Item 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
                <img
                  src="/support.jpg"
                  alt="Staff sharing food"
                  className="rounded-[2.5rem] shadow-2xl premium-shadow group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
            </div>
            <div className="space-y-6">
              <div className="badge badge-accent badge-outline font-bold tracking-widest uppercase text-[10px] px-4 py-3">Employee Wellness</div>
              <h3 className="text-3xl font-black leading-tight">Delight and <span className="text-accent">retain your employees</span>.</h3>
              <p className="text-base-content/60 text-lg leading-relaxed">
                Staff feel amazing knowing their employer is stepping up to support people struggling. It builds a purpose-driven workplace.
              </p>
            </div>
        </div>

        {/* Item 4 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                  <h3 className="text-3xl font-black leading-tight">Sleep easy knowing your food is <span className="text-primary underline decoration-primary/30">always kept safe</span>.</h3>
                  <p className="text-base-content/60 text-lg leading-relaxed">
                    Each month we share millions of meals, without a single confirmed food poisoning incident to date. Safety is our DNA.
                  </p>
              </div>
              <button className="btn btn-primary btn-lg rounded-full px-10 text-white shadow-lg hover:shadow-primary/20">Tell me more</button>
            </div>
            <div className="relative group">
                <img
                  src="/carryfood.png"
                  alt="Food delivery walking"
                  className="rounded-[2.5rem] shadow-2xl premium-shadow group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
            </div>
        </div>
      </div>
    </section>
    );
};

export default SocialImpact;