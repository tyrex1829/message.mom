import React from "react";

import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "./header";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />

      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section>
          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-48">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-5xl font-medium md:text-6xl text-white"
              >
                Send Message Anonymously
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-white/80"
              >
                Message.Mom is a platform that allows you to send messages
                anonymously to your friends and family.
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12"
              >
                <div className="mx-auto flex max-w-sm gap-4 mb-36">
                  <Button
                    className="flex-1 text-white bg-transparent border border-white/20 hover:bg-white/10 hover:text-white py-6"
                    variant="outline"
                  >
                    Sign In
                  </Button>
                  <Button className="flex-1 text-black bg-white  hover:bg-white/85 hover:text-black py-6">
                    Sign Up
                  </Button>
                </div>

                <div
                  aria-hidden
                  className="bg-radial from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left"
                >
                  <div className="bg-white/5 border border-white/10 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                    <div className="relative h-96 overflow-hidden rounded-[1.5rem] border border-white/20 p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                  </div>
                  <div className="bg-white/10 border-white/5 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                    <div className="bg-white/5 space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl shadow-black backdrop-blur-3xl">
                      <AppComponent />

                      <div className=" rounded-[1rem] p-4 pb-16 bg-white/20"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-5"></div>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const AppComponent = () => {
  return (
    <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4 border border-white/10">
      <div className="flex items-center gap-1.5 text-orange-500">
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 32 32"
        >
          <g fill="none">
            <path
              fill="#ff6723"
              d="M26 19.34c0 6.1-5.05 11.005-11.15 10.641c-6.269-.374-10.56-6.403-9.752-12.705c.489-3.833 2.286-7.12 4.242-9.67c.34-.445.689 3.136 1.038 2.742c.35-.405 3.594-6.019 4.722-7.991a.694.694 0 0 1 1.028-.213C18.394 3.854 26 10.277 26 19.34"
            ></path>
            <path
              fill="#ffb02e"
              d="M23 21.851c0 4.042-3.519 7.291-7.799 7.144c-4.62-.156-7.788-4.384-7.11-8.739C9.07 14.012 15.48 10 15.48 10S23 14.707 23 21.851"
            ></path>
          </g>
        </svg>
        <div className="text-sm font-medium text-orange-500">Msg</div>
      </div>
      <div className="space-y-3">
        <div className="text-gray-200 border-b border-gray-600 pb-3 text-sm font-medium">
          I am sending this message anonymously to my friend.
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="space-x-1">
              <span className="text-white align-baseline text-xl font-bold">
                Hey, bro
              </span>
              <span className="text-gray-400 text-xs">sent</span>
            </div>
            <div className="flex h-5 items-center rounded bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 px-2 text-xs text-white font-medium">
              2025
            </div>
          </div>
          <div className="space-y-1">
            <div className="space-x-1">
              <span className="text-white align-baseline text-xl font-bold">
                Will meet
              </span>
              <span className="text-gray-400 text-xs">read</span>
            </div>
            <div className="text-gray-300 bg-gray-600 flex h-5 w-2/3 items-center rounded px-2 text-xs font-medium">
              2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
