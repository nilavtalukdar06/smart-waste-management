interface EmailTemplateProps {
  name: string;
}

export function EmailTemplate({ name }: EmailTemplateProps) {
  return (
    <div>
      <h1 className="text-2xl font-medium text-green-500">Hi , {name}!</h1>
      <p className="my-2">
        Welcome to Eco Swachh - we're excited to have you join our mission for a
        cleaner, greener India! 🇮🇳✨
      </p>
      <p className="my-2">
        Your journey towards making a real impact in your community starts now.
        From reporting waste to tracking cleanups, you&apos;re now part of a
        movement that cares.
      </p>
      <p className="font-medium my-2">
        🔒 Please verify your email to activate your account:
      </p>
      <p className="font-medium">🕒 Note:</p>
      <p>
        If you don&apos;t verify your account within 7 days, it will be
        automatically deleted for security and system cleanliness.
      </p>
      <p className="my-2">
        Let&apos;s work together to make every street shine. 🌍💚
      </p>
      <p className="my-2">
        If you have any questions, feel free to reach out to us at{" "}
        <a
          href="mailto:nilavtalukdar9@gmail.com"
          target="_blank"
          className="text-blue-500 underline"
        >
          support@ecoswachh.in.
        </a>
      </p>
      <p>Together for Swachh Bharat</p>
      <p className="font-medium">Team Eco Swachh</p>
    </div>
  );
}
