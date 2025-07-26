import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsLetterSection() {
  return (
    <div className="w-full py-10 px-5 lg:py-16 mx-auto">
      <div className="max-w-xl text-start sm:text-center mx-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-medium text-neutral-600 md:text-3xl md:leading-tight">
            Sign up to our newsletter
          </h2>
        </div>
        <form>
          <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div className="w-full">
              <label htmlFor="hero-input" className="sr-only">
                Search
              </label>
              <Input placeholder="Enter your email" />
            </div>
            <Button variant="secondary" className="w-full sm:w-fit">
              Subscribe <Bell />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
