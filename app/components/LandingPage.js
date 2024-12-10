"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Code, Zap, Users, BookOpen, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    // Apply smooth scroll behavior to the html element
    document.documentElement.style.scrollBehavior = "smooth";

    // Cleanup on component unmount (optional)
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <main className="flex-1 z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none drop-shadow-md">
                  CodeBrew
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your all-in-one online compiler and development environment.
                  Write, compile, and collaborate on code projects with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="#get-started">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Code className="h-10 w-10" />}
                title="Multiple Languages"
                description="Support for various programming languages to suit your needs."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10" />}
                title="Real-time Compilation"
                description="Get instant feedback as you code with our real-time compiler."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10" />}
                title="Collaboration"
                description="Work on projects with your team in real-time, enhancing productivity."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10" />}
                title="Learning Resources"
                description="Access to comprehensive tutorials and documentation to support your learning."
              />
            </div>
          </div>
        </section>
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Get Started in Minutes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Quick Start Guide</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Choose your preferred programming language</li>
                  <li>Write your code in the editor or upload a file</li>
                  <li>Click "Compile & Run" to see your code in action</li>
                  <li>View output and debug errors in the console</li>
                  <li>Save your project or share it with others</li>
                </ol>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="mt-4">
                      Start Coding Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Start Coding Now</AlertDialogTitle>
                      <AlertDialogDescription>
                        You’re about to be redirected to the coding environment.
                        Make sure to login to enjoy all features.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => await signIn("github")}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="rounded-lg bg-gray-200 dark:bg-gray-700 p-6">
                <pre
                  className={`text-sm whitespace-pre-wrap`}
                >
                  <code>{`
// Your first CodeBrew program
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('Coder');
                  `}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              About CodeBrew
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              CodeBrew was born from a passion for making coding accessible to
              everyone. Our platform is designed to empower developers of all
              skill levels, from beginners to experts, by providing a powerful,
              user-friendly online coding environment.
            </p>
            <Button className="mt-8" variant="outline" asChild>
              <Link href="#">Contact Us</Link>
            </Button>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-2xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>What is CodeBrew?</AccordionTrigger>
                <AccordionContent>
                  CodeBrew is an online coding platform that allows you to
                  write, compile, and run code in multiple programming languages
                  directly in your browser. It is designed for developers of all
                  levels, from beginners to experts.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How many programming languages are supported?
                </AccordionTrigger>
                <AccordionContent>
                  CodeBrew supports a wide range of programming languages,
                  including JavaScript, Python, Java, C++, and more. You can
                  view the full list of supported languages on our platform.
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I collaborate with others on CodeBrew?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, CodeBrew offers collaboration features that allow you to
                  share your code and work on projects with team members in real
                  time.
                </AccordionContent>
              </AccordionItem> */}
              {/* <AccordionItem value="item-4">
                <AccordionTrigger>
                  Is there a way to save my projects?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! CodeBrew allows you to save your projects securely
                  in your account, so you can access them anytime from any
                  device.
                </AccordionContent>
              </AccordionItem> */}
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Do I need to install anything to use CodeBrew?
                </AccordionTrigger>
                <AccordionContent>
                  No installation is required. CodeBrew is a fully browser-based
                  platform, meaning you can start coding immediately without
                  setting up any development environment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Is CodeBrew free to use?</AccordionTrigger>
                <AccordionContent>
                  CodeBrew is free to use with all features.
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="item-7">
                <AccordionTrigger>
                  How secure is my code on CodeBrew?
                </AccordionTrigger>
                <AccordionContent>
                  Security is our top priority. All your code and data are
                  stored securely with encryption, and access to your projects
                  is restricted to your account unless you choose to share them.
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
