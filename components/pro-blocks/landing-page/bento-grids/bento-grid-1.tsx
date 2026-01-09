"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Create motion components
const MotionLink = motion(Link);

export function BentoGrid1() {
  return (
    <section className="mt-10 ">
      <div className="px-15 mx-auto flex flex-col gap-10 md:gap-12">
        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-5 ">
          {/* MentaLink */}
          <MotionLink
            href="https://pitch.com/v/tu20---the-golden-parachutes---mentalink-hq6mvs"
            target="_blank"
            className="col-span-2"
            whileHover={{ y: -1, scale: 1.003 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="text-3xl">MentaLink</CardTitle>
                <CardDescription className="font-ppmontreal text-base">
                  Creating a platform to manage your mental health at a touch of
                  a button.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col">
                <video
                  width={1000}
                  height={1000}
                  src="./Mentalink.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                ></video>
              </CardContent>
            </Card>
          </MotionLink>

          {/* ServiceSwap */}
          <MotionLink
            className="col-span-1"
            href="https://devpost.com/software/serviceswap"
            target="_blank"
            whileHover={{ y: -1, scale: 1.003 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  NutriSmart
                </CardTitle>
                <CardDescription className="font-ppmontreal">
                  Counting calories just got smarter - and sexier.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col">
                <video
                  src="./Nutrismart.mp4"
                  width={1000}
                  height={1000}
                  autoPlay
                  loop
                  muted
                  className="h-full w-full object-cover md:aspect-[4/3]"
                ></video>
              </CardContent>
            </Card>
          </MotionLink>

          {/* UTRA Hacks */}
          <MotionLink
            href="https://devpost.com/software/av-challenge-the-akatsuki"
            target="_blank"
            className="col-span-1 w-full h-full"
            whileHover={{ y: -1, scale: 1.003 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  UTRA AV Challenge
                </CardTitle>
                <CardDescription className="font-ppmontreal">
                  An IR (Infrared) and Ultrasonic Sensor obstacle avoider and
                  path finding robot.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col">
                <Image
                  src="/utrahacks.jpg"
                  alt="Placeholder"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover md:aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </MotionLink>

          {/* Nutrismart */}
          <MotionLink
            href="https://nutrismart-liard.vercel.app/"
            className="col-span-2"
            target="_blank"
            whileHover={{ y: -1, scale: 1.003 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  ServiceSwap
                </CardTitle>
                <CardDescription className="font-ppmontreal">
                  Peer-to-peer service exchange platform that allows users to
                  post, discover, and fulfill service listings - completely
                  without money.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col">
                <video
                  width={1000}
                  height={1000}
                  src="./ServiceSwap.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                ></video>
              </CardContent>
            </Card>
          </MotionLink>
        </div>
      </div>
    </section>
  );
}
