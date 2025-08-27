import Image from "next/image";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArcjetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateJobForm } from "@/components/forms/create-job-form";

import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/require-user";

const companies = [
  { id: "1", name: "ArcJet", logo: ArcjetLogo },
  { id: "2", name: "Inngest", logo: InngestLogo },
  { id: "3", name: "ArcJet", logo: ArcjetLogo },
  { id: "4", name: "Inngest", logo: InngestLogo },
  { id: "5", name: "ArcJet", logo: ArcjetLogo },
  { id: "6", name: "Inngest", logo: InngestLogo },
];

const testimonials = [
  {
    id: "1",
    quote:
      "JobBoard simplified our hiring process. We filled a key role in just days and saved weeks of searching.",
    author: "Mark Johnson",
    company: "NextGen Solutions",
  },
  {
    id: "2",
    quote:
      "The platform connected us with talented people fast. Highly qualified candidates applied almost instantly.",
    author: "Emily Davis",
    company: "BrightPath Labs",
  },
  {
    id: "3",
    quote:
      "I was impressed with how quickly we received relevant applications. JobBoard exceeded our expectations.",
    author: "David Wilson",
    company: "FutureWorks",
  },
  {
    id: "4",
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "Sarah Smith",
    company: "TechInnovation",
  },
  {
    id: "5",
    quote:
      "Using JobBoard was seamless. We discovered skilled professionals who matched perfectly with our culture.",
    author: "Linda Martinez",
    company: "Visionary Group",
  },
  {
    id: "6",
    quote:
      "This tool made recruiting effortless. We attracted top talent faster than ever, with excellent results.",
    author: "James Brown",
    company: "CoreDynamics",
  },
  {
    id: "7",
    quote:
      "Our team relies on JobBoard for every hire now. It’s efficient, effective, and delivers outstanding candidates.",
    author: "Olivia Taylor",
    company: "Skyline Ventures",
  },
];

const stats = [
  { id: "1", value: "10k+", label: "Active job seekers monthly" },
  { id: "2", value: "48h", label: "Average time to hire" },
  { id: "3", value: "95%", label: "Employer satisfaction" },
  { id: "4", value: "500+", label: "Companies hiring remotely" },
];

const getCompany = async (userId: string) => {
  const data = await prisma.company.findUnique({
    where: { userId: userId },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }

  return data;
};

const PostJobPage = async () => {
  const session = await requireUser();
  const data = await getCompany(session.id as string);

  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
      <CreateJobForm
        companyAbout={data.about}
        companyLogo={data.logo}
        companyLocation={data.location}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-xl">
            Trusted by Global Industry Leaders
          </CardTitle>
          <CardDescription>
            Join thousands of companies discovering top talent today.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="grid grid-cols-3 gap-4">
            {companies.map(({ id, name, logo }) => (
              <li key={id}>
                <Image
                  src={logo}
                  alt={name}
                  width={80}
                  height={80}
                  className="rounded-lg opacity-75 hover:opacity-100 transition-opacity duration-200"
                />
              </li>
            ))}
          </ul>
          <ScrollArea className="h-78 pr-4">
            <ul className="mt-8 space-y-4">
              {testimonials.map(({ id, quote, author, company }) => (
                <li key={id}>
                  <blockquote className="border-l-2 border-primary pl-4 text-sm">
                    <p className="text-muted-foreground italic">
                      &quot;{quote}&quot;
                    </p>
                    <footer className="mt-2 font-medium">
                      - {author}, {company}
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <ul className="grid grid-cols-2 gap-4">
            {stats.map(({ id, value, label }) => (
              <li
                key={id}
                className="flex items-center gap-4 bg-muted rounded-lg px-2.5 py-4 shadow-sm"
              >
                <h4 className="text-2xl font-bold">{value}</h4>
                <p className="text-sm text-muted-foreground">{label}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJobPage;
