import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Layers,
  Box,
  Users,
  CheckCircle2,
  Sparkles,
  MonitorSmartphone,
  SlidersHorizontal,
  FolderKanban,
} from 'lucide-react';

import heroImg from '../assets/images/hero-room.jpg';
import showcase1 from '../assets/images/showcase-1.jpg';
import showcase2 from '../assets/images/showcase-2.jpg';
import showcase3 from '../assets/images/showcase-3.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] font-sans text-slate-900 selection:bg-[#C96A2B]/20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#C96A2B] px-3 py-2 text-sm font-bold text-white shadow-lg shadow-orange-700/20">
              V
            </div>
            <span className="text-lg font-semibold tracking-tight uppercase sm:text-xl">
              Visionary<span className="font-light">Interiors</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-slate-600">
            <a href="#features" className="transition hover:text-[#C96A2B]">
              Features
            </a>
            <a href="#workflow" className="transition hover:text-[#C96A2B]">
              Workflow
            </a>
            <a href="#why-us" className="transition hover:text-[#C96A2B]">
              Why Us
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="hidden sm:block text-xs font-medium uppercase tracking-wider text-slate-700 transition hover:text-[#C96A2B]"
            >
              Customer Login
            </Link>

            <Link
              to="/designer-login"
              className="hidden sm:block text-xs font-medium uppercase tracking-wider text-slate-700 transition hover:text-[#C96A2B]"
            >
              Designer Login
            </Link>

            <Link
              to="/designer-login"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-300 transition hover:bg-[#C96A2B] hover:scale-[1.02] active:scale-95"
            >
              Start designing
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F8F6F3] via-[#EFE9E1] to-[#E8DED4] px-6 py-16 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="z-10 space-y-8">
            <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C96A2B]">
              HCI Group Project 111
            </div>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-8xl">
              Plan in 2D. <br />
              <span className="font-light italic text-slate-500">Present in 3D.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              A smart furniture design workspace for interior designers to build room layouts,
              arrange furniture, and preview spaces in an immersive 3D environment.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/designer-login"
                className="group flex items-center gap-3 rounded-2xl bg-[#C96A2B] px-8 py-4 text-sm font-semibold text-white shadow-2xl shadow-orange-200 transition hover:bg-[#B95D20]"
              >
                Designer login
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/login"
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-800 transition hover:border-[#C96A2B] hover:text-[#C96A2B]"
              >
                Customer login
              </Link>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              <FeaturePill text="Interactive 2D room planning" />
              <FeaturePill text="Real-time 3D visualization" />
              <FeaturePill text="Furniture editing controls" />
              <FeaturePill text="Save and manage projects" />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#C96A2B]/20 to-transparent blur-2xl opacity-50 transition group-hover:opacity-80" />
            <div className="relative h-[350px] overflow-hidden rounded-3xl border-[10px] border-white shadow-2xl sm:h-[450px] lg:h-[600px]">
              <img
                src={heroImg}
                alt="Modern room interior"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Strip */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            <ShowcaseCard
              image={showcase1}
              title="2D Workspace"
              desc="Build room layouts with precision and visual clarity."
            />
            <ShowcaseCard
              image={showcase2}
              title="3D Preview"
              desc="See furniture arrangements from a realistic perspective."
            />
            <ShowcaseCard
              image={showcase3}
              title="Project Control"
              desc="Organize designs, updates, and saved room concepts."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#C96A2B]">
            System Features
          </h2>
          <h3 className="text-4xl font-semibold tracking-tight text-slate-900">
            Built for a smoother design workflow
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 leading-8">
            The platform combines room planning, furniture editing, and visualization
            into one connected workspace for better design decisions.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
  <ModuleCard
    icon={<Layers className="text-[#C96A2B]" size={28} />}
    label="Module 01"
    title="2D Floor Planner"
    desc="Define room size, shape, and layout. Place furniture items with a clean top-view editor built for speed and clarity."
    tint="orange"
  />
  <ModuleCard
    icon={<Box className="text-[#C96A2B]" size={28} />}
    label="Module 02"
    title="3D Visualization"
    desc="Transform 2D planning into a spatial 3D preview to help users understand arrangement, size, and appearance."
    tint="rose"
  />
  <ModuleCard
    icon={<Users className="text-[#C96A2B]" size={28} />}
    label="Module 03"
    title="Project Dashboard"
    desc="Manage saved designs, continue edits, and keep project work structured in a simple workspace environment."
    tint="stone"
  />
</div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#C96A2B]">
              Workflow
            </h2>
            <h3 className="text-4xl font-semibold tracking-tight text-slate-900">
              From room input to final visualization
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <StepCard
              number="01"
              title="Set Room"
              desc="Choose room type, shape, dimensions, and base surface colors."
            />
            <StepCard
              number="02"
              title="Add Furniture"
              desc="Insert furniture items and arrange them inside the room layout."
            />
            <StepCard
              number="03"
              title="Adjust Details"
              desc="Resize, rotate, and modify selected objects using property controls."
            />
            <StepCard
              number="04"
              title="Preview in 3D"
              desc="Switch to 3D mode and inspect the room from multiple angles."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="bg-[#2C1C14] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-orange-400">
              Why Choose Us
            </h2>
            <h3 className="text-4xl font-light italic">
              Designed to make planning simpler
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-orange-100/80">
              Visionary Interiors combines usability, visual clarity, and project organization
              into one design environment for customers and designers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <BenefitCard
              icon={<Sparkles size={22} />}
              title="Faster Concepts"
              desc="Create room ideas quickly without needing complex software knowledge."
            />
            <BenefitCard
              icon={<MonitorSmartphone size={22} />}
              title="Clear Visualization"
              desc="See layouts in both 2D and 3D for better spatial understanding."
            />
            <BenefitCard
              icon={<SlidersHorizontal size={22} />}
              title="Easy Adjustments"
              desc="Modify furniture placement, dimensions, and room setup with less effort."
            />
            <BenefitCard
              icon={<FolderKanban size={22} />}
              title="Organized Projects"
              desc="Keep design work saved, structured, and ready for future updates."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 lg:px-12">
        <div className="relative mx-auto flex max-w-7xl items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white px-8 py-20 text-center shadow-2xl">
          {/* Floating background cards */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-30px] top-10 hidden w-44 rotate-[-6deg] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl opacity-50 md:block animate-[floatY_7s_ease-in-out_infinite]">
              <div className="mb-2 h-24 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={showcase1}
                  alt="2D layout preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-slate-600">2D planning</p>
            </div>

            <div className="absolute right-[-30px] top-16 hidden w-44 rotate-[6deg] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl opacity-50 md:block animate-[floatY_9s_ease-in-out_infinite]">
              <div className="mb-2 h-24 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={showcase2}
                  alt="3D room preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-slate-600">3D preview</p>
            </div>
          </div>

          {/* Main CTA content */}
          <div className="relative z-10 max-w-3xl">
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Start designing with confidence.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-slate-600 leading-8">
              Build layouts, customize room details, and present a polished 3D preview
              through one connected interior design workflow.
            </p>
            <Link
              to="/designer-login"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-12 py-4 text-sm font-semibold text-white transition hover:bg-[#C96A2B] hover:shadow-2xl hover:shadow-orange-200"
            >
              Enter workspace
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Visionary Interiors
            </div>
            <div className="mt-1 text-xs text-slate-400">
              HCI Group 111 — Furniture Design Visualization System
            </div>
          </div>

          <div className="flex gap-8 text-xs font-medium uppercase tracking-wider text-slate-500">
            <a href="#features" className="hover:text-[#C96A2B]">
              Features
            </a>
            <a href="#workflow" className="hover:text-[#C96A2B]">
              Workflow
            </a>
            <Link to="/login" className="hover:text-[#C96A2B]">
              Customer
            </Link>
            <Link to="/designer-login" className="hover:text-[#C96A2B]">
              Designer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeaturePill = ({ text }) => (
  <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm">
    <CheckCircle2 size={16} className="text-[#C96A2B]" />
    <span>{text}</span>
  </div>
);

const ShowcaseCard = ({ image, title, desc }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#FCFBF9] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div className="h-56 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-500 hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h4 className="mb-2 text-xl font-semibold text-slate-900">{title}</h4>
      <p className="text-sm leading-7 text-slate-600">{desc}</p>
    </div>
  </div>
);

const ModuleCard = ({ icon, label, title, desc, tint = 'orange' }) => {
  const tintStyles = {
    orange: {
      card: 'bg-[#FCF8F4] border-[#F1E5D8]',
      icon: 'bg-[#F8ECDD]',
    },
    rose: {
      card: 'bg-[#FCF6F6] border-[#F0E2E2]',
      icon: 'bg-[#F6E7E7]',
    },
    stone: {
      card: 'bg-[#FAF8F5] border-[#ECE5DD]',
      icon: 'bg-[#F1EBE4]',
    },
  };

  const style = tintStyles[tint];

  return (
    <div className="group relative rounded-2xl border border-[#F1E5D8] bg-[#FCF8F4] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-200 border-l-4 border-[#C96A2B]">

  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8ECDD]">
    {icon}
  </div>

  <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#C96A2B]">
    {label}
  </span>

  <h4 className="mb-4 text-2xl font-semibold text-slate-900">{title}</h4>

  <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
</div>
  );
};

const StepCard = ({ number, title, desc }) => (
  <div className="rounded-2xl border border-slate-200 bg-[#FCFBF9] p-8">
    <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#C96A2B]">
      Step {number}
    </div>
    <h4 className="mb-3 text-2xl font-semibold text-slate-900">{title}</h4>
    <p className="text-sm leading-7 text-slate-600">{desc}</p>
  </div>
);

const BenefitCard = ({ icon, title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-[#C96A2B]/60 hover:bg-white/10">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C96A2B]/15 text-orange-300">
      {icon}
    </div>
    <h4 className="mb-3 text-lg font-semibold text-white">{title}</h4>
    <p className="text-sm leading-7 text-orange-100/75">{desc}</p>
  </div>
);

export default Landing;